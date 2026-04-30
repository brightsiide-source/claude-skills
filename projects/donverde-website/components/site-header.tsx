"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  { label: "Strains", href: "/strains" },
  { label: "The Farm", href: "/the-farm" },
  { label: "Find Us", href: "/find-us" },
  { label: "Wholesale", href: "/wholesale" },
  { label: "Contact", href: "/contact" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-bone/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-6 lg:px-12">
        <Link href="/" className="flex items-center gap-3" aria-label="Don Verde Farms — home">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-[0.2em] text-ink/70 transition-colors hover:text-verde"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/wholesale" className="btn-verde text-[11px]">
            Wholesale Inquiry
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="sr-only">{open ? "Close" : "Open"} menu</span>
          <div className="relative h-3 w-5">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-ink transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-full bg-ink transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-bone md:hidden">
          <nav className="flex flex-col px-6 py-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink/10 py-4 text-sm uppercase tracking-[0.2em] text-ink/80"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/wholesale" onClick={() => setOpen(false)} className="btn-verde mt-6 text-[11px]">
              Wholesale Inquiry
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function Wordmark() {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-display text-2xl tracking-tightest text-ink">
        Don Verde
      </span>
      <span className="hidden text-[10px] uppercase tracking-[0.3em] text-verde sm:inline">
        Farms
      </span>
    </div>
  );
}
