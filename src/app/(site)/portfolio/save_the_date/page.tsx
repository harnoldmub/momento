import type { Metadata } from "next";
import { FullscreenGallery } from "@/components/portfolio/FullscreenGallery";

export const metadata: Metadata = {
    title: "Séance Save the Date & Fiançailles – Paris, France, Belgique",
    description:
        "Séances save the date et fiançailles par Momento : des portraits de couple intimistes et éditoriaux avant le grand jour, à Paris, en France, en Belgique et à Kinshasa.",
    alternates: { canonical: "/portfolio/save_the_date" },
};

const photos = Array.from({ length: 33 }, (_, i) => `/portfolio/save_the_date/portfolio_std_${i + 1}.jpg`);

export default function SaveTheDatePage() {
    return (
        <div className="pt-20">
            <h1 className="sr-only">Séances save the date – Momento, photographe de couple et de mariage</h1>
            <FullscreenGallery photos={photos} altPrefix="Séance save the date Momento" />
        </div>
    );
}
