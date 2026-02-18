"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export function FullscreenGallery({ photos }: { photos: string[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = photos.map((src) => ({ src, alt: "Momento portfolio" }));

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3">
        {photos.map((src, i) => (
          <div
            key={src}
            className="relative aspect-[4/5] overflow-hidden cursor-pointer group"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          >
            <Image
              src={src}
              alt="Momento portfolio"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 50vw, 33vw"
              priority={i < 6}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
          </div>
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
