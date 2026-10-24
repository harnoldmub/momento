import type { ProjectCategory } from "@prisma/client";
import { prisma } from "@/lib/db";
import { CATEGORY_ORDER } from "@/components/portfolio/category";

export function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/&/g, " et ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

/** Returns `base`, or `base-2`, `base-3`… so that no other project uses it. */
export async function uniqueSlug(base: string, excludeId?: string) {
  const root = base || "projet";
  for (let i = 1; ; i++) {
    const candidate = i === 1 ? root : `${root}-${i}`;
    const existing = await prisma.project.findUnique({ where: { slug: candidate }, select: { id: true } });
    if (!existing || existing.id === excludeId) return candidate;
  }
}

export function readProjectForm(formData: FormData) {
  const str = (k: string) => String(formData.get(k) || "").trim();
  const categoryRaw = str("category") as ProjectCategory;
  const dateRaw = str("date");
  const date = dateRaw ? new Date(dateRaw) : null;
  return {
    title: str("title"),
    slugInput: slugify(str("slug") || str("title")),
    category: CATEGORY_ORDER.includes(categoryRaw) ? categoryRaw : ("WEDDING" as ProjectCategory),
    coverUrl: str("coverUrl"),
    location: str("location"),
    date: date && !Number.isNaN(date.getTime()) ? date : null,
    tags: str("tags")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .join(","),
    featured: formData.get("featured") === "on",
    description: str("description"),
  };
}
