"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function ReadySection() {
  return (
    <section className="py-20 md:py-28 bg-charcoal">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden">
              <Image
                src="/portfolio/lyse---anthony-1-6.jpg"
                alt="Momento"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="font-[var(--font-display)] text-2xl md:text-3xl lg:text-4xl tracking-[0.03em] uppercase leading-[1.2]">
              Pr&ecirc;t pour des photos qui racontent votre{" "}
              <span className="italic font-light">amour</span> de mani&egrave;re intemporelle ?
            </h2>
            <p className="mt-6 text-sm text-ivory/50 leading-relaxed max-w-md">
              Nous serions honor&eacute;s de capturer les moments les plus pr&eacute;cieux de votre mariage.
              Chaque d&eacute;tail, chaque &eacute;motion, chaque instant.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-ivory/60 hover:text-ivory transition-colors duration-300"
              >
                R&eacute;server maintenant
                <span className="text-lg">&rarr;</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
