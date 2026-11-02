# Tipoki

Envoie ton cours, Tipoki en fait un quiz. Joue seul ou en multi avec tes potes (style Kahoot + Quizlet).

## Structure
- `index.html`, `css/style.css`, `js/app.js` : le site (statique, aucun build).
- `js/banks/socio.js` : le quiz d'origine (Socio Trivia, sessions 1–10).
- `supabase/functions/generate-quiz/` : fonction serveur qui transforme un PDF ou un texte en quiz avec Claude.
- Base Supabase `socio-trivia` : tables `games`, `players` (multi), `quizzes` (quiz générés), `gen_log` (limites d'usage).

## Sauvegardes
Sauvegarde quotidienne de la base via GitHub Actions, procédure de restauration : `docs/restauration.md`.

## Config
- Secret Supabase `ANTHROPIC_API_KEY` (Edge Functions → Secrets). The function stays off until the secret `GENERATE_ENABLED` is `true`.
- Un quiz se partage avec `?quiz=<id>`, une partie avec `?code=ABCD`.

## Lancer en local
`python3 -m http.server` dans ce dossier, puis http://localhost:8000

## Quiz chargés à la demande
`socio` est dans le premier chargement ; `culture`, `energie`, `populism`, `compta2` (et leurs fiches `js/sheets/`) ne sont téléchargés qu'à l'ouverture du quiz. Leur fiche de liste est dans `js/catalog.js` (généré) : après avoir modifié le titre/les sessions d'un quiz, lancer `node tools/build-catalog.js` (`--check` pour vérifier). Un nouveau quiz suit le même modèle : ajouter son id dans `tools/build-catalog.js` et ses `<meta name="tpk-lazy" data-lazy="…">` dans `index.html` (le service worker les stocke pour le hors-ligne).

## Suivi des erreurs
`js/errlog.js` envoie les erreurs JavaScript (et promesses rejetées) de la prod vers la table Supabase `error_log`, de façon anonyme (pas de cookie, pas de pseudo, pas de query string). Limites : 5 par chargement de page, 3 par minute, 30 par minute sur tout le site (côté base). Hors ligne, elles attendent dans la file de `js/offline.js`. Création : `supabase/migrations/add_error_log.sql`. Lecture (éditeur SQL Supabase) : `select * from public.error_summary;`

## Tests automatiques
Un navigateur sans écran (Playwright) joue les parcours clés : solo, indices, examen, signalement, pause/reprise, défi par lien, hors ligne, page Options. Supabase est simulé, aucun accès réseau n'est nécessaire.

- `npm install` puis `npx playwright install chromium` (une seule fois)
- `npm test` lance tout ; `npx playwright test tests/exam.spec.js` un seul fichier
- La CI GitHub Actions (`.github/workflows/e2e.yml`) les lance sur chaque PR.
