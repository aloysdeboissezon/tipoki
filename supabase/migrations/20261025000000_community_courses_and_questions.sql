-- Courses created by students (no AI) and questions written by players, with votes.
-- Applied to the socio-trivia project on 2026-10-25.
alter table public.quizzes add column if not exists school text, add column if not exists community boolean not null default false;

create table public.community_questions(
  id bigint generated always as identity primary key,
  quiz_id text not null,
  s int not null default 1,
  kind text not null check (kind in ('mcq','tf')),
  q text not null,
  o jsonb,
  v boolean,
  e text not null default '',
  author_pid text not null,
  author_nick text not null default 'Joueur',
  hidden boolean not null default false,   -- moderation: hide, never delete (clients index questions by position)
  created_at timestamptz not null default now()
);
create index community_questions_quiz on public.community_questions(quiz_id, id);
create table public.question_votes(
  question_id bigint not null references public.community_questions(id) on delete cascade,
  pid text not null,
  v smallint not null check (v in (-1,1)),
  created_at timestamptz not null default now(),
  primary key(question_id, pid)
);
alter table public.community_questions enable row level security;
alter table public.question_votes enable row level security;
create policy "community questions read" on public.community_questions for select to anon, authenticated using (true);
create policy "question votes read" on public.question_votes for select to anon, authenticated using (true);

-- writes only go through these functions, which validate input
create or replace function public.create_course(p_title text, p_school text, p_chapters text[])
returns uuid language plpgsql security definer set search_path = public as $$
declare sess jsonb := '{}'::jsonb; i int := 0; c text; nid uuid;
begin
  p_title := btrim(coalesce(p_title,'')); p_school := btrim(coalesce(p_school,''));
  if length(p_title) < 3 or length(p_title) > 60 then raise exception 'title'; end if;
  if length(p_school) > 60 then raise exception 'school'; end if;
  foreach c in array coalesce(p_chapters, array[]::text[]) loop
    c := btrim(c);
    if c <> '' and i < 20 then i := i + 1; sess := sess || jsonb_build_object(i::text, left(c, 60)); end if;
  end loop;
  if i = 0 then sess := '{"1":"Tout le cours"}'::jsonb; end if;
  if (select count(*) from quizzes where community and created_at > now() - interval '1 hour') > 30 then raise exception 'rate'; end if;
  insert into quizzes(title, subject, school, lang, community, data)
  values (p_title, nullif(p_school,''), nullif(p_school,''), 'fr', true, jsonb_build_object('sess', sess, 'mcq', '[]'::jsonb, 'tf', '[]'::jsonb, 'typed', '[]'::jsonb, 'facts', '[]'::jsonb))
  returning id into nid;
  return nid;
end $$;

create or replace function public.add_question(p_quiz text, p_s int, p_kind text, p_q text, p_o text[], p_v boolean, p_e text, p_pid text, p_nick text)
returns bigint language plpgsql security definer set search_path = public as $$
declare nid bigint; x text;
begin
  p_q := btrim(coalesce(p_q,'')); p_e := btrim(coalesce(p_e,''));
  if p_quiz is null or length(p_quiz) > 40 then raise exception 'quiz'; end if;
  if p_quiz <> 'socio' and not exists (select 1 from quizzes where id::text = p_quiz) then raise exception 'quiz'; end if;
  if length(p_q) < 5 or length(p_q) > 300 or length(p_e) > 400 then raise exception 'text'; end if;
  if p_pid is null or length(p_pid) > 40 then raise exception 'pid'; end if;
  if p_kind = 'mcq' then
    if coalesce(array_length(p_o,1),0) <> 4 then raise exception 'options'; end if;
    foreach x in array p_o loop if length(btrim(coalesce(x,''))) < 1 or length(x) > 120 then raise exception 'options'; end if; end loop;
  elsif p_kind = 'tf' then
    if p_v is null then raise exception 'tf'; end if; p_o := null;
  else raise exception 'kind'; end if;
  if (select count(*) from community_questions where author_pid = p_pid and created_at > now() - interval '1 hour') >= 60 then raise exception 'rate'; end if;
  insert into community_questions(quiz_id, s, kind, q, o, v, e, author_pid, author_nick)
  values (p_quiz, greatest(1, least(coalesce(p_s,1), 99)), p_kind, p_q, case when p_o is null then null else to_jsonb(array(select btrim(y) from unnest(p_o) y)) end, case when p_kind='tf' then p_v end, p_e, p_pid, left(coalesce(nullif(btrim(p_nick),''),'Joueur'), 18))
  returning id into nid;
  return nid;
end $$;

create or replace function public.vote_question(p_id bigint, p_pid text, p_v smallint)
returns void language plpgsql security definer set search_path = public as $$
begin
  if p_pid is null or length(p_pid) > 40 then raise exception 'pid'; end if;
  if p_v = 0 then delete from question_votes where question_id = p_id and pid = p_pid; return; end if;
  if p_v not in (-1,1) then raise exception 'v'; end if;
  insert into question_votes(question_id, pid, v) values (p_id, p_pid, p_v)
  on conflict (question_id, pid) do update set v = excluded.v, created_at = now();
end $$;

revoke all on function public.create_course(text,text,text[]) from public;
revoke all on function public.add_question(text,int,text,text,text[],boolean,text,text,text) from public;
revoke all on function public.vote_question(bigint,text,smallint) from public;
grant execute on function public.create_course(text,text,text[]) to anon, authenticated;
grant execute on function public.add_question(text,int,text,text,text[],boolean,text,text,text) to anon, authenticated;
grant execute on function public.vote_question(bigint,text,smallint) to anon, authenticated;
