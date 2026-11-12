# Accès ESADE : quiz réservés aux adresses e-mail ESADE vérifiées

Ce que ça fait :
- Cliquer sur le logo ESADE (ou ouvrir un quiz ESADE par lien) sans être vérifié ouvre la fenêtre « ESADE only ».
- La personne tape son adresse ESADE (`@esade.edu`, sous-domaines compris, ex. `alumni.esade.edu`). Un **code** part par e-mail vers cette adresse : personne ne peut entrer une fausse adresse ESADE.
- Une fois le code accepté, le logo ESADE reçoit sa coche verte et les quiz ESADE s'ouvrent.
- Une adresse ESADE ne reste connectée que sur **2 appareils** : se connecter sur un 3ᵉ déconnecte le plus ancien.
- L'e-mail contient l'avertissement « en entrant ce code ou en cliquant, tu acceptes les conditions générales » (EN / ES / FR).

Comment c'est protégé (et ce qui ne l'est pas) : voir la dernière section.

## À faire, dans cet ordre

### 1. Rendre le dépôt GitHub privé (important)
Le dépôt `aloysdeboissezon/tipoki` est **public** : tant qu'il l'est, n'importe qui peut lire les fichiers ESADE sur GitHub, protégés ou non sur le site. GitHub → dépôt → Settings → tout en bas « Danger Zone » → Change visibility → Make private. Vercel continue de déployer normalement (si Vercel demande de reconnecter GitHub : Vercel → Settings → Git).

### 2. Base de données (Supabase) : AVANT de fusionner la PR
Supabase → SQL Editor → New query → coller tout le contenu de `supabase/migrations/add_esade_access.sql` → Run. Il peut être relancé sans risque. Ajoute le domaine `esade.edu` (les sous-domaines sont acceptés automatiquement) ; pour accepter un autre domaine :
```sql
insert into public.esade_domains(domain, note) values ('autre-domaine.edu', 'pourquoi');
```

### 3. Envoi des e-mails : un vrai expéditeur (obligatoire)
Sans ça, **seuls les membres de ton équipe Supabase reçoivent le code** (l'envoi intégré de Supabase est limité à quelques e-mails par heure et uniquement vers l'équipe). Les étudiants ESADE ne recevraient rien.
1. Créer un compte gratuit sur resend.com (3 000 e-mails/mois), « Domains » → Add domain → `qwebbo.com`.
2. Resend affiche des lignes DNS (SPF, DKIM) : les ajouter là où se gère le DNS de qwebbo.com (Namecheap → Domain List → Manage → Advanced DNS, ou Vercel → Domains si les serveurs de noms sont chez Vercel). Cliquer « Verify » (quelques minutes).
3. Resend → API Keys → Create (Sending access) → copier la clé.
4. Supabase → Project Settings → Authentication → SMTP Settings → Enable custom SMTP :
   - Sender email : `no-reply@qwebbo.com`, Sender name : `qwebbo`
   - Host : `smtp.resend.com`, Port : `465`, Username : `resend`, Password : la clé API
5. Supabase → Authentication → Rate Limits : « Rate limit for sending emails » : 100 par heure suffit au début.

### 4. Les deux e-mails (code + avertissement des conditions)
Supabase → Authentication → Email Templates. Pour **« Magic Link »** puis pour **« Confirm signup »** :
- Subject : `Your qwebbo code: {{ .Token }}`
- Message body (code seul, sans lien) : coller le contenu de `supabase/email-templates/magic-link.html` (identique pour « Confirm signup », fichier `confirm-signup.html`; le logo et l’icône sont servis depuis `qwebbo.com/img/` donc visibles après déploiement). Save.

Authentication → Providers → Email : « Confirm email » activé, « Email OTP Length » : **6** (recommandé ; le site accepte 6 à 10 chiffres). Puis Authentication → Email Templates → « Confirm signup » et « Magic Link » : coller le contenu de `supabase/email-templates/confirm-signup.html` (logo qwebbo, icône copier, code non cliquable).

### 5. Fusionner la PR (quand tu dis « publie »)
Vercel déploie tout seul. Aucune variable à régler (la fonction utilise la clé publique du site ; facultatif : `SUPABASE_URL` et `SUPABASE_ANON_KEY` dans Vercel → Settings → Environment Variables).

### 6. Vérifier après le déploiement
Dans un terminal (ou le navigateur) :
- `https://qwebbo.com/js/banks/socio.js` doit répondre **404** (avant : le fichier entier).
- `https://qwebbo.com/api/esade?k=bank&id=socio` doit répondre **401** (pas de jeton).
- Sur ton téléphone : logo ESADE → fenêtre « ESADE only » → ton adresse ESADE → code reçu → coche verte → un quiz ESADE s'ouvre.
- Se connecter avec le même e-mail ESADE sur 3 appareils : le premier appareil est déconnecté.

## Gérer les accès (éditeur SQL Supabase)
```sql
-- qui est vérifié, et sur combien d'appareils
select esade_email, esade_at, (select count(*) from public.tpk_sessions s where s.account_id = a.id) as appareils
from public.tpk_accounts a where esade_email is not null order by esade_at desc;
-- retirer l'accès à quelqu'un
update public.tpk_accounts set esade_email = null, esade_at = null where esade_email = 'prenom.nom@esade.edu';
```

## Ajouter un quiz ESADE
Mettre son fichier dans `api/_esade/banks/<id>.js` (et `api/_esade/sheets/<id>.js` pour une fiche), ajouter l'id à `ESADE_IDS` dans `js/app/03-quiz-data.js`, puis `node tools/build-catalog.js`. Un test vérifie que la liste et les fichiers correspondent.

## Ce qui est protégé, honnêtement
- **Protégé côté serveur** : les questions, fiches et PDF ESADE (socio, compta2, populism, regression) ne sont plus des fichiers publics. Ils vivent dans `api/_esade/` et la fonction `/api/esade` ne les envoie qu'à un compte dont l'adresse ESADE est vérifiée dans la base. Masquer le bouton ne protégerait rien ; ici, sans adresse vérifiée, le contenu n'arrive jamais dans le navigateur.
- **Pas protégé** : (1) tant que le dépôt GitHub est public, ou pour qui a déjà copié l'ancien site, le contenu reste lisible (étape 1) ; (2) un étudiant vérifié peut faire des captures ou copier ce qu'il voit : aucun site ne peut l'empêcher ; (3) les titres et noms de chapitres des quiz ESADE restent publics (ils servent à lister les cartes) ; (4) la limite de 2 appareils compte les connexions, pas les onglets ouverts ; (5) un accès déjà ouvert dans un onglet reste ouvert jusqu'au rechargement de la page ; (6) les quiz ESADE demandent une connexion internet (ils ne sont plus stockés pour le hors-ligne).
- Le quiz d'ouverture du site est maintenant « Culture générale » (public) à la place de Socio : les ~100 utilisateurs actuels de Socio devront vérifier leur adresse ESADE une fois.
