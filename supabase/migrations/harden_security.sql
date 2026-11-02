-- Security hardening (audit 2026-11-02). NOT applied automatically: run it in the Supabase SQL editor, after reading it.
-- It is idempotent (safe to run twice). Nothing here changes how the site behaves for a normal player.
--   1. API privileges cut to what the site really uses (RLS already blocks most of it; this is the second lock)
--   2. games / players: players can no longer rewrite keys (code, pid), sizes are capped, spam is capped
--   3. reports / play stats / leagues: server-side anti-spam (the client-side checks can be bypassed)
--   4. online save (tpk_*): stronger bcrypt, real client IP, login throttling, session cap + expiry

-- ============ 1. privileges ============
-- Supabase gives anon/authenticated every privilege on new tables. Keep only what the site calls.
revoke truncate, references, trigger, delete on all tables in schema public from anon, authenticated;
revoke all on public.gen_log, public.stats_keys, public.tpk_league_meta, public.tpk_league_players from anon, authenticated;
revoke insert, update on public.quizzes, public.community_questions, public.question_votes from anon, authenticated;   -- written through RPCs only
revoke select, update on public.play_stats, public.question_reports from anon, authenticated;                          -- insert only
revoke update on public.games, public.players from anon, authenticated;
grant update (state) on public.games to anon, authenticated;                  -- cannot change the game code
grant update (nick, ans, avatar) on public.players to anon, authenticated;    -- cannot change code / pid (no taking over someone else's row)

-- ============ 2. games / players ============
-- (the guard functions are security definer: they must count rows that the API role itself cannot read)
create or replace function public.tpk_guard_games() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.code is null or new.code !~ '^[A-Za-z0-9]{3,12}$' then raise exception 'bad_code'; end if;
  if octet_length(new.state::text) > 200000 then raise exception 'too_big'; end if;
  if tg_op = 'INSERT' and (select count(*) from games where updated_at > now() - interval '1 hour') >= 3000 then raise exception 'slow_down'; end if;
  return new;
end $$;
drop trigger if exists tpk_guard_games on public.games;
create trigger tpk_guard_games before insert or update on public.games for each row execute function public.tpk_guard_games();

create index if not exists players_created_idx on public.players (created_at);
create or replace function public.tpk_guard_players() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if length(coalesce(new.nick, '')) > 24 then raise exception 'bad_nick'; end if;
  if new.ans is not null and octet_length(new.ans::text) > 20000 then raise exception 'too_big'; end if;
  if new.avatar is not null and length(new.avatar) > 100000 then raise exception 'too_big'; end if;
  if tg_op = 'INSERT' then
    if (select count(*) from players where code = new.code) >= 100 then raise exception 'room_full'; end if;
    if (select count(*) from players where created_at > now() - interval '1 hour') >= 6000 then raise exception 'slow_down'; end if;
  end if;
  return new;
end $$;
drop trigger if exists tpk_guard_players on public.players;
create trigger tpk_guard_players before insert or update on public.players for each row execute function public.tpk_guard_players();

-- ============ 3. reports / stats / leagues ============
create index if not exists question_reports_created_idx on public.question_reports (created_at);
create index if not exists play_stats_created_idx on public.play_stats (created_at);

-- the insert policies only check created_at, which the sender chooses: force it, and cap the volume
create or replace function public.tpk_guard_reports() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  new.created_at := now();
  if new.player is not null and (select count(*) from question_reports where player = new.player and created_at > now() - interval '1 hour') >= 30 then raise exception 'slow_down'; end if;
  if (select count(*) from question_reports where created_at > now() - interval '1 hour') >= 1000 then raise exception 'slow_down'; end if;
  return new;
end $$;
drop trigger if exists tpk_guard_reports on public.question_reports;
create trigger tpk_guard_reports before insert on public.question_reports for each row execute function public.tpk_guard_reports();

create or replace function public.tpk_guard_play_stats() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  new.created_at := now();
  if (select count(*) from play_stats where player = new.player and created_at > now() - interval '1 hour') >= 200 then raise exception 'slow_down'; end if;
  if (select count(*) from play_stats where created_at > now() - interval '1 hour') >= 6000 then raise exception 'slow_down'; end if;
  return new;
end $$;
drop trigger if exists tpk_guard_play_stats on public.play_stats;
create trigger tpk_guard_play_stats before insert on public.play_stats for each row execute function public.tpk_guard_play_stats();

-- leagues: tpk_league_sync() caps one call at 600 XP but nothing limited the number of calls, so anyone could script their way to Diamond.
-- Now: at most 3000 XP per player per hour (a very active player earns ~2000), and at most 1000 new players per hour.
alter table public.tpk_league_players add column if not exists hour_start timestamptz not null default now();
alter table public.tpk_league_players add column if not exists hour_xp int not null default 0;
create or replace function public.tpk_guard_league() returns trigger
language plpgsql security definer set search_path = public as $$
declare gain int; room int;
begin
  if tg_op = 'INSERT' then
    if not exists (select 1 from tpk_league_players where pid = new.pid)
       and (select count(*) from tpk_league_players where created_at > now() - interval '1 hour') >= 1000 then raise exception 'slow_down'; end if;
    new.xp := least(new.xp, 600); new.total_xp := least(new.total_xp, 600); new.hour_start := now(); new.hour_xp := new.xp;
    return new;
  end if;
  gain := new.xp - old.xp;
  if new.week = old.week and gain > 0 then
    if old.hour_start < now() - interval '1 hour' then new.hour_start := now(); new.hour_xp := 0; else new.hour_start := old.hour_start; new.hour_xp := old.hour_xp; end if;
    room := greatest(0, 3000 - new.hour_xp);
    if gain > room then
      new.total_xp := old.total_xp + room;
      new.xp := old.xp + room; gain := room;
    end if;
    new.hour_xp := new.hour_xp + gain;
  end if;
  return new;
end $$;
drop trigger if exists tpk_guard_league on public.tpk_league_players;
create trigger tpk_guard_league before insert or update on public.tpk_league_players for each row execute function public.tpk_guard_league();

-- ============ 4. online save (username + password) ============
-- Real client IP. x-forwarded-for can be written by the sender (its first value is not trustworthy); Cloudflare's header cannot.
create or replace function public.tpk_client_ip() returns text
language plpgsql stable set search_path = '' as $$
declare h json;
begin
  begin h := current_setting('request.headers', true)::json; exception when others then return ''; end;
  if h is null then return ''; end if;
  return coalesce(nullif(btrim(h->>'cf-connecting-ip'), ''), nullif(btrim(h->>'x-real-ip'), ''), btrim(split_part(coalesce(h->>'x-forwarded-for', ''), ',', 1)));
end $$;
revoke all on function public.tpk_client_ip() from public, anon, authenticated;

create table if not exists public.tpk_login_log (ip text not null, at timestamptz not null default now());
create index if not exists tpk_login_log_ip on public.tpk_login_log(ip, at);
alter table public.tpk_login_log enable row level security;
revoke all on public.tpk_login_log from anon, authenticated;

-- sessions: at most 10 per account (oldest dropped), unused for 180 days = expired
create or replace function public.tpk_new_session(p_account uuid) returns text
language plpgsql security definer set search_path = '' as $$
declare t text := encode(extensions.gen_random_bytes(32), 'hex');
begin
  insert into public.tpk_sessions(token_hash, account_id) values (encode(extensions.digest(t, 'sha256'), 'hex'), p_account);
  delete from public.tpk_sessions where account_id = p_account and token_hash not in
    (select token_hash from public.tpk_sessions where account_id = p_account order by last_used desc limit 10);
  delete from public.tpk_sessions where last_used < now() - interval '180 days';
  return t;
end $$;

create or replace function public.tpk_account_for(p_token text) returns public.tpk_accounts
language plpgsql security definer set search_path = '' as $$
declare s public.tpk_sessions; a public.tpk_accounts;
begin
  select * into s from public.tpk_sessions where token_hash = encode(extensions.digest(coalesce(p_token, ''), 'sha256'), 'hex');
  if not found or s.last_used < now() - interval '180 days' then raise exception 'bad_token'; end if;
  update public.tpk_sessions set last_used = now() where token_hash = s.token_hash and last_used < now() - interval '1 hour';
  select * into a from public.tpk_accounts where id = s.account_id;
  return a;
end $$;

create or replace function public.tpk_signup(p_username text, p_password text, p_data jsonb default '{}'::jsonb) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare u text := btrim(coalesce(p_username, '')); v_ip text := public.tpk_client_ip(); a public.tpk_accounts;
begin
  if u !~ '^[A-Za-z0-9_.-]{3,20}$' then raise exception 'bad_username'; end if;
  -- bcrypt only reads the first 72 bytes: refuse longer passwords instead of silently truncating them
  if length(coalesce(p_password, '')) < 6 or octet_length(p_password) > 72 or lower(p_password) = lower(u) then raise exception 'bad_password'; end if;
  perform public.tpk_check_data(p_data);
  if (select count(*) from public.tpk_signup_log l where l.at > now() - interval '1 hour') >= 300 then raise exception 'slow_down'; end if;   -- all networks together
  if v_ip <> '' then
    if (select count(*) from public.tpk_signup_log l where l.ip = v_ip and l.at > now() - interval '1 hour') >= 10 then raise exception 'slow_down'; end if;
  end if;
  insert into public.tpk_signup_log(ip) values (v_ip);
  delete from public.tpk_signup_log where at < now() - interval '1 day';
  if exists (select 1 from public.tpk_accounts where uname_key = lower(u)) then raise exception 'name_taken'; end if;
  insert into public.tpk_accounts(username, uname_key, pass_hash, data, rev)
    values (u, lower(u), extensions.crypt(p_password, extensions.gen_salt('bf', 10)), p_data, 1) returning * into a;
  return jsonb_build_object('token', public.tpk_new_session(a.id), 'username', a.username, 'rev', a.rev);
exception when unique_violation then raise exception 'name_taken';
end $$;

create or replace function public.tpk_login(p_username text, p_password text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare a public.tpk_accounts; v_ip text := public.tpk_client_ip(); ok boolean;
begin
  -- wrong attempts per network: 40 per hour (a guesser trying many usernames from one place)
  if v_ip <> '' and (select count(*) from public.tpk_login_log l where l.ip = v_ip and l.at > now() - interval '1 hour') >= 40 then raise exception 'slow_down'; end if;
  select * into a from public.tpk_accounts where uname_key = lower(btrim(coalesce(p_username, '')));
  if not found then
    perform extensions.crypt(coalesce(p_password, ''), extensions.gen_salt('bf', 10));   -- same time as a real check: no username guessing by timing
    insert into public.tpk_login_log(ip) values (v_ip);
    return jsonb_build_object('error', 'bad_login');
  end if;
  if a.locked_until is not null and a.locked_until > now() then raise exception 'locked'; end if;
  ok := a.pass_hash = extensions.crypt(coalesce(p_password, ''), a.pass_hash);
  if not ok then
    insert into public.tpk_login_log(ip) values (v_ip);
    delete from public.tpk_login_log where at < now() - interval '1 day';
    -- 8 wrong passwords in a row lock the account for 15 minutes (stops guessing)
    update public.tpk_accounts set fails = case when fails >= 7 then 0 else fails + 1 end,
      locked_until = case when fails >= 7 then now() + interval '15 minutes' else locked_until end where id = a.id;
    return jsonb_build_object('error', 'bad_login');
  end if;
  update public.tpk_accounts set fails = 0, locked_until = null where id = a.id;
  -- accounts made before this migration used a cheaper bcrypt (cost 8): upgrade them now that we know the password
  if substring(a.pass_hash from 5 for 2)::int < 10 then
    update public.tpk_accounts set pass_hash = extensions.crypt(p_password, extensions.gen_salt('bf', 10)) where id = a.id;
  end if;
  return jsonb_build_object('token', public.tpk_new_session(a.id), 'username', a.username, 'rev', a.rev, 'data', a.data);
end $$;

-- grants stay as they were (anon + authenticated may call the 5 public functions); re-assert them so a re-run is always consistent
revoke all on function public.tpk_signup(text, text, jsonb), public.tpk_login(text, text) from public;
grant execute on function public.tpk_signup(text, text, jsonb), public.tpk_login(text, text) to anon, authenticated;
revoke all on function public.tpk_new_session(uuid), public.tpk_account_for(text) from public, anon, authenticated;
