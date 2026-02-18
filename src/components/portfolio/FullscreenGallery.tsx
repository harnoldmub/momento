"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion } from "framer-motion";

export function FullscreenGallery({ photos }: { photos: string[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = photos.map((src) => ({ src, alt: "Momento portfolio" }));

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3">
        {photos.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.6, delay: (i % 6) * 0.05 }}
            className="relative aspect-[4/5] overflow-hidden cursor-pointer group"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          >
            <img
              src={src}
              alt="Momento portfolio"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading={i < 6 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
          </motion.div>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        on={{ view: ({ index: i }) => setIndex(i) }}
        carousel={{ finite: false }}
      />
    </>
  );
}
