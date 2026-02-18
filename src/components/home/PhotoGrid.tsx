"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type PhotoItem = {
  src: string;
  alt: string;
  span?: "tall" | "wide" | "normal";
};

export function PhotoGrid({ photos }: { photos: PhotoItem[] }) {
  return (
    <div className="columns-2 md:columns-3 gap-3 md:gap-4">
      {photos.map((photo, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-3 md:mb-4 break-inside-avoid overflow-hidden group"
        >
          <div className="relative overflow-hidden">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={800}
              height={photo.span === "tall" ? 1200 : photo.span === "wide" ? 500 : 900}
              className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
