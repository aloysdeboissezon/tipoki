# Connexion par e-mail, Google (et plus tard Apple, téléphone)

Le code est prêt. Pour que ça marche en vrai, il reste des réglages que seul le propriétaire du compte peut faire.

## Ce que ça coûte
| Option | Coût | État |
|---|---|---|
| E-mail (lien/code) | Gratuit… mais l'envoi d'e-mails intégré à Supabase est limité à quelques e-mails par heure. Pour un vrai lancement, brancher un SMTP gratuit (Resend : 3 000 e-mails/mois gratuits, domaine qwebbo.com à vérifier). | actif |
| Google | Gratuit | actif |
| Apple | Compte Apple Developer, environ 99 USD/an | caché (`AUTH.apple=false` dans `js/sync.js`) |
| Téléphone (SMS) | Fournisseur SMS payant (Twilio…), environ 0,05 à 0,10 USD par SMS | caché (`AUTH.phone=false`) |

Pour activer Apple ou Téléphone plus tard : régler le fournisseur dans Supabase, puis passer le drapeau à `true` dans `js/sync.js`.

## 1. Base de données
Supabase → SQL Editor → coller le contenu de `supabase/migrations/add_auth_signin.sql` → Run. (Sans ça, la connexion échoue.)

## 2. URLs de redirection
Supabase → Authentication → URL Configuration :
- Site URL : `https://qwebbo.com`
- Redirect URLs, ajouter : `https://qwebbo.com/**`, `https://www.qwebbo.com/**`, `https://qwebbo.eu/**`, `https://www.qwebbo.eu/**`, et l'URL Vercel de prévisualisation si tu veux tester (`https://*.vercel.app/**`).

## 3. E-mail
Supabase → Authentication → Providers → Email : activé, « Confirm email » activé.
Authentication → Email Templates → « Magic Link » : ajouter dans le texte la ligne
`Ton code : {{ .Token }}`
(utile quand le lien s'ouvre dans un autre navigateur ou une appli installée : on tape le code).
Recommandé : Project Settings → Authentication → SMTP Settings → brancher Resend (expéditeur `no-reply@qwebbo.com`).

## 4. Google
1. console.cloud.google.com → créer un projet « Qwebbo ».
2. APIs & Services → OAuth consent screen : type External, nom « Qwebbo », e-mail de contact, domaine `qwebbo.com`, scopes `email` et `profile` seulement. Publier l'application (sinon limitée à 100 testeurs).
3. Credentials → Create credentials → OAuth client ID → Web application.
   - Authorized JavaScript origins : `https://qwebbo.com`
   - Authorized redirect URI : `https://eowcxqqkewijzgemqbhi.supabase.co/auth/v1/callback`
4. Copier Client ID et Client secret.
5. Supabase → Authentication → Providers → Google : activer, coller les deux, enregistrer.

## 5. Test
Ouvrir qwebbo.com → « Save it online » → Continue with Email / Google.
Les comptes « nom d'utilisateur + mot de passe » existants marchent toujours ; une fois connecté, le bouton « Add an email » (ligne du compte) leur rattache un e-mail ou Google, sans perdre la progression.
