#!/usr/bin/env bash
# Runs supabase/migrations/account_security.sql on a throwaway local Postgres and checks it. Nothing here touches Supabase.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BIN="$(ls -d /usr/lib/postgresql/*/bin 2>/dev/null | sort -V | tail -1)"; [ -x "$BIN/initdb" ] || { echo "PostgreSQL server binaries not found"; exit 2; }
DIR="$(mktemp -d)"; PORT=54331; chmod 777 "$DIR"
if [ "$(id -u)" = 0 ]; then AS=(runuser -u postgres --); chown postgres "$DIR"; else AS=(); fi
cleanup() { "${AS[@]}" "$BIN/pg_ctl" -D "$DIR/data" -m immediate stop >/dev/null 2>&1 || true; rm -rf "$DIR"; }
trap cleanup EXIT
"${AS[@]}" "$BIN/initdb" -D "$DIR/data" -U postgres -A trust >/dev/null
"${AS[@]}" "$BIN/pg_ctl" -D "$DIR/data" -o "-p $PORT -c listen_addresses='' -k $DIR" -w start >/dev/null
P=("${AS[@]}" "$BIN/psql" -h "$DIR" -p "$PORT" -U postgres -v ON_ERROR_STOP=1 -q)
"${P[@]}" -c "create role anon; create role authenticated; create schema extensions; create extension pgcrypto with schema extensions; create schema auth;
  create table auth.users(id uuid primary key, email text, email_confirmed_at timestamptz);
  create function auth.uid() returns uuid language sql stable as \$\$ select nullif(current_setting('test.uid', true), '')::uuid \$\$;
  create function auth.jwt() returns jsonb language sql stable as \$\$ select '{}'::jsonb \$\$;
  grant usage on schema public, extensions, auth to anon, authenticated;
  -- tables created by hand in production long ago (not in a migration file): empty stand-ins so harden_security.sql runs
  create table public.gen_log(id bigint); create table public.stats_keys(code text); create table public.tpk_league_meta(k text);
  create table public.tpk_league_players(pid text, nick text, xp int, country text, week text, updated_at timestamptz);
  create table public.quizzes(id uuid primary key default gen_random_uuid(), title text, community boolean, created_at timestamptz default now());
  create table public.community_questions(id bigint); create table public.question_votes(id bigint);
  create table public.games(code text primary key, state jsonb, updated_at timestamptz default now());
  create table public.players(code text, pid text, nick text, ans jsonb, created_at timestamptz default now(), avatar text, country text);"
for f in add_progress_sync add_question_reports add_play_stats harden_security add_auth_signin add_analytics add_esade_access add_professor_space account_security account_security close_unused_functions; do
  "${P[@]}" -f "$ROOT/supabase/migrations/$f.sql" >/dev/null
done
"${P[@]}" -f "$ROOT/tools/test-account-sql.sql" >/dev/null
echo "account SQL: all checks passed"
