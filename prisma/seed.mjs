import { PrismaClient, ProjectCategory, MediaType } from "@prisma/client";
import bcrypt from "bcryptjs";

// Idempotent seed: creates missing data only, never overwrites what was edited in the admin.
const prisma = new PrismaClient();

const LEGAL_MARKDOWN = `## Éditeur du site

Le site Momento est édité par Momento, studio de photographie et de vidéo de mariage basé à Kinshasa (RDC) et Paris (France).

- Téléphone RDC : +243 827447747
- Téléphone France : +33 758732532
- Instagram : @momento_rdc

## Hébergement

Le site est hébergé par un prestataire d'hébergement web professionnel. Ses coordonnées sont disponibles sur simple demande.

## Propriété intellectuelle

L'ensemble des photographies, vidéos, textes et éléments graphiques présents sur ce site sont la propriété exclusive de Momento. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.

## Données personnelles

Les informations transmises via le formulaire de contact (nom, email, téléphone, date et lieu de l'événement, message) sont utilisées uniquement pour répondre à votre demande et préparer votre prestation. Elles ne sont jamais revendues ni cédées à des tiers.

Elles sont conservées pendant la durée nécessaire au traitement de votre demande, puis au maximum 3 ans après le dernier contact.

Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer, contactez-nous par téléphone, WhatsApp ou Instagram.

## Cookies

Ce site n'utilise pas de cookies publicitaires ni de traceurs tiers. Seuls des cookies techniques strictement nécessaires au fonctionnement de l'espace d'administration sont utilisés.`;

const LEGACY_HERO = "https://images.unsplash.com/photo-1523438097201-512ae7d59a34";

