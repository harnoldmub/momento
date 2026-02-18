import { prisma } from "@/lib/db";
import { CinematicHero } from "@/components/home/CinematicHero";
import { HeroOverlap } from "@/components/home/HeroOverlap";
import { LoveShine } from "@/components/home/LoveShine";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { ReadySection } from "@/components/home/ReadySection";

export default async function HomePage() {
  const content = await prisma.siteContent.findUnique({ where: { id: 1 } });
  const testimonials = await prisma.testimonial.findMany({
    where: { featured: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    take: 6,
  });

  return (
    <div>
      <CinematicHero
        title="Photographe & Vid\u00e9aste de Mariage"
        subtitle="Il y a des instants qui ne se r\u00e9p\u00e8tent jamais. Un regard avant l\u2019autel. Une main qui tremble l\u00e9g\u00e8rement. Un sourire qui dit \u00ab\u00a0pour toujours\u00a0\u00bb."
        ctaText="D\u00e9couvrir notre univers"
        ctaHref="/portfolio"
        nowBookingText={content?.nowBookingText || "Now booking 2026\u20132027"}
        videoUrl={content?.heroVideoUrl || ""}
        imageUrl="/portfolio/lyse---anthony-1-6.jpg"
      />

      <HeroOverlap />

      <LoveShine />

      <TestimonialCarousel
        testimonials={testimonials.map((t) => ({
          id: t.id,
          name: t.name,
          detail: t.detail,
          message: t.message,
          rating: t.rating,
        }))}
      />

      <GalleryPreview />

      <ReadySection />
    </div>
  );
}
