# Momento (site vitrine + espace admin)

Site officiel de **Momento** — photographe & vidéaste de mariage (Paris, France, Belgique, Kinshasa, destination weddings).

## Stack

- Next.js 14 (App Router) + TypeScript
- TailwindCSS v4 + Framer Motion
- Prisma + PostgreSQL
- Galerie : `yet-another-react-lightbox`
- Emails (optionnel) : Resend

## Démarrage

```bash
npm install
cp .env.example .env      # puis renseigner DATABASE_URL, ADMIN_SESSION_SECRET, SITE_URL
npx prisma db push        # crée / met à jour les tables
npm run db:seed           # données initiales (n'écrase jamais ce qui a été modifié dans l'admin)
npm run dev
```

- Site public : `http://localhost:3000`
- Admin : `http://localhost:3000/admin`

## Compte admin

Le seed crée un compte **uniquement s'il n'en existe aucun** : `ADMIN_EMAIL` / `ADMIN_PASSWORD`
(par défaut `admin@momento.rdc` / `Admin123!`).
**Changez le mot de passe immédiatement** dans Admin → Compte (un avertissement s'affiche tant que le mot de passe par défaut est utilisé).

## Variables d'environnement

Voir `.env.example`.

| Variable | Rôle |
| --- | --- |
| `DATABASE_URL` | Connexion PostgreSQL (obligatoire) |
| `ADMIN_SESSION_SECRET` | Signature des cookies de session admin (obligatoire) |
| `SITE_URL` | URL publique du site, ex. `https://www.momento-wedding.com` (SEO : canonical, sitemap, données structurées) |
| `GOOGLE_SITE_VERIFICATION` | Code de vérification Google Search Console (optionnel) |
| `UPLOAD_DIR` | Dossier des fichiers importés depuis l'admin (défaut `./uploads`) |
| `RESEND_API_KEY`, `RESEND_FROM`, `LEADS_TO_EMAIL` | Envoi d'un email à chaque demande de réservation (optionnel) |

## Espace admin

- `/admin` : tableau de bord (compteurs + dernières demandes)
- `/admin/projects` : reportages du portfolio (création, édition, suppression), import de photos / vidéos,
  liens YouTube / Vimeo, choix de la couverture, ordre des médias
- `/admin/leads` : demandes du formulaire de contact (statuts Nouveau / Contacté / Réservé, suppression)
- `/admin/testimonials` : témoignages (ajout, modification, affichage sur l'accueil, suppression)
- `/admin/site` : image/vidéo d'accueil, téléphones, Instagram, mentions légales
- `/admin/account` : email et mot de passe de connexion

Toutes les modifications sont visibles immédiatement sur le site (pages rendues dynamiquement).

## Fichiers importés

Les fichiers importés depuis l'admin sont stockés dans `UPLOAD_DIR` (hors de `public/`, car Next.js ne sert
que les fichiers présents dans `public/` au moment du build) et servis via `/uploads/...`.
En production, ce dossier doit être **persistant** (volume / disque). Sur un hébergement sans disque
persistant, utilisez plutôt des URLs externes (Cloudinary, S3…) via « Ajouter par lien ».

## SEO

- Titres, descriptions et mots-clés ciblés (Momento wedding, photographe mariage Paris / France / Belgique / Kinshasa…)
- Données structurées schema.org (`LocalBusiness` / `ProfessionalService`, zones desservies, `ImageGallery` par reportage)
- `sitemap.xml` dynamique (inclut les reportages créés dans l'admin) et `robots.txt`
- URLs canoniques, Open Graph / Twitter, textes alternatifs des images

Après la mise en ligne :
1. Définir `SITE_URL` avec le vrai domaine.
2. Ajouter le site dans [Google Search Console](https://search.google.com/search-console), le vérifier
   (`GOOGLE_SITE_VERIFICATION`) puis soumettre `https://<domaine>/sitemap.xml`.
3. Créer une fiche [Google Business Profile](https://business.google.com) « Momento – Photographe de mariage »
   (Paris) avec le lien du site : c'est le levier le plus efficace pour les recherches locales.
4. Ajouter le lien du site dans la bio Instagram.

## Routes publiques

- `/` accueil
- `/portfolio` reportages (filtres par catégorie) + toutes les photos
- `/portfolio/mariages`, `/portfolio/save_the_date` galeries
- `/portfolio/[slug]` page d'un reportage
- `/about`, `/contact` (formulaire → base de données + email optionnel), `/legal`
