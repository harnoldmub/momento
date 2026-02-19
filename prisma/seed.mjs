import { PrismaClient, ProjectCategory, MediaType, InquiryType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@momento.rdc";
  const adminPassword = "Admin123!";

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: { email: adminEmail, passwordHash },
  });

  await prisma.siteContent.upsert({
    where: { id: 1 },
    update: {
      brandPresentation:
        "Momento est une entreprise de photographes et vidéographes passionnés, engagés à capturer les moments les plus précieux de votre journée de mariage. Nous croyons que chaque mariage est unique et nous travaillons dur pour offrir des photos et des vidéos de qualité qui reflètent cette individualité.",
      brandPromise:
        "Nous croyons que chaque mariage est unique et mérite d'être capturé de manière authentique et émouvante. Ce serait un grand honneur et un plaisir pour nous de faire partie de votre journée spéciale et d'immortaliser vos souvenirs les plus précieux. Contactez-nous pour discuter de la manière dont nous pouvons immortaliser l'un des plus beaux jours de votre vie.",
      microText1: "Chaque regard raconte une histoire.",
      microText2: "L'émotion d'un instant. La beauté pour toujours.",
      microText3: "Des images vraies, une esthétique cinématique.",
      microText4: "Votre journée, votre signature.",
      microText5: "Capturer l'invisible : les frissons.",
    },
    create: {
      id: 1,
      heroTitle: "Momento RDC",
      heroSubtitle: "Luxury & Destination Weddings",
      heroCtaText: "Book a date",
      heroCtaHref: "/contact",
      heroVideoUrl: "",
      heroImageUrl: "/hero/hero.jpg",
      nowBookingText: "Now booking 2026–2027",
      contactPhoneCongo: "+243 827447747",
      contactPhoneFrance: "+33 758732532",
      instagramHandle: "momento_rdc",
      brandPresentation:
        "Momento est une entreprise de photographes et vidéographes passionnés, engagés à capturer les moments les plus précieux de votre journée de mariage. Nous croyons que chaque mariage est unique et nous travaillons dur pour offrir des photos et des vidéos de qualité qui reflètent cette individualité.",
      brandPromise:
        "Nous croyons que chaque mariage est unique et mérite d'être capturé de manière authentique et émouvante. Ce serait un grand honneur et un plaisir pour nous de faire partie de votre journée spéciale et d'immortaliser vos souvenirs les plus précieux. Contactez-nous pour discuter de la manière dont nous pouvons immortaliser l'un des plus beaux jours de votre vie.",
      microText1: "Chaque regard raconte une histoire.",
      microText2: "L'émotion d'un instant. La beauté pour toujours.",
      microText3: "Des images vraies, une esthétique cinématique.",
      microText4: "Votre journée, votre signature.",
      microText5: "Capturer l'invisible : les frissons.",
      aboutMarkdown:
        "## Momento\\n\\nLuxury wedding photography & films. Based in RDC + France. Available worldwide.\\n\\nWe craft cinematic stories with timeless elegance: light, texture, movement, emotion.",
      legalMarkdown:
        "## Mentions legales\\n\\nA completer.\\n\\n## Privacy\\n\\nA completer.",
    },
  });

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

  for (const p of projects) {
    const project = await prisma.project.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        category: p.category,
        coverUrl: p.coverUrl,
        description: p.description,
        date: p.date,
        location: p.location,
        tags: p.tags,
        featured: p.featured,
      },
      create: {
        title: p.title,
        slug: p.slug,
        category: p.category,
        coverUrl: p.coverUrl,
        description: p.description,
        date: p.date,
        location: p.location,
        tags: p.tags,
        featured: p.featured,
      },
    });

    const existing = await prisma.media.findMany({
      where: { projectId: project.id },
      select: { id: true, type: true, order: true },
      orderBy: { order: "asc" },
    });
    if (existing.length === 0) {
      let order = 0;
      for (const url of p.media) {
        await prisma.media.create({
          data: {
            projectId: project.id,
            type: MediaType.IMAGE,
            url,
            alt: `${p.title} photo`,
            order: order++,
          },
        });
      }
    }
  }

  const leadCount = await prisma.lead.count();
  if (leadCount === 0) {
    await prisma.lead.createMany({
      data: [
        {
          name: "Sarah K.",
          email: "sarah@example.com",
          whatsapp: "+243 800000000",
          location: "Goma, RDC",
          inquiryType: InquiryType.WEDDING,
          message: "Bonjour Momento, nous aimerions réserver une date de mariage en 2026.",
        },
        {
          name: "Marc D.",
          email: "marc@example.com",
          whatsapp: "+33 600000000",
          location: "Lyon, France",
          inquiryType: InquiryType.FILM,
          message: "Nous cherchons un film de mariage cinématographique pour 2027. Quels sont vos forfaits ?",
        },
      ],
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
    await prisma.testimonial.upsert({
      where: { name_detail: { name: t.name, detail: t.detail } },
      update: {
        message: t.message,
        rating: t.rating,
        featured: t.featured,
        order: t.order,
      },
      create: t,
    });
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
