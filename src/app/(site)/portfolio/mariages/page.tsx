import type { Metadata } from "next";
import { FullscreenGallery } from "@/components/portfolio/FullscreenGallery";

export const metadata: Metadata = {
    title: "Portfolio | Mariages",
    description: "Découvrez nos reportages de mariages d'exception, capturant l'élégance et l'émotion de votre plus beau jour.",
};

const photos = Array.from({ length: 29 }, (_, i) => `/portfolio/mariage/portfolio_mariage_${i + 1}.jpg`);

export default function MariagesPage() {
    return (
        <div className="pt-20">
            <FullscreenGallery photos={photos} />
        </div>
    );
}
