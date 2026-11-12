-- Checks for add_professor_space.sql (run by tools/test-professor-sql.sh on a local throwaway database).
\set ON_ERROR_STOP 1
create or replace function pg_temp.fails(sql text, want text) returns void language plpgsql as $$
begin
  begin execute sql; exception when others then
    if sqlerrm like '%' || want || '%' then return; end if;
    raise exception 'expected error "%", got "%" for: %', want, sqlerrm, sql;
  end;
  raise exception 'expected error "%", but it worked: %', want, sql;
end $$;
create or replace function pg_temp.ok(cond boolean, label text) returns void language plpgsql as $$ begin if cond is not true then raise exception 'CHECK FAILED: %', label; end if; end $$;

-- four accounts: a listed professor, a student of the same school, a professor of another school, someone without a school email
insert into public.schools(id, name) values ('other', 'Other School');
insert into public.esade_domains(domain, note, school) values ('other.edu', 'test', 'other');
insert into public.school_staff(school, email) values ('esade', 'prof@esade.edu'), ('other', 'prof@other.edu');
do $$
declare r record; t text;
begin
  create temp table tok(who text primary key, token text, account uuid);
  for r in select * from (values ('prof', 'prof@esade.edu'), ('student', 'student@alumni.esade.edu'), ('otherprof', 'prof@other.edu'), ('nobody', null)) v(who, email) loop
    with a as (insert into public.tpk_accounts(username, uname_key, pass_hash, esade_email) values (r.who, r.who, 'x', r.email) returning id)
    insert into tok select r.who, public.tpk_new_session(a.id), a.id from a;
  end loop;
end $$;
select pg_temp.ok(public.school_for_email('x@alumni.esade.edu') = 'esade' and public.school_for_email('x@other.edu') = 'other' and public.school_for_email('x@gmail.com') is null, 'school from email domain');

-- roles
select pg_temp.ok((public.prof_me((select token from tok where who = 'prof')))->>'role' = 'professor', 'professor recognised');
select pg_temp.fails(format('select public.prof_me(%L)', (select token from tok where who = 'student')), 'not_professor');    -- a school email alone is not enough
select pg_temp.fails(format('select public.prof_me(%L)', (select token from tok where who = 'nobody')), 'not_professor');
select pg_temp.fails('select public.prof_me(''wrong-token'')', 'bad_token');

-- a course: create, save a kit with log entries, the forged author and time are ignored
create temp table c as select (public.prof_course_create((select token from tok where who = 'prof'), 'Accounting II', 'BBA 2', 'en'))->>'id' as id;
select pg_temp.ok((select state from public.courses where id = (select id::uuid from c)) = 'draft', 'starts as draft');
select public.prof_course_save((select token from tok where who = 'prof'), (select id::uuid from c),
  '{"kit":{"v":1,"chapters":[{"n":1,"name":"One"}],"items":[{"id":"a1","type":"mcq","s":1,"q":"Q1","o":["r","w1","w2","w3"],"status":"approved"},{"id":"a2","type":"tf","s":1,"q":"Q2","v":true,"status":"pending_review"}]},"enrolled":40}'::jsonb,
  '[{"action":"import","detail":"2 items"},{"action":"approve","item":"a1","by":"someone.else@esade.edu","at":"2001-01-01"},{"action":"publish"},{"action":"drop table"}]'::jsonb) \gset x_
select pg_temp.ok((select state from public.courses where id = (select id::uuid from c)) = 'in_review', 'kit saved -> in review');
select pg_temp.ok((select count(*) from public.course_audit where action in ('import', 'approve')) = 2 and (select count(*) from public.course_audit where action not in ('create', 'import', 'approve')) = 0, 'only real review actions are logged from the browser');
select pg_temp.ok((select bool_and(by_email = 'prof@esade.edu' and at > now() - interval '1 minute') from public.course_audit), 'author and time come from the server');

-- nobody else can read or change it
select pg_temp.fails(format('select public.prof_course_get(%L, %L)', (select token from tok where who = 'otherprof'), (select id from c)), 'not_found');
select pg_temp.fails(format('select public.prof_course_get(%L, %L)', (select token from tok where who = 'student'), (select id from c)), 'not_professor');
select pg_temp.ok(jsonb_array_length(public.prof_courses((select token from tok where who = 'otherprof'))) = 0, 'other school sees no course');

