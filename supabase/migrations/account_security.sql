-- Account security, 13/11/2026. À lancer dans l'éditeur SQL Supabase (idempotent : on peut le relancer sans risque).
--   1. Username + password accounts: at least 8 characters, and the most common passwords are refused.
--      Existing passwords keep working; the rule applies to new accounts only.
--      (Supabase's own "leaked password protection" does not apply here: Supabase Auth only handles the email-code and
--      Google sign-ins, which have no password. The username accounts are checked by tpk_signup below.)
--   2. "Delete my account": tpk_delete_account(token) removes the account, its sessions and its saved progress,
--      and the email sign-in linked to it. Play statistics were never linked to an account (random device number).

-- ---------- 1. password rule ----------
create or replace function public.tpk_password_ok(p_password text, p_username text) returns boolean
language sql immutable set search_path = '' as $$
  select length(coalesce(p_password, '')) >= 8
     and octet_length(p_password) <= 72                                  -- bcrypt only reads 72 bytes
     and lower(p_password) <> lower(coalesce(p_username, ''))
     and position(lower(coalesce(nullif(p_username, ''), '#none#')) in lower(p_password)) = 0
     and p_password !~ '^(.)\1*$'                                        -- not one character repeated
     and lower(p_password) <> all (array[
       '12345678','123456789','1234567890','12345678910','87654321','11111111','00000000','88888888','12341234','11223344',
       'password','password1','password12','password123','passw0rd','p@ssword','p@ssw0rd','motdepasse','motdepasse1','contraseña',
       'contrasena','qwertyui','qwertyuiop','azertyui','azertyuiop','asdfghjk','zxcvbnm1','1q2w3e4r','1qaz2wsx','qwerty123',
       'abc12345','abcd1234','abcdefgh','iloveyou','iloveyou1','sunshine','princess','football','baseball','superman',
       'starwars','whatever','trustno1','letmein1','welcome1','welcome123','monkey123','dragon123','master123','shadow123',
       'qwebbo123','tipoki123','esade123','esade2026','barcelona','barcelona1','madrid123','soleil123','bonjour1','bonjour123',
       'chocolate','pokemon1','minecraft','fortnite','liverpool','arsenal1','chelsea1','michelle','jennifer','computer',
       'internet','samsung1','iphone12','google123','facebook','instagram','1234qwer','q1w2e3r4','a1b2c3d4','aa123456',
       'loveyou1','hello123','hellohello','changeme','secret12','admin123','administrator','student1','student123','summer2026'])
$$;
revoke all on function public.tpk_password_ok(text, text) from public, anon, authenticated;

create or replace function public.tpk_signup(p_username text, p_password text, p_data jsonb default '{}'::jsonb) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare u text := btrim(coalesce(p_username, '')); v_ip text := public.tpk_client_ip(); a public.tpk_accounts;
begin
  if u !~ '^[A-Za-z0-9_.-]{3,20}$' then raise exception 'bad_username'; end if;
  if not public.tpk_password_ok(p_password, u) then raise exception 'bad_password'; end if;
  perform public.tpk_check_data(p_data);
  if (select count(*) from public.tpk_signup_log l where l.at > now() - interval '1 hour') >= 300 then raise exception 'slow_down'; end if;   -- all networks together
  if v_ip <> '' then
    if (select count(*) from public.tpk_signup_log l where l.ip = v_ip and l.at > now() - interval '1 hour') >= 10 then raise exception 'slow_down'; end if;
  end if;
  insert into public.tpk_signup_log(ip) values (v_ip);
  delete from public.tpk_signup_log where at < now() - interval '1 day';
  if exists (select 1 from public.tpk_accounts where uname_key = lower(u)) then raise exception 'name_taken'; end if;
  insert into public.tpk_accounts(username, uname_key, pass_hash, data, rev)
    values (u, lower(u), extensions.crypt(p_password, extensions.gen_salt('bf', 10)), p_data, 1) returning * into a;
  return jsonb_build_object('token', public.tpk_new_session(a.id), 'username', a.username, 'rev', a.rev);
exception when unique_violation then raise exception 'name_taken';
end $$;
revoke all on function public.tpk_signup(text, text, jsonb) from public;
grant execute on function public.tpk_signup(text, text, jsonb) to anon, authenticated;

-- ---------- 2. delete my account ----------
create or replace function public.tpk_delete_account(p_token text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare a public.tpk_accounts;
begin
  a := public.tpk_account_for(p_token);                                  -- raises bad_token when the session is not valid
  -- a professor's courses belong to the school: they are not deleted with the account
  if to_regclass('public.courses') is not null and exists (select 1 from public.courses c where c.owner = a.id) then
    raise exception 'owns_courses';
  end if;
  delete from public.tpk_accounts where id = a.id;                      -- sessions go with it (on delete cascade)
  if a.auth_id is not null then
    begin delete from auth.users where id = a.auth_id;                   -- the email sign-in linked to the account
    exception when others then null; end;                                -- the account itself is gone either way
  end if;
  return jsonb_build_object('deleted', true);
end $$;
revoke all on function public.tpk_delete_account(text) from public;
grant execute on function public.tpk_delete_account(text) to anon, authenticated;
