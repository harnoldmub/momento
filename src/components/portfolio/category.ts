import type { ProjectCategory } from "@prisma/client";

export const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  WEDDING: "Mariage",
  ENGAGEMENT: "Fiançailles",
  COUPLE: "Couple",
  PORTRAIT: "Portrait",
  EVENTS: "Événements",
  FILMS: "Films",
};

export const CATEGORY_ORDER = Object.keys(CATEGORY_LABEL) as ProjectCategory[];
