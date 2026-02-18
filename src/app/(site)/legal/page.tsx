import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { SimpleMarkdown } from "@/components/content/SimpleMarkdown";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Legal",
  description: "Legal notices and privacy policy.",
};

export default async function LegalPage() {
  const content = await prisma.siteContent.findUnique({ where: { id: 1 } });
  return (
    <div className="w-full px-5 md:px-8 lg:px-12 py-16">
      <Reveal>
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
            Legal
          </div>
          <h1 className="mt-3 font-[var(--font-display)] text-4xl tracking-[0.08em] uppercase md:text-5xl">
            Mentions & Privacy
          </h1>
        </div>
      </Reveal>

      <div className="mt-12 rounded-3xl border border-line bg-white/3 p-10 md:p-14">
        <SimpleMarkdown text={content?.legalMarkdown || ""} />
      </div>
    </div>
  );
}

