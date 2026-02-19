import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/db";
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
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.description || `Project by Momento. ${project.location}`,
    openGraph: {
      title: project.title,
      images: [{ url: project.coverUrl }],
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

  return (
    <div>
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src={project.coverUrl}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

        <div className="relative flex h-full items-end pb-16 px-6 md:px-10 lg:px-16">
          <div className="mx-auto max-w-[1400px] w-full">
            <div className="text-[11px] tracking-[0.35em] uppercase text-white/50 mb-3">
              {CATEGORY_LABEL[project.category]}
              {project.location ? ` \u00b7 ${project.location}` : ""}
              {project.date ? ` \u00b7 ${project.date.toISOString().slice(0, 10)}` : ""}
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
                <Button href="/portfolio/mariages" variant="outline">
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
