import Image from "next/image";
import Link from "next/link";
import type { ProjectCategory } from "@prisma/client";
import { CATEGORY_LABEL } from "@/components/portfolio/category";

export function ProjectCard({
  slug,
  title,
  category,
  coverUrl,
  location,
}: {
  slug: string;
  title: string;
  category: ProjectCategory;
  coverUrl: string;
  location: string;
}) {
  return (
    <Link
      href={`/portfolio/${slug}`}
      className="group relative overflow-hidden rounded-2xl border border-line bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 dark:bg-white/3"
    >
      <div className="relative aspect-[4/5]">
        <Image
          src={coverUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent opacity-85 transition group-hover:opacity-95" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="text-[11px] tracking-[0.28em] uppercase text-ivory/65">
          {CATEGORY_LABEL[category]} {location ? `· ${location}` : ""}
        </div>
        <div className="mt-2 font-[var(--font-display)] text-xl tracking-[0.08em] uppercase">
          {title}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(700px_280px_at_30%_20%,rgba(255,255,255,0.18),transparent_60%)] dark:bg-[radial-gradient(700px_280px_at_30%_20%,rgba(220,217,208,0.18),transparent_60%)]" />
      </div>
    </Link>
  );
}
