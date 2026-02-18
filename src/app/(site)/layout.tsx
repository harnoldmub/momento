import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-charcoal">
      <Header />
      <main className="pt-28">{children}</main>
      <Footer />
    </div>
  );
}

