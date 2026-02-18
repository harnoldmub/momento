import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { Reveal } from "@/components/motion/Reveal";
import { PortfolioClient } from "@/components/portfolio/PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Luxury wedding photography & films. Browse featured stories and projects.",
};

export default async function PortfolioPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ updatedAt: "desc" }],
    include: { media: { orderBy: { order: "asc" } } },
  });

  return (
    <div className="w-full px-5 md:px-8 lg:px-12 py-16">
      <Reveal>
        <div className="max-w-2xl">
          <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
            Portfolio
          </div>
          <h1 className="mt-3 font-[var(--font-display)] text-4xl tracking-[0.08em] uppercase md:text-5xl">
            Stories, not just images.
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-ivory/65">
            Weddings, engagements, couples, events, and films. Tap a project to view it
            full-screen.
          </p>
        </div>
      </Reveal>

      <div className="mt-10">
        <PortfolioClient projects={projects} />
      </div>
    </div>
  );
}

