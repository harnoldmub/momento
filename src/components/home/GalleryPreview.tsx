"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export function GalleryPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [0.3, 0.55, 0.7]);

  return (
    <section className="bg-charcoal">
      <div ref={sectionRef} className="relative overflow-hidden h-[70vh]">
        <motion.div
          className="absolute inset-0"
          style={{ y, scale }}
        >
          <img
            src="/portfolio/lyse---anthony-3.jpg"
            alt="Galerie mariage"
            className="w-full h-full object-cover grayscale"
            style={{ minHeight: "120%" }}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />

        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.8) 100%)"
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-6">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center text-2xl md:text-3xl uppercase tracking-[0.08em] text-white mb-6 italic"
            style={{ fontFamily: "var(--font-didot), 'Bodoni Moda', 'Didot', serif" }}
          >
            Nos Galeries
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center text-sm md:text-base text-white/80 max-w-xl leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-worksans), 'Work Sans', sans-serif", fontWeight: 300 }}
          >
            Chaque mariage a sa propre histoire, remplie de moments, d&apos;émotions et de souvenirs.
            Prenez le temps de parcourir nos galeries et ressentez l&apos;amour à travers nos photos.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link
              href="/portfolio"
              className="inline-block bg-white text-charcoal px-10 py-3.5 text-[11px] tracking-[0.25em] uppercase rounded-full hover:bg-ivory transition-colors duration-300 font-medium"
            >
              Voir les galeries
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="h-[50vh] md:h-[60vh]">
        <img
          src="/portfolio/img_6468.jpg"
          alt="Détails mariage"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
