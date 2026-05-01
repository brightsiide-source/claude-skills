# Phase 3 — Strain library + programmatic SEO

**Status:** 📋 Spec ready
**Effort:** ~12 engineering days (2-3 weeks)
**Owner:** TBD
**Depends on:** Phase 1 + 2 shipped (Klaviyo for "notify when in stock," quiz for "match to my vibe" cross-link)

---

## Goal

Build a programmatic SEO engine that auto-generates **100+ strain pages** at `/strains/[slug]` from Don Verde Farms data + Dutchie inventory + a manually-curated content layer (terpenes, lineage, effects, budtender notes). Each page is a real HTML page (not iframe) with full structured data, ranking for long-tail searches like "tropic thunder strain las cruces" or "blue dream sativa NM."

## Why

From the [Top 5 plays roadmap](../doorhash-top-5-plays.pdf): *"This is how Top Crop owns NM SEO today — we leapfrog them with better page design."*

Top Crop has dozens of generic-feeling per-city / per-store pages. We can outrank them with **better-designed per-strain pages**. Each strain page becomes a permanent organic-traffic asset that compounds for years. This is the SEO play that pays off long after we stop spending on it.

## Acceptance criteria

- [ ] **`/strains` index** — searchable, filterable list of all strains, with grid view (card per strain)
- [ ] **`/strains/[slug]`** — individual strain page with:
  - Hero: strain name, type (Indica/Sativa/Hybrid), THC %, our shelf level, big terpene chart
  - **Lineage diagram** — visual parent strains
  - **Effects** — top 5 effects, with confidence scores
  - **Terpene profile** — myrcene, limonene, caryophyllene, etc., with flavor descriptors
  - **Budtender notes** — 2-3 paragraphs of curated commentary per strain
  - **Lab results** — link/embed to current batch COA (Certificate of Analysis)
  - **Available formats** — flower, pre-rolls, vapes, edibles based on inventory
  - **Live inventory + price** from Dutchie (or "Notify me when back in stock" if OOS, wires to Klaviyo)
  - **Related strains** — same lineage, similar effects, similar terpenes
  - **Customer reviews** (when Jane Roots migration happens)
  - **Provenance** — "Grown by Don Verde Farms" badge with link to `/farm`
- [ ] **Per-page SEO:**
  - Title: `{Strain Name} ({Type}) — Strain Info, Effects & Reviews | DoorHash NM` (50-60 chars)
  - Description: `{Strain Name} is a {type} cannabis strain with {THC}% THC. Discover effects, lineage, terpenes, and where to buy in {city}.` (~150 chars)
  - JSON-LD: **Product schema** (with `Offer`, `AggregateRating` when reviews land)
  - OG image auto-generated per strain (Vercel `@vercel/og` or Next.js `ImageResponse`)
  - Canonical URL set
- [ ] **Sitemap auto-includes** all strain URLs
- [ ] **Search + filter** on `/strains`: by type, effect, terpene, format, THC % range, in-stock only
- [ ] **Internal linking strategy**: every strain page links to 6+ related strains, the farm page, the menu, and the quiz
- [ ] **City-aware:** if a user's IP / saved city is set, prefer "Available at our Las Cruces location" copy
- [ ] **Static generation** — all strain pages prerender at build time (`generateStaticParams`)
- [ ] **ISR or webhook revalidation** — strain pages revalidate every 6 hours (or on Dutchie inventory webhook if Plus tier)

## Out of scope

- ❌ Customer review system (depends on Jane Roots — Phase 6)
- ❌ Strain-of-the-week feature page (Phase 7+)
- ❌ Strain image upload UI for budtenders (manual MDX/data entry in v1)
- ❌ AI-generated strain descriptions (use real budtender notes; AI is Phase 8+)
- ❌ Real-time inventory countdown ("only 3 left!") — defer to provenance phase
- ❌ Per-store strain availability if multi-store later

## Dependencies

| Dependency | Owner | Status |
|---|---|---|
| **Strain content database** — 50-100 strains with curated notes | Mike + budtender team | Major content effort |
| **Lab results / COAs** — PDF or URL per strain batch | Don Verde Farms compliance team | Must have public links |
| **Lineage data** — parent strains for genealogy diagram | Use Leafly/Weedmaps public data + manual curation | Public data source |
| **Terpene profiles** — top 3 terpenes per strain | Lab data → manual entry | Provided by lab |
| **Dutchie inventory feed** — current stock per strain | Dutchie embed scrape OR Dutchie Plus API | Plus tier preferred |
| **Strain photography** — at least one good photo per strain | Brand team | Use emoji placeholders if not ready |

## Technical approach

### Data model

