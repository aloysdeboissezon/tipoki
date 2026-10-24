# Tipoki

Envoie ton cours, Tipoki en fait un quiz. Joue seul ou en multi avec tes potes (style Kahoot + Quizlet).

## Structure
- `index.html`, `css/style.css`, `js/app.js` : le site (statique, aucun build).
- `js/banks/socio.js` : le quiz d'origine (Socio Trivia, sessions 1–10).
- `supabase/functions/generate-quiz/` : fonction serveur qui transforme un PDF ou un texte en quiz avec Claude.
- Base Supabase `socio-trivia` : tables `games`, `players` (multi), `quizzes` (quiz générés), `gen_log` (limites d'usage).

## Config
- Secret Supabase `ANTHROPIC_API_KEY` (Edge Functions → Secrets).
- Un quiz se partage avec `?quiz=<id>`, une partie avec `?code=ABCD`.

## Lancer en local
`python3 -m http.server` dans ce dossier, puis http://localhost:8000
