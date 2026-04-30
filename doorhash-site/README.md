# doorhash

Cannabis delivery + retail site for **doorhash** — a Don Verde Farms brand serving Southern New Mexico.

> Speed. Discretion. Soul.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** with custom brand tokens (`leaf`, `ink`, `cream`)
- **Framer Motion** for scroll-driven and mounted animation
- **Lenis** for smooth scrolling
- **Embla** for carousels
- **Lucide** icons
- **Dutchie** menu embed

## Local development

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

## Build

```bash
pnpm build
pnpm start
```

## Deploy to Netlify

The repo root has a `netlify.toml` with `base = "doorhash-site"`, so deploying is essentially one click:

**One-click deploy from GitHub:**

1. Go to <https://app.netlify.com/start>.
2. Click **Import an existing project** → **Deploy with GitHub**.
3. Pick the `brightsiide-source/claude-skills` repo.
4. Choose branch `claude/doorhash-retail-site-hGCl7` (or whichever branch you want to deploy).
5. Leave all build settings as defaults — `netlify.toml` configures everything (base directory, build command, publish dir, Node 22, pnpm 9, Next.js Runtime plugin).
6. Click **Deploy**.

First build takes ~2 min. Subsequent builds are incremental.

**Custom domain:** Add it in Netlify → Site settings → Domain management. Update `metadataBase` in `app/layout.tsx` and `BASE` in `app/sitemap.ts`, `components/JsonLd.tsx` to match.

## Structure

```
doorhash-site/
├── app/                     # App Router pages
│   ├── layout.tsx           # Root layout — fonts, age gate, smooth scroll, nav, footer
│   ├── page.tsx             # Homepage (hero, drops, how it works, farm, coverage, reviews, rewards, faq)
│   ├── menu/                # Dutchie embed
│   ├── delivery/            # Delivery zones + how it works
│   ├── locations/           # Retail flagship coming soon
│   ├── farm/                # Don Verde story
│   ├── about/               # Founders + brand story
│   ├── rewards/             # Hash Pass tiers
│   ├── faq/                 # Full FAQ
│   ├── careers/             # Hiring stub
│   └── contact/             # Contact methods
├── components/
│   ├── AgeGate.tsx          # 21+ verification modal
│   ├── Nav.tsx              # Sticky glass nav with mobile drawer
│   ├── Footer.tsx
│   ├── Logo.tsx             # Inline SVG approximation of wordmark
│   ├── PageHeader.tsx       # Shared sub-page header
│   ├── SmoothScroll.tsx     # Lenis wrapper
│   ├── sections/            # Homepage sections
│   │   ├── Hero.tsx         # Address-first hero with parallax + ticker
│   │   ├── Stats.tsx        # Animated counters
│   │   ├── FeaturedDrops.tsx# 3D-tilt product cards
│   │   ├── HowItWorks.tsx   # 4-step flow
│   │   ├── FarmStory.tsx    # Parallax farm provenance
│   │   ├── Coverage.tsx     # NM delivery zone map
│   │   ├── Reviews.tsx      # Marquee reviews
│   │   ├── RewardsCTA.tsx   # Hash Pass loyalty CTA
│   │   └── FaqTeaser.tsx    # Accordion FAQ
│   └── ui/
│       ├── TiltCard.tsx     # 3D tilt + glare
│       ├── Marquee.tsx      # Infinite scroll
│       └── Reveal.tsx       # Scroll-in reveals
└── lib/
    ├── cn.ts                # Class merging
    ├── site.ts              # Brand + site copy + nav config
    └── products.ts          # Featured product placeholders
```

## To do before launch

- [ ] Replace inline `Logo` with the official SVG export.
- [ ] Confirm Dutchie embed URL in `lib/site.ts` (`site.dutchie.embedUrl`).
- [ ] Wire newsletter signups (Klaviyo recommended — Mailchimp will deplatform cannabis).
- [ ] Replace placeholder farm/product imagery with brand photography.
- [ ] Confirm legal disclaimers with NM cannabis counsel.
- [ ] Add real founder photos + bios for Mike, Javi, Neal.
- [ ] Connect domain (TBD).
- [ ] Add favicon + OG image.
- [ ] Set up GA4 + Plausible.
- [ ] Add `sitemap.xml` and `robots.txt`.
