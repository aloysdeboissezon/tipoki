-- Close three old database functions that the site no longer calls (community quizzes, removed from the code).
-- Anyone could still call them through the public API: create_course could write rows into public.quizzes.
-- Nothing is deleted: the functions stay in place and can be reopened with "grant execute ... to anon, authenticated".
-- Idempotent. À lancer dans l'éditeur SQL Supabase (pas encore appliqué en production).
do $$
declare f text;
begin
  foreach f in array array['public.create_course(text, text, text[])',
                           'public.add_question(text, integer, text, text, text[], boolean, text, text, text)',
                           'public.vote_question(bigint, text, smallint)'] loop
    if to_regprocedure(f) is not null then
      execute format('revoke all on function %s from public, anon, authenticated', f);
    end if;
  end loop;
end $$;
