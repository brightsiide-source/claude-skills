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

## [#20] Pre-revenue budget reality — keep the stack lean

**Date:** 2026-04-30
**Status:** Locked

**Context:** Owner shared real numbers. Pre-launch, doing a few deliveries, doing a few thousand a month at most. Existing scoped roadmap (Dutchie Plus API at ~$1k+/mo, Alpine IQ at $400-1500/mo, Onfleet at $300-1500/mo, Klaviyo at $50-300/mo, Mapbox, etc.) is appropriate at $30-50k/mo MRR — not now.

**Decision:** Run lean until store opens + revenue clears $5k/mo. Specifically:

- **Menu** — stay on **Dutchie embed-only** tier (~$200-300/mo), not Plus. Owner is "not a fan" of Dutchie and feels the cost is high for current revenue. We agree it's the cheapest viable option that's already integrated; **renegotiate the tier with Dutchie** to drop to embed-only if we're on a higher tier today.
- **Loyalty** — use **Dutchie's built-in customer loyalty** (free with the platform). Skip Alpine IQ ($400+/mo) and Springbig ($200+/mo) until $20k/mo MRR. The Hash Pass UI on `/rewards` is the marketing surface; the backend is Dutchie until we outgrow it.
- **SMS / email** — Klaviyo's free tier covers up to 250 contacts. Pre-launch list-building costs $0. Upgrade to paid (~$45/mo at 500 contacts, scaling from there) only when we have list size to justify it.
- **Delivery dispatch** — manual / spreadsheet for now. Onfleet ($300+/mo) goes in Phase 5 when we have order volume to justify routing optimization. Pre-store-open, the founders are doing the few deliveries themselves.
- **Mapping** — the Coverage map is a stylized illustration, not a live Mapbox embed. Adds $0/mo. Real Mapbox comes with the live tracker phase.
- **Photography** — emoji + gradient placeholders stay until budget allows a real product shoot. Not blocking launch.

**Why this:** Cannabis retail margins are thin. Software stacks can eat $2k+/mo before a single order ships. Keeping the stack at <$500/mo until revenue justifies an upgrade is the difference between a brand that survives 18 months and a brand that runs out of cash.

**Recalibrated phase priorities (v2):**

1. **Phase 1 — Klaviyo free tier + SMS opt-in** (free at <250 contacts, $45/mo at 500). Ship list-building flows.
2. **Phase 2 — Strain finder quiz** (engineering only, $0 ongoing).
3. **Phase 3 — Strain library + programmatic SEO** (engineering + content, $0 ongoing). Compounds.
4. **Phase 4 — Provenance receipts** (engineering only — Don Verde already has lot data per their site schema). $0 ongoing.
5. **Phase 5 — Live tracker** (DEFERRED until $20k+/mo MRR. Onfleet at $300+/mo is the cost wall.)

The first 4 phases are essentially free to operate post-launch. Phase 5 is the one that needs revenue.

**Revisit when:** Monthly revenue clears $5k (upgrade Klaviyo paid tier), $20k (consider Springbig or Alpine IQ migration), $50k (consider Dutchie Plus / Jane Roots migration).

---

## [#03] Menu engine — Dutchie embed for v1 (lean tier), Jane evaluation deferred

