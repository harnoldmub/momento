import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { coverOf } from "@/lib/siteContent";
import { FullscreenGallery } from "@/components/portfolio/FullscreenGallery";
import { ProjectsGrid } from "@/components/portfolio/ProjectsGrid";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Portfolio – Photos & Films de Mariage",
  description:
    "Portfolio Momento : reportages photo et films de mariage à Paris, en France, en Belgique, à Kinshasa et en destination wedding. Des histoires d'amour à travers le monde.",
  alternates: { canonical: "/portfolio" },
};

const allPhotos = [
  // Mariage
  ...Array.from({ length: 29 }, (_, i) => `/portfolio/mariage/portfolio_mariage_${i + 1}.jpg`),
  // Save the Date
  ...Array.from({ length: 33 }, (_, i) => `/portfolio/save_the_date/portfolio_std_${i + 1}.jpg`),
];

export default async function PortfolioPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { date: "desc" }, { createdAt: "desc" }],
    include: { media: { orderBy: { order: "asc" }, take: 1, where: { type: "IMAGE" } } },
  });

  return (
    <div className="pt-20">
      {projects.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
            <Reveal>
              <div className="mb-10 max-w-2xl">
                <div className="text-[11px] tracking-[0.35em] uppercase text-ivory/40 mb-4">
                  Portfolio
                </div>
                <h1 className="font-[var(--font-display)] text-3xl md:text-4xl tracking-[0.04em] uppercase">
                  Nos histoires
                </h1>
                <p className="mt-4 text-sm leading-relaxed text-ivory/55">
                  Des histoires d&apos;amour &agrave; travers le monde. D&eacute;couvrez chaque reportage en d&eacute;tail.
                </p>
              </div>
            </Reveal>
            <ProjectsGrid
              projects={projects.map((p) => ({
                id: p.id,
                slug: p.slug,
                title: p.title,
                category: p.category,
                coverUrl: coverOf(p),
                location: p.location,
              }))}
            />
          </div>
        </section>
      )}

      <section className={projects.length > 0 ? "border-t border-line" : ""}>
        {projects.length > 0 && (
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16 py-12">
            <h2 className="font-[var(--font-display)] text-2xl md:text-3xl tracking-[0.06em] uppercase">
              Toutes les photos
            </h2>
          </div>
        )}
        <FullscreenGallery photos={allPhotos} altPrefix="Photo de mariage Momento" />
      </section>
    </div>
  );
}
