"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function GalleryPreview() {
  return (
    <section className="bg-charcoal">
      <div className="relative">
        <div
          className="h-[50vh] md:h-[60vh] bg-cover bg-center grayscale"
          style={{ backgroundImage: `url(/portfolio/lyse---anthony-3.jpg)` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center text-sm text-white/60 max-w-xl leading-relaxed mb-8"
          >
            Chaque mariage a sa propre histoire, remplie de moments, d&apos;&eacute;motions et de souvenirs.
            Prenez le temps de parcourir nos galeries et ressentez l&apos;amour &agrave; travers nos photos.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Link
              href="/portfolio"
              className="inline-block bg-white text-charcoal px-8 py-3 text-[11px] tracking-[0.25em] uppercase rounded-full hover:bg-ivory transition-colors duration-300"
            >
              Voir les galeries
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="h-[50vh] md:h-[60vh]">
        <img
          src="/portfolio/img_6468.jpg"
          alt="D\u00e9tails mariage"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
