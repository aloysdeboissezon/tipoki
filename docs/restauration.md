# Sauvegarde et restauration de la base qwebbo

## Ce qui est sauvegardé
Le workflow `.github/workflows/backup-supabase.yml` tourne **tous les jours à 03:17 UTC** (et à la demande : onglet *Actions* → *Sauvegarde Supabase* → *Run workflow*). Il exporte le schéma `public` du projet Supabase `socio-trivia` : parties et joueurs, quiz générés (`quizzes`), questions communautaires, votes, signalements, statistiques, ligues et comptes de sauvegarde de progression (`tpk_*`), plus les fonctions SQL (RPC).

Chaque exécution produit un artefact GitHub (conservé **30 jours**) contenant :
- `tipoki-<date>.dump` : sauvegarde complète, à restaurer avec `pg_restore` ;
- `tipoki-<date>-schema.sql` : structure seule, lisible ;
- `tipoki-<date>-quizzes.json` : les quiz de la table `quizzes` en JSON.

Les quiz « intégrés » (socio, énergie…) sont du code : ils sont déjà sauvegardés dans Git (`js/banks/`). Les Edge Functions sont dans `supabase/functions/`, les migrations dans `supabase/migrations/`.

Aucun secret n'est dans le dépôt. Les fichiers contiennent des données d'utilisateurs (pseudos, hash de mots de passe) : le dépôt est privé, et on peut en plus chiffrer (voir ci-dessous).

## Secrets à ajouter (Settings → Secrets and variables → Actions → New repository secret)
1. **`SUPABASE_DB_URL`** (obligatoire) : chaîne de connexion Postgres. Dans Supabase : projet `socio-trivia` → bouton **Connect** → *Session pooler* (ou *Transaction pooler*) → copier l'URI `postgresql://postgres.eowcxqqkewijzgemqbhi:[MOT-DE-PASSE]@aws-0-eu-west-3.pooler.supabase.com:5432/postgres` et remplacer `[MOT-DE-PASSE]` par le mot de passe de la base (Project Settings → Database → *Reset database password* si perdu). Utiliser le pooler, pas l'hôte direct `db.…supabase.co` (IPv6 uniquement, injoignable depuis GitHub Actions).
2. **`BACKUP_PASSPHRASE`** (optionnel, recommandé) : une phrase secrète de ton choix. Si présente, les fichiers sont chiffrés en `.gpg`. **Note-la dans un gestionnaire de mots de passe : sans elle, les sauvegardes sont illisibles.**

## Restaurer
1. Télécharger l'artefact depuis l'exécution voulue (onglet *Actions*), le dézipper.
2. Si chiffré : `gpg --output tipoki.dump --decrypt tipoki-<date>.dump.gpg` (saisir la phrase).
3. Créer (ou choisir) un projet Supabase **vide** de destination et récupérer sa chaîne de connexion `DEST_URL` (même procédure que ci-dessus). Pour un test, utiliser un projet de test, jamais la production.
4. Restaurer :
   ```bash
   pg_restore --no-owner --no-privileges --clean --if-exists --schema=public -d "$DEST_URL" tipoki.dump
   ```
   (client PostgreSQL 17 recommandé). Les erreurs « already exists » sur un projet neuf sont sans gravité.
5. Vérifier : `psql "$DEST_URL" -c "select count(*) from public.games; select count(*) from public.players;"`.
6. Si c'est un nouveau projet : redéployer les Edge Functions (`supabase functions deploy generate-quiz`), remettre le secret `ANTHROPIC_API_KEY` si besoin, et mettre à jour `SB_URL` / `SB_KEY` dans `js/app/01-core.js` (clé publishable du nouveau projet).
7. Restaurer un seul quiz perdu : ouvrir `tipoki-<date>-quizzes.json`, retrouver l'objet par `id` et le réinsérer dans `public.quizzes` (SQL editor).

## Tester la sauvegarde
Après avoir ajouté `SUPABASE_DB_URL`, lancer le workflow à la main une fois et vérifier qu'il est vert et que l'artefact contient les 3 fichiers. Pensez à tester une restauration dans un projet jetable de temps en temps.

## Pourquoi pas plus
Le plan gratuit de Supabase ne fournit pas de sauvegardes téléchargeables ; ce workflow comble ce manque. Historique : 30 jours glissants (modifiable via `retention-days`).
