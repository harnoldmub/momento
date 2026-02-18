import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { LogoutButton } from "@/components/admin/LogoutButton";

export function AdminNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-charcoal/75 backdrop-blur">
      <div className="mx-auto max-w-6xl px-5 py-4">
        <div className="flex items-center justify-between gap-6">
          <Link href="/admin" className="rounded-lg px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-6 text-xs tracking-[0.22em] uppercase text-ivory/75 md:flex">
            <Link className="hover:text-ivory transition" href="/admin/projects">
              Projects
            </Link>
            <Link className="hover:text-ivory transition" href="/admin/leads">
              Leads
            </Link>
            <Link className="hover:text-ivory transition" href="/admin/site">
              Site content
            </Link>
            <Link className="hover:text-ivory transition" href="/admin/testimonials">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}

