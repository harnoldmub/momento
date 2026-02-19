import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "\u00c0 propos",
  description: "Notre Histoire \u2013 L\u2019Art de Raconter le V\u00f4tre. Photographe & vid\u00e9aste de mariage international.",
};

export default async function AboutPage() {
  return (
    <div>
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src="/about/about-h.jpg"
          alt="Momento RDC"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative flex h-full items-end pb-16 px-6 md:px-10 lg:px-16">
          <div className="mx-auto max-w-[1400px] w-full">
            <div className="text-[11px] tracking-[0.35em] uppercase text-white/50 mb-4">
              &Agrave; propos
            </div>
            <h1 className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-3xl tracking-[0.04em] uppercase text-white max-w-3xl">
              Notre Histoire – L’Art de Raconter le Vôtre
            </h1>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
          <div className="grid gap-16 lg:gap-24 md:grid-cols-2 items-start">
            <Reveal>
              <div className="space-y-8">
                <div>
                  <h2 className="font-[var(--font-display)] text-2xl md:text-3xl tracking-[0.06em] uppercase mb-6">
                    L&apos;Art de Raconter le V&ocirc;tre
                  </h2>
                  <div className="space-y-6 text-sm md:text-base leading-relaxed text-ivory/60">
                    <p>
                      Momento est né d&apos;une conviction simple :
                      Un mariage n&apos;est pas un événement. C&apos;est un héritage.
                    </p>
                    <p>
                      Nous croyons que les plus belles images naissent de la confiance.
                      Votre histoire, votre culture, votre vision — nous apprenons à vous connaître
                      avant d&apos;allumer nos caméras.
                    </p>
                  </div>
                </div>

                <div className="border-t border-line pt-8">
                  <h3 className="text-[11px] tracking-[0.35em] uppercase text-ivory/40 mb-6">
                    Notre approche
                  </h3>
                  <div className="grid gap-5">
                    <div className="flex items-start gap-4">
                      <span className="text-ivory/30 text-lg mt-0.5">🎥</span>
                      <div>
                        <div className="text-sm font-medium text-ivory/80">Storytelling cinématographique</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="text-ivory/30 text-lg mt-0.5">📸</span>
                      <div>
                        <div className="text-sm font-medium text-ivory/80">Photographie élégante et intemporelle</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="text-ivory/30 text-lg mt-0.5">🌍</span>
                      <div>
                        <div className="text-sm font-medium text-ivory/80">Accompagnement pour les destination weddings</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="text-ivory/30 text-lg mt-0.5">🎬</span>
                      <div>
                        <div className="text-sm font-medium text-ivory/80">Films de mariage premium en haute qualité</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="sticky top-24">
                <div className="overflow-hidden">
                  <img
                    src="/about/about-2.jpg"
                    alt="Momento – À propos"
                    className="w-full object-cover"
                  />
                </div>
                <div className="mt-8 border border-line p-8 text-center">
                  <p className="text-base leading-relaxed text-white font-light italic">
                    Nous travaillons avec des couples exigeants qui veulent plus qu&apos;un souvenir :
                    Ils veulent revivre leur journée encore et encore.
                  </p>
                  <div className="mt-6 text-[11px] tracking-[0.4em] uppercase text-ivory/40">
                    Momento — emotion, esthétisme et excellence technique
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-line bg-charcoal-2">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-[var(--font-display)] text-2xl md:text-3xl tracking-[0.06em] uppercase mb-6">
                Bas&eacute;s en Afrique, disponibles partout
              </h2>
              <p className="text-sm text-ivory/50 leading-relaxed mb-8">
                Nous voyageons l&agrave; o&ugrave; votre histoire nous appelle.
                Du d&eacute;sert de Duba&iuml; aux c&eacute;l&eacute;brations &eacute;l&eacute;gantes en Europe,
                nous cr&eacute;ons des souvenirs intemporels.
              </p>
              <Button href="/contact">
                Parlons de votre mariage
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
