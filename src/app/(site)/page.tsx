import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { getSiteContent, heroImageOf } from "@/lib/siteContent";
import { CinematicHero } from "@/components/home/CinematicHero";
import { IntroSection } from "@/components/home/IntroSection";
import { ApproachSection } from "@/components/home/ApproachSection";
import { HeroOverlap } from "@/components/home/HeroOverlap";
import { LoveShine } from "@/components/home/LoveShine";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { ReadySection } from "@/components/home/ReadySection";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const content = await getSiteContent();
  const testimonials = await prisma.testimonial.findMany({
    where: { featured: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    take: 6,
  });

  return (
    <div>
      <h1 className="sr-only">
        Momento – Photographe et vidéaste de mariage à Paris, en France, en Belgique et à Kinshasa
      </h1>
      <CinematicHero
        title=""
        subtitle="Photographe & Vidéaste de Mariage – Destination Wedding & Films d’Exception"
        ctaText="Découvrir nos mariages"
        ctaHref="/portfolio/mariages"
        nowBookingText={content?.nowBookingText || "Now booking 2026–2027"}
        videoUrl={content?.heroVideoUrl || null}
        imageUrl={heroImageOf(content?.heroImageUrl)}
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
