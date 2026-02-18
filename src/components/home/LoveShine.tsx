"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function LoveShine() {
  return (
    <section className="py-20 md:py-32 bg-charcoal">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="text-[11px] tracking-[0.4em] uppercase text-ivory/40 mb-8">
            Inspir&eacute; par l&apos;amour et les vraies histoires
          </div>
          <h2 className="font-[var(--font-display)] text-3xl md:text-5xl lg:text-6xl tracking-[0.03em] leading-[1.15]">
            Faire briller votre{" "}
            <span className="italic font-light">amour</span>
            <br />
            avec &eacute;clat
          </h2>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-ivory/50 hover:text-ivory transition-colors duration-300"
            >
              V&eacute;rifier la disponibilit&eacute;
              <span className="text-lg">&rarr;</span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex justify-center"
        >
          <div className="w-full max-w-md">
            <img
              src="/porfolio/Divana%206.jpg"
              alt="Portrait élégant"
              className="w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
