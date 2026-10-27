-- Anonymous play stats, so a teacher can see how a quiz is used (pilot).
-- One row per finished game per device. No name, no photo, no IP: `player` is a random id kept only
-- in the browser for this purpose (never the multiplayer pid), hashed with the quiz id.
create table if not exists public.play_stats (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  quiz text not null check (length(quiz) between 1 and 64),
  game text not null check (length(game) between 1 and 64),        -- same value for every device of one multiplayer game
  player text not null check (length(player) between 8 and 64),
  mode text not null check (mode in ('solo','multi','review')),
  n int not null check (n between 1 and 1000),                     -- questions in the game
  correct int not null check (correct between 0 and n),
  qs jsonb not null check (jsonb_typeof(qs) = 'object' and length(qs::text) <= 20000)   -- {"m12":1,"t3":0}: question key -> right (1) or wrong / no answer (0)
);
create index if not exists play_stats_quiz_idx on public.play_stats (quiz, created_at);
alter table public.play_stats enable row level security;
-- the site may add rows, nobody can read them through the API: reading goes through quiz_stats() below
drop policy if exists play_stats_insert on public.play_stats;
create policy play_stats_insert on public.play_stats for insert to anon, authenticated with check (created_at > now() - interval '1 minute');

-- One access code per quiz, given to the teacher. Not readable through the API (RLS on, no policy).
-- Add one with: insert into public.stats_keys (quiz, code) values ('socio', 'xxxxxxxxxx');
create table if not exists public.stats_keys (
  quiz text primary key,
  code text not null check (length(code) >= 8),
  label text,
  created_at timestamptz not null default now()
);
alter table public.stats_keys enable row level security;

-- Aggregates for one quiz, only with its code. Returns null when the code is wrong.
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
    'modes',   (select coalesce(jsonb_object_agg(mode, c),'{}') from (select mode, count(distinct game) c from play_stats where quiz = p_quiz group by mode) m),
    'days',    (select coalesce(jsonb_agg(jsonb_build_array(d, g, p) order by d),'[]') from (
                  select to_char(created_at at time zone 'Europe/Paris','YYYY-MM-DD') d, count(distinct game) g, count(distinct player) p
                  from play_stats where quiz = p_quiz and created_at > now() - interval '30 days' group by 1) x),
    'qs',      (select coalesce(jsonb_agg(jsonb_build_array(k, t, w)),'[]') from (
                  select e.key k, count(*) t, count(*) filter (where e.value::int = 0) w
                  from play_stats s, jsonb_each_text(s.qs) e where s.quiz = p_quiz group by e.key) q)
  ) into r;
  return r;
end $$;
revoke all on function public.quiz_stats(text, text) from public;
grant execute on function public.quiz_stats(text, text) to anon, authenticated;
