import type { InquiryType, LeadStatus } from "@prisma/client";

export const INQUIRY_LABEL: Record<InquiryType, string> = {
  WEDDING: "Mariage",
  ENGAGEMENT: "Fiançailles",
  COUPLE: "Séance couple",
  EVENT: "Événement",
  FILM: "Film",
  OTHER: "Autre",
};

export const STATUS_LABEL: Record<LeadStatus, string> = {
  NEW: "Nouveau",
  CONTACTED: "Contacté",
  BOOKED: "Réservé",
};
