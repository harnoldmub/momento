import { prisma } from "@/lib/db";
import { CinematicHero } from "@/components/home/CinematicHero";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Button } from "@/components/ui/Button";

function stars(rating?: number | null) {
  if (!rating) return "★★★★★";
  return "★".repeat(Math.max(1, Math.min(5, rating)));
}

export default async function HomePage() {
  const content = await prisma.siteContent.findUnique({ where: { id: 1 } });
  const testimonials = await prisma.testimonial.findMany({
    where: { featured: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    take: 6,
  });
  const featured = await prisma.project.findMany({
    where: { featured: true },
    orderBy: { updatedAt: "desc" },
    take: 3,
  });

  const microText1 = content?.microText1 || "Chaque regard raconte une histoire.";
  const microText2 =
    content?.microText2 || "L’émotion d’un instant. La beauté pour toujours.";
  const microText3 =
    content?.microText3 || "Des images vraies, une esthétique cinématique.";
  const microText4 = content?.microText4 || "Votre journée, votre signature.";
  const microText5 =
    content?.microText5 || "Capturer l’invisible : les frissons.";

  return (
    <div>
      <CinematicHero
        title={content?.heroTitle || "Momento RDC"}
        subtitle={content?.heroSubtitle || "Luxury & Destination Weddings"}
        ctaText={content?.heroCtaText || "Book a date"}
        ctaHref={content?.heroCtaHref || "/contact"}
        nowBookingText={content?.nowBookingText || "Now booking 2026–2027"}
        videoUrl={content?.heroVideoUrl || ""}
        imageUrl={content?.heroImageUrl || ""}
      />

      <section className="w-full px-5 md:px-8 lg:px-12 py-20">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
                Notre promesse
              </div>
              <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[0.08em] uppercase md:text-4xl">
                {microText1}
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="rounded-3xl border border-line bg-white/3 p-8 md:p-10">
                <p className="text-base leading-relaxed text-ivory/78">
                  {content?.brandPresentation ||
                    "Momento est une entreprise de photographes et vidéographes passionnés, engagés à capturer les moments les plus précieux de votre journée de mariage. Nous croyons que chaque mariage est unique et nous travaillons dur pour offrir des photos et des vidéos de qualité qui reflètent cette individualité."}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-line bg-charcoal-2">
        <div className="w-full px-5 md:px-8 lg:px-12 py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
                  Notre approche
                </div>
                <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[0.08em] uppercase md:text-4xl">
                  Avant. Pendant. Après.
                </h2>
              </div>
              <div className="text-sm text-ivory/62">{microText3}</div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Reveal delay={0.03}>
              <div className="rounded-2xl border border-line bg-white/3 p-8">
                <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
                  01 · Avant
                </div>
                <h3 className="mt-3 font-[var(--font-display)] text-2xl tracking-[0.08em] uppercase">
                  Vision & direction
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-ivory/65">
                  Nous alignons votre esthétique, vos priorités et votre timeline pour
                  créer une narration claire et élégante.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="rounded-2xl border border-line bg-white/3 p-8">
                <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
                  02 · Pendant
                </div>
                <h3 className="mt-3 font-[var(--font-display)] text-2xl tracking-[0.08em] uppercase">
                  Présence & émotion
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-ivory/65">
                  Une présence discrète, des images vraies, une direction subtile quand il
                  faut, pour capturer l’instant sans le figer.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.09}>
              <div className="rounded-2xl border border-line bg-white/3 p-8">
                <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
                  03 · Après
                </div>
                <h3 className="mt-3 font-[var(--font-display)] text-2xl tracking-[0.08em] uppercase">
                  Édition & héritage
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-ivory/65">
                  Nous livrons un rendu cohérent, cinématique et intemporel, pensé pour
                  durer et se transmettre.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="w-full px-5 md:px-8 lg:px-12 py-20">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
                Featured stories
              </div>
              <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[0.08em] uppercase md:text-4xl">
                {microText2}
              </h2>
            </div>
            <Button href="/portfolio" variant="outline" className="hidden md:inline-flex">
              View all
            </Button>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((p) => (
            <Reveal key={p.id} delay={0.05}>
              <ProjectCard
                slug={p.slug}
                title={p.title}
                category={p.category}
                coverUrl={p.coverUrl}
                location={p.location}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-charcoal-2">
        <div className="w-full px-5 md:px-8 lg:px-12 py-20">
          <Reveal>
            <div className="grid gap-10 md:grid-cols-3">
              <div className="md:col-span-1">
                <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
                  Services
                </div>
                <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[0.08em] uppercase">
                  {microText4}
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-ivory/65">{microText5}</p>
              </div>

              <div className="grid gap-5 rounded-2xl border border-line bg-white/3 p-7">
                <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
                  Photography
                </div>
                <div className="text-lg text-ivory/90">
                  Editorial portraits, documentary moments, and timeless details.
                </div>
              </div>

              <div className="grid gap-5 rounded-2xl border border-line bg-white/3 p-7">
                <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
                  Video & Films
                </div>
                <div className="text-lg text-ivory/90">
                  Cinematic films with pacing, texture, and authentic emotion.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {testimonials.length ? (
        <section className="w-full px-5 md:px-8 lg:px-12 py-20">
          <Reveal>
            <div className="max-w-3xl">
              <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
                Témoignages
              </div>
              <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[0.08em] uppercase md:text-4xl">
                Ce que disent nos couples.
              </h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={0.03 * (i % 3)}>
                <div className="rounded-2xl border border-line bg-white/3 p-8">
                  <div className="text-sm tracking-[0.1em] text-accent">{stars(t.rating)}</div>
                  <div className="mt-4 text-sm leading-relaxed text-ivory/72">
                    “{t.message}”
                  </div>
                  <div className="mt-6 text-xs tracking-[0.28em] uppercase text-ivory/55">
                    {t.name}
                    {t.detail ? ` · ${t.detail}` : ""}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <section className="w-full px-5 md:px-8 lg:px-12 py-20">
        <Reveal>
          <div className="grid gap-10 rounded-3xl border border-line bg-[radial-gradient(900px_400px_at_20%_30%,rgba(15,76,92,0.18),transparent_60%)] p-10 md:grid-cols-2 md:p-14 grain">
            <div>
              <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
                Booking
              </div>
              <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[0.08em] uppercase md:text-4xl">
                {content?.nowBookingText || "Now booking 2026–2027"}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-ivory/65">
                {content?.brandPromise ||
                  "Nous croyons que chaque mariage est unique et mérite d'être capturé de manière authentique et émouvante. Ce serait un grand honneur et un plaisir pour nous de faire partie de votre journée spéciale et d'immortaliser vos souvenirs les plus précieux. Contactez-nous pour discuter de la manière dont nous pouvons immortaliser l’un des plus beaux jours de votre vie."}
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <Button href="/contact" className="w-full md:w-auto">
                Book a date
              </Button>
              <div className="text-sm text-ivory/65">
                Congo:{" "}
                <a
                  className="text-ivory hover:opacity-90"
                  href={`tel:${(content?.contactPhoneCongo || "").replace(/\s+/g, "")}`}
                >
                  {content?.contactPhoneCongo || "+243 827447747"}
                </a>
              </div>
              <div className="text-sm text-ivory/65">
                France:{" "}
                <a
                  className="text-ivory hover:opacity-90"
                  href={`tel:${(content?.contactPhoneFrance || "").replace(/\s+/g, "")}`}
                >
                  {content?.contactPhoneFrance || "+33 758732532"}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

