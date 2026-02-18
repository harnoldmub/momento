"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function EditorialReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const clipPercent = useTransform(scrollYProgress, [0.1, 0.5], [40, 0]);
  const clipPath = useTransform(clipPercent, (v) => `inset(${v}% 0% ${v}% 0%)`);
  const imgScale = useTransform(scrollYProgress, [0.1, 0.7], [1.15, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const textY = useTransform(scrollYProgress, [0.05, 0.35], ["40px", "0px"]);
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);

  return (
    <section ref={sectionRef} className="relative bg-ivory py-20 md:py-28 lg:py-36 overflow-hidden">
      <motion.div
        className="text-center mb-14 md:mb-20 px-6"
        style={{ y: textY, opacity: textOpacity }}
      >
        <p
          className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-charcoal/40 mb-4"
          style={{ fontFamily: "var(--font-worksans), 'Work Sans', sans-serif", fontWeight: 400 }}
        >
          Notre Vision
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase italic text-charcoal tracking-[0.05em]"
          style={{ fontFamily: "var(--font-didot), 'GFS Didot', 'Didot', serif" }}
        >
          Cinematic Editorial Approach
        </h2>
      </motion.div>

      <div className="relative mx-auto max-w-[1400px] px-4 md:px-8">
        <motion.div
          className="relative w-full overflow-hidden"
          style={{ clipPath }}
        >
          <motion.div style={{ scale: imgScale, y: imgY }}>
            <img
              src="/portfolio/lyse---anthony-1-6.jpg"
              alt="Cinematic editorial wedding"
              className="w-full h-[50vh] md:h-[65vh] lg:h-[75vh] object-cover"
            />
          </motion.div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.15) 100%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-10 md:pb-14">
            <p
              className="text-white/70 text-xs md:text-sm tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-worksans), 'Work Sans', sans-serif", fontWeight: 300, textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
            >
              Photographe & Vidéaste de Mariage
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
