import { prisma } from "@/lib/db";
import { CinematicHero } from "@/components/home/CinematicHero";
import { IntroSection } from "@/components/home/IntroSection";
import { ApproachSection } from "@/components/home/ApproachSection";
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
        title=""
        subtitle="Photographe & Vidéaste de Mariage – Destination Wedding & Films d’Exception"
        ctaText="Découvrir nos mariages"
        ctaHref="/portfolio/mariages"
        nowBookingText={content?.nowBookingText || "Now booking 2026–2027"}
        videoUrl={content?.heroVideoUrl || null}
        imageUrl="/hero/hero.jpg"
      />

      <IntroSection />

      <ApproachSection />

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
