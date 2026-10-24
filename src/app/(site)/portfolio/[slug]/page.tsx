import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { coverOf } from "@/lib/siteContent";
import { getSiteUrl } from "@/lib/env";
import { jsonLdString } from "@/lib/seo";
import { CATEGORY_LABEL } from "@/components/portfolio/category";
import { ProjectGallery } from "@/components/portfolio/ProjectGallery";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const project = await prisma.project.findUnique({
    where: { slug },
    include: { media: { orderBy: { order: "asc" } } },
  });
  if (!project) return { title: "Projet introuvable" };
  const place = project.location ? ` à ${project.location}` : "";
  return {
    title: `${project.title} – ${CATEGORY_LABEL[project.category]}${place}`,
    alternates: { canonical: `/portfolio/${project.slug}` },
    description: project.description || `Reportage Momento${project.location ? ` \u00b7 ${project.location}` : ""}`,
    openGraph: {
      type: "article",
      title: `${project.title} – Momento`,
      images: [{ url: coverOf(project) }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const project = await prisma.project.findUnique({
    where: { slug },
    include: { media: { orderBy: { order: "asc" } } },
  });
  if (!project) return notFound();

  const base = getSiteUrl();
  const abs = (u: string) => (u.startsWith("http") ? u : `${base}${u}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: project.title,
    description: project.description || undefined,
    url: `${base}/portfolio/${project.slug}`,
    image: project.media.filter((m) => m.type === "IMAGE").slice(0, 20).map((m) => abs(m.url)),
    contentLocation: project.location ? { "@type": "Place", name: project.location } : undefined,
    dateCreated: project.date?.toISOString().slice(0, 10),
    author: { "@id": `${base}/#business` },
    keywords: project.tags || undefined,
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src={coverOf(project)}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

        <div className="relative flex h-full items-end pb-16 px-6 md:px-10 lg:px-16">
          <div className="mx-auto max-w-[1400px] w-full">
            <div className="text-[11px] tracking-[0.35em] uppercase text-white/50 mb-3">
              {CATEGORY_LABEL[project.category]}
              {project.location ? ` \u00b7 ${project.location}` : ""}
              {project.date ? ` \u00b7 ${project.date.toLocaleDateString("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" })}` : ""}
            </div>
            <h1 className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl tracking-[0.04em] uppercase text-white">
              {project.title}
            </h1>
            {project.description && (
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55">
                {project.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
          <ProjectGallery media={project.media} />
        </div>
      </section>

      <section className="border-t border-line py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
          <Reveal>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="font-[var(--font-display)] text-2xl md:text-3xl tracking-[0.06em] uppercase">
                  Votre histoire pourrait &ecirc;tre la prochaine
                </h2>
                <p className="mt-3 text-sm text-ivory/50">
                  Partagez votre date, lieu et vision. Nous r&eacute;pondons avec disponibilit&eacute; et proposition.
                </p>
              </div>
              <div className="flex gap-4">
                <Button href="/contact">Parlons de votre mariage</Button>
                <Button href="/portfolio" variant="outline">
                  Retour au portfolio
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
