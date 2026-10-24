import type { Metadata } from "next";
import { Manrope, Playfair_Display, Work_Sans, GFS_Didot } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { getSiteUrl } from "@/lib/env";
import { SEO_KEYWORDS } from "@/lib/seo";

const fontBody = Manrope({
  variable: "--font-momento-body",
  subsets: ["latin"],
  display: "swap",
});

const fontDisplay = Playfair_Display({
  variable: "--font-momento-display",
  subsets: ["latin"],
  display: "swap",
});

const fontDidot = GFS_Didot({
  variable: "--font-didot",
  subsets: ["greek"],
  display: "swap",
  weight: "400",
});

const fontWorkSans = Work_Sans({
  variable: "--font-worksans",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Momento | Photographe & Vidéaste de Mariage à Paris, France, Belgique & Kinshasa",
    template: "%s | Momento Wedding",
  },
  description:
    "Momento, photographe et vidéaste de mariage haut de gamme à Paris et Kinshasa. Reportages photo, films de mariage cinématographiques et destination weddings en France, en Belgique, en RDC et partout dans le monde.",
  applicationName: "Momento",
  keywords: SEO_KEYWORDS,
  authors: [{ name: "Momento" }],
  creator: "Momento",
  publisher: "Momento",
  category: "Wedding photography",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Momento Wedding",
    title: "Momento | Photographe & Vidéaste de Mariage – Paris, France, Belgique",
    description:
      "Photographie et films de mariage d'exception. Basés à Paris et Kinshasa, disponibles en France, en Belgique et dans le monde entier.",
    images: [{ url: "/home/home-1.jpg", alt: "Momento – photographe de mariage" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Momento | Photographe & Vidéaste de Mariage",
    description: "Photographie et films de mariage d'exception à Paris, en France, en Belgique et à Kinshasa.",
    images: ["/home/home-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="bg-charcoal text-ivory antialiased" suppressHydrationWarning>
      <body className={`${fontBody.variable} ${fontDisplay.variable} ${fontDidot.variable} ${fontWorkSans.variable} min-h-dvh`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
