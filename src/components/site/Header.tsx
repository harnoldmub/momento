"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [portfolioOpen, setPortfolioOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinkStyle = {
    fontFamily: "avenir-lt-w01_85-heavy1475544, sans-serif",
    fontSize: "14px",
    lineHeight: "1.25em",
    fontStyle: "normal" as const,
    fontWeight: "bold",
    color: "#5A5A57",
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-charcoal border-b border-line">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-10 lg:px-16">
          <Link href="/" className="block shrink-0">
            <img
              src="/logo/logo-noir.png"
              alt="Momento"
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-10 text-[11px] tracking-[0.3em] uppercase md:flex">
            <Link
              className="text-ivory/70 hover:text-ivory transition-colors duration-300"
              href="/"
              style={navLinkStyle}
            >
              Accueil
            </Link>

            <div
              className="relative group"
              onMouseEnter={() => setPortfolioOpen(true)}
              onMouseLeave={() => setPortfolioOpen(false)}
            >
              <Link
                className="text-ivory/70 hover:text-ivory transition-colors duration-300 flex items-center gap-1"
                href="#"
                style={navLinkStyle}
              >
                Portfolio
              </Link>

              {/* Dropdown Menu */}
              <div
                className={cn(
                  "absolute top-full left-0 pt-4 w-48 transition-all duration-300",
                  portfolioOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                )}
              >
                <div className="bg-charcoal border border-line py-4 px-6 space-y-4">
                  <Link
                    href="/portfolio/mariages"
                    className="block text-[10px] tracking-[0.2em] text-ivory/60 hover:text-ivory transition-colors"
                    style={navLinkStyle}
                    onClick={() => setPortfolioOpen(false)}
                  >
                    Mariages
                  </Link>
                  <Link
                    href="/portfolio/save_the_date"
                    className="block text-[10px] tracking-[0.2em] text-ivory/60 hover:text-ivory transition-colors"
                    style={navLinkStyle}
                    onClick={() => setPortfolioOpen(false)}
                  >
                    Save the Date
                  </Link>
                </div>
              </div>
            </div>

            <Link
              className="text-ivory/70 hover:text-ivory transition-colors duration-300"
              href="/about"
              style={navLinkStyle}
            >
              À propos
            </Link>
            <Link
              className="text-ivory/70 hover:text-ivory transition-colors duration-300"
              href="/contact"
              style={navLinkStyle}
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link
              href="/contact"
              className="border border-ivory/30 px-6 py-2.5 text-[11px] tracking-[0.25em] uppercase text-ivory transition-all duration-300 hover:bg-ivory hover:text-charcoal"
              style={navLinkStyle}
            >
              Réservations
            </Link>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={cn("block h-[1.5px] w-6 bg-ivory transition-all duration-300", menuOpen && "rotate-45 translate-y-[4.5px]")} />
            <span className={cn("block h-[1.5px] w-6 bg-ivory transition-all duration-300", menuOpen && "opacity-0")} />
            <span className={cn("block h-[1.5px] w-6 bg-ivory transition-all duration-300", menuOpen && "-rotate-45 -translate-y-[4.5px]")} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-charcoal/98 backdrop-blur-sm flex flex-col items-center justify-center gap-8">
          <Link href="/" onClick={() => setMenuOpen(false)}
            className="text-3xl tracking-[0.12em] uppercase text-ivory"
            style={{ fontFamily: "var(--font-didot), 'GFS Didot', 'Didot', serif" }}>
            Accueil
          </Link>

          <div className="flex flex-col items-center gap-4">
            <span
              className="text-3xl tracking-[0.12em] uppercase text-ivory/40"
              style={{ fontFamily: "var(--font-didot), 'GFS Didot', 'Didot', serif" }}
            >
              Portfolio
            </span>
            <Link
              href="/portfolio/mariages"
              onClick={() => setMenuOpen(false)}
              className="text-xl tracking-[0.2em] uppercase text-ivory"
              style={navLinkStyle}
            >
              Mariages
            </Link>
            <Link
              href="/portfolio/save_the_date"
              onClick={() => setMenuOpen(false)}
              className="text-xl tracking-[0.2em] uppercase text-ivory"
              style={navLinkStyle}
            >
              Save the Date
            </Link>
          </div>

          <Link href="/about" onClick={() => setMenuOpen(false)}
            className="text-3xl tracking-[0.12em] uppercase text-ivory"
            style={{ fontFamily: "var(--font-didot), 'GFS Didot', 'Didot', serif" }}>
            À propos
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}
            className="text-3xl tracking-[0.12em] uppercase text-ivory"
            style={{ fontFamily: "var(--font-didot), 'GFS Didot', 'Didot', serif" }}>
            Contact
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}
            className="mt-4 border border-ivory/30 px-8 py-3 text-[11px] tracking-[0.25em] uppercase text-ivory"
            style={navLinkStyle}
          >
            Réservations
          </Link>
        </div>
      )}
    </>
  );
}
