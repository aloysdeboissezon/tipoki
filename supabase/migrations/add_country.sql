-- Optional country (flag next to the player's name). Run once in Supabase > SQL Editor; safe to run again.
-- The site keeps working without it (no flags), so it can be applied before or after the new version goes live.
alter table public.players add column if not exists country text check (country is null or country ~ '^[A-Z]{2}$');
grant update (nick, ans, avatar, country) on public.players to anon, authenticated;   -- same list as harden_security.sql + country
alter table public.tpk_league_players add column if not exists country text check (country is null or country ~ '^[A-Z]{2}$');

-- the league function gets a 4th argument; the old 3-argument version is removed so the call is not ambiguous
drop function if exists public.tpk_league_sync(text, text, int);
-- adds XP (0 to just look), returns the player's league, rank, the board and last week's result
create or replace function public.tpk_league_sync(p_pid text, p_nick text, p_xp int, p_country text default null) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  cur text; r tpk_league_players; add int := least(greatest(coalesce(p_xp, 0), 0), 600);
  nm text := left(btrim(coalesce(p_nick, '')), 24); cc text := case when p_country ~ '^[A-Z]{2}$' then p_country else null end; rk int; n int; kk int; board jsonb;
begin
  if p_pid is null or p_pid !~ '^[A-Za-z0-9_-]{6,40}$' then raise exception 'bad id'; end if;
  if nm = '' then nm := 'Player'; end if;
  cur := tpk_league_roll();
  insert into tpk_league_players (pid, nick, country, week, xp, total_xp) values (p_pid, nm, cc, cur, add, add)
  on conflict (pid) do update set nick = excluded.nick, country = excluded.country,
    xp = least(tpk_league_players.xp + add, 100000), total_xp = tpk_league_players.total_xp + add,
    updated_at = case when add > 0 then now() else tpk_league_players.updated_at end;
  select * into r from tpk_league_players where pid = p_pid;
  select count(*) into n from tpk_league_players where league = r.league and week = cur and xp > 0;
  select count(*) + 1 into rk from tpk_league_players
    where league = r.league and week = cur and xp > 0 and (xp > r.xp or (xp = r.xp and updated_at < r.updated_at));
  kk := case when n >= 3 then least(5, greatest(1, n / 5)) else 0 end;
  select coalesce(jsonb_agg(jsonb_build_object('nick', t.nick, 'country', t.country, 'xp', t.xp, 'me', t.pid = p_pid) order by t.xp desc, t.updated_at), '[]'::jsonb)
    into board from (select * from tpk_league_players where league = r.league and week = cur and xp > 0
                     order by xp desc, updated_at limit 30) t;
  return jsonb_build_object(
    'week', cur,
    'ends_at', (date_trunc('week', now() at time zone 'Europe/Paris') + interval '7 days') at time zone 'Europe/Paris',
    'league', r.league, 'xp', r.xp, 'rank', case when r.xp > 0 then rk else null end, 'n', n, 'up', kk,
    'down', case when n >= 5 and r.league > 0 then kk else 0 end,
    'board', board,
    'last', case when r.last_week is not null and r.last_week <> cur
                 then jsonb_build_object('week', r.last_week, 'from', r.last_from, 'to', r.last_to, 'rank', r.last_rank, 'n', r.last_n, 'xp', r.last_xp)
                 else null end);
end $$;
grant execute on function public.tpk_league_sync(text, text, int, text) to anon, authenticated;
