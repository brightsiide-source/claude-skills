# DECISIONS.md — doorhash architectural log

ADR-style log of the strategic and architectural calls. Append-only — if a decision changes, add a new entry, don't edit history.

Format per entry: `## [#NN] <title>` · context · decision · alternatives considered · date.

---

## [#01] Project framework — Next.js 14 + TypeScript + Tailwind

**Date:** 2026-04-30
**Status:** Locked

**Context:** Need a deployable site that supports SSR, SEO, image optimization, and an iframe embed for the Dutchie menu. Must run on Netlify.

**Decision:** Next.js 14 (App Router) + TypeScript + Tailwind CSS. Pinned to React 18.3 for stability over React 19 RC.

**Alternatives considered:**
- Astro — great for SEO but weaker for the dynamic UI we need (3D-tilt cards, smooth scroll, Framer Motion)
- Webflow — fast, but no escape hatch for custom delivery flow / Hash Pass UI
- Plain Vite + React — possible, but no SSR for SEO

**Why this:** Best balance of SEO + dynamic UI + ecosystem. App Router gets us streaming, server components, and `app/sitemap.ts` / `app/robots.ts` out of the box.

---

## [#02] Hosting — Netlify before custom domain

**Date:** 2026-04-30
**Status:** Locked for v1

**Context:** No domain registered yet. Need a preview URL the team can share before launch.

**Decision:** Deploy to Netlify (subdomain) first via the `netlify.toml` at repo root. Move DNS to a real domain when registered.

**Alternatives considered:**
- Vercel — built by the Next.js team, slightly tighter integration, but Netlify is what the team is already using
- Self-hosted (Cloudflare Pages, AWS Amplify) — overkill

**Why this:** Zero-friction deploy on push to the GitHub branch. `netlify.toml` at repo root with `base = "doorhash-site"` makes the connect flow one click.

---

## [#03] Menu engine — Dutchie embed for v1, Jane Roots for v2

**Date:** 2026-04-30
**Status:** Locked for v1, planning for v2

**Context:** doorhash already exists on Dutchie (`dutchie.com/dispensary/door-hash`). Cannabis e-commerce requires Metrc track-and-trace, cannabis-friendly payments, ID verification — none of which we're building from scratch.

