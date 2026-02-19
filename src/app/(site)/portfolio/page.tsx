import type { Metadata } from "next";
import { FullscreenGallery } from "@/components/portfolio/FullscreenGallery";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Nos R\u00e9alisations \u2013 Des Histoires d\u2019Amour \u00e0 Travers le Monde.",
};

const allPhotos = [
  // Mariage
  ...Array.from({ length: 29 }, (_, i) => `/portfolio/mariage/portfolio_mariage_${i + 1}.jpg`),
  // Save the Date
  ...Array.from({ length: 33 }, (_, i) => `/portfolio/save_the_date/portfolio_std_${i + 1}.jpg`),
];

export default function PortfolioPage() {
  return (
    <div className="pt-20">
      <FullscreenGallery photos={allPhotos} />
    </div>
  );
}
