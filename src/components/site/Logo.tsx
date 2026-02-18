import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span className="font-[var(--font-display)] text-lg tracking-[0.14em] uppercase">
        Momento
      </span>
      <span className="text-xs tracking-[0.2em] text-ivory/60">RDC</span>
    </span>
  );
}

