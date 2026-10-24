import type { Metadata } from "next";
import { getSiteContent } from "@/lib/siteContent";
import { SimpleMarkdown } from "@/components/content/SimpleMarkdown";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales et politique de confidentialité du site Momento.",
  alternates: { canonical: "/legal" },
};

export default async function LegalPage() {
  const content = await getSiteContent();
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.35em] uppercase text-ivory/40 mb-4">
              L&eacute;gal
            </div>
            <h1 className="font-[var(--font-display)] text-4xl tracking-[0.04em] uppercase md:text-5xl">
              Mentions l&eacute;gales
            </h1>
          </div>
        </Reveal>

        <div className="mt-12 max-w-3xl border border-line p-10 md:p-14">
          <SimpleMarkdown text={content?.legalMarkdown || ""} />
        </div>
      </div>
    </div>
  );
}