```ts
// lib/strains/types.ts
export type Strain = {
  slug: string;                // tropic-thunder
  name: string;                // "Tropic Thunder"
  type: "Indica" | "Sativa" | "Hybrid" | "CBD";
  thcRange: [number, number];  // [27, 31]
  shelf: "House" | "Top Shelf" | "Premium" | "Standard";
  parentage: string[];         // ["Mango Kush", "Tangie"]
  topEffects: string[];        // ["relaxed", "happy", "creative"]
  topTerpenes: { name: string; descriptor: string; pct: number }[];
  budtenderNotes: string;      // MDX
  availableFormats: ("flower" | "preroll" | "vape" | "edible" | "concentrate")[];
  growProfile: "indoor" | "outdoor" | "greenhouse";
  cultivator: "Don Verde Farms" | string;  // partner brand strains too
  imagePrimary: string;        // /images/strains/tropic-thunder.jpg
  imageMacro?: string;         // optional close-up
  coaUrl?: string;             // current lab cert
  relatedSlugs: string[];      // computed or curated
};
```

### File structure

```
doorhash-site/
├── app/
│   └── strains/
│       ├── page.tsx                        # index with search + filter
│       ├── [slug]/page.tsx                 # individual strain page
│       └── [slug]/opengraph-image.tsx      # per-strain OG image
├── content/
│   └── strains/                            # MDX or JSON files, one per strain
│       ├── tropic-thunder.mdx
│       ├── verde-velvet.mdx
│       └── ... (50-100 files)
├── lib/
│   ├── strains/
│   │   ├── types.ts
│   │   ├── load.ts                         # MDX/JSON loader
│   │   ├── filter.ts                       # search + filter logic
│   │   ├── relate.ts                       # related-strain computation
│   │   └── inventory.ts                    # Dutchie inventory lookup
│   └── products.ts                         # UPDATE — link to strain slugs
├── components/
│   └── strains/
│       ├── StrainCard.tsx
│       ├── StrainHero.tsx
│       ├── TerpeneChart.tsx
│       ├── LineageDiagram.tsx
│       ├── EffectsBreakdown.tsx
│       ├── StrainFilters.tsx
│       └── RelatedStrains.tsx
```

### Build-time generation

```ts
// app/strains/[slug]/page.tsx
export async function generateStaticParams() {
  const strains = await loadAllStrains();
  return strains.map((s) => ({ slug: s.slug }));
}

export const revalidate = 21600; // 6hrs
```

### Inventory integration

- **Dutchie embed only:** scrape inventory periodically (fragile; risk of breaking)
- **Dutchie Plus API (preferred):** fetch live menu data at build time + revalidate
- **Jane API (Phase 6+):** clean per-strain availability + reviews

For Phase 3 v1, ship with **build-time inventory snapshot** + 6hr revalidation. Live inventory is a Phase 6 concern.

### SEO patterns

- Each strain page must have ≥800 words of unique, valuable content (not just specs)
- Include LocalBusiness + Product JSON-LD on every page
- Cross-link aggressively: strains → farm → menu → quiz → related strains
- Use city names in meta descriptions and H2s (Las Cruces, Mesilla, Sunland Park, Anthony, Doña Ana)
- Submit `sitemap.xml` to Google Search Console once 20+ pages live

## Risks

- **Content production is the bottleneck**, not engineering. 100 strain pages × 30 min budtender notes = 50 hours of writing. Plan for staged content release: ship engine with 20 strains, add 5/week.
- **Duplicate content with Leafly/Weedmaps** — mitigate with truly original budtender voice + lab data + provenance angle.
- **Dutchie scraping fragility** — if we go that route, expect occasional breaks. Plan a graceful "inventory unavailable" fallback.
- **Image asset cost** — 100 strain photos. Either use stock cannabis macro shots (cheap, generic) or invest in custom shoot ($$$).

## Effort breakdown

| Task | Days |
|---|---|
| Data model + MDX/JSON loader + types | 1.0 |
| `/strains` index (search + filter UI) | 2.0 |
| `/strains/[slug]` page template + components | 3.0 |
| TerpeneChart + LineageDiagram (custom SVG components) | 2.0 |
| Per-strain OG image generation | 0.5 |
| Inventory integration (Dutchie scrape or API) | 1.5 |
| Initial content (20 strains) — *engineering supports, content team owns* | 1.0 |
| SEO QA + structured data validation + Google Search Console submission | 0.5 |
| Cross-linking + internal-link audit | 0.5 |
| **Total** | **~12 days (engineering)** + 30-50hrs content writing |

## Success metrics (12 weeks post-launch)

| Metric | Target | How measured |
|---|---|---|
| Strain pages indexed by Google | ≥80% of published | Search Console |
| Organic traffic from strain pages | 2,000 visits/month by month 3 | Plausible/GA |
| Top-10 rankings for "{strain name} las cruces" | ≥10 strains | Search Console |
| Strain page → menu conversion | ≥8% | Analytics funnel |
| "Notify when in stock" signups | 100/month | Klaviyo |
| Top Crop SERP comparison (manual audit) | Outrank on ≥5 strain queries | Manual |

## Done state

When this phase ships:
- 20+ strain pages live, each scoring 100/100 on the SEO checker
- `/strains` index is searchable + filterable, beautiful on mobile
- Every published strain has a per-strain OG image
- Sitemap submitted to Google Search Console
- Content team has a clear pipeline to add 5 strains/week post-launch
- README updates: phase status flips to ✅

