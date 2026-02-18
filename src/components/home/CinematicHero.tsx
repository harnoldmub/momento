"use client";

import { motion } from "framer-motion";
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
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="mb-6 text-[11px] tracking-[0.4em] uppercase text-white/60"
        >
          Photography &amp; Films
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-[var(--font-display)] text-4xl leading-[1.1] tracking-[0.06em] uppercase sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-sm leading-relaxed text-white/65 md:text-base"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href={ctaHref}
            className="border border-white/40 bg-white/10 backdrop-blur-sm px-8 py-3.5 text-[11px] tracking-[0.25em] uppercase text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            {ctaText}
          </Link>
          <Link
            href="/portfolio"
            className="px-6 py-3 text-[11px] tracking-[0.25em] uppercase text-white/60 transition-colors hover:text-white"
          >
            Explorer le portfolio
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 text-[10px] tracking-[0.35em] uppercase text-white/35"
        >
          {nowBookingText}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2.5, duration: 2, repeat: Infinity }}
      >
        <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
