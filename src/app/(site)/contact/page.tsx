import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { Reveal } from "@/components/motion/Reveal";
import { BookingForm } from "@/components/contact/BookingForm";

export const metadata: Metadata = {
  title: "Contact / Booking",
  description: "Parlons de Votre Mariage. Photographe & vid\u00e9aste de mariage, disponible dans le monde entier.",
};

export default async function ContactPage() {
  const content = await prisma.siteContent.findUnique({ where: { id: 1 } });
  const phoneCd = content?.contactPhoneCongo || "+243 827447747";
  const phoneFr = content?.contactPhoneFrance || "+33 758732532";
  const ig = content?.instagramHandle || "momento_rdc";

  return (
    <div>
      <section className="relative h-[45vh] md:h-[55vh] overflow-hidden">
        <img
          src="/contact/contact-h.jpg"
          alt="Contact Momento"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative flex h-full items-end pb-16 px-6 md:px-10 lg:px-16">
          <div className="mx-auto max-w-[1400px] w-full">
            <div className="text-[11px] tracking-[0.35em] uppercase text-white/50 mb-4">
              Contact
            </div>
            <h1 className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl tracking-[0.04em] uppercase text-white">
              Parlons de Votre Mariage
            </h1>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
          <Reveal>
            <div className="grid gap-16 md:grid-cols-12">
              <div className="md:col-span-5">
                <div className="space-y-6">
                  <p className="text-sm md:text-base leading-relaxed text-ivory/60">
                    Votre mariage m&eacute;rite une &eacute;quipe qui comprend la valeur de chaque instant.
                    Que vous organisiez un mariage local ou un destination wedding &agrave; l&apos;international,
                    nous serions honor&eacute;s d&apos;en apprendre davantage sur votre projet.
                  </p>

                  <div className="text-sm text-ivory/50 space-y-1">
                    <p>Partagez-nous :</p>
                    <ul className="space-y-1 text-ivory/45">
                      <li>&mdash; La date de votre mariage</li>
                      <li>&mdash; Le lieu</li>
                      <li>&mdash; Votre vision</li>
                      <li>&mdash; Les services souhait&eacute;s</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-10 border border-line p-8">
                  <div className="text-[11px] tracking-[0.3em] uppercase text-ivory/35 mb-5">
                    Contact direct
                  </div>
                  <div className="grid gap-4 text-sm">
                    <a
                      className="text-ivory/55 hover:text-ivory transition-colors duration-300"
                      href={`tel:${phoneCd.replace(/\s+/g, "")}`}
                    >
                      Congo: {phoneCd}
                    </a>
                    <a
                      className="text-ivory/55 hover:text-ivory transition-colors duration-300"
                      href={`tel:${phoneFr.replace(/\s+/g, "")}`}
                    >
                      France: {phoneFr}
                    </a>
                    <a
                      className="text-ivory/55 hover:text-ivory transition-colors duration-300"
                      href={`https://wa.me/${phoneCd.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp (Congo)
                    </a>
                    <a
                      className="text-ivory/55 hover:text-ivory transition-colors duration-300 inline-flex items-center gap-2"
                      href={`https://instagram.com/${ig}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Instagram @{ig}
                    </a>
                  </div>

                  <div className="mt-6 pt-6 border-t border-line text-xs text-ivory/35 space-y-1">
                    <p>Basés entre Paris et Kinshasa &middot; Disponibles partout dans le monde.</p>
                    <p>Nous voyageons là où votre héritage nous appelle.</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7">
                <div className="border border-line p-8 md:p-12">
                  <div className="text-[11px] tracking-[0.3em] uppercase text-ivory/35 mb-8">
                    Commen&ccedil;ons &agrave; &eacute;crire votre histoire
                  </div>
                  <BookingForm />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
