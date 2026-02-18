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
    "inline-flex items-center justify-center gap-2 px-7 py-3 text-[11px] tracking-[0.25em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:opacity-50 disabled:pointer-events-none";
  const styles =
    variant === "primary"
      ? "bg-ivory text-charcoal hover:opacity-85"
      : variant === "outline"
        ? "border border-line text-ivory/70 hover:border-ivory/40 hover:text-ivory"
        : "text-ivory/60 hover:text-ivory";

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
