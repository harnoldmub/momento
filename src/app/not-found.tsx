import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-charcoal">
      <div className="mx-auto flex min-h-dvh max-w-2xl flex-col items-start justify-center px-5 py-20">
        <div className="text-xs tracking-[0.28em] uppercase text-ivory/55">
          404
        </div>
        <h1 className="mt-3 font-[var(--font-display)] text-4xl tracking-[0.08em] uppercase">
          Page not found
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-ivory/65">
          This page does not exist. Return to the homepage or explore the portfolio.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">Home</Button>
          <Button href="/portfolio" variant="outline">
            Portfolio
          </Button>
          <Link className="text-xs tracking-[0.22em] uppercase text-ivory/70 hover:text-ivory self-center" href="/contact">
            Booking
          </Link>
        </div>
      </div>
    </div>
  );
}