**Date:** 2026-04-30 (revised — see also #20)
**Status:** Locked for v1, evaluation deferred

**Context:** doorhash already exists on Dutchie (`dutchie.com/dispensary/door-hash`). Cannabis e-commerce requires Metrc track-and-trace, cannabis-friendly payments, ID verification — none of which we're building from scratch.

**Decision:** v1 ships with Dutchie iframe at `/menu`. Phase 6+ migrates to **Jane Roots** (Jane's headless API) so we own the menu UI while Jane handles compliance.

**Alternatives considered:**
- Build our own e-commerce stack — $600k–$1.2M, 12–18 months, wrong fight at this stage. (Eaze burned $300M trying.)
- Stay on Dutchie iframe forever — no SEO, no custom delivery flow, brand stops at the iframe edge
- Dutchie Plus API — works, but Jane Roots is a productized version of the same concept and built specifically for craft brands wanting custom UI
- Treez / Flowhub / Meadow / Tymber — viable but smaller market presence in NM

**Why Jane Roots eventually:** Productized headless solution with verified review data, per-product URLs (programmatic SEO), prebuilt React components, and connection to the iHeartJane consumer marketplace for discovery.

**Pre-revenue revision (per #20):** Owner is not a fan of Dutchie — too expensive for current revenue. Industry sentiment confirms it (4/20 outages, sales lock-in, pricing creep). However, doorhash is *already* on Dutchie via the existing dispensary listing, and migration cost (4-8 weeks + contract penalty) is real. Plan: **stay on Dutchie embed-only tier**, renegotiate to the cheapest tier possible, and **plan migration to Jane at the next contract renewal point** (or when MRR clears $20k and the migration cost is justified). Do NOT migrate during the launch window — switching menus during a launch loses money.

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

## [#05] Typography — Outfit (revised from DM Sans)

**Date:** 2026-04-30 (revised same day after closer logo audit)
**Status:** Locked

**Context:** Initial pick was DM Sans (geometric grotesk family). On closer inspection of the doorhash logo wordmark, the lowercase `a` is single-story (no hat), `o`s are nearly perfect circles, and `r` has a fully smooth rounded terminal — features DM Sans doesn't quite hit. The logo reads as a more aggressively rounded geometric sans.

**Decision:** Switch to **Outfit** (Google Font, variable, 400–800). Outfit has the single-story `a`, near-circular `o`s, and smooth rounded terminals that match the logo. Drop-in replacement for DM Sans — same loading pattern via `next/font/google`. JetBrains Mono retained for monospace.

**Alternatives considered:**
- **Quicksand** — even more rounded but verges on playful/childish
- **Nunito** — friendly rounded but feels casual, double-story `a`
- **Mulish** — close but slightly less rounded
- **Plus Jakarta Sans** — geometric premium but double-story `a`
- **Sora** — geometric clean but no special edge over Outfit
- **DM Sans** (original pick) — same family but slightly squarish, double-story `a`
- Custom display font license (Druk, Söhne, Untitled Sans) — reserve for Phase 7+ when budget supports

**Why Outfit:** Best free Google Font match for the doorhash logo's character. Used by Linear and similar premium-app brands. Variable font keeps bundle tight.

**Files updated:** `app/layout.tsx` (next/font/google import + CSS var), `tailwind.config.ts` (theme reference), `components/Logo.tsx` (SVG fallback), `public/favicon.svg` + `public/og.svg` (SVG text font-family), `BRAND.md`.

**Revisit when:** Brand budget allows licensing a distinctive display face.

---

## [#06] Loyalty program — "Hash Pass" name + Dutchie loyalty backend

**Date:** 2026-04-30 (revised — see also #20)
**Status:** Locked

**Context:** Owner has flagged loyalty as **very important**. Top Crop has "Chron Club Rewards." We need our own name + an actual functioning rewards backend, not just a marketing page.

**Decision:**

- **Name:** **Hash Pass**, with three tiers: Hash (default), Hash+ (1k–5k pts), Hash VIP (5k+ pts). VIP gets gold treatment (gradient frame, gold accents) on `/rewards`.
- **Backend (v1, pre-revenue):** Use **Dutchie's built-in customer loyalty** (included free with the menu platform). The Hash Pass UI on the doorhash site is the marketing surface; Dutchie tracks points, customer accounts, and redemption codes server-side.
- **Backend (v2, ~$20k+ MRR):** Migrate to **Springbig** (~$200/mo) or **Alpine IQ** (~$400+/mo) for richer segmentation, SMS-tied loyalty, and integrated marketing automation. Springbig is the cheaper option and most-used in cannabis retail.

**Alternatives considered:**
- "Verde Club" — too on-the-nose to parent farm
- "Door Club" — weak
- Custom-built loyalty tracker — extra engineering, no advantage at this scale
- Skip loyalty entirely — not viable; owner has called it very important
- Standalone Klaviyo loyalty — Klaviyo handles email/SMS but not points-based loyalty natively

**Why this:** Maximum impact, zero backend cost at the current revenue stage. The name "Hash Pass" is the brand asset; the Dutchie backend is rented infrastructure that can be swapped later.

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

## [#19] Service area locked — Las Cruces 88007 + 5-10 mile radius

**Date:** 2026-04-30
**Status:** Locked (per owner directive)

**Context:** Earlier copy listed five cities (Las Cruces, Mesilla, Sunland Park, Anthony, Doña Ana). Owner clarified the actual delivery zone is **only Las Cruces**, centered on **zip code 88007**, with a **5 to 10 mile radius**. Sunland Park (~40 mi south), Anthony (~25 mi south), and Doña Ana (the unincorporated community ~10 mi N) are outside or borderline outside this radius.

**Decision:** All site copy, JSON-LD `areaServed`, llms.txt, FAQ, and comparison pages reference **Las Cruces, NM 88007** as the single service city. Mesilla, Picacho Hills, University Park, and NW Las Cruces are referenced as *neighborhoods within range* (used on the coverage map and "do you deliver to ___" Q&A), not as separate marketed cities.

**Why this:** Honesty over aspiration. Stop marketing zones we can't actually reach in the 30–55 min ETA. Tighter targeting also helps SEO — every page now ranks specifically for "cannabis delivery Las Cruces" instead of competing for a regional term.

**Revisit when:** The team expands the delivery radius or adds a second store. Update `lib/site.ts` `delivery.cities`, `delivery.neighborhoods`, and `delivery.radiusMiles`.

---

## [#18] Domain — doorhashnm.com (doorhashnm.com unavailable)

**Date:** 2026-04-30
**Status:** Locked

**Context:** Owner holds **doorhashnm.com**. **doorhashnm.com** is registered to another party and not available for purchase as of this writing.

**Decision:** Site canonical URL, OG tags, sitemap, robots, llms.txt, JSON-LD `@id` graph, and email aliases all use `doorhashnm.com`. Email aliases shifted from `@doorhashnm.com` to `@doorhashnm.com` (hello@, careers@, orders@, press@, partnerships@, compliance@).

**Watch for:** If `doorhashnm.com` becomes available later, swapping is a single `lib/site.ts` config change + a global find/replace + a 301 redirect from doorhashnm.com. Cheap to migrate; flag it as a reminder for the team to check periodically (every 6 months on `whois`).

---

## [#17] Sister-brand voice alignment — Don Verde Farms (B2B) vs doorhash (B2C)

**Date:** 2026-04-30
**Status:** Documented in BRAND.md

**Context:** Don Verde Farms is the parent (wholesale, B2B). doorhash is the child (retail + delivery, B2C). The two brands need to feel related but distinct — voice cousins, not voice twins. After reviewing the Don Verde Farms site JSON-LD, we now have a clear picture of their voice and can deliberately position doorhash's voice in relation.

**Decision:** Lock in two voice rules:

1. **Shared DNA** (true on both): short declarative sentences, specific facts over vague claims, no hedging, anti-corporate posture, receipts over assertions.
2. **Distinct personality** (deliberately different):
   - Don Verde = master grower talking to a buyer (technical, factual, cultivation jargon)
   - doorhash = delivery app you'd actually open at 9pm (app-coded, consumer vocabulary, more rhythm)

Quick test for any new copy: *"Would the master grower say this, or would the delivery driver say this?"* — answer should match the audience.

**Alternatives considered:**
- Identical voice on both sites — felt like one diluted brand, hides the wholesaler/retailer relationship
- Totally separate voices with no shared DNA — felt like two unrelated brands, loses the parent-child credibility transfer
- Don Verde primary voice on doorhash — would feel B2B-stilted to consumers
- Cannabis-industry-default voice on both — generic, indistinguishable from Mango or Top Crop

**Why this:** Anchors the brands as a *family* with a clear hierarchy (parent + child) rather than two competing voices. Lets doorhash get away with being playful and app-coded *because* Don Verde is technical and rigorous behind it.

**Documentation:** Full ruleset and example pairings in [BRAND.md → "Sister-brand voice"](./BRAND.md#sister-brand-voice--doorhash--don-verde-farms).

**Revisit when:** A third sister brand launches, or if Don Verde repositions for a new audience.

---

## [#16] AI SEO — separate optimization pass beyond traditional SEO

**Date:** 2026-04-30
**Status:** Initial pass shipped

**Context:** Traditional SEO (the 100/100 score) gets us ranked in blue links. AI SEO gets us *cited* in AI answers from ChatGPT, Perplexity, Google AI Overviews, Claude, Gemini, and Copilot — different game, different rules.

**Decision:** Run a dedicated AI SEO optimization pass alongside traditional SEO. Treat AI citation as a primary distribution channel, not an afterthought.

**What shipped:**
- **`robots.ts`** — explicit allow rules for AI crawlers: GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, GoogleOther, Applebot, Applebot-Extended, CCBot, Bytespider, DuckAssistBot, YouBot, Meta-ExternalAgent, FacebookBot, Cohere-Ai, Diffbot
- **`public/llms.txt`** — emerging AI-discovery standard. Curated map of the site with key facts, common questions, and brand information formatted for LLM extraction
- **Expanded JSON-LD:** added Organization (founder graph), Service (cannabis delivery service with offer catalog), HowTo (step-by-step ordering), Speakable (voice-search-friendly passages). LocalBusiness now references @id graph properly
- **Definition blocks** on `/about`, `/delivery`, `/how-to-order` — first-paragraph "**doorhash** is X" sentences AI engines extract for "what is X" queries
- **`/how-to-order`** — new page with full HowTo JSON-LD + 5 numbered steps + ID requirements. Targets "how to order cannabis delivery NM" queries
- **`/vs/top-crop`** and **`/vs/mango`** — comparison pages with side-by-side tables. Targets buyer-intent comparison queries that AI engines love

**Alternatives considered:**
- Run a paid GEO platform (Profound, Otterly.AI, AthenaHQ) — useful for monitoring but doesn't replace on-page work
- Skip AI SEO and rely on traditional rankings — leaves citations on the table; AI search share is growing 30%+ YoY
- Wait for Phase 3 strain library to ship before AI SEO — strain library will compound on this foundation

**Why this:** Best practices that take days of work but compound for months. The 3 pillars from `marketing-skill/ai-seo`: structure (extractable), authority (citable), coverage (discoverable). All three addressed in this pass.

**Revisit when:** Phase 3 (strain library) ships — each strain page should have its own definition block + extractable Q&A. Phase 5 (live tracker) ships — add Article schema for any blog content. Re-audit AI citation share quarterly.

---

## [#15] Component pattern — surface utilities + card primitives

**Date:** 2026-04-30
**Status:** Locked

**Context:** Avoiding inline-style sprawl across 20+ section files.

**Decision:** All section backgrounds use named utility classes (`surface-dark`, `surface-leaf-dark`, `surface-leaf-deep-mesh`, `surface-paper`). All cards use named primitives (`card-dark`, `card-dark-leaf`, `card-paper`, `card-paper-leaf`). Defined in `app/globals.css` under `@layer utilities`.

**Why this:** When the user says "more dark" or "more green," we change one CSS class globally instead of touching 20 files. This is what made the multiple palette pivots cheap.

