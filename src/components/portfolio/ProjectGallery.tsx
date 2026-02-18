"use client";

import { useMemo, useState } from "react";
import type { Media } from "@prisma/client";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Video from "yet-another-react-lightbox/plugins/video";

function slideForMedia(m: Media) {
  if (m.type === "VIDEO")
    return {
      type: "video" as const,
      sources: [{ src: m.url, type: "video/mp4" }],
    };
  return { type: "image" as const, src: m.url, alt: m.alt || "Momento photo" };
}

export function ProjectGallery({ media }: { media: Media[] }) {
  const sorted = useMemo(
    () => media.slice().sort((a, b) => a.order - b.order),
    [media],
  );
  const slides = useMemo(() => sorted.map(slideForMedia), [sorted]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const photos = sorted.filter((m) => m.type === "IMAGE");
  const videos = sorted.filter((m) => m.type === "VIDEO");

  return (
    <div>
      {videos.length ? (
        <div className="mb-8 rounded-2xl border border-line bg-black/[0.03] p-5 dark:bg-white/3">
          <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
            Film
          </div>
          <div className="mt-3 text-sm text-ivory/70">
            This story includes film. Open the gallery to play it full-screen.
          </div>
        </div>
      ) : null}

      <div className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3">
        {photos.map((m, i) => (
          <button
            key={m.id}
            className="block w-full break-inside-avoid overflow-hidden rounded-2xl border border-line bg-black/[0.03] dark:bg-white/3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            onClick={() => {
              setIndex(sorted.findIndex((x) => x.id === m.id));
              setOpen(true);
            }}
          >
            <Image
              src={m.url}
              alt={m.alt || "Momento photo"}
              width={1600}
              height={2000}
              className="h-auto w-full object-cover"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Video]}
        on={{ view: ({ index: i }) => setIndex(i) }}
      />
    </div>
  );
}
