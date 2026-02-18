import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Momento RDC | Luxury Wedding Photography & Films",
    template: "%s | Momento RDC",
  },
  description:
    "Luxury & destination weddings photography and films. Based in RDC + France, available worldwide. Now booking 2026–2027.",
  openGraph: {
    type: "website",
    title: "Momento RDC",
    description:
      "Luxury & destination weddings photography and films. Based in RDC + France, available worldwide.",
    siteName: "Momento RDC",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="bg-charcoal text-ivory antialiased" suppressHydrationWarning>
      <body className={`${fontBody.variable} ${fontDisplay.variable} min-h-dvh`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
