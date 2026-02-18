import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { CATEGORY_LABEL } from "@/components/portfolio/category";
import { ProjectGallery } from "@/components/portfolio/ProjectGallery";
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
    description: project.description || `Project by Momento RDC. ${project.location}`,
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
  const content = await prisma.siteContent.findUnique({ where: { id: 1 } });
  const project = await prisma.project.findUnique({
    where: { slug },
    include: { media: { orderBy: { order: "asc" } } },
  });
  if (!project) return notFound();

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0">
          <Image
            src={project.coverUrl}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/70" />
          <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_60%_25%,rgba(15,76,92,0.22),transparent_60%)]" />
        </div>

        <div className="relative w-full px-5 md:px-8 lg:px-12 pb-14 pt-16 md:pb-18">
          <div className="max-w-3xl">
            <div className="text-xs tracking-[0.28em] uppercase text-ivory/65">
              {CATEGORY_LABEL[project.category]}
              {project.location ? ` · ${project.location}` : ""}
              {project.date ? ` · ${project.date.toISOString().slice(0, 10)}` : ""}
            </div>
            <h1 className="mt-4 font-[var(--font-display)] text-4xl tracking-[0.08em] uppercase md:text-6xl">
              {project.title}
            </h1>
            {project.description ? (
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ivory/70 md:text-base">
                {project.description}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/contact">Book your date</Button>
              <Button href="/portfolio" variant="outline">
                Back to portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-5 md:px-8 lg:px-12 py-16">
        <ProjectGallery media={project.media} />
      </section>

      <section className="border-t border-line bg-charcoal-2">
        <div className="w-full px-5 md:px-8 lg:px-12 py-16">
          <div className="grid gap-8 rounded-3xl border border-line bg-white/3 p-10 md:grid-cols-2 md:p-14">
            <div>
              <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
                Booking
              </div>
              <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[0.08em] uppercase">
                {content?.nowBookingText || "Now booking 2026–2027"}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-ivory/65">
                Share your date, location, and type of coverage. We respond with
                availability and a curated proposal.
              </p>
            </div>
            <div className="flex items-center md:justify-end">
              <Button href="/contact" className="w-full md:w-auto">
                Book your date
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
