"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Link from "next/link";

const chapters = [
  {
    bg: "/portfolio/lyse---anthony-3.jpg",
    floats: [
      "/portfolio/lyse-1_.jpg",
      "/portfolio/morgane---ronald-by-momento-2.jpg",
      "/portfolio/arianne---theo-1.jpg",
    ],
    title: "Nos Galeries",
    subtitle: "Chaque mariage a sa propre histoire, remplie de moments, d'émotions et de souvenirs.",
  },
  {
    bg: "/portfolio/morgane---ronald-by-momento-1.jpg",
    floats: [
      "/portfolio/divana-6.jpg",
      "/portfolio/josiane---pacifique-1.jpg",
      "/portfolio/angie-bali-2.jpg",
    ],
    title: "Émotion Pure",
    subtitle: "Prenez le temps de parcourir nos galeries et ressentez l'amour à travers nos photos.",
  },
  {
    bg: "/portfolio/lyse---anthony-1-6.jpg",
    floats: [
      "/portfolio/yoceane-dubai-1.jpg",
      "/portfolio/lhysa-1.jpg",
      "/portfolio/img_6468.jpg",
    ],
    title: "Votre Histoire",
    subtitle: "Des souvenirs sincères qui durent pour toujours, capturés avec art et passion.",
  },
];

function ChapterScene({
  chapter,
  opacity,
  bgScale,
  bgX,
  bgY,
  textClip,
  floatOffsets,
}: {
  chapter: (typeof chapters)[0];
  opacity: MotionValue<number>;
  bgScale: MotionValue<number>;
  bgX: MotionValue<string>;
  bgY: MotionValue<string>;
  textClip: MotionValue<string>;
  floatOffsets: MotionValue<string>[];
}) {
  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <motion.div
        className="absolute inset-0"
        style={{ scale: bgScale, x: bgX, y: bgY }}
      >
        <img
          src={chapter.bg}
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/50" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {chapter.floats.map((src, i) => {
        const positions = [
          { top: "8%", left: "5%", w: "22vw", maxW: "280px" },
          { top: "15%", right: "4%", w: "18vw", maxW: "240px" },
          { bottom: "12%", left: "8%", w: "20vw", maxW: "260px" },
        ];
        const pos = positions[i];
        return (
          <motion.div
            key={src}
            className="absolute hidden md:block rounded shadow-2xl overflow-hidden"
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              bottom: pos.bottom,
              width: pos.w,
              maxWidth: pos.maxW,
              y: floatOffsets[i],
              opacity: 0.85,
            }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "3/4" }}
            />
          </motion.div>
        );
      })}

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl uppercase text-white italic mb-6"
          style={{
            fontFamily: "var(--font-didot), 'GFS Didot', 'Didot', serif",
            clipPath: textClip,
            textShadow: "0 4px 40px rgba(0,0,0,0.7)",
          }}
        >
          {chapter.title}
        </motion.h2>
        <p
          className="text-sm md:text-base text-white/80 max-w-lg leading-relaxed"
          style={{
            fontFamily: "var(--font-worksans), 'Work Sans', sans-serif",
            fontWeight: 300,
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          {chapter.subtitle}
        </p>
      </div>
    </motion.div>
  );
}

export function CinematicSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const ch1Opacity = useTransform(scrollYProgress, [0, 0.28, 0.33], [1, 1, 0]);
  const ch2Opacity = useTransform(scrollYProgress, [0.28, 0.33, 0.61, 0.66], [0, 1, 1, 0]);
  const ch3Opacity = useTransform(scrollYProgress, [0.61, 0.66, 1], [0, 1, 1]);

  const ch1Scale = useTransform(scrollYProgress, [0, 0.33], [1, 1.12]);
  const ch2Scale = useTransform(scrollYProgress, [0.33, 0.66], [1, 1.1]);
  const ch3Scale = useTransform(scrollYProgress, [0.66, 1], [1, 1.08]);

  const ch1X = useTransform(scrollYProgress, [0, 0.33], ["0%", "3%"]);
  const ch2X = useTransform(scrollYProgress, [0.33, 0.66], ["0%", "-2%"]);
  const ch3X = useTransform(scrollYProgress, [0.66, 1], ["0%", "1%"]);

  const ch1Y = useTransform(scrollYProgress, [0, 0.33], ["0%", "-2%"]);
  const ch2Y = useTransform(scrollYProgress, [0.33, 0.66], ["0%", "1%"]);
  const ch3Y = useTransform(scrollYProgress, [0.66, 1], ["0%", "-1%"]);

  const ch1Clip = useTransform(scrollYProgress, [0, 0.12], [
    "inset(50% 50% 50% 50%)",
    "inset(0% 0% 0% 0%)",
  ]);
  const ch2Clip = useTransform(scrollYProgress, [0.33, 0.45], [
    "inset(50% 50% 50% 50%)",
    "inset(0% 0% 0% 0%)",
  ]);
  const ch3Clip = useTransform(scrollYProgress, [0.66, 0.78], [
    "inset(50% 50% 50% 50%)",
    "inset(0% 0% 0% 0%)",
  ]);

  const f1a = useTransform(scrollYProgress, [0, 0.33], ["0px", "-60px"]);
  const f1b = useTransform(scrollYProgress, [0, 0.33], ["0px", "-30px"]);
  const f1c = useTransform(scrollYProgress, [0, 0.33], ["0px", "-80px"]);

  const f2a = useTransform(scrollYProgress, [0.33, 0.66], ["0px", "-50px"]);
  const f2b = useTransform(scrollYProgress, [0.33, 0.66], ["0px", "-70px"]);
  const f2c = useTransform(scrollYProgress, [0.33, 0.66], ["0px", "-40px"]);

  const f3a = useTransform(scrollYProgress, [0.66, 1], ["0px", "-45px"]);
  const f3b = useTransform(scrollYProgress, [0.66, 1], ["0px", "-65px"]);
  const f3c = useTransform(scrollYProgress, [0.66, 1], ["0px", "-55px"]);

  const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.85, 0.95], ["30px", "0px"]);

  return (
    <section ref={containerRef} className="h-[360vh] relative bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <ChapterScene
          chapter={chapters[0]}
          opacity={ch1Opacity}
          bgScale={ch1Scale}
          bgX={ch1X}
          bgY={ch1Y}
          textClip={ch1Clip}
          floatOffsets={[f1a, f1b, f1c]}
        />
        <ChapterScene
          chapter={chapters[1]}
          opacity={ch2Opacity}
          bgScale={ch2Scale}
          bgX={ch2X}
          bgY={ch2Y}
          textClip={ch2Clip}
          floatOffsets={[f2a, f2b, f2c]}
        />
        <ChapterScene
          chapter={chapters[2]}
          opacity={ch3Opacity}
          bgScale={ch3Scale}
          bgX={ch3X}
          bgY={ch3Y}
          textClip={ch3Clip}
          floatOffsets={[f3a, f3b, f3c]}
        />

        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10"
          style={{ opacity: ctaOpacity, y: ctaY }}
        >
          <Link
            href="/portfolio"
            className="inline-block bg-white text-black px-12 py-4 text-[11px] tracking-[0.3em] uppercase rounded-full hover:bg-ivory transition-colors duration-300 font-medium"
            style={{ fontFamily: "var(--font-worksans), 'Work Sans', sans-serif" }}
          >
            Voir les galeries
          </Link>
        </motion.div>

        <div
          className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E")`,
            mixBlendMode: "overlay",
          }}
        />
      </div>
    </section>
  );
}
