-- "Report this question": students flag a question that looks wrong or ambiguous.
-- The site may add rows; nobody can read them through the API (look at them in the Supabase table editor).
create table if not exists public.question_reports (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  quiz text not null check (length(quiz) between 1 and 64),
  q text not null check (q ~ '^[mt][0-9]{1,5}$'),        -- question key: m<id> (multiple choice / true-false) or t<id> (typed)
  reason text not null default 'wrong' check (reason in ('wrong','ambiguous','typo','other')),
  note text check (note is null or length(note) <= 300),
  player text check (player is null or length(player) <= 64)
);
create index if not exists question_reports_quiz_idx on public.question_reports (quiz, q);
alter table public.question_reports enable row level security;
drop policy if exists question_reports_insert on public.question_reports;
create policy question_reports_insert on public.question_reports for insert to anon, authenticated with check (created_at > now() - interval '1 minute');
