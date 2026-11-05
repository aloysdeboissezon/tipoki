-- ESADE-only quizzes: access for accounts whose ESADE email address is verified, at most 2 sessions per ESADE address.
-- Run it once in Supabase -> SQL Editor (after add_progress_sync, harden_security and add_auth_signin). Safe to run twice.
--
-- How it works:
--   * The email code itself (6 digits, sent by Supabase Auth) proves the person controls the mailbox.
--   * This script decides whether that mailbox is an ESADE one (table esade_domains) and stores it on the account (esade_email).
--   * The ESADE quiz files are not on the public website any more: the server function /api/esade asks esade_status() below
--     and only sends them to an account whose esade_email is set.
--   * An ESADE account keeps at most 2 signed-in devices: signing in on a 3rd one signs the oldest one out.

-- 1. Accepted ESADE email domains. Subdomains match too (alumni.esade.edu, student.esade.edu...). Add a row to accept another domain.
create table if not exists public.esade_domains (
  domain text primary key check (domain = lower(domain) and domain !~ '[@\s]'),
  note text
);
alter table public.esade_domains enable row level security;
revoke all on public.esade_domains from anon, authenticated;
insert into public.esade_domains(domain, note) values
  ('esade.edu', 'ESADE students, staff and alumni (subdomains such as alumni.esade.edu match too)')
on conflict (domain) do nothing;

-- 2. The verified ESADE address of an account (one address belongs to one account: verifying it again elsewhere moves it)
alter table public.tpk_accounts add column if not exists esade_email text;
alter table public.tpk_accounts add column if not exists esade_at timestamptz;
create unique index if not exists tpk_accounts_esade_email on public.tpk_accounts(esade_email) where esade_email is not null;

-- 3. Is this address on an ESADE domain? (the browser asks before sending a code, the server asks again before trusting it)
create or replace function public.esade_domain_ok(p_email text) returns boolean
language plpgsql stable security definer set search_path = '' as $$
declare em text := lower(btrim(coalesce(p_email, ''))); dom text;
begin
  if em !~ '^[^@[:space:]]+@[^@[:space:]]+$' then return false; end if;
  dom := split_part(em, '@', 2);
  return exists (select 1 from public.esade_domains d where dom = d.domain or right(dom, length(d.domain) + 1) = '.' || d.domain);
end $$;

-- 4. Internal: if the person signed in with Supabase Auth right now has a CONFIRMED ESADE address, attach it to this account.
create or replace function public.tpk_esade_mark(p_account uuid) returns text
language plpgsql security definer set search_path = '' as $$
declare em text; ok_at timestamptz;
begin
  if auth.uid() is null then return null; end if;
  select lower(btrim(u.email)), u.email_confirmed_at into em, ok_at from auth.users u where u.id = auth.uid();
  if em is null or ok_at is null or not public.esade_domain_ok(em) then return null; end if;
  update public.tpk_accounts set esade_email = null, esade_at = null where esade_email = em and id <> p_account;
  update public.tpk_accounts set esade_email = em, esade_at = coalesce(esade_at, now()) where id = p_account;
  return em;
end $$;

-- 5. Sessions: at most 2 for an ESADE account, 10 for the others (oldest dropped), unused for 180 days = expired
create or replace function public.tpk_new_session(p_account uuid) returns text
language plpgsql security definer set search_path = '' as $$
declare t text := encode(extensions.gen_random_bytes(32), 'hex');
  cap int := case when exists (select 1 from public.tpk_accounts where id = p_account and esade_email is not null) then 2 else 10 end;
begin
  insert into public.tpk_sessions(token_hash, account_id) values (encode(extensions.digest(t, 'sha256'), 'hex'), p_account);
  delete from public.tpk_sessions where account_id = p_account and token_hash not in
    (select token_hash from public.tpk_sessions where account_id = p_account order by last_used desc, created_at desc limit cap);
  delete from public.tpk_sessions where last_used < now() - interval '180 days';
  return t;
end $$;

