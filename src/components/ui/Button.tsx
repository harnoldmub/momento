import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  className,
  disabled,
  onClick,
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm tracking-[0.14em] uppercase transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal disabled:opacity-50 disabled:pointer-events-none";
  const styles =
    variant === "primary"
      ? "bg-[color:var(--text)] text-[color:var(--bg2)] hover:opacity-90"
      : variant === "outline"
        ? "border border-line text-ivory hover:border-ivory/40 hover:bg-black/[0.03] dark:hover:bg-white/5"
        : "text-ivory/80 hover:text-ivory";

  if (href) {
    return (
      <Link href={href} className={cn(base, styles, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={cn(base, styles, className)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
