import { prisma } from "@/lib/db";
import { CinematicHero } from "@/components/home/CinematicHero";
import { ParallaxImage } from "@/components/home/ParallaxImage";
import { PhotoGrid } from "@/components/home/PhotoGrid";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

function stars(rating?: number | null) {
  if (!rating) return "\u2605\u2605\u2605\u2605\u2605";
  return "\u2605".repeat(Math.max(1, Math.min(5, rating)));
}

const galleryPhotos = [
  { src: "/portfolio/lyse---anthony-1-6.jpg", alt: "Mariage Lyse & Anthony" },
  { src: "/portfolio/arianne---theo-1.jpg", alt: "Mariage Arianne & Theo" },
  { src: "/portfolio/morgane---ronald-by-momento-1.jpg", alt: "Mariage Morgane & Ronald" },
  { src: "/portfolio/divana-6.jpg", alt: "Portrait Divana", span: "tall" as const },
  { src: "/portfolio/lyse-1_.jpg", alt: "Portrait Lyse", span: "tall" as const },
  { src: "/portfolio/angie-bali-2.jpg", alt: "Portrait Angie Bali" },
  { src: "/portfolio/yoceane-dubai-1.jpg", alt: "Pre-wedding Yoceane Dubai" },
  { src: "/portfolio/lyse---anthony-3.jpg", alt: "Mariage Lyse & Anthony" },
  { src: "/portfolio/_02a9253.jpg", alt: "Momento wedding" },
  { src: "/portfolio/josiane---pacifique-1.jpg", alt: "Mariage Josiane & Pacifique" },
  { src: "/portfolio/lhysa-1.jpg", alt: "Portrait Lhysa" },
  { src: "/portfolio/mmt_7409.jpg", alt: "Momento wedding" },
];

