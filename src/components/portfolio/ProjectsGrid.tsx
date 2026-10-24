"use client";

import { useMemo, useState } from "react";
import type { ProjectCategory } from "@prisma/client";
import { cn } from "@/lib/utils";
import { CATEGORY_LABEL, CATEGORY_ORDER } from "@/components/portfolio/category";
import { ProjectCard } from "@/components/portfolio/ProjectCard";

type ProjectItem = {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  coverUrl: string;
  location: string;
};

const ALL = "ALL" as const;
type Filter = ProjectCategory | typeof ALL;

export function ProjectsGrid({ projects }: { projects: ProjectItem[] }) {
  const [filter, setFilter] = useState<Filter>(ALL);

  // Only offer filters for categories that actually have projects.
  const categories = useMemo(
    () => CATEGORY_ORDER.filter((c) => projects.some((p) => p.category === c)),
    [projects],
  );
  const filtered = filter === ALL ? projects : projects.filter((p) => p.category === filter);

  const btn = (active: boolean) =>
    cn(
      "border px-5 py-2.5 text-[11px] tracking-[0.22em] uppercase transition-all duration-300",
      active
        ? "border-ivory/40 text-ivory"
        : "border-line text-ivory/50 hover:border-ivory/25 hover:text-ivory/70",
    );

  return (
    <div>
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-3">
          <button onClick={() => setFilter(ALL)} className={btn(filter === ALL)}>
            Tout
          </button>
          {categories.map((c) => (
            <button key={c} onClick={() => setFilter(c)} className={btn(filter === c)}>
              {CATEGORY_LABEL[c]}
            </button>
          ))}
        </div>
      )}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