async function main() {
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@momento.rdc").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin123!";

  const existingAdmin = await prisma.adminUser.count();
  if (existingAdmin === 0) {
    await prisma.adminUser.create({
      data: { email: adminEmail, passwordHash: await bcrypt.hash(adminPassword, 12) },
    });
    console.log(`Admin created: ${adminEmail}`);
  }

  const content = await prisma.siteContent.findUnique({ where: { id: 1 } });
  if (!content) {
    await prisma.siteContent.create({
      data: { id: 1, heroImageUrl: "/hero/hero.jpg", legalMarkdown: LEGAL_MARKDOWN },
    });
  } else {
    // Repair values left by older versions of the seed / schema defaults.
    const fix = {};
    if (!content.heroImageUrl || content.heroImageUrl.startsWith(LEGACY_HERO)) fix.heroImageUrl = "/hero/hero.jpg";
    if (!content.legalMarkdown.trim() || /A completer|\\n/.test(content.legalMarkdown)) {
      fix.legalMarkdown = LEGAL_MARKDOWN;
    }
    if (Object.keys(fix).length) await prisma.siteContent.update({ where: { id: 1 }, data: fix });
  }

  const projects = [
    {
      title: "Lyse & Anthony",
      slug: "lyse-anthony",
      category: ProjectCategory.WEDDING,
      location: "RDC",
      date: new Date("2025-09-14"),
      tags: "wedding,luxury,rdc",
      featured: true,
      coverUrl: "/portfolio/mariage/portfolio_mariage_1.jpg",
      description:
        "Un mariage élégant capturé dans la lumière dorée. Des instants d'émotion pure et d'amour intemporel.",
      media: [
        "/portfolio/mariage/portfolio_mariage_1.jpg",
        "/portfolio/mariage/portfolio_mariage_2.jpg",
        "/portfolio/mariage/portfolio_mariage_3.jpg",
        "/portfolio/mariage/portfolio_mariage_4.jpg",
        "/portfolio/mariage/portfolio_mariage_5.jpg",
        "/portfolio/mariage/portfolio_mariage_6.jpg",
        "/portfolio/mariage/portfolio_mariage_7.jpg",
        "/portfolio/mariage/portfolio_mariage_8.jpg",
      ],
    },
    {
      title: "Arianne & Theo",
      slug: "arianne-theo",
      category: ProjectCategory.WEDDING,
      location: "France",
      date: new Date("2025-05-03"),
      tags: "wedding,editorial,france",
      featured: true,
      coverUrl: "/portfolio/save_the_date/portfolio_std_1.jpg",
      description:
        "Un engagement éditorial raffiné : tons profonds, stylisme minimal et storytelling intimiste.",
      media: [
        "/portfolio/save_the_date/portfolio_std_1.jpg",
        "/portfolio/save_the_date/portfolio_std_2.jpg",
        "/portfolio/save_the_date/portfolio_std_3.jpg",
      ],
    },
    {
      title: "Morgane & Ronald",
      slug: "morgane-ronald",
      category: ProjectCategory.WEDDING,
      location: "RDC",
      date: new Date("2024-08-21"),
      tags: "wedding,destination,rdc",
      featured: true,
      coverUrl: "/portfolio/mariage/portfolio_mariage_15.jpg",
      description:
        "Un mariage destination cinématographique : lumière naturelle, mouvements lents et une esthétique intemporelle.",
      media: [
        "/portfolio/mariage/portfolio_mariage_15.jpg",
        "/portfolio/mariage/portfolio_mariage_16.jpg",
        "/portfolio/mariage/portfolio_mariage_17.jpg",
        "/portfolio/mariage/portfolio_mariage_18.jpg",
        "/portfolio/mariage/portfolio_mariage_19.jpg",
      ],
    },
    {
      title: "Portraits Yoceane",
      slug: "portraits-yoceane",
      category: ProjectCategory.PORTRAIT,
      location: "Dubai",
      date: new Date("2025-01-15"),
      tags: "portrait,editorial,dubai",
      featured: true,
      coverUrl: "/portfolio/save_the_date/portfolio_std_29.jpg",
      description:
        "Séance portrait éditoriale à Dubai. Élégance et lumière naturelle.",
      media: [
        "/portfolio/save_the_date/portfolio_std_29.jpg",
        "/portfolio/save_the_date/portfolio_std_24.jpg",
        "/portfolio/save_the_date/portfolio_std_25.jpg",
        "/portfolio/save_the_date/portfolio_std_26.jpg",
        "/portfolio/save_the_date/portfolio_std_27.jpg",
        "/portfolio/save_the_date/portfolio_std_28.jpg",
      ],
    },
    {
      title: "Portrait Divana",
      slug: "portrait-divana",
      category: ProjectCategory.PORTRAIT,
      location: "Studio",
      date: new Date("2025-03-10"),
      tags: "portrait,studio",
      featured: false,
      coverUrl: "/portfolio/mariage/portfolio_mariage_3.jpg",
      description:
        "Portrait studio avec une direction artistique soignée.",
      media: [
        "/portfolio/mariage/portfolio_mariage_3.jpg",
        "/portfolio/mariage/portfolio_mariage_1.jpg",
        "/portfolio/mariage/portfolio_mariage_27.jpg",
      ],
    },
    {
      title: "Josiane & Pacifique",
      slug: "josiane-pacifique",
      category: ProjectCategory.WEDDING,
      location: "RDC",
      date: new Date("2025-06-20"),
      tags: "wedding,rdc",
      featured: false,
      coverUrl: "/portfolio/save_the_date/portfolio_std_12.jpg",
      description:
        "Mariage élégant et authentique au cœur de la RDC.",
      media: [
        "/portfolio/save_the_date/portfolio_std_12.jpg",
      ],
    },
  ];

  for (const { media, ...p } of projects) {
    const exists = await prisma.project.findUnique({ where: { slug: p.slug }, select: { id: true } });
    if (exists) continue;
    await prisma.project.create({
      data: {
        ...p,
        media: {
          create: media.map((url, order) => ({
            type: MediaType.IMAGE,
            url,
            alt: `${p.title} – photo de mariage Momento`,
            order,
          })),
        },
      },
    });
  }

  const testimonials = [
    {
      name: "Amina & Theo",
      detail: "Kinshasa · Wedding",
      message:
        "Une équipe exceptionnelle. Les images sont élégantes, vraies, et pleines d'émotion.",
      rating: 5,
      featured: true,
      order: 1,
    },
    {
      name: "Claire & Idriss",
      detail: "Paris · Engagement",
      message:
        "Direction artistique parfaite, résultat premium, communication fluide du début à la fin.",
      rating: 5,
      featured: true,
      order: 2,
    },
    {
      name: "Nadine",
      detail: "Goma · Event",
      message:
        "Ils capturent des instants qu'on ne voit même pas sur le moment. Magnifique travail.",
      rating: 5,
      featured: true,
      order: 3,
    },
    {
      name: "Marc & Sofia",
      detail: "Lake Como · Destination Film",
      message:
        "Le film ressemble à un court-métrage cinéma. Chaque plan raconte notre histoire.",
      rating: 5,
      featured: true,
      order: 4,
    },
    {
      name: "Rachel",
      detail: "Lubumbashi · Wedding",
      message:
        "Très professionnels, discrets, et un rendu final au-dessus de nos attentes.",
      rating: 5,
      featured: false,
      order: 5,
    },
    {
      name: "David & Emma",
      detail: "Bordeaux · Couple Session",
      message:
        "Un style authentique et cinématique. Chaque photo est forte sans être artificielle.",
      rating: 4,
      featured: false,
      order: 6,
    },
  ];

  for (const t of testimonials) {
    const exists = await prisma.testimonial.findUnique({
      where: { name_detail: { name: t.name, detail: t.detail } },
      select: { id: true },
    });
    if (!exists) await prisma.testimonial.create({ data: t });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
