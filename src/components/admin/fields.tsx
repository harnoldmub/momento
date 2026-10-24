import { cn } from "@/lib/utils";

export const inputClass =
  "h-12 w-full rounded-xl border border-line bg-white/5 px-4 text-ivory outline-none focus:border-ivory/30";
export const textareaClass =
  "min-h-28 w-full rounded-xl border border-line bg-white/5 px-4 py-3 text-ivory outline-none focus:border-ivory/30";

export function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("grid gap-2 text-sm", className)}>
      <span className="text-ivory/80">{label}</span>
      {children}
      {hint ? <span className="text-xs text-ivory/50">{hint}</span> : null}
    </label>
  );
}

export function Card({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-3xl border border-line bg-white/3 p-6 md:p-8", className)}>
      {title ? <div className="mb-5 text-xs tracking-[0.28em] uppercase text-ivory/55">{title}</div> : null}
      {children}
    </div>
  );
}

export function PageTitle({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">{kicker}</div>
        <h1 className="mt-3 font-[var(--font-display)] text-3xl tracking-[0.08em] uppercase md:text-4xl">
          {title}
        </h1>
      </div>
      {children}
    </div>
  );
}

export function Notice({ tone = "ok", children }: { tone?: "ok" | "error"; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-2xl border px-5 py-4 text-sm",
        tone === "ok" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300",
      )}
    >
      {children}
    </div>
  );
}
