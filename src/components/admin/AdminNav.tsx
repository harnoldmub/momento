"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/site/Logo";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/projects", label: "Projets" },
  { href: "/admin/leads", label: "Demandes" },
  { href: "/admin/testimonials", label: "Témoignages" },
  { href: "/admin/site", label: "Contenu du site" },
  { href: "/admin/account", label: "Compte" },
];

export function AdminNav({ newLeads = 0 }: { newLeads?: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const links = LINKS.map((l) => (
    <Link
      key={l.href}
      href={l.href}
      onClick={() => setOpen(false)}
      className={cn(
        "inline-flex items-center gap-2 transition hover:text-ivory",
        isActive(l.href) ? "text-ivory" : "text-ivory/60",
      )}
    >
      {l.label}
      {l.href === "/admin/leads" && newLeads > 0 ? (
        <span className="rounded-full bg-ivory px-2 py-0.5 text-[10px] tracking-normal text-charcoal">{newLeads}</span>
      ) : null}
    </Link>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-charcoal/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-5 py-4">
        <div className="flex items-center justify-between gap-6">
          <Link href="/admin" className="rounded-lg px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-5 text-[11px] tracking-[0.18em] uppercase lg:flex">{links}</nav>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden text-[11px] tracking-[0.18em] uppercase text-ivory/60 hover:text-ivory sm:inline"
            >
              Voir le site ↗
            </Link>
            <span className="hidden lg:inline">
              <LogoutButton />
            </span>
            <button
              className="rounded-full border border-line px-4 py-2 text-[11px] tracking-[0.18em] uppercase text-ivory/80 lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
            >
              Menu
            </button>
          </div>
        </div>
        {open ? (
          <nav className="mt-4 grid gap-4 border-t border-line pt-4 text-xs tracking-[0.18em] uppercase lg:hidden">
            {links}
            <Link href="/" target="_blank" className="text-ivory/60">Voir le site ↗</Link>
            <div>
              <LogoutButton />
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
