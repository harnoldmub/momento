import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getSiteContent } from "@/lib/siteContent";
import { businessJsonLd, jsonLdString } from "@/lib/seo";

// Content is edited from the admin: always render with fresh data.
export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();
  const jsonLd = businessJsonLd({
    phoneCongo: content?.contactPhoneCongo || "+243 827447747",
    phoneFrance: content?.contactPhoneFrance || "+33 758732532",
    instagram: content?.instagramHandle || "momento_rdc",
  });

  return (
    <div className="min-h-dvh bg-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
