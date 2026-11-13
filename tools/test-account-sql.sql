-- Checks for account_security.sql (run by tools/test-account-sql.sh on a local throwaway database).
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

-- password rule
select pg_temp.fails($$select public.tpk_signup('alice', 'short7!', '{}')$$, 'bad_password');
select pg_temp.fails($$select public.tpk_signup('alice', 'password123', '{}')$$, 'bad_password');
select pg_temp.fails($$select public.tpk_signup('alice', 'Azertyuiop', '{}')$$, 'bad_password');
select pg_temp.fails($$select public.tpk_signup('alice', 'alice2026!', '{}')$$, 'bad_password');      -- contains the username
select pg_temp.fails($$select public.tpk_signup('alice', 'aaaaaaaaaa', '{}')$$, 'bad_password');
select pg_temp.ok(public.tpk_signup('alice', 'violet-tiles-42', '{}') ? 'token', 'a good password is accepted');
select pg_temp.ok((public.tpk_login('alice', 'violet-tiles-42'))->>'token' is not null, 'login with the new account');

-- delete my account
insert into auth.users(id, email) values ('00000000-0000-4000-8000-0000000000a1', 'bob@example.com');
do $$
declare t text; t2 text;
begin
  t := (public.tpk_signup('bob', 'river-stone-77', '{}'))->>'token';
  update public.tpk_accounts set auth_id = '00000000-0000-4000-8000-0000000000a1' where uname_key = 'bob';
  t2 := (public.tpk_login('bob', 'river-stone-77'))->>'token';
  perform pg_temp.ok((public.tpk_delete_account(t))->>'deleted' = 'true', 'delete returns deleted');
  perform pg_temp.ok(not exists (select 1 from public.tpk_accounts where uname_key = 'bob'), 'account row is gone');
  perform pg_temp.ok(not exists (select 1 from auth.users where email = 'bob@example.com'), 'linked email sign-in is gone');
  perform pg_temp.fails(format('select public.tpk_pull(%L)', t2), 'bad_token');                 -- every session is gone too
  perform pg_temp.fails(format('select public.tpk_delete_account(%L)', t), 'bad_token');
end $$;
select pg_temp.fails($$select public.tpk_delete_account('not-a-token')$$, 'bad_token');

-- a professor who owns a course cannot delete the account (the course belongs to the school)
insert into public.school_staff(school, email) values ('esade', 'prof@esade.edu');
do $$
declare t text;
begin
  t := (public.tpk_signup('carol', 'maple-cloud-31', '{}'))->>'token';
  update public.tpk_accounts set esade_email = 'prof@esade.edu' where uname_key = 'carol';
  perform public.prof_course_create(t, 'Accounting II', 'Consolidation', 'en');
  perform pg_temp.fails(format('select public.tpk_delete_account(%L)', t), 'owns_courses');
end $$;
select pg_temp.ok(not has_function_privilege('anon', 'public.tpk_password_ok(text, text)', 'execute'), 'password rule is not callable from the API');
