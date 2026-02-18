import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { SimpleMarkdown } from "@/components/content/SimpleMarkdown";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Mentions l\u00e9gales",
  description: "Mentions l\u00e9gales et politique de confidentialit\u00e9.",
};

export default async function LegalPage() {
  const content = await prisma.siteContent.findUnique({ where: { id: 1 } });
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
