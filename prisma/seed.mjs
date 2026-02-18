import { PrismaClient, ProjectCategory, MediaType, InquiryType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function unsplash(id, w = 2400) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

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
        "Nous croyons que chaque mariage est unique et mérite d'être capturé de manière authentique et émouvante. Ce serait un grand honneur et un plaisir pour nous de faire partie de votre journée spéciale et d'immortaliser vos souvenirs les plus précieux. Contactez-nous pour discuter de la manière dont nous pouvons immortaliser l’un des plus beaux jours de votre vie.",
      microText1: "Chaque regard raconte une histoire.",
      microText2: "L’émotion d’un instant. La beauté pour toujours.",
      microText3: "Des images vraies, une esthétique cinématique.",
      microText4: "Votre journée, votre signature.",
      microText5: "Capturer l’invisible : les frissons.",
    },
    create: {
      id: 1,
      heroTitle: "Momento RDC",
      heroSubtitle: "Luxury & Destination Weddings",
      heroCtaText: "Book a date",
      heroCtaHref: "/contact",
      heroVideoUrl: "",
      heroImageUrl: unsplash("photo-1523438097201-512ae7d59a34"),
      nowBookingText: "Now booking 2026–2027",
      contactPhoneCongo: "+243 827447747",
      contactPhoneFrance: "+33 758732532",
      instagramHandle: "momento_rdc",
      brandPresentation:
        "Momento est une entreprise de photographes et vidéographes passionnés, engagés à capturer les moments les plus précieux de votre journée de mariage. Nous croyons que chaque mariage est unique et nous travaillons dur pour offrir des photos et des vidéos de qualité qui reflètent cette individualité.",
      brandPromise:
        "Nous croyons que chaque mariage est unique et mérite d'être capturé de manière authentique et émouvante. Ce serait un grand honneur et un plaisir pour nous de faire partie de votre journée spéciale et d'immortaliser vos souvenirs les plus précieux. Contactez-nous pour discuter de la manière dont nous pouvons immortaliser l’un des plus beaux jours de votre vie.",
      microText1: "Chaque regard raconte une histoire.",
      microText2: "L’émotion d’un instant. La beauté pour toujours.",
      microText3: "Des images vraies, une esthétique cinématique.",
      microText4: "Votre journée, votre signature.",
      microText5: "Capturer l’invisible : les frissons.",
      aboutMarkdown:
        "## Momento\\n\\nLuxury wedding photography & films. Based in RDC + France. Available worldwide.\\n\\nWe craft cinematic stories with timeless elegance: light, texture, movement, emotion.",
      legalMarkdown:
        "## Mentions legales\\n\\nA completer.\\n\\n## Privacy\\n\\nA completer.",
    },
  });

  const projects = [
    {
      title: "Amina & Theo",
      slug: "amina-theo-kinshasa",
      category: ProjectCategory.WEDDING,
      location: "Kinshasa, RDC",
      date: new Date("2025-09-14"),
      tags: "wedding,luxury,kinshasa",
      featured: true,
      coverUrl: unsplash("photo-1520854221256-17451cc331bf"),
      description:
        "A modern luxury wedding with warm light, clean details, and a cinematic evening reception.",
      media: [
        unsplash("photo-1520854221256-17451cc331bf", 2200),
        unsplash("photo-1529626455594-4ff0802cfb7e", 2200),
        unsplash("photo-1524492412937-b28074a5d7da", 2200),
        unsplash("photo-1520857014576-2c4f4c972b57", 2200),
        unsplash("photo-1529634806980-85c3dd6d34ac", 2200),
      ],
    },
    {
      title: "Claire & Idriss",
      slug: "claire-idriss-paris",
      category: ProjectCategory.ENGAGEMENT,
      location: "Paris, France",
      date: new Date("2025-05-03"),
      tags: "engagement,paris,editorial",
      featured: true,
      coverUrl: unsplash("photo-1519741497674-611481863552"),
      description:
        "An editorial engagement session in Paris: minimal styling, deep tones, and intimate storytelling.",
      media: [
        unsplash("photo-1519741497674-611481863552", 2200),
        unsplash("photo-1519741497674-611481863552", 2200),
        unsplash("photo-1524504388940-b1c1722653e1", 2200),
        unsplash("photo-1524503033411-f097537851c8", 2200),
        unsplash("photo-1518623489648-a173ef7824f3", 2200),
      ],
    },
    {
      title: "Destination Film: Lake Como",
      slug: "destination-film-lake-como",
      category: ProjectCategory.FILMS,
      location: "Lake Como, Italy",
      date: new Date("2024-08-21"),
      tags: "film,destination,italy",
      featured: true,
      coverUrl: unsplash("photo-1500530855697-b586d89ba3ee"),
      description:
        "A destination wedding film concept: light on water, slow motion, and timeless music-driven pacing.",
      media: [
        // Mix of images + a video embed placeholder
        unsplash("photo-1500530855697-b586d89ba3ee", 2200),
        unsplash("photo-1523438097201-512ae7d59a34", 2200),
        unsplash("photo-1526779259212-939e64788e3c", 2200),
        unsplash("photo-1517457373958-b7bdd4587205", 2200),
        unsplash("photo-1519741497674-611481863552", 2200),
      ],
      // Use a direct MP4 so the lightbox video plugin can play it.
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
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
      if (p.videoUrl) {
        await prisma.media.create({
          data: {
            projectId: project.id,
            type: MediaType.VIDEO,
            url: p.videoUrl,
            alt: `${p.title} film`,
            order: order++,
          },
        });
      }
    } else if (p.videoUrl) {
      const video = existing.find((m) => m.type === MediaType.VIDEO);
      if (video) {
        await prisma.media.update({ where: { id: video.id }, data: { url: p.videoUrl } });
      } else {
        const maxOrder = existing.reduce((acc, m) => Math.max(acc, m.order), -1);
        await prisma.media.create({
          data: {
            projectId: project.id,
            type: MediaType.VIDEO,
            url: p.videoUrl,
            alt: `${p.title} film`,
            order: maxOrder + 1,
          },
        });
      }
    }
  }

  await prisma.media.updateMany({
    where: { url: { contains: "photo-1520975958225-3d9f70f3f81b" } },
    data: { url: unsplash("photo-1519741497674-611481863552", 2200) },
  });

  // A couple of sample leads for admin UI testing.
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
          message: "Hi Momento, we would love to book a wedding date in 2026.",
        },
        {
          name: "Marc D.",
          email: "marc@example.com",
          whatsapp: "+33 600000000",
          location: "Lyon, France",
          inquiryType: InquiryType.FILM,
          message: "Looking for a cinematic destination film in 2027. What are your packages?",
        },
      ],
    });
  }

  const testimonials = [
    {
      name: "Amina & Theo",
      detail: "Kinshasa · Wedding",
      message:
        "Une équipe exceptionnelle. Les images sont élégantes, vraies, et pleines d’émotion.",
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
        "Ils capturent des instants qu’on ne voit même pas sur le moment. Magnifique travail.",
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
