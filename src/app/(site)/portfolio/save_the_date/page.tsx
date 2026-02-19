import type { Metadata } from "next";
import { FullscreenGallery } from "@/components/portfolio/FullscreenGallery";

export const metadata: Metadata = {
    title: "Portfolio | Save the Date",
    description: "Nos séances Save the Date : des instants intimistes et éditoriaux avant le grand jour.",
};

const photos = Array.from({ length: 33 }, (_, i) => `/portfolio/save_the_date/portfolio_std_${i + 1}.jpg`);

export default function SaveTheDatePage() {
    return (
        <div className="pt-20">
            <FullscreenGallery photos={photos} />
        </div>
    );
}
