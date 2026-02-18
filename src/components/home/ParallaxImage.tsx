"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  overlay?: React.ReactNode;
  height?: string;
};

export function ParallaxImage({ src, alt, overlay, height = "h-[70vh]" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className={`relative ${height} overflow-hidden`}>
      <motion.div
        className="absolute inset-[-15%]"
        style={{ y }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>
      {overlay && (
        <>
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative flex h-full items-center justify-center px-6 z-10">
            {overlay}
          </div>
        </>
      )}
    </div>
  );
}
