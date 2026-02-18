import type { ProjectCategory } from "@prisma/client";

export const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  WEDDING: "Wedding",
  ENGAGEMENT: "Engagement",
  COUPLE: "Couple",
  EVENTS: "Events",
  FILMS: "Films",
};