-- publishing: an item that is not approved cannot be published
select pg_temp.fails(format('select public.prof_course_state(%L, %L, ''published'', ''{"keys":{"m0":"a1","m1":"a2"},"facts":[]}''::jsonb)', (select token from tok where who = 'prof'), (select id from c)), 'not_approved');
select pg_temp.fails(format('select public.prof_course_state(%L, %L, ''published'', ''{"keys":{},"facts":[]}''::jsonb)', (select token from tok where who = 'prof'), (select id from c)), 'nothing_approved');
select pg_temp.ok((public.course_open((select id::uuid from c), (select token from tok where who = 'student')))->>'none' = 'true', 'not published -> students get nothing');
select public.prof_course_state((select token from tok where who = 'prof'), (select id::uuid from c), 'published', '{"keys":{"m0":"a1"},"facts":[],"mcq":[{"s":1,"q":"Q1","o":["r","w1","w2","w3"]}]}'::jsonb) \gset y_
select pg_temp.ok((select code ~ '^[A-Z0-9]{6}$' and state = 'published' from public.courses where id = (select id::uuid from c)), 'published with a 6-character code');

-- students: by code, then only a verified email of the same school
select pg_temp.ok(public.course_by_code((select lower(code) from public.courses limit 1)) = (select id::uuid from c), 'found by code');
select pg_temp.ok((public.course_open((select id::uuid from c), null))->>'denied' = 'login', 'no account -> sign in');
select pg_temp.ok((public.course_open((select id::uuid from c), (select token from tok where who = 'nobody')))->>'denied' = 'school', 'no school email -> refused');
select pg_temp.ok((public.course_open((select id::uuid from c), (select token from tok where who = 'otherprof')))->>'denied' = 'school', 'other school -> refused');
select pg_temp.ok((public.course_open((select id::uuid from c), (select token from tok where who = 'student')))->'bank'->'keys'->>'m0' = 'a1', 'student of the school gets the published items');
select pg_temp.ok(not (public.course_open((select id::uuid from c), (select token from tok where who = 'student')))::text like '%Q2%', 'the unapproved item is not sent');

-- the tables themselves are closed to the public API roles
set role anon;
select pg_temp.fails('select count(*) from public.courses', 'permission denied');
select pg_temp.fails('select count(*) from public.course_audit', 'permission denied');
select pg_temp.fails('select count(*) from public.school_staff', 'permission denied');
select pg_temp.fails('select public.prof_ctx(''x'')', 'permission denied');
select pg_temp.fails('select public.school_for_email(''x@esade.edu'')', 'permission denied');
insert into public.course_survey(course, player, score) values ('x', 'player-0001', 5);
select pg_temp.fails('select count(*) from public.course_survey', 'permission denied');
reset role;

-- statistics: nothing about students below 5 different students, everything from 5
insert into public.play_stats(quiz, game, player, mode, n, correct, qs, w) select (select id from c), 'g' || i, 'player-000' || i, 'solo', 1, 0, '{"m0":0}', '{"m0":2}' from generate_series(1, 4) i;
insert into public.question_reports(quiz, q, reason, player) values ((select id from c), 'm0', 'wrong', 'player-0001');
select pg_temp.ok((public.prof_course_stats((select token from tok where who = 'prof'), (select id::uuid from c))) @> '{"hidden":true,"students":4}' and not (public.prof_course_stats((select token from tok where who = 'prof'), (select id::uuid from c))) ? 'rows', '4 students -> hidden');
insert into public.play_stats(quiz, game, player, mode, n, correct, qs) values ((select id from c), 'g5', 'player-0005', 'solo', 1, 1, '{"m0":1}');
select pg_temp.ok(jsonb_array_length((public.prof_course_stats((select token from tok where who = 'prof'), (select id::uuid from c)))->'rows') = 5, '5 students -> rows');
select pg_temp.ok((public.prof_course_stats((select token from tok where who = 'prof'), (select id::uuid from c)))->'reports'->0->>'item' = 'a1', 'a report is linked to its item');
select pg_temp.fails(format('select public.prof_course_stats(%L, %L)', (select token from tok where who = 'otherprof'), (select id from c)), 'not_found');
select public.prof_report_set((select token from tok where who = 'prof'), (select id::uuid from c), (select id from public.question_reports limit 1), 'fixed');
select pg_temp.ok((select status from public.question_reports limit 1) = 'fixed', 'report closed');

-- unpublish: students lose access at once
select public.prof_course_state((select token from tok where who = 'prof'), (select id::uuid from c), 'in_review') \gset z_
select pg_temp.ok((public.course_open((select id::uuid from c), (select token from tok where who = 'student')))->>'none' = 'true' and public.course_by_code((select code from public.courses limit 1)) is null, 'unpublished -> closed');
select pg_temp.ok((select string_agg(action, ',' order by id) from public.course_audit) = 'create,import,approve,publish,report_fixed,unpublish', 'the log tells the whole story in order');
