"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const sections = [
  {
    image: "/portfolio/mariage/portfolio_mariage_11.jpg",
    title: "SINCÈRE",
    subtitle: "Capturer l'authenticité de chaque instant",
  },
  {
    image: "/portfolio/mariage/portfolio_mariage_16.jpg",
    title: "ROMANTIQUE",
    subtitle: "L'amour dans sa forme la plus pure",
  },
  {
    image: "/portfolio/save_the_date/portfolio_std_1.jpg",
    title: "INTEMPOREL",
    subtitle: "Des souvenirs qui traversent le temps",
  },
];

function HeroSection({ image, title, subtitle, index }: {
  image: string;
  title: string;
  subtitle: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);

  const isDidot = index === 0 || index === 2;

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          style={{ minHeight: "130%" }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/40" />

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{ opacity }}
      >
        <h2
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-[0.06em] text-white uppercase"
          style={{
            fontFamily: isDidot
              ? "var(--font-didot), 'GFS Didot', 'Didot', serif"
              : "var(--font-worksans), 'Work Sans', sans-serif",
            fontWeight: isDidot ? 400 : 200,
            fontStyle: isDidot ? "italic" : "normal",
            textShadow: "0 4px 40px rgba(0,0,0,0.4)",
          }}
        >
          {title}
        </h2>
        <p
          className="mt-6 text-sm md:text-base text-white/70 tracking-[0.15em] uppercase"
          style={{ fontFamily: "var(--font-worksans), 'Work Sans', sans-serif", fontWeight: 300 }}
        >
          {subtitle}
        </p>
      </motion.div>
    </section>
  );
}

export function HeroScroll() {
  return (
    <div>
      {sections.map((section, i) => (
        <HeroSection key={section.title} {...section} index={i} />
      ))}
    </div>
  );
}
