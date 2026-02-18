"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

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

          <nav className="hidden items-center gap-10 text-[11px] tracking-[0.3em] uppercase md:flex"
            style={{ fontFamily: "var(--font-worksans), 'Work Sans', sans-serif", fontWeight: 300 }}
          >
            <Link className="text-ivory/70 hover:text-ivory transition-colors duration-300" href="/">
              Home
            </Link>
            <Link className="text-ivory/70 hover:text-ivory transition-colors duration-300" href="/portfolio">
              Portfolio
            </Link>
            <Link className="text-ivory/70 hover:text-ivory transition-colors duration-300" href="/about">
              About
            </Link>
            <Link className="text-ivory/70 hover:text-ivory transition-colors duration-300" href="/contact">
              Contact
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link
              href="/contact"
              className="border border-ivory/30 px-6 py-2.5 text-[11px] tracking-[0.25em] uppercase text-ivory transition-all duration-300 hover:bg-ivory hover:text-charcoal"
            >
              Booking
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
            Home
          </Link>
          <Link href="/portfolio" onClick={() => setMenuOpen(false)}
            className="text-3xl tracking-[0.12em] uppercase text-ivory"
            style={{ fontFamily: "var(--font-didot), 'GFS Didot', 'Didot', serif" }}>
            Portfolio
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}
            className="text-3xl tracking-[0.12em] uppercase text-ivory"
            style={{ fontFamily: "var(--font-didot), 'GFS Didot', 'Didot', serif" }}>
            About
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}
            className="text-3xl tracking-[0.12em] uppercase text-ivory"
            style={{ fontFamily: "var(--font-didot), 'GFS Didot', 'Didot', serif" }}>
            Contact
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}
            className="mt-4 border border-ivory/30 px-8 py-3 text-[11px] tracking-[0.25em] uppercase text-ivory">
            Booking
          </Link>
        </div>
      )}
    </>
  );
}
