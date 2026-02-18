import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="w-full px-5 md:px-8 lg:px-12">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-line bg-charcoal/75 px-5 py-4 backdrop-blur dark:bg-charcoal/55">
          <Link href="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-lg px-1 py-1">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-8 text-xs tracking-[0.22em] uppercase text-ivory/75 md:flex">
            <Link className="hover:text-ivory transition" href="/portfolio">
              Portfolio
            </Link>
            <Link className="hover:text-ivory transition" href="/about">
              About
            </Link>
            <Link className="hover:text-ivory transition" href="/contact">
              Booking
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button href="/portfolio" variant="ghost" className="hidden md:inline-flex">
              View work
            </Button>
            <Button href="/contact">Book a date</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
