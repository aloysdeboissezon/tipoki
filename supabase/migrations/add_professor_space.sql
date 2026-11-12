-- Professor space: schools, professor roles, courses with their study kit, approval log, class statistics.
-- À lancer dans l'éditeur SQL Supabase (une seule fois, après add_esade_access.sql). Peut être relancé sans risque.
-- Tested on a local Postgres with tools/test-professor-sql.sh.
--
-- How it works:
--   * A school is a row in `schools`; its email domains are the rows of `esade_domains` (the table keeps its name, it now has a `school` column).
--     A second school is two inserts, not a new version of the site.
--   * Being a professor is NOT decided by the email domain (students have the same one): the address must be listed in `school_staff`.
--   * Every table below is closed to the API (RLS on, no policy). The site only calls the functions, and each one checks the caller again.
--   * The account token is the one the site already uses (tpk_account_for). The verified school email of an account is tpk_accounts.esade_email
--     (historic name: it holds the verified email of any listed school).

-- ---------- 1. schools and their staff ----------
create table if not exists public.schools (
  id text primary key check (id ~ '^[a-z0-9-]{2,30}$'),
  name text not null,
  created_at timestamptz not null default now()
);
alter table public.schools enable row level security;
revoke all on public.schools from anon, authenticated;
insert into public.schools(id, name) values ('esade', 'ESADE') on conflict (id) do nothing;

alter table public.esade_domains add column if not exists school text not null default 'esade' references public.schools(id);

create table if not exists public.school_staff (
  school text not null references public.schools(id) on delete cascade,
  email text not null check (email = lower(btrim(email)) and email ~ '^[^@[:space:]]+@[^@[:space:]]+$'),
  role text not null default 'professor' check (role in ('professor', 'admin')),
  added_at timestamptz not null default now(),
  primary key (school, email)
);
alter table public.school_staff enable row level security;
revoke all on public.school_staff from anon, authenticated;
-- Add a professor (run by hand):  insert into public.school_staff(school, email) values ('esade', 'first.last@esade.edu');
-- Add a school:                   insert into public.schools(id, name) values ('iese', 'IESE'); insert into public.esade_domains(domain, note, school) values ('iese.edu', 'IESE', 'iese');

create or replace function public.school_for_email(p_email text) returns text
language sql stable security definer set search_path = '' as $$
  select d.school from public.esade_domains d
  where split_part(lower(btrim(coalesce(p_email, ''))), '@', 2) = d.domain
     or right(split_part(lower(btrim(coalesce(p_email, ''))), '@', 2), length(d.domain) + 1) = '.' || d.domain
  order by length(d.domain) desc limit 1
$$;
revoke all on function public.school_for_email(text) from public, anon, authenticated;

-- ---------- 2. courses ----------
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  school text not null references public.schools(id),
  owner uuid not null references public.tpk_accounts(id),
  owner_email text not null,
  title text not null check (length(title) between 1 and 120),
  subject text not null default '' check (length(subject) <= 160),
  lang text not null default 'en' check (lang ~ '^[a-z]{2,5}$'),
  state text not null default 'draft' check (state in ('draft', 'generating', 'in_review', 'published', 'archived')),
  code text unique check (code ~ '^[A-Z0-9]{6}$'),
  enrolled int check (enrolled between 1 and 100000),
  kit jsonb not null default '{"v":1,"chapters":[],"items":[]}'::jsonb check (octet_length(kit::text) <= 3000000),
  sources jsonb not null default '{}'::jsonb check (octet_length(sources::text) <= 2500000),     -- the TEXT of the course files, page by page (the files themselves are not stored)
  published jsonb check (octet_length(published::text) <= 3000000),                             -- what students play: approved items only, frozen at publication
  keymaps jsonb not null default '[]'::jsonb,                                                     -- one entry per publication: which game key ("m3") was which item
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists courses_owner on public.courses(owner);
alter table public.courses enable row level security;
revoke all on public.courses from anon, authenticated;

-- who did what, and when. Rows are only ever added, by the functions below; the time and the author come from the server, not from the browser.
create table if not exists public.course_audit (
  id bigint generated always as identity primary key,
  course uuid not null references public.courses(id) on delete cascade,
  at timestamptz not null default now(),
  by_email text not null,
  action text not null check (action in ('create','upload','remove_file','import','generate','approve','reject','reopen','edit','delete','approve_topic','publish','unpublish','archive','enrolled','report_fixed','report_dismissed')),
  item text check (length(item) <= 60),
  detail text check (length(detail) <= 4000)
);
create index if not exists course_audit_course on public.course_audit(course, id);
alter table public.course_audit enable row level security;
revoke all on public.course_audit from anon, authenticated;

