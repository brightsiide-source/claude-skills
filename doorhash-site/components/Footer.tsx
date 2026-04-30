import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-ink-950 mt-32">
      <div className="absolute inset-0 bg-leaf-mesh opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="col-span-2 lg:col-span-4">
            <div className="w-40 mb-6">
              <Logo />
            </div>
            <p className="text-ink-300 text-sm max-w-xs text-pretty">
              {site.longTagline}
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href={site.social.instagram}
                aria-label="Instagram"
                className="w-10 h-10 grid place-items-center rounded-full glass hover:bg-leaf-500/10 hover:border-leaf-500/30 transition-colors"
              >
                <Instagram className="w-4 h-4 text-leaf-300" />
              </a>
              <a
                href={site.social.twitter}
                aria-label="Twitter"
                className="w-10 h-10 grid place-items-center rounded-full glass hover:bg-leaf-500/10 hover:border-leaf-500/30 transition-colors"
              >
                <Twitter className="w-4 h-4 text-leaf-300" />
              </a>
            </div>
          </div>

          {site.footerLinks.map((col) => (
            <div key={col.title} className="col-span-1 lg:col-span-2">
              <h3 className="text-cream text-sm font-bold uppercase tracking-wider mb-4">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-ink-300 hover:text-leaf-300 text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 lg:col-span-2">
            <h3 className="text-cream text-sm font-bold uppercase tracking-wider mb-4">
              Visit
            </h3>
            <p className="text-ink-300 text-sm mb-2">{site.hq}</p>
            <a
              href={`tel:${site.phone}`}
              className="text-ink-300 hover:text-leaf-300 text-sm block transition-colors"
            >
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-ink-300 hover:text-leaf-300 text-sm block mt-1 transition-colors"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-xs text-ink-400">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved. Cannabis products are
            for use only by adults {site.age}+. Keep out of reach of children. Consume responsibly.
          </p>
          <p>
            A {site.parent} company &middot; New Mexico license #TBD
          </p>
        </div>
      </div>
    </footer>
  );
}
