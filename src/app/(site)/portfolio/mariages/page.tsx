import type { Metadata } from "next";
import { FullscreenGallery } from "@/components/portfolio/FullscreenGallery";

export const metadata: Metadata = {
    title: "Photographe de Mariage – Reportages Mariage Paris, France & Belgique",
    description:
        "Reportages de mariage par Momento, photographe et vidéaste de mariage à Paris, en France, en Belgique et à Kinshasa : élégance, émotion et images intemporelles de votre plus beau jour.",
    alternates: { canonical: "/portfolio/mariages" },
};

const photos = Array.from({ length: 29 }, (_, i) => `/portfolio/mariage/portfolio_mariage_${i + 1}.jpg`);

export default function MariagesPage() {
    return (
        <div className="pt-20">
            <h1 className="sr-only">Photos de mariage – Momento, photographe de mariage à Paris, en France et en Belgique</h1>
            <FullscreenGallery photos={photos} altPrefix="Photo de mariage Momento" />
        </div>
    );
}
