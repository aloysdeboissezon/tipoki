-- Study activity for the professor's Class insight: how long students spend, and on what (quiz, exam, flashcards, study sheet).
-- Anonymous like play_stats: `player` is the random id hashed per course, no name, no IP. Only courses send these rows.
-- Quizzes and exams already have their row in play_stats (count and accuracy); this table adds the TIME of every study session
-- (quiz / exam / cards / sheet) and the flashcard and sheet sessions, which have no play_stats row.
-- Run once in the Supabase SQL editor. Until then the site works as before: the extra insert is simply refused and ignored.
create table if not exists public.study_stats (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  quiz text not null check (length(quiz) between 1 and 64),
  player text not null check (length(player) between 8 and 64),
  kind text not null check (kind in ('quiz','exam','cards','sheet')),
  secs int not null check (secs between 1 and 7200),               -- active time of the session, capped by the site at 30 minutes
  n int not null default 0 check (n between 0 and 1000)             -- cards studied (cards); 0 for the others
);
create index if not exists study_stats_quiz_idx on public.study_stats (quiz, created_at);
alter table public.study_stats enable row level security;
drop policy if exists study_stats_insert on public.study_stats;
create policy study_stats_insert on public.study_stats for insert to anon, authenticated with check (created_at > now() - interval '1 minute');
revoke select, update, delete on public.study_stats from anon, authenticated;     -- insert only: reading goes through prof_course_stats()

create or replace function public.tpk_guard_study_stats() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  new.created_at := now();
  if (select count(*) from study_stats where player = new.player and created_at > now() - interval '1 hour') >= 200 then raise exception 'slow_down'; end if;
  if (select count(*) from study_stats where created_at > now() - interval '1 hour') >= 6000 then raise exception 'slow_down'; end if;
  return new;
end $$;
drop trigger if exists tpk_guard_study_stats on public.study_stats;
create trigger tpk_guard_study_stats before insert on public.study_stats for each row execute function public.tpk_guard_study_stats();

-- same function as in add_professor_space.sql, plus 'study' (one row per session). Still nothing about students below 5 different students.
create or replace function public.prof_course_stats(p_token text, p_id uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare c public.courses; n int; reports jsonb;
begin
  c := public.prof_course(p_token, p_id);
  select count(distinct player) into n from public.play_stats where quiz = c.id::text;
  reports := coalesce((select jsonb_agg(jsonb_build_object('id', r.id, 'key', r.q, 'item', c.keymaps->-1->'keys'->>r.q, 'reason', r.reason, 'status', r.status, 'at', r.created_at) order by r.id)
                       from public.question_reports r where r.quiz = c.id::text), '[]'::jsonb);
  if n < 5 then return jsonb_build_object('hidden', true, 'students', n, 'reports', reports, 'keymaps', c.keymaps); end if;
  return jsonb_build_object('hidden', false, 'students', n, 'keymaps', c.keymaps, 'reports', reports,
    'rows', coalesce((select jsonb_agg(jsonb_build_object('player', s.player, 'at', s.created_at, 'game', s.game, 'mode', s.mode, 'n', s.n, 'correct', s.correct, 'qs', s.qs, 'w', coalesce(s.w, '{}'::jsonb)) order by s.created_at)
                      from (select * from public.play_stats where quiz = c.id::text order by created_at desc limit 20000) s), '[]'::jsonb),
    'study', coalesce((select jsonb_agg(jsonb_build_object('player', t.player, 'at', t.created_at, 'kind', t.kind, 'secs', t.secs, 'n', t.n) order by t.created_at)
                       from (select * from public.study_stats where quiz = c.id::text order by created_at desc limit 20000) t), '[]'::jsonb),
    'survey', coalesce((select jsonb_agg(v.score) from public.course_survey v where v.course = c.id::text), '[]'::jsonb));
end $$;
