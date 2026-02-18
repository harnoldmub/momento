# Momento RDC

## Overview
Official showcase website for **Momento RDC** — Luxury & destination weddings, photography & films. Based in RDC + France, available worldwide.

## Stack
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: TailwindCSS v4 + Framer Motion
- **Database**: PostgreSQL (via Prisma ORM)
- **Theme**: next-themes (dark by default + toggle)
- **Gallery**: yet-another-react-lightbox + responsive masonry
- **Email**: Resend (optional)

## Project Structure
```
src/
  app/
    (site)/          # Public pages (home, portfolio, about, contact, legal)
    admin/           # Admin dashboard
    api/             # API routes
  components/        # UI components (admin, home, portfolio, motion, etc.)
  lib/               # Utilities (db.ts, env.ts, adminAuth.ts, etc.)
prisma/
  schema.prisma      # PostgreSQL schema (main)
  schema.postgres.prisma  # Production PostgreSQL schema reference
  seed.mjs           # Database seeder
public/
  portfolio/         # Portfolio images
```

## Environment Variables
- `DATABASE_URL` — Managed by Replit (PostgreSQL)
- `ADMIN_SESSION_SECRET` — Used to sign admin session cookies
- `RESEND_API_KEY` — (Optional) For email notifications via Resend
- `RESEND_FROM` — (Optional) Sender email address

## Admin Access
- URL: `/admin`
- Email: `admin@momento.rdc`
- Password: `Admin123!`

## Development
- Dev server runs on port 5000 via `npx next dev -p 5000 -H 0.0.0.0`
- Database: PostgreSQL (Replit-managed)
- Prisma schema uses PostgreSQL provider

## Deployment
- Build: `npm run build`
- Start: `npm run start`
- Target: autoscale

## Recent Changes
- 2026-02-18: Initial Replit setup
  - Switched from SQLite to PostgreSQL
  - Updated Prisma schema to use PostgreSQL provider
  - Configured Next.js for Replit proxy (cache headers)
  - Set up database seeding with sample data
  - Configured deployment for autoscale
