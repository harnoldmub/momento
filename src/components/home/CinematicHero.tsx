"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

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
  const reduce = useReducedMotion();
  const showVideo = Boolean(videoUrl) && !reduce;

  return (
    <section className="relative min-h-[92svh] overflow-hidden grain">
      <div className="absolute inset-0">
        {showVideo ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            className="h-full w-full object-cover"
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
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        )}

        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_60%_20%,rgba(15,76,92,0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60" />
      </div>

      <div className="relative w-full flex min-h-[92svh] flex-col justify-end px-5 pb-16 pt-40 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="text-xs tracking-[0.32em] uppercase text-white/80">
            Photography & Films
          </div>
          <h1 className="mt-5 font-[var(--font-display)] text-5xl leading-[1.02] tracking-[0.06em] uppercase md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={ctaHref}>{ctaText}</Button>
            <Button href="/portfolio" variant="outline">
              Explore portfolio
            </Button>
            <div className="ml-1 text-xs tracking-[0.22em] uppercase text-white/60">
              {nowBookingText}
            </div>
          </div>
        </motion.div>

        <motion.div
          aria-hidden
          className="mt-14 flex items-center gap-3 text-xs tracking-[0.28em] uppercase text-white/55"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <span className="inline-block h-[1px] w-10 bg-white/25" />
          <span>Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}
