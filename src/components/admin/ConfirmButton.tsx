"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

/** Submit button that asks for confirmation before submitting its form. */
export function ConfirmButton({
  message,
  children,
  className,
}: {
  message: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
      className={cn(
        "rounded-full border border-red-500/30 px-4 py-2 text-xs tracking-[0.18em] uppercase text-red-600 transition hover:bg-red-500/10 disabled:opacity-50 dark:text-red-300",
        className,
      )}
    >
      {pending ? "..." : children}
    </button>
  );
}

/** Submit button showing a pending state while its server action runs. */
export function SubmitButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex items-center justify-center gap-2 bg-ivory px-7 py-3 text-[11px] tracking-[0.25em] uppercase text-charcoal transition-all duration-300 hover:opacity-85 disabled:opacity-50",
        className,
      )}
    >
      {pending ? "Enregistrement..." : children}
    </button>
  );
}
