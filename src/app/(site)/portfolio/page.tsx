import type { Metadata } from "next";
import { FullscreenGallery } from "@/components/portfolio/FullscreenGallery";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Nos R\u00e9alisations \u2013 Des Histoires d\u2019Amour \u00e0 Travers le Monde.",
};

const allPhotos = [
  "/portfolio/lyse---anthony-1-6.jpg",
  "/portfolio/arianne---theo-1.jpg",
  "/portfolio/morgane---ronald-by-momento-1.jpg",
  "/portfolio/lyse---anthony-2.jpg",
  "/portfolio/arianne---theo-2-suit.jpg",
  "/portfolio/morgane---ronald-by-momento-2.jpg",
  "/portfolio/divana-6.jpg",
  "/portfolio/lyse-1_.jpg",
  "/portfolio/yoceane-dubai-1.jpg",
  "/portfolio/lyse---anthony-3.jpg",
  "/portfolio/arianne---theo-3.jpg",
  "/portfolio/morgane---ronald-by-momento-3.jpg",
  "/portfolio/angie-bali-2.jpg",
  "/portfolio/josiane---pacifique-1.jpg",
  "/portfolio/lyse---anthony-4.jpg",
  "/portfolio/divana-3-suite.jpg",
  "/portfolio/lhysa-1.jpg",
  "/portfolio/morgane---ronald-by-momento-4.jpg",
  "/portfolio/lyse---anthony-5.jpg",
  "/portfolio/divina-2.jpg",
  "/portfolio/photoshop-yoceane-7.jpg",
  "/portfolio/lyse---anthony-6.jpg",
  "/portfolio/angie-3-modifier-insta.jpg",
  "/portfolio/morgane---ronald-by-momento-7.jpg",
  "/portfolio/lyse---anthony-7.jpg",
  "/portfolio/photoshop-yoceane-8.jpg",
  "/portfolio/photoshop-anaia-5.jpg",
  "/portfolio/lyse---anthony-8.jpg",
  "/portfolio/photoshop-yoceane-9.jpg",
  "/portfolio/marilyn.jpg",
  "/portfolio/lyse-10.jpg",
  "/portfolio/photoshop-yoceane-11.jpg",
  "/portfolio/mmt_7409.jpg",
  "/portfolio/lyse-3_.jpg",
  "/portfolio/photoshop-yoceane-12.jpg",
  "/portfolio/lyse-4_.jpg",
  "/portfolio/photoshop-1.jpg",
  "/portfolio/img_3850.jpg",
  "/portfolio/img_3851.jpg",
  "/portfolio/img_3852.jpg",
  "/portfolio/img_3853.jpg",
  "/portfolio/img_4924.jpg",
  "/portfolio/img_6008.jpg",
  "/portfolio/img_6009.jpg",
  "/portfolio/img_6015.jpg",
  "/portfolio/img_6016.jpg",
  "/portfolio/img_6018.jpg",
  "/portfolio/img_6468.jpg",
  "/portfolio/img_6469.jpg",
  "/portfolio/img_6470.jpg",
  "/portfolio/img_8605.jpg",
  "/portfolio/_02a9253.jpg",
  "/portfolio/_02a9315.jpg",
  "/portfolio/_mg_0611-modifier.jpg",
  "/portfolio/_mg_7911-modifier.jpg",
  "/portfolio/_mt_0596.jpg",
  "/portfolio/_mt_3680.jpg",
  "/portfolio/_mt_3697.jpg",
  "/portfolio/_n8a4624-modifier-2.jpg",
  "/portfolio/_n8a8869-modifier.jpg",
];

export default function PortfolioPage() {
  return (
    <div className="pt-20">
      <FullscreenGallery photos={allPhotos} />
    </div>
  );
}
