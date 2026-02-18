# Momento RDC (Website + Admin)

Official showcase website for **Momento RDC** (Luxury & destination weddings, photography & films).

## Stack

- Next.js (App Router) + TypeScript
- TailwindCSS
- Framer Motion
- Theme system: `next-themes` (Light par defaut + toggle persistant)
- Prisma
- DB: SQLite (dev) + PostgreSQL schema provided for production
- Gallery: `yet-another-react-lightbox` + responsive masonry (CSS columns)

## Quick Start

```bash
npm install
cp .env.example .env
npx prisma db push
npm run db:seed
npm run dev
```

Open:

- Public site: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

## Admin Login (Seed)

- Email: `admin@momento.rdc`
- Password: `Admin123!`

You can change it by updating the `AdminUser` record in the DB.

## Environment Variables

See `.env.example`.

- `DATABASE_URL`
  - Dev (SQLite): `file:./dev.db`
  - Prod (PostgreSQL): use `prisma/schema.postgres.prisma` and a Postgres `DATABASE_URL`
- `ADMIN_SESSION_SECRET`
  - Used to sign admin session cookies (rotate in prod)

### Resend (Optional)

If you set:

- `RESEND_API_KEY`
- `RESEND_FROM`
- `LEADS_TO_EMAIL`

Then booking inquiries will be emailed, in addition to being saved in the DB.

## Media Storage

- Dev uploads: stored locally at `public/uploads/<projectId>/...` via admin upload.
- Production: recommended to use S3-compatible storage or Cloudinary.
  - Current admin also supports adding remote URLs for images/videos.

## Prisma Notes (SQLite dev + Postgres prod)

Prisma datasource provider cannot be dynamic, so:

- Dev schema: `prisma/schema.prisma` (SQLite)
- Prod schema: `prisma/schema.postgres.prisma` (PostgreSQL)

Scripts:

- `npm run prisma:generate` (SQLite schema)
- `npm run prisma:generate:postgres`
- `npm run prisma:migrate:postgres`

## Routes

Public:

- `/` home storytelling (hero + promesse + approche + stories + services + temoignages + closing CTA)
- `/portfolio` filters + masonry + lightbox
- `/portfolio/[slug]` project detail
- `/about`
- `/contact` booking form (DB + optional Resend)
- `/legal`

Admin:

- `/admin/login`
- `/admin` dashboard
- `/admin/projects` CRUD + media upload/reorder
- `/admin/leads` pipeline status (new/contacted/booked)
- `/admin/site` edit hero/about/contacts/legal
- `/admin/testimonials` CRUD (message, rating optionnel, featured)

## Security / Node Version

This repo is set up to run on **Node 18.18+** (required by Prisma v6).

If you can upgrade to **Node 20+**, you can also upgrade Next.js to the latest major for the newest security patches.
