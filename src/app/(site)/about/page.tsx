import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { Reveal } from "@/components/motion/Reveal";
import { SimpleMarkdown } from "@/components/content/SimpleMarkdown";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description: "About Momento RDC. Luxury wedding photography & films in RDC, France, worldwide.",
};

export default async function AboutPage() {
  const content = await prisma.siteContent.findUnique({ where: { id: 1 } });
  return (
    <div className="w-full px-5 md:px-8 lg:px-12 py-16">
      <Reveal>
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
            About
          </div>
          <h1 className="mt-3 font-[var(--font-display)] text-4xl tracking-[0.08em] uppercase md:text-5xl">
            Storytelling, elevated.
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-ivory/65 md:text-base">
            A premium, emotion-driven approach to weddings and destination stories.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="rounded-3xl border border-line bg-white/3 p-10 md:p-14">
            <p className="text-base leading-relaxed text-ivory/78">
              {content?.brandPresentation ||
                "Momento est une entreprise de photographes et vidéographes passionnés, engagés à capturer les moments les plus précieux de votre journée de mariage. Nous croyons que chaque mariage est unique et nous travaillons dur pour offrir des photos et des vidéos de qualité qui reflètent cette individualité."}
            </p>
            <p className="mt-6 text-base leading-relaxed text-ivory/78">
              {content?.brandPromise ||
                "Nous croyons que chaque mariage est unique et mérite d'être capturé de manière authentique et émouvante. Ce serait un grand honneur et un plaisir pour nous de faire partie de votre journée spéciale et d'immortaliser vos souvenirs les plus précieux. Contactez-nous pour discuter de la manière dont nous pouvons immortaliser l’un des plus beaux jours de votre vie."}
            </p>
          </div>
          <div className="mt-6 rounded-3xl border border-line bg-white/3 p-10 md:p-14">
            <SimpleMarkdown text={content?.aboutMarkdown || ""} />
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="sticky top-28 rounded-3xl border border-line bg-[radial-gradient(900px_500px_at_20%_20%,rgba(15,76,92,0.18),transparent_60%)] p-10 grain">
            <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
              Worldwide
            </div>
            <div className="mt-3 font-[var(--font-display)] text-2xl tracking-[0.08em] uppercase">
              RDC · France · Destination
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ivory/65">
              We travel for the right stories. Share your vision and date, and we will
              confirm availability.
            </p>
            <div className="mt-8">
              <Button href="/contact" className="w-full">
                Book a date
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
