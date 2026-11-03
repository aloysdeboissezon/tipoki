-- Sign in with Email / Google / (Apple, Phone later) through Supabase Auth, on top of the existing online save.
-- Supabase Auth only proves who the person is. The progress copy stays in tpk_accounts: an account can now be linked
-- to an auth user (auth_id). Username + password accounts keep working, and can add an email later (the "link" path).
-- Safe to run twice.

alter table public.tpk_accounts add column if not exists auth_id uuid unique;
alter table public.tpk_accounts add column if not exists auth_label text;       -- email or phone, only to show "Saved online as ..."
alter table public.tpk_accounts alter column pass_hash drop not null;           -- accounts made with Google / email have no password

-- A password login must never work on an account without a password (crypt(x, null) is null, and "null <> null" is not true).
create or replace function public.tpk_login(p_username text, p_password text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare a public.tpk_accounts; v_ip text := public.tpk_client_ip(); ok boolean;
begin
  if v_ip <> '' and (select count(*) from public.tpk_login_log l where l.ip = v_ip and l.at > now() - interval '1 hour') >= 40 then raise exception 'slow_down'; end if;
  select * into a from public.tpk_accounts where uname_key = lower(btrim(coalesce(p_username, ''))) and pass_hash is not null;
  if not found then
    perform extensions.crypt(coalesce(p_password, ''), extensions.gen_salt('bf', 10));
    insert into public.tpk_login_log(ip) values (v_ip);
    return jsonb_build_object('error', 'bad_login');
  end if;
  if a.locked_until is not null and a.locked_until > now() then raise exception 'locked'; end if;
  ok := a.pass_hash = extensions.crypt(coalesce(p_password, ''), a.pass_hash);
  if not ok then
    insert into public.tpk_login_log(ip) values (v_ip);
    delete from public.tpk_login_log where at < now() - interval '1 day';
    update public.tpk_accounts set fails = case when fails >= 7 then 0 else fails + 1 end,
      locked_until = case when fails >= 7 then now() + interval '15 minutes' else locked_until end where id = a.id;
    return jsonb_build_object('error', 'bad_login');
  end if;
  update public.tpk_accounts set fails = 0, locked_until = null where id = a.id;
  if substring(a.pass_hash from 5 for 2)::int < 10 then
    update public.tpk_accounts set pass_hash = extensions.crypt(p_password, extensions.gen_salt('bf', 10)) where id = a.id;
  end if;
  return jsonb_build_object('token', public.tpk_new_session(a.id), 'username', a.username, 'rev', a.rev, 'data', a.data);
end $$;

-- Called by the browser right after Supabase Auth signed the person in (the call carries their auth token).
--   * auth user already known            -> sign in to its progress
--   * p_link = token of a username+password account (the "Add an email" path) -> that account gets this auth user
--   * otherwise                          -> new account holding what is on this device (p_data)
create or replace function public.tpk_auth_login(p_link text default null, p_data jsonb default '{}'::jsonb) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare uid uuid := auth.uid(); lbl text; a public.tpk_accounts; old public.tpk_accounts;
begin
  if uid is null then raise exception 'not_signed_in'; end if;
  lbl := left(coalesce(nullif(auth.jwt()->>'email', ''), nullif(auth.jwt()->>'phone', ''), 'player'), 80);
  select * into a from public.tpk_accounts where auth_id = uid;
  if found then
    if p_link is not null then
      begin old := public.tpk_account_for(p_link); exception when others then old := null; end;
      if old.id is not null and old.id <> a.id then raise exception 'already_linked'; end if;
    end if;
    return jsonb_build_object('token', public.tpk_new_session(a.id), 'username', coalesce(a.auth_label, a.username), 'rev', a.rev, 'data', a.data);
  end if;
  if p_link is not null then
    old := public.tpk_account_for(p_link);
    if old.auth_id is not null then raise exception 'already_linked'; end if;
    update public.tpk_accounts set auth_id = uid, auth_label = lbl, updated_at = now() where id = old.id returning * into a;
    return jsonb_build_object('token', public.tpk_new_session(a.id), 'username', a.username, 'rev', a.rev, 'data', a.data);
  end if;
  perform public.tpk_check_data(p_data);
  insert into public.tpk_accounts(username, uname_key, pass_hash, auth_id, auth_label, data, rev)
    values (lbl, 'auth:' || uid::text, null, uid, lbl, p_data, 1) returning * into a;
  return jsonb_build_object('token', public.tpk_new_session(a.id), 'username', lbl, 'rev', 1, 'created', true);
end $$;

revoke all on function public.tpk_auth_login(text, jsonb) from public, anon;
grant execute on function public.tpk_auth_login(text, jsonb) to authenticated;
