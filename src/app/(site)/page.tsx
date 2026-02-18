import { prisma } from "@/lib/db";
import { CinematicHero } from "@/components/home/CinematicHero";
import { EditorialReveal } from "@/components/home/EditorialReveal";
import { HeroOverlap } from "@/components/home/HeroOverlap";
import { LoveShine } from "@/components/home/LoveShine";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { CinematicSection } from "@/components/home/CinematicSection";
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
        title="Momento"
        subtitle="Photographe & vidéaste de mariage. Des instants qui ne se répètent jamais, capturés avec art et émotion."
        ctaText="Découvrir notre univers"
        ctaHref="/portfolio"
        nowBookingText={content?.nowBookingText || "Now booking 2026–2027"}
        videoUrl={content?.heroVideoUrl || null}
        imageUrl="/portfolio/lyse---anthony-1-6.jpg"
      />

      <EditorialReveal />

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

      <CinematicSection />

      <ReadySection />
    </div>
  );
}
