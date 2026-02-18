import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { Reveal } from "@/components/motion/Reveal";
import { PortfolioClient } from "@/components/portfolio/PortfolioClient";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Nos R\u00e9alisations \u2013 Des Histoires d\u2019Amour \u00e0 Travers le Monde. Photographie et film de mariage international.",
};

export default async function PortfolioPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ updatedAt: "desc" }],
    include: { media: { orderBy: { order: "asc" } } },
  });

  return (
    <div>
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="/portfolio/lyse---anthony-5.jpg"
          alt="Portfolio Momento"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative flex h-full items-end pb-16 px-6 md:px-10 lg:px-16">
          <div className="mx-auto max-w-[1400px] w-full">
            <div className="text-[11px] tracking-[0.35em] uppercase text-white/50 mb-4">
              Portfolio
            </div>
            <h1 className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl tracking-[0.04em] uppercase text-white max-w-3xl">
              Nos R&eacute;alisations
            </h1>
            <p className="mt-4 text-sm text-white/55 max-w-xl leading-relaxed">
              Chaque image raconte une promesse. Chaque film capture une &eacute;motion.
              Bienvenue dans notre portfolio de photographie et film de mariage international.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-4 mb-16 text-center md:text-left">
              <div className="border border-line p-6">
                <div className="text-xs tracking-[0.2em] uppercase text-ivory/35 mb-2">Signature</div>
                <p className="text-sm text-ivory/60">Couleurs naturelles et raffin&eacute;es</p>
              </div>
              <div className="border border-line p-6">
                <div className="text-xs tracking-[0.2em] uppercase text-ivory/35 mb-2">Narration</div>
                <p className="text-sm text-ivory/60">Fluide et immersive</p>
              </div>
              <div className="border border-line p-6">
                <div className="text-xs tracking-[0.2em] uppercase text-ivory/35 mb-2">Approche</div>
                <p className="text-sm text-ivory/60">Cin&eacute;matographique</p>
              </div>
              <div className="border border-line p-6">
                <div className="text-xs tracking-[0.2em] uppercase text-ivory/35 mb-2">D&eacute;tails</div>
                <p className="text-sm text-ivory/60">Attention obsessionnelle</p>
              </div>
            </div>
          </Reveal>

          <PortfolioClient projects={projects} />
        </div>
      </section>
    </div>
  );
}
