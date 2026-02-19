"use client";

import Link from "next/link";

type Props = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  nowBookingText: string;
  videoUrl?: string | null;
  imageUrl: string;
};

export function CinematicHero({
  title,
  subtitle,
  ctaText,
  ctaHref,
  nowBookingText,
  videoUrl,
  imageUrl,
}: Props) {
  const showVideo = Boolean(videoUrl);

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        {showVideo ? (
          <video
            className="h-full w-full object-cover animate-slow-zoom"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={imageUrl}
          >
            <source src={videoUrl!} />
          </video>
        ) : (
          <img
            src={imageUrl}
            alt="Momento hero"
            className="h-full w-full object-cover animate-slow-zoom"
          />
        )}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/55 to-black/70" /> */}
      </div>

      {/* 
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <div
          className="mb-8 text-[11px] tracking-[0.5em] uppercase text-white/70"
          style={{ fontFamily: "var(--font-worksans), 'Work Sans', sans-serif" }}
        >
          Photographie &amp; Films de Mariage
        </div>

        <h1
          className="max-w-4xl text-5xl leading-[1.1] tracking-[0.04em] uppercase sm:text-6xl md:text-7xl lg:text-8xl italic text-white drop-shadow-lg"
          style={{ fontFamily: "var(--font-didot), 'GFS Didot', 'Didot', serif", textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}
        >
          {title}
        </h1>

        <p
          className="mt-8 max-w-lg text-sm leading-[1.8] text-white/80 md:text-base"
          style={{ fontFamily: "var(--font-worksans), 'Work Sans', sans-serif", fontWeight: 300 }}
        >
          {subtitle}
        </p>

        <div
          className="mt-12 flex flex-col items-center gap-5 sm:flex-row"
        >
          <Link
            href={ctaHref}
            className="border border-white/50 bg-white/10 backdrop-blur-sm px-10 py-4 text-[11px] tracking-[0.3em] uppercase text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            {ctaText}
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 text-[11px] tracking-[0.3em] uppercase text-white/65 transition-colors hover:text-white"
          >
            Nous contacter
          </Link>
        </div>

        <div
          className="absolute bottom-20 text-[10px] tracking-[0.35em] uppercase text-white/40"
          style={{ fontFamily: "var(--font-worksans), 'Work Sans', sans-serif" }}
        >
          {nowBookingText}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
      */}
    </section>
  );
}
