-- Anonymous usage analytics, step 2 (builds on add_play_stats.sql, run that one first).
-- Adds: game starts (to measure drop-off), the 'exam' mode, retention, and a site-wide overview with its own code.
-- Still no cookie, no name, no IP, no email: `player` stays a per-quiz hash of a random id kept on the device.

-- 1. Exams count as a mode
alter table public.play_stats drop constraint if exists play_stats_mode_check;
alter table public.play_stats add constraint play_stats_mode_check check (mode in ('solo','multi','review','exam'));

-- 2. One row per game started. A start with no matching play_stats row (same quiz, game, player) is an abandoned game.
create table if not exists public.play_starts (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  quiz text not null check (length(quiz) between 1 and 64),
  game text not null check (length(game) between 1 and 64),
  player text not null check (length(player) between 8 and 64),
  mode text not null check (mode in ('solo','multi','review','exam'))
);
create unique index if not exists play_starts_game_player on public.play_starts (game, player);   -- a replayed offline queue cannot double count
create index if not exists play_starts_quiz_idx on public.play_starts (quiz, created_at);
alter table public.play_starts enable row level security;
drop policy if exists play_starts_insert on public.play_starts;
create policy play_starts_insert on public.play_starts for insert to anon, authenticated with check (created_at > now() - interval '1 minute');
create index if not exists play_stats_player_idx on public.play_stats (quiz, player);

-- 3. Per-quiz dashboard (same name and arguments as before, with more fields)
create or replace function public.quiz_stats(p_quiz text, p_code text)
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare r jsonb;
begin
  if not exists (select 1 from stats_keys k where k.quiz = p_quiz and k.code = p_code) then return null; end if;
  select jsonb_build_object(
    'games',   (select count(distinct game) from play_stats where quiz = p_quiz),
    'players', (select count(distinct player) from play_stats where quiz = p_quiz),
    'rows',    (select count(*) from play_stats where quiz = p_quiz),
    'answers', (select coalesce(sum(n),0) from play_stats where quiz = p_quiz),
    'correct', (select coalesce(sum(correct),0) from play_stats where quiz = p_quiz),
    'since',   (select to_char(min(created_at) at time zone 'Europe/Paris','YYYY-MM-DD') from play_stats where quiz = p_quiz),
    'modes',   (select coalesce(jsonb_object_agg(mode, c),'{}') from (select mode, count(distinct game) c from play_stats where quiz = p_quiz group by mode) m),
    'days',    (select coalesce(jsonb_agg(jsonb_build_array(d, g, p) order by d),'[]') from (
                  select to_char(created_at at time zone 'Europe/Paris','YYYY-MM-DD') d, count(distinct game) g, count(distinct player) p
                  from play_stats where quiz = p_quiz and created_at > now() - interval '30 days' group by 1) x),
    'qs',      (select coalesce(jsonb_agg(jsonb_build_array(k, t, w)),'[]') from (
                  select e.key k, count(*) t, count(*) filter (where e.value::int = 0) w
                  from play_stats s, jsonb_each_text(s.qs) e where s.quiz = p_quiz group by e.key) q),
    'starts',    (select count(*) from play_starts where quiz = p_quiz),
    'abandoned', (select count(*) from play_starts s where s.quiz = p_quiz and not exists (
                    select 1 from play_stats p where p.quiz = s.quiz and p.game = s.game and p.player = s.player)),
    'returning', (select count(*) from (select player from play_stats where quiz = p_quiz
                    group by player having count(distinct (created_at at time zone 'Europe/Paris')::date) >= 2) x),
    'weeks',   (select coalesce(jsonb_agg(jsonb_build_array(w, p) order by w),'[]') from (
                  select to_char(date_trunc('week', created_at at time zone 'Europe/Paris'),'YYYY-MM-DD') w, count(distinct player) p
                  from play_stats where quiz = p_quiz and created_at > now() - interval '8 weeks' group by 1) x)
  ) into r;
  return r;
end $$;
revoke all on function public.quiz_stats(text, text) from public;
grant execute on function public.quiz_stats(text, text) to anon, authenticated;

-- 4. Site-wide overview, with its own code stored under the quiz name '*'.
-- Create the code with:  insert into public.stats_keys (quiz, code, label) values ('*', 'xxxxxxxxxxxx', 'overview');
-- "players" = devices counted once per quiz (the id is hashed with the quiz so nobody can be followed across quizzes).
create or replace function public.site_stats(p_code text)
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare r jsonb;
begin
  if not exists (select 1 from stats_keys k where k.quiz = '*' and k.code = p_code) then return null; end if;
  select jsonb_build_object(
    'games',   (select count(distinct game) from play_stats),
    'players', (select count(*) from (select distinct quiz, player from play_stats) x),
    'rows',    (select count(*) from play_stats),
    'answers', (select coalesce(sum(n),0) from play_stats),
    'correct', (select coalesce(sum(correct),0) from play_stats),
    'since',   (select to_char(min(created_at) at time zone 'Europe/Paris','YYYY-MM-DD') from play_stats),
    'modes',   (select coalesce(jsonb_object_agg(mode, c),'{}') from (select mode, count(distinct game) c from play_stats group by mode) m),
    'days',    (select coalesce(jsonb_agg(jsonb_build_array(d, g, p) order by d),'[]') from (
                  select to_char(created_at at time zone 'Europe/Paris','YYYY-MM-DD') d, count(distinct game) g, count(distinct (quiz, player)) p
                  from play_stats where created_at > now() - interval '30 days' group by 1) x),
    'starts',    (select count(*) from play_starts),
    'abandoned', (select count(*) from play_starts s where not exists (
                    select 1 from play_stats p where p.quiz = s.quiz and p.game = s.game and p.player = s.player)),
    'returning', (select count(*) from (select quiz, player from play_stats
                    group by quiz, player having count(distinct (created_at at time zone 'Europe/Paris')::date) >= 2) x),
    'weeks',   (select coalesce(jsonb_agg(jsonb_build_array(w, p) order by w),'[]') from (
                  select to_char(date_trunc('week', created_at at time zone 'Europe/Paris'),'YYYY-MM-DD') w, count(distinct (quiz, player)) p
                  from play_stats where created_at > now() - interval '8 weeks' group by 1) x),
    'quizzes', (select coalesce(jsonb_agg(jsonb_build_array(quiz, g, p, a, c, ret) order by g desc),'[]') from (
                  select s.quiz, count(distinct s.game) g, count(distinct s.player) p, sum(s.n) a, sum(s.correct) c,
                         (select count(*) from (select player from play_stats x where x.quiz = s.quiz
                            group by player having count(distinct (x.created_at at time zone 'Europe/Paris')::date) >= 2) y) ret
                  from play_stats s group by s.quiz) q)
  ) into r;
  return r;
end $$;
revoke all on function public.site_stats(text) from public;
grant execute on function public.site_stats(text) to anon, authenticated;
