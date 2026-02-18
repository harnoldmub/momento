import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-charcoal flex items-center justify-center">
      <div className="text-center px-6">
        <div className="text-[11px] tracking-[0.35em] uppercase text-ivory/35 mb-4">
          404
        </div>
        <h1 className="font-[var(--font-display)] text-4xl md:text-5xl tracking-[0.04em] uppercase">
          Page introuvable
        </h1>
        <p className="mt-6 text-sm text-ivory/50 max-w-md mx-auto">
          Cette page n&apos;existe pas. Retournez &agrave; l&apos;accueil ou explorez le portfolio.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/">Accueil</Button>
          <Button href="/portfolio" variant="outline">
            Portfolio
          </Button>
        </div>
      </div>
    </div>
  );
}