-- 6. Signing in with an email / Google: same as before, plus "if it is an ESADE address, mark the account"
create or replace function public.tpk_auth_login(p_link text default null, p_data jsonb default '{}'::jsonb) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare uid uuid := auth.uid(); lbl text; a public.tpk_accounts; old public.tpk_accounts; es text;
begin
  if uid is null then raise exception 'not_signed_in'; end if;
  lbl := left(coalesce(nullif(auth.jwt()->>'email', ''), nullif(auth.jwt()->>'phone', ''), 'player'), 80);
  select * into a from public.tpk_accounts where auth_id = uid;
  if found then
    if p_link is not null then
      begin old := public.tpk_account_for(p_link); exception when others then old := null; end;
      if old.id is not null and old.id <> a.id then raise exception 'already_linked'; end if;
    end if;
    es := public.tpk_esade_mark(a.id);
    return jsonb_build_object('token', public.tpk_new_session(a.id), 'username', coalesce(a.auth_label, a.username), 'rev', a.rev, 'data', a.data, 'esade', es);
  end if;
  if p_link is not null then
    old := public.tpk_account_for(p_link);
    if old.auth_id is not null then raise exception 'already_linked'; end if;
    update public.tpk_accounts set auth_id = uid, auth_label = lbl, updated_at = now() where id = old.id returning * into a;
    es := public.tpk_esade_mark(a.id);
    return jsonb_build_object('token', public.tpk_new_session(a.id), 'username', a.username, 'rev', a.rev, 'data', a.data, 'esade', es);
  end if;
  perform public.tpk_check_data(p_data);
  insert into public.tpk_accounts(username, uname_key, pass_hash, auth_id, auth_label, data, rev)
    values (lbl, 'auth:' || uid::text, null, uid, lbl, p_data, 1) returning * into a;
  es := public.tpk_esade_mark(a.id);
  return jsonb_build_object('token', public.tpk_new_session(a.id), 'username', lbl, 'rev', 1, 'created', true, 'esade', es);
end $$;

-- 7. "Verify my ESADE email" for someone already signed in to an account (the browser has just checked the emailed code).
create or replace function public.esade_verify(p_token text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare a public.tpk_accounts; es text; cur text := encode(extensions.digest(coalesce(p_token, ''), 'sha256'), 'hex');
begin
  if auth.uid() is null then raise exception 'not_signed_in'; end if;
  a := public.tpk_account_for(p_token);                 -- raises bad_token
  es := public.tpk_esade_mark(a.id);
  if es is null then raise exception 'not_esade'; end if;
  -- an ESADE account keeps 2 sessions: this one and the most recent other one
  delete from public.tpk_sessions where account_id = a.id and token_hash <> cur and token_hash not in
    (select token_hash from public.tpk_sessions where account_id = a.id and token_hash <> cur order by last_used desc limit 1);
  return jsonb_build_object('verified', true, 'email', es);
end $$;

-- 8. Is this account ESADE-verified? (the page uses it for the tick on the logo, /api/esade before sending the quizzes)
create or replace function public.esade_status(p_token text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare a public.tpk_accounts;
begin
  a := public.tpk_account_for(p_token);                 -- raises bad_token
  return jsonb_build_object('verified', a.esade_email is not null, 'email', a.esade_email);
end $$;

revoke all on function public.tpk_esade_mark(uuid), public.tpk_new_session(uuid) from public, anon, authenticated;
revoke all on function public.tpk_auth_login(text, jsonb) from public, anon;
grant execute on function public.tpk_auth_login(text, jsonb) to authenticated;
revoke all on function public.esade_verify(text) from public, anon;
grant execute on function public.esade_verify(text) to authenticated;
revoke all on function public.esade_status(text), public.esade_domain_ok(text) from public;
grant execute on function public.esade_status(text), public.esade_domain_ok(text) to anon, authenticated;

-- Handy admin queries (run them by hand when needed):
--   select esade_email, esade_at, (select count(*) from public.tpk_sessions s where s.account_id = a.id) as sessions from public.tpk_accounts a where esade_email is not null order by esade_at desc;
--   insert into public.esade_domains(domain, note) values ('another-esade-domain.edu', 'why');
--   update public.tpk_accounts set esade_email = null, esade_at = null where esade_email = 'someone@esade.edu';   -- take access away
