import Link from "next/link";
import { prisma } from "@/lib/db";

export async function Footer() {
  const content = await prisma.siteContent.findUnique({ where: { id: 1 } });
  const phoneCd = content?.contactPhoneCongo || "+243 827447747";
  const phoneFr = content?.contactPhoneFrance || "+33 758732532";
  const ig = content?.instagramHandle || "momento_rdc";

  return (
    <footer className="border-t border-line bg-charcoal">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16 py-20">
        <div className="grid gap-16 md:grid-cols-3">
          <div>
            <div className="font-[var(--font-display)] text-2xl tracking-[0.14em] uppercase">
              Momento
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ivory/50 max-w-xs">
              Photographe & vid&eacute;aste de mariage international. Films
              cin&eacute;matographiques & photographie haut de gamme.
            </p>
            <p className="mt-3 text-xs text-ivory/40">
              Bas&eacute;s en Afrique, disponibles dans le monde entier.
            </p>
          </div>

          <div>
            <div className="text-[11px] tracking-[0.3em] uppercase text-ivory/40 mb-5">
              Navigation
            </div>
            <div className="grid gap-3 text-sm">
              <Link className="text-ivory/60 hover:text-ivory transition-colors duration-300" href="/">
                Accueil
              </Link>
              <Link className="text-ivory/60 hover:text-ivory transition-colors duration-300" href="/portfolio">
                Portfolio
              </Link>
              <Link className="text-ivory/60 hover:text-ivory transition-colors duration-300" href="/about">
                &Agrave; propos
              </Link>
              <Link className="text-ivory/60 hover:text-ivory transition-colors duration-300" href="/contact">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <div className="text-[11px] tracking-[0.3em] uppercase text-ivory/40 mb-5">
              Contact
            </div>
            <div className="grid gap-3 text-sm">
              <a
                className="text-ivory/60 hover:text-ivory transition-colors duration-300"
                href={`tel:${phoneCd.replace(/\s+/g, "")}`}
              >
                Congo: {phoneCd}
              </a>
              <a
                className="text-ivory/60 hover:text-ivory transition-colors duration-300"
                href={`tel:${phoneFr.replace(/\s+/g, "")}`}
              >
                France: {phoneFr}
              </a>
              <a
                className="text-ivory/60 hover:text-ivory transition-colors duration-300 inline-flex items-center gap-2"
                href={`https://instagram.com/${ig}`}
                target="_blank"
                rel="noreferrer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                @{ig}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-line flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-xs text-ivory/30">
            &copy; {new Date().getFullYear()} Momento. Tous droits r&eacute;serv&eacute;s.
          </div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-ivory/25">
            Photographe mariage international &middot; Vid&eacute;aste mariage &middot; Film de mariage cin&eacute;matographique
          </div>
        </div>
      </div>
    </footer>
  );
}
