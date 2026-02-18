import { cn } from "@/lib/utils";

function renderLine(line: string, idx: number) {
  const l = line.trim();
  if (!l) return null;
  if (l.startsWith("### ")) {
    return (
      <h3 key={idx} className="mt-8 font-[var(--font-display)] text-xl tracking-[0.08em] uppercase">
        {l.slice(4)}
      </h3>
    );
  }
  if (l.startsWith("## ")) {
    return (
      <h2 key={idx} className="mt-10 font-[var(--font-display)] text-2xl tracking-[0.08em] uppercase">
        {l.slice(3)}
      </h2>
    );
  }
  if (l.startsWith("# ")) {
    return (
      <h1 key={idx} className="mt-10 font-[var(--font-display)] text-3xl tracking-[0.08em] uppercase">
        {l.slice(2)}
      </h1>
    );
  }
  if (l.startsWith("- ")) {
    return (
      <li key={idx} className="ml-5 list-disc text-ivory/70">
        {l.slice(2)}
      </li>
    );
  }
  return (
    <p key={idx} className="mt-5 text-sm leading-relaxed text-ivory/70 md:text-base">
      {l}
    </p>
  );
}

export function SimpleMarkdown({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const lines = (text || "").split(/\r?\n/);
  const rendered: React.ReactNode[] = [];
  let list: React.ReactNode[] = [];

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    const isList = trimmed.startsWith("- ");
    if (!isList && list.length) {
      rendered.push(
        <ul key={`ul-${idx}`} className="mt-5 grid gap-2">
          {list}
        </ul>,
      );
      list = [];
    }
    const node = renderLine(line, idx);
    if (!node) return;
    if (isList) list.push(node);
    else rendered.push(node);
  });

  if (list.length) {
    rendered.push(
      <ul key="ul-last" className="mt-5 grid gap-2">
        {list}
      </ul>,
    );
  }

  return <div className={cn("max-w-none", className)}>{rendered}</div>;
}

