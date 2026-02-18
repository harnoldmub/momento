import type { Metadata } from "next";
import { FullscreenGallery } from "@/components/portfolio/FullscreenGallery";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Nos R\u00e9alisations \u2013 Des Histoires d\u2019Amour \u00e0 Travers le Monde.",
};

const allPhotos = [
  "/porfolio/Lyse%20%26%20Anthony%201-6.jpg",
  "/porfolio/ARIANNE%20%26%20THEO%201.jpg",
  "/porfolio/Morgane%20%26%20Ronald%20By%20Momento%201.jpg",
  "/porfolio/Lyse%20%26%20Anthony%202.jpg",
  "/porfolio/ARIANNE%20%26%20THEO%202%20suit.jpg",
  "/porfolio/Morgane%20%26%20Ronald%20By%20Momento%202.jpg",
  "/porfolio/Divana%206.jpg",
  "/porfolio/LYSE%201_.jpg",
  "/porfolio/YOCEANE%20Dubai%201.jpg",
  "/porfolio/Lyse%20%26%20Anthony%203.jpg",
  "/porfolio/ARIANNE%20%26%20THEO%203.jpg",
  "/porfolio/Morgane%20%26%20Ronald%20By%20Momento%203.jpg",
  "/porfolio/Angie%20Bali%202.jpg",
  "/porfolio/Josiane%20%26%20Pacifique%201.jpg",
  "/porfolio/Lyse%20%26%20Anthony%204.jpg",
  "/porfolio/%20Divana%203%20suite.jpg",
  "/porfolio/Lhysa%201.jpg",
  "/porfolio/Morgane%20%26%20Ronald%20By%20Momento%204.jpg",
  "/porfolio/Lyse%20%26%20Anthony%205.jpg",
  "/porfolio/divina%202.jpg",
  "/porfolio/Photoshop%20Yoceane%207.jpg",
  "/porfolio/Lyse%20%26%20Anthony%206.jpg",
  "/porfolio/Angie%203%20Modifier%20insta.jpg",
  "/porfolio/Morgane%20%26%20Ronald%20By%20Momento%207.jpg",
  "/porfolio/Lyse%20%26%20Anthony%207.jpg",
  "/porfolio/Photoshop%20Yoceane%208.jpg",
  "/porfolio/Photoshop%20Anaia%205.jpg",
  "/porfolio/Lyse%20%26%20Anthony%208.jpg",
  "/porfolio/Photoshop%20Yoceane%209.jpg",
  "/porfolio/Marilyn.jpg",
  "/porfolio/LYSE%2010.jpg",
  "/porfolio/Photoshop%20Yoceane%2011.jpg",
  "/porfolio/MMT_7409.jpg",
  "/porfolio/LYSE%203_.jpg",
  "/porfolio/Photoshop%20Yoceane%2012.jpg",
  "/porfolio/LYSE%204_.jpg",
  "/porfolio/Photoshop%201.jpg",
  "/porfolio/IMG_3850.jpg",
  "/porfolio/IMG_3851.jpg",
  "/porfolio/IMG_3852.jpg",
  "/porfolio/IMG_3853.jpg",
  "/porfolio/IMG_4924.jpg",
  "/porfolio/IMG_6008.jpg",
  "/porfolio/IMG_6009.jpg",
  "/porfolio/IMG_6015.jpg",
  "/porfolio/IMG_6016.jpg",
  "/porfolio/IMG_6018.jpg",
  "/porfolio/IMG_6468.jpg",
  "/porfolio/IMG_6469.jpg",
  "/porfolio/IMG_6470.jpg",
  "/porfolio/IMG_8605.jpg",
  "/porfolio/_02A9253.jpg",
  "/porfolio/_02A9315.jpg",
  "/porfolio/_MG_0611-Modifier.jpg",
  "/porfolio/_MG_7911-Modifier.jpg",
  "/porfolio/_MT_0596.jpg",
  "/porfolio/_MT_3680.jpg",
  "/porfolio/_MT_3697.jpg",
  "/porfolio/_N8A4624-Modifier-2.jpg",
  "/porfolio/_N8A8869-Modifier.jpg",
];

export default function PortfolioPage() {
  return (
    <div className="pt-20">
      <FullscreenGallery photos={allPhotos} />
    </div>
  );
}
