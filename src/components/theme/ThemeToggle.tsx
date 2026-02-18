"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 5V3m0 18v-2m7-7h2M3 12h2m11.95 4.95 1.41 1.41M4.64 4.64l1.41 1.41m0 11.9-1.41 1.41m13.31-13.31 1.41-1.41M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3c0 0-1.14 5.33 2.62 9.08S21 12.79 21 12.79Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border px-3 text-xs tracking-[0.2em] uppercase transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
        "border-line bg-white/70 text-ivory hover:bg-white dark:bg-charcoal-2/70 dark:hover:bg-charcoal-2",
      )}
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
      <span>{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
