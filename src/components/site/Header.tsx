"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-charcoal/95 backdrop-blur-md border-b border-line shadow-lg"
            : "bg-gradient-to-b from-black/70 via-black/30 to-transparent"
        )}
      >
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-10 lg:px-16">
          <Link href="/" className="block shrink-0" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.7))" }}>
            <img
              src="/logo/logo-blanc.png"
              alt="Momento"
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-10 text-[11px] tracking-[0.3em] uppercase md:flex"
            style={{ fontFamily: "var(--font-worksans), 'Work Sans', sans-serif", fontWeight: 300 }}
          >
            <Link className="text-white/80 hover:text-white transition-colors duration-300 drop-shadow-sm" href="/portfolio">
              Portfolio
            </Link>
            <Link className="text-white/80 hover:text-white transition-colors duration-300 drop-shadow-sm" href="/about">
              About
            </Link>
            <Link className="text-white/80 hover:text-white transition-colors duration-300 drop-shadow-sm" href="/contact">
              Contact
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link
              href="/contact"
              className="border border-white/40 px-6 py-2.5 text-[11px] tracking-[0.25em] uppercase text-white transition-all duration-300 hover:bg-white hover:text-charcoal drop-shadow-sm"
            >
              Booking
            </Link>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={cn("block h-[1.5px] w-6 bg-white transition-all duration-300", menuOpen && "rotate-45 translate-y-[4.5px]")} />
            <span className={cn("block h-[1.5px] w-6 bg-white transition-all duration-300", menuOpen && "opacity-0")} />
            <span className={cn("block h-[1.5px] w-6 bg-white transition-all duration-300", menuOpen && "-rotate-45 -translate-y-[4.5px]")} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-charcoal/98 backdrop-blur-sm flex flex-col items-center justify-center gap-8">
          <Link
            href="/portfolio"
            onClick={() => setMenuOpen(false)}
            className="text-3xl tracking-[0.12em] uppercase text-ivory italic"
            style={{ fontFamily: "var(--font-didot), 'Bodoni Moda', 'Didot', serif" }}
          >
            Portfolio
          </Link>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="text-3xl tracking-[0.12em] uppercase text-ivory italic"
            style={{ fontFamily: "var(--font-didot), 'Bodoni Moda', 'Didot', serif" }}
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="text-3xl tracking-[0.12em] uppercase text-ivory italic"
            style={{ fontFamily: "var(--font-didot), 'Bodoni Moda', 'Didot', serif" }}
          >
            Contact
          </Link>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 border border-ivory/30 px-8 py-3 text-[11px] tracking-[0.25em] uppercase text-ivory"
          >
            Booking
          </Link>
        </div>
      )}
    </>
  );
}
