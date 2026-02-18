import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
};

export function Input({ label, hint, className, ...props }: Props) {
  return (
    <label className="grid gap-2 text-sm">
      {label ? <span className="text-ivory/80">{label}</span> : null}
      <input
        className={cn(
          "h-12 w-full rounded-xl border border-line bg-black/[0.03] px-4 text-ivory placeholder:text-ivory/35 outline-none transition focus:border-ivory/35 focus:bg-black/[0.05] dark:bg-white/5 dark:focus:bg-white/7",
          className,
        )}
        {...props}
      />
      {hint ? <span className="text-xs text-ivory/55">{hint}</span> : null}
    </label>
  );
}
