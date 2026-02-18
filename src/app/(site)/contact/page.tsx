import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { Reveal } from "@/components/motion/Reveal";
import { BookingForm } from "@/components/contact/BookingForm";

export const metadata: Metadata = {
  title: "Contact / Booking",
  description: "Book Momento RDC. Now booking 2026–2027. Worldwide availability.",
};

export default async function ContactPage() {
  const content = await prisma.siteContent.findUnique({ where: { id: 1 } });
  const phoneCd = content?.contactPhoneCongo || "+243 827447747";
  const phoneFr = content?.contactPhoneFrance || "+33 758732532";
  const ig = content?.instagramHandle || "momento_rdc";

  return (
    <div className="w-full px-5 md:px-8 lg:px-12 py-16">
      <Reveal>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
              Booking
            </div>
            <h1 className="mt-3 font-[var(--font-display)] text-4xl tracking-[0.08em] uppercase md:text-5xl">
              {content?.nowBookingText || "Now booking 2026–2027"}
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-ivory/65 md:text-base">
              Tell us your date, location, and vision. We respond with availability and
              next steps.
            </p>

            <div className="mt-10 grid gap-3 rounded-2xl border border-line bg-black/[0.03] dark:bg-white/3 p-7 text-sm">
              <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
                Direct contact
              </div>
              <a className="hover:text-ivory transition" href={`tel:${phoneCd.replace(/\s+/g, "")}`}>
                {phoneCd}
              </a>
              <a className="hover:text-ivory transition" href={`tel:${phoneFr.replace(/\s+/g, "")}`}>
                {phoneFr}
              </a>
              <a
                className="hover:text-ivory transition"
                href={`https://wa.me/${phoneCd.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp (Congo)
              </a>
              <a
                className="hover:text-ivory transition"
                href={`https://instagram.com/${ig}`}
                target="_blank"
                rel="noreferrer"
              >
                Instagram @{ig}
              </a>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="rounded-3xl border border-line bg-[radial-gradient(900px_400px_at_20%_20%,rgba(15,76,92,0.18),transparent_60%)] p-8 md:p-12 grain">
              <BookingForm />
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

