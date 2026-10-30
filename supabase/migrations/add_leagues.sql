-- Weekly leagues (Bronze -> Diamond), like Duolingo: everyone earns XP by answering, the week ends on Monday 00:00 (Paris),
-- the top of each league moves up, the bottom moves down. No login needed: a league id kept in the browser identifies the player.
-- XP is sent by the site (capped per call and per week); the tables are closed to the API, everything goes through tpk_league_sync().
create table if not exists public.tpk_league_meta (
  id int primary key default 1 check (id = 1),
  week text not null default ''
);
insert into public.tpk_league_meta (id, week) values (1, '') on conflict do nothing;

create table if not exists public.tpk_league_players (
  pid text primary key check (pid ~ '^[A-Za-z0-9_-]{6,40}$'),
  nick text not null check (length(nick) between 1 and 24),
  league int not null default 0 check (league between 0 and 6),     -- 0 Bronze, 1 Silver, 2 Gold, 3 Platinum, 4 Emerald, 5 Ruby, 6 Diamond
  week text not null,                                                  -- ISO week of `xp`, e.g. 2026-W44
  xp int not null default 0 check (xp between 0 and 100000),
  total_xp bigint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- result of the week that just ended (shown once to the player)
  last_week text, last_from int, last_to int, last_rank int, last_n int, last_xp int
);
create index if not exists tpk_league_board_idx on public.tpk_league_players (league, week, xp desc);
alter table public.tpk_league_players enable row level security;
alter table public.tpk_league_meta enable row level security;

-- closes the previous week the first time anyone calls the site in a new week (one transaction, serialised by the meta row lock)
create or replace function public.tpk_league_roll() returns text
language plpgsql security definer set search_path = public as $$
declare cur text := to_char(now() at time zone 'Europe/Paris', 'IYYY-"W"IW'); old text;
begin
  select week into old from tpk_league_meta where id = 1 for update;
  if old = cur then return cur; end if;
  if old <> '' then
    -- players who earned XP: top fifth (1 to 5) moves up, bottom fifth moves down (needs 5+ players in the league)
    with ranked as (
      select pid, league, xp,
             rank() over (partition by league order by xp desc, updated_at) rk,
             count(*) over (partition by league) n
      from tpk_league_players where week = old and xp > 0
    ), moved as (
      select pid, league, xp, rk, n,
             case when n >= 3 then least(5, greatest(1, n / 5)) else 0 end as kk
      from ranked
    )
    update tpk_league_players p set
      last_week = old, last_from = m.league, last_rank = m.rk, last_n = m.n, last_xp = m.xp,
      last_to = case when m.rk <= m.kk and m.league < 6 then m.league + 1
                     when m.n >= 5 and m.rk > m.n - m.kk and m.league > 0 then m.league - 1
                     else m.league end,
      league = case when m.rk <= m.kk and m.league < 6 then m.league + 1
                    when m.n >= 5 and m.rk > m.n - m.kk and m.league > 0 then m.league - 1
                    else m.league end
    from moved m where p.pid = m.pid;
    -- played last week but earned nothing: down one league
    update tpk_league_players set last_week = old, last_from = league, last_to = greatest(league - 1, 0),
      last_rank = null, last_n = null, last_xp = 0, league = greatest(league - 1, 0)
    where week = old and xp = 0 and league > 0;
    update tpk_league_players set xp = 0, week = cur where week <> cur;
  end if;
  update tpk_league_meta set week = cur where id = 1;
  return cur;
end $$;
revoke all on function public.tpk_league_roll() from public, anon, authenticated;

-- adds XP (0 to just look), returns the player's league, rank, the board and last week's result
create or replace function public.tpk_league_sync(p_pid text, p_nick text, p_xp int) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  cur text; r tpk_league_players; add int := least(greatest(coalesce(p_xp, 0), 0), 600);
  nm text := left(btrim(coalesce(p_nick, '')), 24); rk int; n int; kk int; board jsonb;
begin
  if p_pid is null or p_pid !~ '^[A-Za-z0-9_-]{6,40}$' then raise exception 'bad id'; end if;
  if nm = '' then nm := 'Player'; end if;
  cur := tpk_league_roll();
  insert into tpk_league_players (pid, nick, week, xp, total_xp) values (p_pid, nm, cur, add, add)
  on conflict (pid) do update set nick = excluded.nick,
    xp = least(tpk_league_players.xp + add, 100000), total_xp = tpk_league_players.total_xp + add,
    updated_at = case when add > 0 then now() else tpk_league_players.updated_at end;
  select * into r from tpk_league_players where pid = p_pid;
  select count(*) into n from tpk_league_players where league = r.league and week = cur and xp > 0;
  select count(*) + 1 into rk from tpk_league_players
    where league = r.league and week = cur and xp > 0 and (xp > r.xp or (xp = r.xp and updated_at < r.updated_at));
  kk := case when n >= 3 then least(5, greatest(1, n / 5)) else 0 end;
  select coalesce(jsonb_agg(jsonb_build_object('nick', t.nick, 'xp', t.xp, 'me', t.pid = p_pid) order by t.xp desc, t.updated_at), '[]'::jsonb)
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
grant execute on function public.tpk_league_sync(text, text, int) to anon, authenticated;
