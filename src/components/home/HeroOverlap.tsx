"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroOverlap() {
  return (
    <section className="relative w-full overflow-hidden bg-charcoal py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative z-10 w-[65%]">
              <Image
                src="/portfolio/lyse-1_.jpg"
                alt="Mari\u00e9e \u00e9l\u00e9gante"
                width={500}
                height={700}
                className="w-full object-cover shadow-2xl"
                sizes="(max-width: 768px) 65vw, 30vw"
              />
            </div>
            <div className="absolute top-[15%] left-[35%] z-20 w-[65%]">
              <Image
                src="/portfolio/morgane---ronald-by-momento-2.jpg"
                alt="Couple au coucher du soleil"
                width={500}
                height={600}
                className="w-full object-cover shadow-2xl"
                sizes="(max-width: 768px) 65vw, 30vw"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start md:items-end md:text-right"
          >
            <h2 className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-[0.02em]">
              <span className="italic font-light">Sinc&egrave;re</span>
              <br />
              <span className="text-ivory/60">Romantique</span>
              <br />
              <span className="italic tracking-[0.04em]">Intemporel</span>
            </h2>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-ivory/50 md:text-base">
              La beaut&eacute; de votre histoire, captur&eacute;e avec un m&eacute;lange d&apos;art et
              d&apos;&eacute;motion, cr&eacute;ant des souvenirs sinc&egrave;res qui durent pour toujours.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
