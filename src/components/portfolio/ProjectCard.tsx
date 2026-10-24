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
      className="group relative overflow-hidden block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={coverUrl}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 transition-all duration-500 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
        <div className="text-[10px] tracking-[0.3em] uppercase text-white/60">
          {CATEGORY_LABEL[category]} {location ? `· ${location}` : ""}
        </div>
        <div className="mt-2 font-[var(--font-display)] text-xl tracking-[0.06em] uppercase text-white">
          {title}
        </div>
      </div>
    </Link>
  );
}