export default async function HomePage() {
  const content = await prisma.siteContent.findUnique({ where: { id: 1 } });
  const testimonials = await prisma.testimonial.findMany({
    where: { featured: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    take: 4,
  });

  return (
    <div>
      <CinematicHero
        title="Photographe & Vid\u00e9aste de Mariage"
        subtitle="Il y a des instants qui ne se r\u00e9p\u00e8tent jamais. Un regard avant l\u2019autel. Une main qui tremble l\u00e9g\u00e8rement. Un sourire qui dit \u00ab\u00a0pour toujours\u00a0\u00bb."
        ctaText="D\u00e9couvrir notre univers"
        ctaHref="/portfolio"
        nowBookingText={content?.nowBookingText || "Now booking 2026\u20132027"}
        videoUrl={content?.heroVideoUrl || ""}
        imageUrl="/portfolio/lyse---anthony-1-6.jpg"
      />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
          <Reveal>
            <div className="grid gap-16 md:grid-cols-2 items-center">
              <div>
                <div className="text-[11px] tracking-[0.35em] uppercase text-ivory/40 mb-6">
                  Notre histoire
                </div>
                <h2 className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl tracking-[0.04em] uppercase leading-[1.1]">
                  L&apos;Art de Raconter le V&ocirc;tre
                </h2>
                <div className="mt-8 space-y-5 text-sm leading-relaxed text-ivory/60 md:text-base">
                  <p>
                    Chez Momento, nous ne capturons pas seulement des images.
                    Nous racontons votre histoire.
                  </p>
                  <p>
                    Sp&eacute;cialis&eacute;s en photographie de mariage haut de gamme et en film
                    de mariage cin&eacute;matographique, nous accompagnons les couples &agrave; travers
                    le monde pour immortaliser leurs moments les plus pr&eacute;cieux.
                  </p>
                  <p>
                    Chaque mariage est unique. Chaque film est une &oelig;uvre.
                    Chaque d&eacute;tail compte.
                  </p>
                </div>
                <div className="mt-10">
                  <Button href="/about" variant="outline">
                    En savoir plus
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative overflow-hidden">
                  <Image
                    src="/portfolio/arianne---theo-2-suit.jpg"
                    alt="Momento RDC - Portrait"
                    width={600}
                    height={800}
                    className="w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ParallaxImage
        src="/portfolio/morgane---ronald-by-momento-2.jpg"
        alt="Approche cin\u00e9matographique"
        height="h-[60vh] md:h-[70vh]"
        overlay={
          <div className="text-center text-white max-w-3xl">
            <div className="text-[11px] tracking-[0.4em] uppercase text-white/50 mb-4">
              Notre approche
            </div>
            <h2 className="font-[var(--font-display)] text-3xl md:text-5xl lg:text-6xl tracking-[0.06em] uppercase">
              Cin&eacute;matique &middot; &Eacute;ditoriale &middot; Intemporelle
            </h2>
          </div>
        }
      />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="text-[11px] tracking-[0.35em] uppercase text-ivory/40 mb-4">
                Nos r&eacute;alisations
              </div>
              <h2 className="font-[var(--font-display)] text-3xl md:text-4xl tracking-[0.06em] uppercase">
                Des Histoires d&apos;Amour &agrave; Travers le Monde
              </h2>
              <p className="mt-6 text-sm text-ivory/50 leading-relaxed">
                Chaque image raconte une promesse. Chaque film capture une &eacute;motion.
              </p>
            </div>
          </Reveal>

          <PhotoGrid photos={galleryPhotos} />

          <Reveal>
            <div className="mt-14 text-center">
              <Button href="/portfolio" variant="outline">
                Voir le portfolio complet
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-charcoal-2 border-y border-line">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
          <Reveal>
            <div className="grid gap-12 md:grid-cols-3">
              <div>
                <div className="text-[11px] tracking-[0.35em] uppercase text-ivory/40 mb-4">
                  Nos services
                </div>
                <h2 className="font-[var(--font-display)] text-2xl md:text-3xl tracking-[0.06em] uppercase">
                  Votre journ&eacute;e, votre signature
                </h2>
              </div>

              <div className="space-y-2">
                <div className="text-xs tracking-[0.2em] uppercase text-ivory/40">Photographie</div>
                <p className="text-sm leading-relaxed text-ivory/60">
                  Portraits &eacute;ditoriaux, moments documentaires et d&eacute;tails intemporels.
                  Une esth&eacute;tique naturelle, raffin&eacute;e et cin&eacute;matique.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs tracking-[0.2em] uppercase text-ivory/40">Films de mariage</div>
                <p className="text-sm leading-relaxed text-ivory/60">
                  Films cin&eacute;matographiques premium. Une narration fluide et immersive,
                  inspir&eacute;e du cin&eacute;ma, avec une attention obsessionnelle aux d&eacute;tails.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
            <Reveal>
              <div className="text-center mb-16">
                <div className="text-[11px] tracking-[0.35em] uppercase text-ivory/40 mb-4">
                  T&eacute;moignages
                </div>
                <h2 className="font-[var(--font-display)] text-3xl md:text-4xl tracking-[0.06em] uppercase">
                  Ce que disent nos couples
                </h2>
              </div>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-2">
              {testimonials.map((t, i) => (
                <Reveal key={t.id} delay={i * 0.1}>
                  <div className="border border-line p-8 md:p-10">
                    <div className="text-sm tracking-[0.1em] text-ivory/40 mb-4">
                      {stars(t.rating)}
                    </div>
                    <p className="text-sm md:text-base leading-relaxed text-ivory/65 italic">
                      &ldquo;{t.message}&rdquo;
                    </p>
                    <div className="mt-6 text-[11px] tracking-[0.3em] uppercase text-ivory/40">
                      {t.name}
                      {t.detail ? ` \u2014 ${t.detail}` : ""}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ParallaxImage
        src="/portfolio/lyse---anthony-7.jpg"
        alt="Booking Momento"
        height="h-[50vh] md:h-[60vh]"
        overlay={
          <div className="text-center text-white max-w-3xl">
            <h2 className="font-[var(--font-display)] text-2xl md:text-4xl lg:text-5xl tracking-[0.06em] uppercase mb-6">
              Votre histoire m&eacute;rite plus qu&apos;un reportage
            </h2>
            <p className="text-sm text-white/55 max-w-xl mx-auto mb-8">
              Nous croyons en une connexion forte et personnelle avec chaque couple.
              En prenant le temps de comprendre votre vision unique.
            </p>
            <a
              href="/contact"
              className="inline-block border border-white/40 bg-white/10 backdrop-blur-sm px-8 py-3.5 text-[11px] tracking-[0.25em] uppercase text-white transition-all duration-300 hover:bg-white hover:text-black"
            >
              Parlons de votre mariage
            </a>
          </div>
        }
      />
    </div>
  );
}
