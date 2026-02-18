import Link from "next/link";
import { prisma } from "@/lib/db";

export async function Footer() {
  const content = await prisma.siteContent.findUnique({ where: { id: 1 } });
  const phoneCd = content?.contactPhoneCongo || "+243 827447747";
  const phoneFr = content?.contactPhoneFrance || "+33 758732532";
  const ig = content?.instagramHandle || "momento_rdc";
  const nowBooking = content?.nowBookingText || "Now booking 2026–2027";

  return (
    <footer className="border-t border-line">
      <div className="w-full px-5 md:px-8 lg:px-12 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="grid gap-3">
            <div className="font-[var(--font-display)] tracking-[0.14em] uppercase">
              Momento RDC
            </div>
            <p className="text-sm text-ivory/65 leading-relaxed">
              Luxury & destination weddings. Photography & films. RDC + France, worldwide.
            </p>
          </div>
          <div className="grid gap-3 text-sm">
            <div className="text-xs tracking-[0.22em] uppercase text-ivory/55">
              Contacts
            </div>
            <a className="hover:text-ivory transition" href={`tel:${phoneCd.replace(/\s+/g, "")}`}>
              {phoneCd}
            </a>
            <a className="hover:text-ivory transition" href={`tel:${phoneFr.replace(/\s+/g, "")}`}>
              {phoneFr}
            </a>
            <a
              className="hover:text-ivory transition"
              href={`https://instagram.com/${ig}`}
              target="_blank"
              rel="noreferrer"
            >
              @{ig}
            </a>
          </div>
          <div className="grid gap-3 text-sm">
            <div className="text-xs tracking-[0.22em] uppercase text-ivory/55">
              Links
            </div>
            <Link className="hover:text-ivory transition" href="/about">
              About
            </Link>
            <Link className="hover:text-ivory transition" href="/portfolio">
              Portfolio
            </Link>
            <Link className="hover:text-ivory transition" href="/contact">
              Book / Contact
            </Link>
            <Link className="hover:text-ivory transition" href="/legal">
              Legal
            </Link>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-8 text-xs text-ivory/45 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Momento RDC. All rights reserved.</div>
          <div className="tracking-[0.2em] uppercase">{nowBooking}</div>
        </div>
      </div>
    </footer>
  );
}
