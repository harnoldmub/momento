import { cn } from "@/lib/utils";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
};

export function Textarea({ label, hint, className, ...props }: Props) {
  return (
    <label className="grid gap-2 text-sm">
      {label ? <span className="text-ivory/80">{label}</span> : null}
      <textarea
        className={cn(
          "min-h-32 w-full rounded-xl border border-line bg-white/5 px-4 py-3 text-ivory placeholder:text-ivory/35 outline-none transition focus:border-ivory/30 focus:bg-white/7",
          className,
        )}
        {...props}
      />
      {hint ? <span className="text-xs text-ivory/55">{hint}</span> : null}
    </label>
  );
}

