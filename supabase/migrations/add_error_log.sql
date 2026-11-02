-- Light production error tracking: the site sends JavaScript errors here, anonymously (no player name, no query string).
-- The site may add rows; nobody can read them through the API (read them in the Supabase SQL editor, see the views below).
create table if not exists public.error_log (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  kind text not null default 'error' check (kind in ('error','rejection')),
  msg text not null check (length(msg) between 1 and 300),
  src text check (src is null or length(src) <= 200),       -- file:line:col
  stack text check (stack is null or length(stack) <= 2000),
  page text check (page is null or length(page) <= 120),    -- path only
  ver text check (ver is null or length(ver) <= 24),        -- site version (?v= of the scripts)
  ua text check (ua is null or length(ua) <= 200),
  late boolean not null default false                       -- true when it was queued offline and sent later
);
create index if not exists error_log_created_idx on public.error_log (created_at desc);
alter table public.error_log enable row level security;

-- Flood guard: at most 30 rows per minute for the whole site (a bug loop or abuse cannot fill the table).
create or replace function public.error_log_allowed() returns boolean
language sql security definer set search_path = public stable as
$$ select (select count(*) from public.error_log where created_at > now() - interval '1 minute') < 30 $$;
revoke all on function public.error_log_allowed() from public;
grant execute on function public.error_log_allowed() to anon, authenticated;

drop policy if exists error_log_insert on public.error_log;
create policy error_log_insert on public.error_log for insert to anon, authenticated with check (public.error_log_allowed());

-- Weekly cleanup is up to you; to keep the table small: delete from public.error_log where created_at < now() - interval '60 days';

-- Reading (SQL editor):
--   select * from public.error_summary;                      -- grouped, newest first, last 7 days
--   select * from public.error_log order by id desc limit 50; -- raw rows
create or replace view public.error_summary with (security_invoker = true) as
  select msg, src, page, count(*) as n, count(distinct ua) as browsers, max(created_at) as last_seen, min(ver) as first_ver, max(ver) as last_ver
  from public.error_log where created_at > now() - interval '7 days'
  group by msg, src, page order by max(created_at) desc;
revoke all on public.error_summary from anon, authenticated;
