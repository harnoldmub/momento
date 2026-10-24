import { cache } from "react";
import { prisma } from "@/lib/db";

export const DEFAULT_HERO_IMAGE = "/hero/hero.jpg";
// Former schema default, still present in older databases.
const LEGACY_HERO_IMAGE = "https://images.unsplash.com/photo-1523438097201-512ae7d59a34";

/** Site content row, deduplicated per request (layout footer + page). */
export const getSiteContent = cache(async () => {
  return prisma.siteContent.findUnique({ where: { id: 1 } });
});

export function heroImageOf(url: string | null | undefined) {
  if (!url || url.startsWith(LEGACY_HERO_IMAGE)) return DEFAULT_HERO_IMAGE;
  return url;
}

/** Project cover, falling back to the first image of the project. */
export function coverOf(project: { coverUrl: string; media?: { type: string; url: string }[] }) {
  return (
    project.coverUrl ||
    project.media?.find((m) => m.type === "IMAGE")?.url ||
    DEFAULT_HERO_IMAGE
  );
}