**Decision:** v1 ships with Dutchie iframe at `/menu`. Phase 6+ migrates to **Jane Roots** (Jane's headless API) so we own the menu UI while Jane handles compliance.

**Alternatives considered:**
- Build our own e-commerce stack — $600k–$1.2M, 12–18 months, wrong fight at this stage. (Eaze burned $300M trying.)
- Stay on Dutchie iframe forever — no SEO, no custom delivery flow, brand stops at the iframe edge
- Dutchie Plus API — works, but Jane Roots is a productized version of the same concept and built specifically for craft brands wanting custom UI
- Treez / Flowhub / Meadow / Tymber — viable but smaller market presence in NM

**Why Jane Roots eventually:** Productized headless solution with verified review data, per-product URLs (programmatic SEO), prebuilt React components, and connection to the iHeartJane consumer marketplace for discovery.

---

## [#04] Brand palette — black / white / leaf green / gold

**Date:** 2026-04-30
**Status:** Locked

**Context:** Iterated through three palette directions before locking:
1. Dark-first cream + leaf — felt warm but generic
2. White paper + black + green + gold — too light, lost the "premium delivery brand" feel
3. **Forest green dark with green-dominant accents and gold for premium** — landed

**Decision:** Locked to:
- Black `#000000` — primary canvas, dark sections, primary CTAs (text)
- White `#FFFFFF` — text on dark, breathing room
- Leaf-500 `#8DC63F` — primary brand green (logo, CTAs, accents)
- Gold-500 `#C9A961` — premium accent only (Top Shelf, Hash VIP, FarmStory provenance, gold-divider hairlines)

Forest green gradient (leaf-700 → leaf-950 → black) is the signature hero/page-header treatment.

**Alternatives considered:** All-bright tropical (Mango's territory), all-dark moody (Top Crop's territory), cream/warm tones (felt off-brand to the user).

**Why this:** Differentiates from both top competitors. Green dominance reinforces the brand identity; gold adds premium punctuation; dark canvas reads as confident and modern.

**Related:** [BRAND.md](./BRAND.md) for full reference.

---

## [#05] Typography — DM Sans (working choice)

**Date:** 2026-04-30
**Status:** Provisional

**Context:** The doorhash logo wordmark reads as a geometric rounded sans (Gotham Rounded / DM Sans / Avenir Next Rounded family).

**Decision:** Use **DM Sans** via `next/font/google` for now. Variable font weights 400–800. JetBrains Mono for any monospace needs.

**Alternatives:** Custom display font license (Druk, Söhne, Untitled Sans) — premium move but $$. Reserved for Phase 7+ if budget supports.

**Revisit when:** Brand budget allows licensing a distinctive display face.

---

## [#06] Loyalty program name — "Hash Pass"

**Date:** 2026-04-30
**Status:** Locked

**Context:** Top Crop has "Chron Club Rewards." We need our own name.

**Decision:** **Hash Pass**, with three tiers: Hash (default), Hash+ (1k–5k pts), Hash VIP (5k+ pts). VIP gets gold treatment (gradient frame, gold accents).

**Alternatives:** "Verde Club" (too on-the-nose to parent farm), "Door Club" (weak), "Smoker's Pass" (off-brand voice).

---

## [#07] ESP / SMS provider — Klaviyo

**Date:** 2026-04-30
**Status:** Decided, not yet integrated

**Context:** Need a marketing automation platform that doesn't deplatform cannabis brands.

**Decision:** **Klaviyo**. Cannabis-friendly with restrictions, best-in-class email + SMS automation, broad ecosystem.

**Alternatives considered:**
- Mailchimp — explicitly bans cannabis, never use
- Postscript — SMS-only, lighter on email
- Alpine IQ — cannabis-native CRM + SMS + email + loyalty, the long-term winner if we go all-in on a single platform
- Springbig — cannabis loyalty + SMS, common in dispensaries

**Why Klaviyo first:** Fastest to integrate, lowest commitment. Phase 1 ships SMS + email automation flows here. If we outgrow Klaviyo or want native Dutchie/Jane integration, evaluate Alpine IQ in Phase 7+.

---

## [#08] Payments — Aeropay / Hypur class only

**Date:** 2026-04-30
**Status:** Decided, not yet integrated

**Context:** Federal illegality means standard processors (Stripe, Square, PayPal) don't work for cannabis.

**Decision:** Cannabis-friendly ACH-based or PIN-debit processors only. Top contenders: **Aeropay**, **Hypur**, **CanPay**. Final pick driven by Dutchie integration support.

**Why this:** Compliant, won't get the account shut down, integrates with Dutchie/Jane.

---

## [#09] Logo handling — inline SVG approximation until official asset

**Date:** 2026-04-30
**Status:** Provisional

**Context:** User shared a screenshot of the doorhash wordmark (lime "door" + dark "hash" with leaf accent on the d). No SVG file provided yet.

**Decision:** `components/Logo.tsx` ships an inline SVG approximation. Replace with the official SVG export when delivered.

**Don't do:** Don't recreate the logo from scratch. Wait for the brand team's vector file.

---

## [#10] Region targeting — Las Cruces + Southern NM first

**Date:** 2026-04-30
**Status:** Locked for v1

**Context:** doorhash currently delivers in Las Cruces, Mesilla, Sunland Park, Anthony, and Doña Ana. Top Crop has a Las Cruces location — that's the head-to-head fight.

**Decision:** v1 site targets these 5 cities in copy, SEO, and structured data. Per-city programmatic SEO pages come in Phase 3.

**Why this:** Don't dilute the SEO and brand by claiming statewide too early. Dominate Southern NM, then expand.

---

## [#11] Hero treatment — forest green gradient (the dramatic moment)

**Date:** 2026-04-30 (after iteration)
**Status:** Locked

**Context:** Iterated through dark hero → white/cream hero → black hero → forest green hero. User feedback: "too light," then "more dark and more green."

**Decision:** Hero uses `surface-leaf-dark` — `linear-gradient(180deg, #34501c 0%, #1a2c0c 50%, #000000 100%)` — with leaf-mesh overlay, big leaf-500/leaf-700 orbs, and a subtle gold-300 orb for warmth.

**Why this:** Brand-immersive opening. Green is the dominant identity moment, not just an accent. Gradient transitions cleanly into the black sections that follow.

---

## [#12] SEO target — 100/100 across all checks

**Date:** 2026-04-30
**Status:** Achieved

**Context:** User asked for SEO scores ≥90 across all pages.

**Decision:** Use the in-repo `seo_checker.py` (8 checks: title, meta description, h1, heading hierarchy, image alt text, link ratio, word count, viewport). Hit 100/100 on all 10 pages.

**Pattern locked:**
- Per-page `metadata.title.absolute` (50–60 chars) bypasses template length penalty
- Per-page description (120–160 chars) with primary keyword
- `metadata.alternates.canonical` per page
- Footer column headers are `<h3>` not `<h4>` (avoid heading-skip)
- Sub-page H1s differentiated from any embedded section H2s (avoid duplicate text)
- Min 300 words per page (long-form value, not stuffing)

Runtime SEO assets emit at build time: `app/sitemap.ts`, `app/robots.ts`, JSON-LD schemas in `components/JsonLd.tsx`.

---

## [#13] GSD installed for project workflow

**Date:** 2026-04-30
**Status:** Active

**Context:** Multi-week phases ahead (SMS, strain quiz, strain library, provenance receipts, live tracker). Need spec-driven dev with resumability and quality gates.

**Decision:** Install [GSD v1.39.0](https://github.com/gsd-build/get-shit-done) via `npx -y get-shit-done-cc --local --claude` into `doorhash-site/.claude/`. 65 commands, 33 agents, hooks for context monitoring, prompt-injection guard, scope-reduction detection.

**Workflow loop:** `/gsd-discuss-phase` → `/gsd-plan-phase` → `/gsd-execute-phase` → `/gsd-ship`.

**First command on fresh sessions:** `/gsd-progress` or `/gsd-resume-work`.

---

## [#14] Phase-1 priority — SMS + Klaviyo over Strain Quiz

**Date:** 2026-04-30
**Status:** Locked

**Context:** Top 5 plays roadmap ranked SMS automation as #5 by impact-to-effort, but it's #1 in revenue lift per dollar.

**Decision:** Phase 1 ships **SMS + Klaviyo**. Highest ROI, lowest engineering effort. Doubles repeat order rate at well-run cannabis brands. Then Phase 2 (Strain Quiz) for email capture and brand differentiation.

**Why deviation from PDF order:** Roadmap PDF orders by *strategic impact* (Drew-facing); execution sequence orders by *revenue lift per week of work* (us-facing). Both are true.

---

## [#15] Component pattern — surface utilities + card primitives

**Date:** 2026-04-30
**Status:** Locked

**Context:** Avoiding inline-style sprawl across 20+ section files.

**Decision:** All section backgrounds use named utility classes (`surface-dark`, `surface-leaf-dark`, `surface-leaf-deep-mesh`, `surface-paper`). All cards use named primitives (`card-dark`, `card-dark-leaf`, `card-paper`, `card-paper-leaf`). Defined in `app/globals.css` under `@layer utilities`.

**Why this:** When the user says "more dark" or "more green," we change one CSS class globally instead of touching 20 files. This is what made the multiple palette pivots cheap.

