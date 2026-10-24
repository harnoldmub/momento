"use client";

import { useMemo, useState } from "react";
import type { Media } from "@prisma/client";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { videoEmbedUrl } from "@/lib/video";

function VideoBlock({ media }: { media: Media }) {
  const embed = videoEmbedUrl(media.url);
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-black">
      {embed ? (
        <iframe
          src={embed}
          title={media.alt || "Film Momento"}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <video className="absolute inset-0 h-full w-full" src={media.url} controls playsInline preload="metadata" />
      )}
    </div>
  );
}

export function ProjectGallery({ media }: { media: Media[] }) {
  const sorted = useMemo(
    () => media.slice().sort((a, b) => a.order - b.order),
    [media],
  );
  const photos = sorted.filter((m) => m.type === "IMAGE");
  const videos = sorted.filter((m) => m.type === "VIDEO");
  const slides = useMemo(
    () => photos.map((m) => ({ src: m.url, alt: m.alt || "Momento photo" })),
    [photos],
  );
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!sorted.length) {
    return <p className="text-sm text-ivory/50">Les images de ce reportage arrivent bient&ocirc;t.</p>;
  }

  return (
    <div>
      {videos.length > 0 && (
        <div className="mb-12 grid gap-8">
          {videos.map((v) => (
            <VideoBlock key={v.id} media={v} />
          ))}
        </div>
      )}

      <div className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3">
        {photos.map((m, i) => (
          <button
            key={m.id}
            className="block w-full break-inside-avoid overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          >
            <Image
              src={m.url}
              alt={m.alt || "Momento photo"}
              width={1600}
              height={2000}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        on={{ view: ({ index: i }) => setIndex(i) }}
      />
    </div>
  );
}
