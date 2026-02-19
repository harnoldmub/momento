"use client";

import { motion } from "framer-motion";
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
              <img
                src="/home/home-15.jpg"
                alt="Mariée élégante"
                className="w-full object-cover shadow-2xl"
              />
            </div>
            <div className="absolute top-[15%] left-[35%] z-20 w-[65%]">
              <img
                src="/home/home-9.jpg"
                alt="Couple au coucher du soleil"
                className="w-full object-cover shadow-2xl"
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.3] tracking-[0.04em]">
              <span
                className="italic block"
                style={{ fontFamily: "var(--font-didot), 'GFS Didot', 'Didot', serif" }}
              >
                SINCÈRE
              </span>
              <span
                className="block font-extralight text-ivory/55"
                style={{ fontFamily: "var(--font-worksans), 'Work Sans', sans-serif" }}
              >
                ROMANTIQUE
              </span>
              <span
                className="italic block"
                style={{ fontFamily: "var(--font-didot), 'GFS Didot', 'Didot', serif" }}
              >
                INTEMPOREL
              </span>
            </h2>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-ivory/50 md:text-base">
              La beauté de votre histoire, capturée avec un mélange d&apos;art et
              d&apos;émotion, créant des souvenirs sincères qui durent pour toujours.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
