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

  return (
    <section className="bg-charcoal">
      <div ref={sectionRef} className="relative overflow-hidden h-[70vh]">
        <motion.div
          className="absolute inset-0"
          style={{ y, scale }}
        >
          <img
            src="/porfolio/Lyse & Anthony 3.jpg"
            alt="Galerie mariage"
            className="w-full h-full object-cover"
            style={{ minHeight: "120%" }}
          />
        </motion.div>

        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.75) 100%)"
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center text-3xl md:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-white mb-6 italic"
            style={{ fontFamily: "var(--font-didot), 'GFS Didot', 'Didot', serif" }}
          >
            Nos Galeries
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center text-sm md:text-base text-white/90 max-w-xl leading-relaxed mb-10"
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
              className="inline-block border border-white px-10 py-3.5 text-[11px] tracking-[0.25em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Voir les galeries
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="h-[50vh] md:h-[60vh]">
        <img
          src="/porfolio/IMG_6468.jpg"
          alt="Détails mariage"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
