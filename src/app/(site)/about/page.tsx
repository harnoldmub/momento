import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export const metadata: Metadata = {
  title: "\u00c0 propos",
  description: "Notre Histoire \u2013 L\u2019Art de Raconter le V\u00f4tre. Photographe & vid\u00e9aste de mariage international.",
};

export default async function AboutPage() {
  return (
    <div>
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/portfolio/morgane---ronald-by-momento-3.jpg"
          alt="Momento RDC"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative flex h-full items-end pb-16 px-6 md:px-10 lg:px-16">
          <div className="mx-auto max-w-[1400px] w-full">
            <div className="text-[11px] tracking-[0.35em] uppercase text-white/50 mb-4">
              &Agrave; propos
            </div>
            <h1 className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl tracking-[0.04em] uppercase text-white max-w-3xl">
              Notre Histoire
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
                  <div className="space-y-5 text-sm md:text-base leading-relaxed text-ivory/60">
                    <p>
                      Momento est n&eacute; d&apos;une conviction simple :
                      un mariage n&apos;est pas un &eacute;v&eacute;nement.
                      C&apos;est un h&eacute;ritage.
                    </p>
                    <p>
                      Fond&eacute; par deux passionn&eacute;s d&apos;image et de narration, Momento est
                      devenu une r&eacute;f&eacute;rence en photographie et vid&eacute;ographie de mariage
                      pour les couples qui recherchent l&apos;excellence.
                    </p>
                    <p>
                      Nous croyons que les plus belles images naissent de la confiance.
                      Avant de sortir nos cam&eacute;ras, nous apprenons &agrave; vous conna&icirc;tre.
                      Votre histoire, votre culture, votre vision.
                    </p>
                  </div>
                </div>

                <div className="border-t border-line pt-8">
                  <h3 className="text-[11px] tracking-[0.35em] uppercase text-ivory/40 mb-6">
                    Notre approche
                  </h3>
                  <div className="grid gap-5">
                    <div className="flex items-start gap-4">
                      <span className="text-ivory/30 text-lg mt-0.5">01</span>
                      <div>
                        <div className="text-sm font-medium text-ivory/80">Storytelling cin&eacute;matographique</div>
                        <p className="text-sm text-ivory/50 mt-1">Une narration fluide, immersive, inspir&eacute;e du cin&eacute;ma.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="text-ivory/30 text-lg mt-0.5">02</span>
                      <div>
                        <div className="text-sm font-medium text-ivory/80">Photographie &eacute;l&eacute;gante et intemporelle</div>
                        <p className="text-sm text-ivory/50 mt-1">Des couleurs naturelles, raffin&eacute;es. Une esth&eacute;tique qui traverse le temps.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="text-ivory/30 text-lg mt-0.5">03</span>
                      <div>
                        <div className="text-sm font-medium text-ivory/80">Destination weddings</div>
                        <p className="text-sm text-ivory/50 mt-1">Accompagnement mondial pour les mariages les plus ambitieux.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="text-ivory/30 text-lg mt-0.5">04</span>
                      <div>
                        <div className="text-sm font-medium text-ivory/80">Films premium haute qualit&eacute;</div>
                        <p className="text-sm text-ivory/50 mt-1">Des films de mariage con&ccedil;us comme des &oelig;uvres cin&eacute;matographiques.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="sticky top-24">
                <div className="overflow-hidden">
                  <Image
                    src="/portfolio/arianne---theo-3.jpg"
                    alt="Momento \u2013 \u00c0 propos"
                    width={600}
                    height={800}
                    className="w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="mt-8 border border-line p-8">
                  <p className="text-sm leading-relaxed text-ivory/55 italic">
                    &ldquo;Nous travaillons avec des couples exigeants qui veulent plus qu&apos;un
                    souvenir : ils veulent revivre leur journ&eacute;e encore et encore.&rdquo;
                  </p>
                  <div className="mt-4 text-[11px] tracking-[0.3em] uppercase text-ivory/35">
                    Momento &mdash; L&apos;alliance entre &eacute;motion, esth&eacute;tisme et excellence
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
