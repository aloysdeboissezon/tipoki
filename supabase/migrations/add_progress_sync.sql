-- Progress saved online with a username + password (no email).
-- The browser keeps working from localStorage; this only stores a copy of the progress keys
-- (scores seen, mistakes to review, flashcards, recent quizzes, nickname, photo) so they follow the player to another device.
-- Tables are closed to the API (RLS on, no policies): everything goes through the security definer functions below.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.tpk_accounts (
  id uuid primary key default gen_random_uuid(),
  username text not null,
  uname_key text not null unique,                 -- lower(username), so "Alex" and "alex" are the same account
  pass_hash text not null,                        -- bcrypt
  data jsonb not null default '{}'::jsonb,        -- { localStorage key: string value }
  rev bigint not null default 0,                  -- bumped on every save, lets two devices notice each other
  fails int not null default 0,
  locked_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.tpk_sessions (
  token_hash text primary key,                    -- sha256 of the token kept in the browser
  account_id uuid not null references public.tpk_accounts(id) on delete cascade,
  created_at timestamptz not null default now(),
  last_used timestamptz not null default now()
);
create index if not exists tpk_sessions_account on public.tpk_sessions(account_id);
create table if not exists public.tpk_signup_log (ip text not null, at timestamptz not null default now());
create index if not exists tpk_signup_log_ip on public.tpk_signup_log(ip, at);

alter table public.tpk_accounts enable row level security;
alter table public.tpk_sessions enable row level security;
alter table public.tpk_signup_log enable row level security;
revoke all on public.tpk_accounts, public.tpk_sessions, public.tpk_signup_log from anon, authenticated;

-- ---------- helpers (not callable from the API) ----------
create or replace function public.tpk_new_session(p_account uuid) returns text
language plpgsql security definer set search_path = '' as $$
declare t text := encode(extensions.gen_random_bytes(32), 'hex');
begin
  insert into public.tpk_sessions(token_hash, account_id) values (encode(extensions.digest(t, 'sha256'), 'hex'), p_account);
  return t;
end $$;

create or replace function public.tpk_account_for(p_token text) returns public.tpk_accounts
language plpgsql security definer set search_path = '' as $$
declare s public.tpk_sessions; a public.tpk_accounts;
begin
  select * into s from public.tpk_sessions where token_hash = encode(extensions.digest(coalesce(p_token, ''), 'sha256'), 'hex');
  if not found then raise exception 'bad_token'; end if;
  update public.tpk_sessions set last_used = now() where token_hash = s.token_hash and last_used < now() - interval '1 hour';
  select * into a from public.tpk_accounts where id = s.account_id;
  return a;
end $$;

create or replace function public.tpk_check_data(p_data jsonb) returns void
language plpgsql immutable set search_path = '' as $$
begin
  if p_data is null or jsonb_typeof(p_data) <> 'object' then raise exception 'bad_data'; end if;
  if octet_length(p_data::text) > 1000000 then raise exception 'too_big'; end if;
end $$;

-- ---------- API ----------
create or replace function public.tpk_signup(p_username text, p_password text, p_data jsonb default '{}'::jsonb) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare u text := btrim(coalesce(p_username, '')); v_ip text; a public.tpk_accounts;
begin
  if u !~ '^[A-Za-z0-9_.-]{3,20}$' then raise exception 'bad_username'; end if;
  if length(coalesce(p_password, '')) < 6 or length(p_password) > 100 then raise exception 'bad_password'; end if;
  perform public.tpk_check_data(p_data);
  begin v_ip := split_part(coalesce(current_setting('request.headers', true)::json->>'x-forwarded-for', ''), ',', 1);
  exception when others then v_ip := ''; end;
  if v_ip <> '' then
    if (select count(*) from public.tpk_signup_log l where l.ip = v_ip and l.at > now() - interval '1 hour') >= 10 then raise exception 'slow_down'; end if;
    insert into public.tpk_signup_log(ip) values (v_ip);
    delete from public.tpk_signup_log where at < now() - interval '1 day';
  end if;
  if exists (select 1 from public.tpk_accounts where uname_key = lower(u)) then raise exception 'name_taken'; end if;
  insert into public.tpk_accounts(username, uname_key, pass_hash, data, rev)
    values (u, lower(u), extensions.crypt(p_password, extensions.gen_salt('bf', 8)), p_data, 1) returning * into a;
  return jsonb_build_object('token', public.tpk_new_session(a.id), 'username', a.username, 'rev', a.rev);
exception when unique_violation then raise exception 'name_taken';
end $$;

create or replace function public.tpk_login(p_username text, p_password text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare a public.tpk_accounts;
begin
  select * into a from public.tpk_accounts where uname_key = lower(btrim(coalesce(p_username, '')));
  if not found then return jsonb_build_object('error', 'bad_login'); end if;
  if a.locked_until is not null and a.locked_until > now() then raise exception 'locked'; end if;
  if a.pass_hash <> extensions.crypt(coalesce(p_password, ''), a.pass_hash) then
    -- 8 wrong passwords in a row lock the account for 15 minutes (stops guessing)
    update public.tpk_accounts set fails = case when fails >= 7 then 0 else fails + 1 end,
      locked_until = case when fails >= 7 then now() + interval '15 minutes' else locked_until end where id = a.id;
    return jsonb_build_object('error', 'bad_login');
  end if;
  update public.tpk_accounts set fails = 0, locked_until = null where id = a.id;
  return jsonb_build_object('token', public.tpk_new_session(a.id), 'username', a.username, 'rev', a.rev, 'data', a.data);
end $$;

create or replace function public.tpk_pull(p_token text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare a public.tpk_accounts := public.tpk_account_for(p_token);
begin
  return jsonb_build_object('username', a.username, 'rev', a.rev, 'data', a.data);
end $$;

-- Saves only if nobody else saved since p_rev; otherwise returns the newer copy so the browser can merge and retry.
create or replace function public.tpk_push(p_token text, p_data jsonb, p_rev bigint) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare a public.tpk_accounts := public.tpk_account_for(p_token); n bigint;
begin
  perform public.tpk_check_data(p_data);
  update public.tpk_accounts set data = p_data, rev = rev + 1, updated_at = now()
    where id = a.id and rev = p_rev returning rev into n;
  if n is null then
    select * into a from public.tpk_accounts where id = a.id;
    return jsonb_build_object('conflict', true, 'rev', a.rev, 'data', a.data);
  end if;
  return jsonb_build_object('rev', n);
end $$;

create or replace function public.tpk_logout(p_token text) returns void
language sql security definer set search_path = '' as $$
  delete from public.tpk_sessions where token_hash = encode(extensions.digest(coalesce(p_token, ''), 'sha256'), 'hex');
$$;

revoke all on function public.tpk_new_session(uuid), public.tpk_account_for(text), public.tpk_check_data(jsonb) from public, anon, authenticated;
revoke all on function public.tpk_signup(text, text, jsonb), public.tpk_login(text, text), public.tpk_pull(text),
  public.tpk_push(text, jsonb, bigint), public.tpk_logout(text) from public;
grant execute on function public.tpk_signup(text, text, jsonb), public.tpk_login(text, text), public.tpk_pull(text),
  public.tpk_push(text, jsonb, bigint), public.tpk_logout(text) to anon, authenticated;
