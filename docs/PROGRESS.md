# Suivi du chantier « Qwebbo prêt pour ESADE »

Ce fichier suffit à une nouvelle session pour reprendre. Mis à jour à chaque étape.

## Objectif
Vendre à ESADE une licence non exclusive à 80 000 € par an, après un pilote payant de 10 000 € sur 12 semaines (déduit de la première année). Le produit doit rendre vraie la phrase : « Les professeurs envoient leur cours, Qwebbo crée le reste, ils relisent et approuvent. »

## Règles
- Aucune fusion sans le « publie » d'Aloys. Une seule branche de travail autorisée (`claude/project-thread-ytzyw9`), donc une PR à la fois.
- La production est en lecture seule. Le SQL à lancer est dans `supabase/migrations/`, Aloys le lance lui-même.
- Le deck et tout ce qui montre un prix restent hors du dépôt (`/mnt/project-files/pitch/`).

## Décisions prises
- Un seul format de kit (`js/kit/format.js`, `docs/kit-format.md`) pour l'import à la main et pour l'IA. La bonne réponse est toujours `o[0]`. Les autres langues d'un item vivent dans le même item (`i18n`), donc les versions ne peuvent pas diverger.
- Un seul validateur (`js/kit/validate.js`) pour le navigateur et la CI. Erreur = bloque la publication. Avertissement = montré au professeur, jamais caché.
- Le rôle professeur n'est pas donné par le domaine de l'e-mail (les étudiants ont le même) : il vient d'une liste par école.
- Les indicateurs sont calculés par un seul module (`js/kit/insight.js`), identique en démo et en production. Aucune statistique sous 5 étudiants.
- Quatrième indicateur du pilote : exactitude du contenu après relecture (items publiés sans erreur confirmée), pas la disponibilité du site, que Qwebbo ne mesure pas lui-même.
- Les questions fabriquées automatiquement à partir des fiches sont désactivées pour les cours de professeurs (`noExpand`) : rien n'arrive aux étudiants sans approbation.

## Fait
- Tests de référence : 187 verts (13/11).
- Audit : `docs/audit-2026-11-12.md`.
- Validateur partagé + `tools/check-kit.js` (toutes les banques, toutes les langues).
- Modules kit : format, imports (JSON, CSV, GIFT, Moodle XML, liste collée), exports (CSV, GIFT, Moodle XML, pages imprimables), indicateurs.

## En cours / à faire (dans l'ordre)
1. Tests unitaires des modules kit.
2. Espace professeur (`prof.html`) : cours, import, relecture au clavier, journal d'approbation, publication par code.
3. Lecture d'un cours publié par les étudiants (`/?course=CODE`).
4. Tableau de bord + rapport du pilote.
5. Mode démo isolé (données fictives étiquetées).
6. Migration SQL `add_professor_space.sql` (écoles, rôles, cours, journal) testée sur un Postgres local.
7. Test Playwright de la boucle complète.
8. Fait : pack sécurité et confidentialité (`docs/security-privacy-pack.md`) ; test de la répétition espacée sur un cours publié (`tests/leitner.spec.js`, la fonction existait déjà) ; sondage en une question à la fin d'une partie sur un cours (« Did this help you revise? », une fois par cours et par appareil, traduit FR/ES/KO).
9. Fait : deck v8 et documents associés (hors dépôt, dans les fichiers du projet : `pitch/Qwebbo-ESADE-pitch-v8.pptx` et `pitch/v8/`).
10. Fait (13/11) : mots de passe d'au moins 8 caractères et refus des mots de passe courants ; bouton « supprimer mon compte » (profil) ; CSP sur le site étudiant (tous les tests tournent sous la politique de production) ; page d'accueil plus légère (police des drapeaux seulement là où il le faut, carrousel sans recalcul de mise en page) ; 283 questions Esade dont la bonne réponse se devinait à sa longueur réécrites ; les 4 cours Esade en espagnol (`api/_esade/tr/`, servis par `/api/esade?k=tr`, outils `tools/tr-dump.js` puis `tools/tr-build.js`).
11. À lancer par Aloys dans l'éditeur SQL Supabase : `supabase/migrations/account_security.sql` puis `close_unused_functions.sql` (sans le premier, le bouton « supprimer mon compte » répond « serveur injoignable »).
12. Reste : génération IA derrière son interrupteur (demande une clé et un accord de dépense), fiches de révision Esade en espagnol, mise à jour de `README.md` et `docs/esade-acces.md` quand la barrière sera refermée.

## Questions ouvertes pour Aloys
- D'où vient « 4 000 joueurs uniques » ? La base ne le confirme pas (voir l'audit, point 2).
- Rendre le dépôt privé et refermer la barrière ESADE (`ESADE_OPEN`).
- Cadrage du prix sur le deck : « tarif fondateur, environ la moitié de la référence de 0,1 % des frais de scolarité ».
- La ligne « création de société » dans le budget du pilote (v7, diapositive 23) : recommandation = la retirer.
