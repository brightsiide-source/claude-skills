# CLAUDE.md — doorhash retail + delivery site

> First file every Claude Code session should read. Project bible for `doorhash-site/`.

## What this is

**doorhash** is a cannabis delivery + retail brand serving Southern New Mexico. Currently delivery-only across Las Cruces, Mesilla, Sunland Park, Anthony, and Doña Ana. Flagship retail store opens in Las Cruces in 2026.

- **Parent:** Don Verde Farms (indoor cannabis cultivator, Southern NM)
- **Founders:** Mike, Javi, Neal Lucas
- **Tagline:** *Speed. Discretion. Soul.*
- **Wedge:** Vertical integration — own the farm, the delivery network, the retail. Nobody else in the NM market can claim seed-to-door provenance.
- **Top 2 competitors:** Top Crop Cannabis (NM + OR), Mango Cannabis (OK + MI + NM)

## Stack + commands

```bash
# from doorhash-site/
pnpm install        # install
pnpm dev            # http://localhost:3000
pnpm build          # production build
pnpm typecheck      # tsc --noEmit
pnpm lint           # eslint
```

| Layer | Choice |
|---|---|
| Framework | **Next.js 14 (App Router) + TypeScript** |
| Styling | **Tailwind CSS** with custom palette (see [BRAND.md](./BRAND.md)) |
| Motion | **Framer Motion** + **Lenis** smooth scroll |
| Carousels | **Embla** |
| Icons | **Lucide React** |
| Menu | **Dutchie** iframe embed (v1) — migrate to **Jane Roots** for v2 |
| Deploy | **Netlify** (`netlify.toml` at repo root, base = `doorhash-site`) |
| ESP / SMS | **Klaviyo** (cannabis-friendly) — *NOT Mailchimp* |
| Loyalty | Hash Pass (in-house UI) — backend via **Alpine IQ** or **Springbig** |
| Payments | Cannabis-friendly only: **Aeropay**, **Hypur** — *NEVER Stripe/Square* |

## Brand snapshot

**Palette (locked):** black `#000` · white `#fff` · leaf-500 `#8DC63F` · gold-500 `#C9A961`. Full scales in [BRAND.md](./BRAND.md).

**Voice:** Plainspoken, confident, app-coded. Closer to DoorDash than to a folksy fruit stand. *doorhash* is always lowercase one word.

**Visual rhythm (locked):** Forest-green hero → mostly dark sections with leaf-mesh + glass cards → black footer with gold hairline. White is rare — used only for premium product cards or specific moments.

## Component conventions

| Use | What |
|---|---|
| Dark section bg | `surface-dark` (pure black) or `surface-leaf-deep-mesh` (rich green-black with leaf radial gradients) |
| Hero / page header | `surface-leaf-dark` (forest green gradient → black) |
| Glass card on dark | `card-dark` (hover: leaf-500 border) |
| Premium card on dark | `card-dark-leaf` (subtle leaf gradient with green border) |
| Section reveal | `<Reveal delay={i * 0.06}>` from `components/ui/Reveal.tsx` |
| 3D-tilt product card | `<TiltCard>` from `components/ui/TiltCard.tsx` |
| Infinite ticker | `<Marquee>` from `components/ui/Marquee.tsx` |
| Eyebrow text | `text-leaf-300 text-sm font-bold uppercase tracking-widest` |
| Headline accent word | `<span className="text-leaf-300">accent.</span>` (or `text-gold-300` for premium contexts) |
| Primary CTA | `bg-leaf-500 hover:bg-leaf-400 text-black font-bold ... shadow-glow-leaf` |
| Page header component | `<PageHeader eyebrow="..." title="..." description="..." />` |

## What's installed

- **GSD v1.39.0** — `.claude/` has 65 slash commands + 33 specialist subagents. See **Workflow** below.
- **JSON-LD schemas** — `components/JsonLd.tsx` injects LocalBusiness, WebSite, FAQPage, BreadcrumbList globally on `/` and per-page where applicable.
- **Sitemap** + **robots.txt** — auto-generated at `app/sitemap.ts` and `app/robots.ts`.
- **Age gate** — `components/AgeGate.tsx`, localStorage-gated, fires on first visit.

## Workflow — GSD (Get Shit Done)

This project uses [GSD](https://github.com/gsd-build/get-shit-done) for spec-driven development. Open Claude Code in `doorhash-site/` and the slash commands light up.

**First command on every fresh session:** `/gsd-resume-work` or `/gsd-progress` — orients the assistant to current project state via the files in this repo.

**Core loop:** `/gsd-discuss-phase` → `/gsd-plan-phase` → `/gsd-execute-phase` → `/gsd-ship`.

**Active phase:** Phase 0 — site scaffolded, brand locked, deployable. Next up: **Phase 1 (SMS + Klaviyo)**. See [phases/](./phases/).

## Anti-patterns (don't do these)

- ❌ Don't use Mailchimp, Stripe, Square, or PayPal — they ban cannabis. Use **Klaviyo** + **Aeropay/Hypur**.
- ❌ Don't add cream, beige, or warm-tinted colors. Palette is **black, white, leaf green, gold**. Period.
- ❌ Don't capitalize "Doorhash" or "DoorHash" in marketing copy. The wordmark is **doorhash**, lowercase, one word. Title-case only in formal/legal contexts (`metadata.legalName`).
- ❌ Don't use folksy/fruit-stand voice (Mango's territory). Don't use luxury-watch voice either (overdone). Stay plainspoken-app-confident.
- ❌ Don't add features mid-phase without checking the phase spec — GSD's scope-reduction guard exists for this exact reason.
- ❌ Don't add backwards-compat shims, hypothetical-future-need code, or "maybe we'll need this later" abstractions. Site is small. YAGNI.
- ❌ Don't make health claims, dose recommendations beyond manufacturer guidance, or marketing that targets minors. NM cannabis advertising rules are strict.
- ❌ Don't replace the Dutchie iframe with a custom build before Phase 6+. Stay on Dutchie until we have order volume to justify the migration to Jane Roots.

## Roadmap pointers

- [Top 5 plays PDF](./doorhash-top-5-plays.pdf) — strategic roadmap for Drew + the team
- [Phase specs](./phases/) — machine-readable execution specs for GSD
- [DECISIONS.md](./DECISIONS.md) — log of "why we chose X"

## Things that need real assets / contracts (still TBD)

- Domain (`doorhash.com` ideal — confirm registration)
- Official logo SVG (currently inline approximation in `components/Logo.tsx`)
- Brand photography (homepage placeholder is emoji + gradients)
- Real Dutchie embed URL (`lib/site.ts` → `site.dutchie.embedUrl`)
- Klaviyo account + API key
- NM cannabis attorney for advertising review
- Dispensary license number (footer reads "license #TBD")
- Founder photos + bios for Mike + Javi (Neal's bio is in)
- Hours of operation per delivery zone (currently placeholder)
