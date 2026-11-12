#!/usr/bin/env bash
# Runs supabase/migrations/add_professor_space.sql on a throwaway local Postgres and checks the access rules.
# Needs the PostgreSQL server binaries (initdb, pg_ctl). Nothing here touches Supabase.   Usage: bash tools/test-professor-sql.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BIN="$(ls -d /usr/lib/postgresql/*/bin 2>/dev/null | sort -V | tail -1)"; [ -x "$BIN/initdb" ] || { echo "PostgreSQL server binaries not found"; exit 2; }
DIR="$(mktemp -d)"; PORT=54329; chmod 777 "$DIR"
if [ "$(id -u)" = 0 ]; then AS=(runuser -u postgres --); chown postgres "$DIR"; else AS=(); fi
cleanup() { "${AS[@]}" "$BIN/pg_ctl" -D "$DIR/data" -m immediate stop >/dev/null 2>&1 || true; rm -rf "$DIR"; }
trap cleanup EXIT
"${AS[@]}" "$BIN/initdb" -D "$DIR/data" -U postgres -A trust >/dev/null
"${AS[@]}" "$BIN/pg_ctl" -D "$DIR/data" -o "-p $PORT -c listen_addresses='' -k $DIR" -w start >/dev/null
P=("${AS[@]}" "$BIN/psql" -h "$DIR" -p "$PORT" -U postgres -v ON_ERROR_STOP=1 -q)
# what Supabase provides: the roles, the extensions schema, auth.uid() / auth.users
"${P[@]}" -c "create role anon; create role authenticated; create schema extensions; create extension pgcrypto with schema extensions; create schema auth;
  create table auth.users(id uuid primary key, email text, email_confirmed_at timestamptz);
  create function auth.uid() returns uuid language sql stable as \$\$ select nullif(current_setting('test.uid', true), '')::uuid \$\$;
  create function auth.jwt() returns jsonb language sql stable as \$\$ select '{}'::jsonb \$\$;
  grant usage on schema public, extensions, auth to anon, authenticated;"
for f in add_progress_sync add_question_reports add_play_stats add_analytics add_esade_access add_professor_space add_professor_space; do   # the new file twice: it must be safe to run again
  "${P[@]}" -f "$ROOT/supabase/migrations/$f.sql" >/dev/null
done
"${P[@]}" -f "$ROOT/tools/test-professor-sql.sql" >/dev/null
echo "professor SQL: all checks passed"
