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

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1]);

  return (
    <section className="bg-charcoal">
      <div ref={sectionRef} className="relative overflow-hidden h-[70vh]">
        <motion.div
          className="absolute inset-0"
          style={{ y, scale }}
        >
          <img
            src="/home/home-13.jpg"
            alt="Galerie mariage"
            className="w-full h-full object-cover"
            style={{ minHeight: "120%" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
