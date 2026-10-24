"use client";

import { Button } from "@/components/ui/Button";

export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="max-w-xl rounded-3xl border border-line bg-white/3 p-8">
      <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">Erreur</div>
      <h1 className="mt-3 font-[var(--font-display)] text-2xl tracking-[0.08em] uppercase">
        L&apos;opération n&apos;a pas abouti
      </h1>
      <p className="mt-4 text-sm text-ivory/70">
        {error.message && !error.message.startsWith("An error occurred")
          ? error.message
          : "Une erreur inattendue est survenue. Réessayez."}
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={() => reset()}>Réessayer</Button>
        <Button href="/admin" variant="outline">Tableau de bord</Button>
      </div>
    </div>
  );
}
