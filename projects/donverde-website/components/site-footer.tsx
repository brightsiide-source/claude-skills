import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-8xl px-6 py-20 lg:px-12">
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Don Verde Farms</p>
            <p className="mt-6 max-w-md font-display text-3xl tracking-tightest text-bone md:text-4xl">
              Indoor craft cannabis grown in Southern New Mexico. Operator-owned. No corporate money.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/wholesale" className="btn-gold text-[11px]">
                Wholesale Inquiry
              </Link>
              <Link href="/find-us" className="btn-ghost-bone text-[11px]">
                Find Don Verde
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.24em] text-bone/60">Brand</p>
            <ul className="mt-6 space-y-3 text-sm text-bone/80">
              <li><Link href="/strains" className="hover:text-gold-glow">Strains</Link></li>
              <li><Link href="/the-farm" className="hover:text-gold-glow">The Farm</Link></li>
              <li><Link href="/find-us" className="hover:text-gold-glow">Find Us</Link></li>
              <li><Link href="/journal" className="hover:text-gold-glow">Journal</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.24em] text-bone/60">Trade</p>
            <ul className="mt-6 space-y-3 text-sm text-bone/80">
              <li><Link href="/wholesale" className="hover:text-gold-glow">Wholesale</Link></li>
              <li><Link href="/lab-results" className="hover:text-gold-glow">Lab Results</Link></li>
              <li><Link href="/faq" className="hover:text-gold-glow">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-gold-glow">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.24em] text-bone/60">Reach</p>
            <ul className="mt-6 space-y-3 text-sm text-bone/80">
              <li>
                <a href="mailto:info@donverdefarms.com" className="hover:text-gold-glow">
                  info@donverdefarms.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/donverdefarms/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-gold-glow"
                >
                  Instagram · @donverdefarms
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/p/Don-Verde-Farms-61553599491326/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-gold-glow"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-bone/10 pt-8 text-xs text-bone/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Don Verde Farms, LLC · Southern New Mexico</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-gold-glow">Privacy</Link>
            <Link href="/terms" className="hover:text-gold-glow">Terms</Link>
            <span>License <span className="text-bone/80">CCD-VICE-2023-0010</span></span>
            <span>21+ Only · Keep out of reach of children</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
