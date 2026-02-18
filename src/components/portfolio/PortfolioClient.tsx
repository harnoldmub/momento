"use client";

import { useMemo, useState } from "react";
import type { Media, Project, ProjectCategory } from "@prisma/client";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Video from "yet-another-react-lightbox/plugins/video";
import { cn } from "@/lib/utils";
import { CATEGORY_LABEL } from "@/components/portfolio/category";

type ProjectWithMedia = Project & { media: Media[] };

const ALL = "ALL" as const;
type Filter = ProjectCategory | typeof ALL;

function slideForMedia(m: Media) {
  if (m.type === "VIDEO")
    return {
      type: "video" as const,
      sources: [{ src: m.url, type: "video/mp4" }],
    };
  return { type: "image" as const, src: m.url, alt: m.alt || "Momento media" };
}

export function PortfolioClient({ projects }: { projects: ProjectWithMedia[] }) {
  const [filter, setFilter] = useState<Filter>(ALL);
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  const filtered = useMemo(() => {
    if (filter === ALL) return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter, projects]);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setFilter(ALL)}
          className={cn(
            "border px-5 py-2.5 text-[11px] tracking-[0.22em] uppercase transition-all duration-300",
            filter === ALL
              ? "border-ivory/40 text-ivory"
              : "border-line text-ivory/50 hover:border-ivory/25 hover:text-ivory/70",
          )}
        >
          Tout
        </button>
        {(Object.keys(CATEGORY_LABEL) as ProjectCategory[]).map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "border px-5 py-2.5 text-[11px] tracking-[0.22em] uppercase transition-all duration-300",
              filter === c
                ? "border-ivory/40 text-ivory"
                : "border-line text-ivory/50 hover:border-ivory/25 hover:text-ivory/70",
            )}
          >
            {CATEGORY_LABEL[c]}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3">
        {filtered.map((p) => (
          <article
            key={p.id}
            className="break-inside-avoid overflow-hidden border border-line"
          >
            <button
              className="group relative block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              onClick={() => {
                const s = p.media
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .map(slideForMedia);
                setSlides(s);
                setIndex(0);
                setOpen(true);
              }}
            >
              <Image
                src={p.coverUrl}
                alt={p.title}
                width={1600}
                height={2000}
                className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="text-[10px] tracking-[0.3em] uppercase text-white/60">
                  {CATEGORY_LABEL[p.category]} {p.location ? `\u00b7 ${p.location}` : ""}
                </div>
                <div className="mt-1.5 font-[var(--font-display)] text-lg tracking-[0.06em] uppercase text-white">
                  {p.title}
                </div>
              </div>
            </button>

            <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3.5 text-[10px] tracking-[0.22em] uppercase">
              <span className="text-ivory/45">
                {p.media.some((m) => m.type === "VIDEO") ? "Photos + Film" : `${p.media.length} photos`}
              </span>
              <button
                onClick={() => {
                  const s = p.media
                    .slice()
                    .sort((a, b) => a.order - b.order)
                    .map(slideForMedia);
                  setSlides(s);
                  setIndex(0);
                  setOpen(true);
                }}
                className="text-ivory/60 hover:text-ivory transition-colors duration-300"
              >
                Voir le projet
              </button>
            </div>
          </article>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Video]}
        on={{ view: ({ index: i }) => setIndex(i) }}
        carousel={{ finite: false }}
      />
    </div>
  );
}