-- ---------- 3. what students send for a course ----------
alter table public.play_stats add column if not exists w jsonb check (w is null or (jsonb_typeof(w) = 'object' and length(w::text) <= 20000));   -- wrong option picked, per question
alter table public.question_reports add column if not exists status text not null default 'open' check (status in ('open', 'fixed', 'dismissed'));

-- one-question survey after a game ("Did this help you revise?" 1 to 5), one answer per device and course, anonymous like play_stats
create table if not exists public.course_survey (
  course text not null check (length(course) between 1 and 64),
  player text not null check (length(player) between 8 and 64),
  score int not null check (score between 1 and 5),
  created_at timestamptz not null default now(),
  primary key (course, player)
);
alter table public.course_survey enable row level security;
revoke all on public.course_survey from anon, authenticated;
grant insert on public.course_survey to anon, authenticated;
drop policy if exists course_survey_insert on public.course_survey;
create policy course_survey_insert on public.course_survey for insert to anon, authenticated with check (created_at > now() - interval '1 minute');

-- ---------- 4. the caller: account, verified school email, role ----------
create or replace function public.prof_ctx(p_token text, out account uuid, out email text, out school text, out role text)
language plpgsql security definer set search_path = '' as $$
declare a public.tpk_accounts;
begin
  a := public.tpk_account_for(p_token);                      -- raises bad_token
  if a.esade_email is null then raise exception 'not_professor'; end if;
  account := a.id; email := a.esade_email; school := public.school_for_email(a.esade_email);
  select s.role into role from public.school_staff s where s.school = prof_ctx.school and s.email = a.esade_email;
  if role is null then raise exception 'not_professor'; end if;
end $$;
revoke all on function public.prof_ctx(text) from public, anon, authenticated;

-- a course the caller may manage: their own, or any course of their school for a school admin
create or replace function public.prof_course(p_token text, p_id uuid) returns public.courses
language plpgsql security definer set search_path = '' as $$
declare c public.courses; x record;
begin
  x := public.prof_ctx(p_token);
  select * into c from public.courses where id = p_id and school = x.school and (owner = x.account or x.role = 'admin');
  if not found then raise exception 'not_found'; end if;
  return c;
end $$;
revoke all on function public.prof_course(text, uuid) from public, anon, authenticated;

create or replace function public.prof_me(p_token text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare x record;
begin
  x := public.prof_ctx(p_token);
  return jsonb_build_object('email', x.email, 'role', x.role, 'school', (select jsonb_build_object('id', s.id, 'name', s.name) from public.schools s where s.id = x.school));
end $$;

create or replace function public.prof_courses(p_token text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare x record;
begin
  x := public.prof_ctx(p_token);
  return coalesce((select jsonb_agg(jsonb_build_object('id', c.id, 'title', c.title, 'subject', c.subject, 'state', c.state, 'code', c.code, 'updated', c.updated_at,
      'items', jsonb_array_length(c.kit->'items'),
      'approved', (select count(*) from jsonb_array_elements(c.kit->'items') i where i->>'status' = 'approved')) order by c.updated_at desc)
    from public.courses c where c.school = x.school and (c.owner = x.account or x.role = 'admin') and c.state <> 'archived'), '[]'::jsonb);
end $$;

create or replace function public.prof_course_json(c public.courses) returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object('id', c.id, 'title', c.title, 'subject', c.subject, 'lang', c.lang, 'state', c.state, 'code', c.code, 'enrolled', c.enrolled,
    'kit', c.kit, 'sources', c.sources, 'published', c.published, 'keymaps', c.keymaps, 'updated', c.updated_at,
    'audit', coalesce((select jsonb_agg(jsonb_build_object('at', a.at, 'by', a.by_email, 'action', a.action, 'item', a.item, 'detail', a.detail) order by a.id)
                       from (select * from public.course_audit where course = c.id order by id desc limit 2000) a), '[]'::jsonb))
$$;
revoke all on function public.prof_course_json(public.courses) from public, anon, authenticated;

create or replace function public.prof_course_create(p_token text, p_title text, p_subject text default '', p_lang text default 'en') returns jsonb
language plpgsql security definer set search_path = '' as $$
declare x record; c public.courses;
begin
  x := public.prof_ctx(p_token);
  if (select count(*) from public.courses where owner = x.account and created_at > now() - interval '1 day') >= 30 then raise exception 'slow_down'; end if;
  insert into public.courses(school, owner, owner_email, title, subject, lang, kit)
    values (x.school, x.account, x.email, left(btrim(p_title), 120), left(btrim(coalesce(p_subject, '')), 160), lower(left(coalesce(nullif(btrim(p_lang), ''), 'en'), 5)),
            jsonb_build_object('v', 1, 'title', left(btrim(p_title), 120), 'subject', left(btrim(coalesce(p_subject, '')), 160), 'lang', lower(left(coalesce(nullif(btrim(p_lang), ''), 'en'), 5)), 'chapters', '[]'::jsonb, 'items', '[]'::jsonb))
    returning * into c;
  insert into public.course_audit(course, by_email, action, detail) values (c.id, x.email, 'create', c.title);
  return public.prof_course_json(c);
end $$;

create or replace function public.prof_course_get(p_token text, p_id uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
begin
  return public.prof_course_json(public.prof_course(p_token, p_id));
end $$;

-- save the kit / material / title, and add the log entries of what was just done (the server writes the time and the author)
create or replace function public.prof_course_save(p_token text, p_id uuid, p_patch jsonb, p_audit jsonb default '[]'::jsonb) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare x record; c public.courses; e jsonb;
begin
  x := public.prof_ctx(p_token);
  c := public.prof_course(p_token, p_id);
  if p_patch ? 'kit' and (jsonb_typeof(p_patch->'kit') <> 'object' or jsonb_typeof(p_patch->'kit'->'items') <> 'array' or jsonb_array_length(p_patch->'kit'->'items') > 5000) then raise exception 'bad_kit'; end if;
  if p_patch ? 'sources' and jsonb_typeof(p_patch->'sources') <> 'object' then raise exception 'bad_sources'; end if;
  update public.courses set
    title = case when p_patch ? 'title' and btrim(p_patch->>'title') <> '' then left(btrim(p_patch->>'title'), 120) else title end,
    subject = case when p_patch ? 'subject' then left(coalesce(p_patch->>'subject', ''), 160) else subject end,
    lang = case when p_patch->>'lang' ~ '^[a-z]{2,5}$' then p_patch->>'lang' else lang end,
    enrolled = case when p_patch ? 'enrolled' then nullif(greatest(0, least(100000, coalesce((p_patch->>'enrolled')::int, 0))), 0) else enrolled end,
    kit = case when p_patch ? 'kit' then p_patch->'kit' else kit end,
    sources = case when p_patch ? 'sources' then p_patch->'sources' else sources end,
    state = case when state = 'draft' and p_patch ? 'kit' and jsonb_array_length(p_patch->'kit'->'items') > 0 then 'in_review' else state end,
    updated_at = now()
  where id = c.id returning * into c;
  if jsonb_typeof(p_audit) = 'array' then
    for e in select * from jsonb_array_elements(p_audit) limit 500 loop
      if e->>'action' in ('upload','remove_file','import','generate','approve','reject','reopen','edit','delete','approve_topic','enrolled') then
        insert into public.course_audit(course, by_email, action, item, detail) values (c.id, x.email, e->>'action', left(e->>'item', 60), left(e->>'detail', 4000));
      end if;
    end loop;
  end if;
  return public.prof_course_json(c);
end $$;

-- publish (p_bank = the approved items in the game's shape, built by js/kit/format.js), unpublish (back to in_review) or archive
create or replace function public.prof_course_state(p_token text, p_id uuid, p_state text, p_bank jsonb default null) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare x record; c public.courses; new_code text; n int;
begin
  x := public.prof_ctx(p_token);
  c := public.prof_course(p_token, p_id);
  if p_state = 'published' then
    if p_bank is null or jsonb_typeof(p_bank->'keys') <> 'object' then raise exception 'nothing_approved'; end if;
    n := (select count(*) from jsonb_object_keys(p_bank->'keys')) + coalesce(jsonb_array_length(p_bank->'facts'), 0);
    if n = 0 then raise exception 'nothing_approved'; end if;
    -- only items the kit marks as approved may be published
    if exists (select 1 from jsonb_each_text(p_bank->'keys') k where not exists (select 1 from jsonb_array_elements(c.kit->'items') i where i->>'id' = k.value and i->>'status' = 'approved')) then raise exception 'not_approved'; end if;
    new_code := c.code;
    while new_code is null loop
      new_code := (select string_agg(substr('ABCDEFGHJKMNPQRSTUVWXYZ23456789', 1 + (get_byte(extensions.gen_random_bytes(1), 0) % 31), 1), '') from generate_series(1, 6));
      if exists (select 1 from public.courses where code = new_code) then new_code := null; end if;
    end loop;
    update public.courses set state = 'published', published = p_bank, code = new_code, keymaps = keymaps || jsonb_build_array(jsonb_build_object('at', now(), 'keys', p_bank->'keys')), updated_at = now() where id = c.id returning * into c;
    insert into public.course_audit(course, by_email, action, detail) values (c.id, x.email, 'publish', n || ' items published');
  elsif p_state = 'in_review' then
    update public.courses set state = 'in_review', published = null, updated_at = now() where id = c.id returning * into c;
    insert into public.course_audit(course, by_email, action) values (c.id, x.email, 'unpublish');
  elsif p_state = 'archived' then
    update public.courses set state = 'archived', published = null, updated_at = now() where id = c.id returning * into c;
    insert into public.course_audit(course, by_email, action) values (c.id, x.email, 'archive');
  else raise exception 'bad_state';
  end if;
  return public.prof_course_json(c);
end $$;

-- class statistics of a course, for its professor. Below 5 different students nothing about students is returned (only their number).
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
    'survey', coalesce((select jsonb_agg(v.score) from public.course_survey v where v.course = c.id::text), '[]'::jsonb));
end $$;

create or replace function public.prof_report_set(p_token text, p_id uuid, p_report bigint, p_status text) returns void
language plpgsql security definer set search_path = '' as $$
declare x record; c public.courses; r public.question_reports;
begin
  x := public.prof_ctx(p_token);
  c := public.prof_course(p_token, p_id);
  if p_status not in ('fixed', 'dismissed') then raise exception 'bad_state'; end if;
  update public.question_reports set status = p_status where id = p_report and quiz = c.id::text returning * into r;
  if not found then raise exception 'not_found'; end if;
  insert into public.course_audit(course, by_email, action, item) values (c.id, x.email, 'report_' || p_status, left(c.keymaps->-1->'keys'->>r.q, 60));
end $$;

-- ---------- 5. students ----------
-- the course behind a code (published courses only). It only gives the id: opening the course is checked by course_open.
create or replace function public.course_by_code(p_code text) returns uuid
language sql stable security definer set search_path = '' as $$
  select id from public.courses where code = upper(btrim(coalesce(p_code, ''))) and state = 'published'
$$;

-- the published course, only for an account whose verified email belongs to the course's school
create or replace function public.course_open(p_id uuid, p_token text default null) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare c public.courses; a public.tpk_accounts;
begin
  select * into c from public.courses where id = p_id and state = 'published' and published is not null;
  if not found then return jsonb_build_object('none', true); end if;
  if p_token is null or p_token = '' then return jsonb_build_object('denied', 'login', 'school', c.school); end if;
  begin a := public.tpk_account_for(p_token); exception when others then return jsonb_build_object('denied', 'login', 'school', c.school); end;
  if a.esade_email is null or public.school_for_email(a.esade_email) is distinct from c.school then return jsonb_build_object('denied', 'school', 'school', c.school); end if;
  return jsonb_build_object('id', c.id, 'title', c.title, 'subject', c.subject, 'lang', c.lang, 'bank', c.published);
end $$;

revoke all on function public.prof_me(text), public.prof_courses(text), public.prof_course_create(text, text, text, text), public.prof_course_get(text, uuid),
  public.prof_course_save(text, uuid, jsonb, jsonb), public.prof_course_state(text, uuid, text, jsonb), public.prof_course_stats(text, uuid),
  public.prof_report_set(text, uuid, bigint, text), public.course_by_code(text), public.course_open(uuid, text) from public;
grant execute on function public.prof_me(text), public.prof_courses(text), public.prof_course_create(text, text, text, text), public.prof_course_get(text, uuid),
  public.prof_course_save(text, uuid, jsonb, jsonb), public.prof_course_state(text, uuid, text, jsonb), public.prof_course_stats(text, uuid),
  public.prof_report_set(text, uuid, bigint, text), public.course_by_code(text), public.course_open(uuid, text) to anon, authenticated;
