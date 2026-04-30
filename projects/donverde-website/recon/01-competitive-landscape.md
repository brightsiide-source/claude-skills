# Don Verde Website Rebuild — Recon Report

**Date:** 2026-04-30
**Branch:** `claude/donverde-website-rebuild-OOsCO`
**Phase:** 1 — Recon

---

## Executive Summary

The competitive frame the client gave us ("Top Crop in Las Cruces") needs reframing. Top Crop is a **vertically integrated dispensary chain** (B2C), not a head-to-head wholesale producer. Don Verde's real competitors are Top Crop's two **in-house wholesale brands** that show up next to Don Verde on dispensary shelves:

- **Iron Lung** (`ironlungcanna.com`) — organic / living soil flower + solventless rosin. **NM Growers Cup 2024 winner.**
- **Frost Factory** (`thefrostfactory.com`) — slow cold-cure flower, ~27% THC, deep strain catalog with per-strain pages.

Both have meaningfully better websites than Don Verde's current 3-page brochure site. The rebuild needs to clear *their* bar, not Top Crop's retail bar.

---

## 1. Don Verde — Current State Audit

### What we know
- **License:** CCD-VICE-2023-0010 (NM indoor producer)
- **Location:** Southern New Mexico
- **Founders:** Mike, Javi, Neal (Neal Lucas confirmed via LinkedIn)
- **Email:** Info@donverdefarms.com
- **Social:** Instagram `@donverdefarms`, Facebook page
- **Distribution:** carried at Happy Panda Cannabis Co. (and likely others — needs to be confirmed by the founders)
- **Brand story angle:** 20+ years industry experience, NM + SoCal roots, "no corporate money, just pure passion and love for the plant"

### Site audit (from accessible cache + URL signals)
| Element | Finding |
|---|---|
| Pages discovered | `/`, `/about`, `/contact-us-5989` |
| Tech stack | URL slug `/contact-us-5989` is a GoDaddy / Wix Website Builder tell — drag-drop platform, not a real CMS |
| Strain catalog | **Missing.** No per-strain pages indexed. |
| COAs / lab results | **Missing.** No public COA library. |
| Store locator / "find us" | **Missing.** Customers can't see which dispensaries carry Don Verde. |
| Wholesale inquiry flow | Only a generic contact page. No buyer-qualifying form. |
| Awards / press | Not visible. |
| Blog / content | None visible. |
| Schema.org markup | Almost certainly absent given the platform. |
| Mobile / Core Web Vitals | Builder platforms typically score poorly. To be benchmarked. |

### Verdict
The current site is a **placeholder, not a brand asset.** It under-represents what looks like a strong story (20-year operators, NM roots, indoor craft) and ships none of the SEO surface area competitors are winning with.

---

## 2. Competitive Teardown

### 2a. Top Crop Cannabis (`topcropcannabis.com`) — context, not direct competitor

- **Business model:** Vertically integrated dispensary chain. Multiple NM stores (Las Cruces, Albuquerque, Sunland Park, Santa Fe) + Eugene OR origin store. Founded 2018 by two high school friends.
- **Tech:** Webflow (apparent) + Dutchie e-commerce embed (`?dtche[path]=` URL pattern is the giveaway).
- **SEO strategy:** Aggressive programmatic local SEO. Each location has a page titled e.g. "Recreational Cannabis Dispensary in Las Cruces, NM - Dispensary Near Me - Cannabis Dispensary Las Cruces, NM..." (keyword-stuffed, but ranking).
- **Wholesale page:** Light. Their site emphasizes the *retail brand collection* (carried brands) and their two in-house brands.
- **Why this isn't Don Verde's lane:** Top Crop's website is a B2C foot-traffic + e-commerce engine. Don Verde is B2B wholesale + brand awareness. Different jobs-to-be-done, different IA.

### 2b. Iron Lung (`ironlungcanna.com`) — DIRECT COMPETITOR ⚠️

| | |
|---|---|
| Positioning | "Lab & Cultivation." Organic, living-soil cannabis. Solventless rosin. |
| Story | "Collective of cultivation and processing craftsmen with decades of combined experience." Cleanest smoke / most potent. |
| Site structure | Home, About, Our Strains, Store Locator — clean 4-page IA |
| Awards | **NM Growers Cup 2024:** 1st Place Greek Lemonade rosin pen, 2nd Place Lemon Mintz rosin pen |
| Differentiators | Living soil + solventless extraction + cup wins |
| Apparent stack | Squarespace (based on URL/visual patterns) |

**Strengths to neutralize:**
- Award-winning credibility (cup wins prominently messaged)
- Clear cultivation story (organic / living soil = a real differentiator we'd need to either match or counter)
- Cross-brand collabs ("Iron Lung Live Rosin x Frost Factory Flower")

**Weaknesses to exploit:**
- Site appears template-y; the founder story is generic ("decades of combined experience" — vs Don Verde's actual NM + SoCal lineage angle)
- Limited content depth beyond about/strains/locator
- No long-form content marketing, journal, or cultivation deep-dives

### 2c. Frost Factory (`thefrostfactory.com`) — DIRECT COMPETITOR ⚠️

| | |
|---|---|
| Tagline | "Rich Terpenes. Maximum Flavour. Smooth Burn." |
| Process story | Slow, cold hang-dried cure → flowers reach peak potential → ~27% THC average |
| Strain catalog | **Per-strain pages** with full lineage. This is a real SEO moat. |
| Strains documented | GMO, K1, Truffle Queen (Cobra Kai 2), Super Lemon Haze, Maine Blueberry Muffin, First Class Funk, Gorilla Glue #4, Gasoline Ice Cream, SSH, Strawberry Lemonade, Greasy Pink |
| Positioning | AAAA craft cannabis |

**Strengths to neutralize:**
- **Per-strain pages with lineage** — they're winning long-tail strain SEO. This is the single most important pattern Don Verde must replicate (and beat).
- Memorable, ownable tagline structure (3-beat format)
- Distinct process narrative (slow cold cure)

**Weaknesses to exploit:**
- Strain pages appear text-only — no lab data / COA links / terpene profiles surfaced
- No "where to buy" friction-killer
- No founder story / human face on the brand
- The "27% THC" claim is a chase-the-number play; Don Verde can counter-position around terpenes, smoke quality, and farmer story

---

## 3. SEO Landscape — NM Wholesale Cannabis

### Keyword categories ranked by leverage

| Tier | Pattern | Why it matters |
|---|---|---|
| **S — must own** | Strain names ("[strain] strain", "[strain] near me") | Highest intent, evergreen, both budtenders and consumers search |
| **S — must own** | Brand search ("Don Verde", "Don Verde Farms", "Don Verde [strain]") | Defensive — must rank #1 on own brand |
| **A — high value** | "Where to buy Don Verde [city]" | Drives shelf demand at dispensaries |
| **A — high value** | "Best NM cannabis brands", "best New Mexico flower", "indoor flower NM" | Discovery for new buyers |
| **B — moderate** | "Cannabis wholesale New Mexico", "NM cannabis cultivator" | B2B buyer queries (lower volume but high intent) |
| **B — moderate** | "[NM city] cannabis dispensary near me" | Top Crop owns this; Don Verde shouldn't compete here |
| **C — content marketing** | Cultivation methods, terpene education, NM regulatory content | Long-tail authority building |

### Content gaps competitors are NOT filling

- A real NM-grown cannabis "journal" (cultivation seasons, harvest notes, strain backstories)
- COA / lab transparency content (massive trust signal that no one is leaning into)
- Founder/farmer-as-creator video and photo content
- City-pair "where to buy" SEO ("Don Verde in Albuquerque", "Don Verde in Santa Fe", etc.)
- Budtender education content (talk-tracks, terpene primers, strain-pairing — drives shelf push)

---

## 4. Strategic Recommendation

### Positioning frame for Don Verde
**"The most authentic NM-grown craft cannabis brand."**

Three pillars to own:
1. **Authentic NM operators.** 20-year veterans. NM + SoCal lineage. Veteran-affiliated. *No corporate money.* This is a story Iron Lung and Frost Factory cannot tell.
2. **Indoor craft, lab-verified.** Match Iron Lung on quality narrative; beat them on **transparency** (publish every COA, every batch).
3. **Built for budtenders.** Make the site the easiest brand for budtenders to learn, recommend, and find. They are the secret growth lever for any wholesale brand.

### What the new site must do

1. **Win on strain SEO** — per-strain pages with lineage, terpenes, COA PDF, buy-now links to dispensaries
2. **Tell the founder story** — full-bleed photography, video where possible, real NM + SoCal narrative
3. **Surface a "Find Don Verde" map** — dispensary locator (drives shelf demand + creates FOMO for non-stocking dispensaries)
4. **Capture wholesale leads** — gated buyer form (license #, dispensary, volume)
5. **Become a budtender resource** — terpene/strain education, talk-tracks
6. **Publish trust signals** — COA library, license #, awards (and start submitting to NM Growers Cup if not already)

### Proposed site IA (v1)

```
/                          Home — hero, story snippet, featured strains, find-us, wholesale CTA
/strains                   Strain catalog (filter by indica/sativa/hybrid, terpene, THC)
/strains/[slug]            Per-strain page — lineage, terpenes, COA, where to buy
/the-farm                  About / founder story / cultivation methodology
/find-us                   Dispensary locator (NM map + filterable list)
/wholesale                 B2B inquiry form for dispensary buyers
/journal                   Long-form: harvest notes, cultivation, NM regs, terpene education
/journal/[slug]            Article pages
/lab-results               COA library (filterable by strain/batch)
/contact                   Contact + press inquiries
```

### Recommended tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14 (App Router) + TypeScript** | SSG/ISR for SEO, Netlify-native |
| Styling | **Tailwind CSS** | Speed; matches repo's landing-page-generator default |
| CMS | **Sanity** (or Payload as alt) | Founders + budtender team can publish strains, journal, COAs without dev |
| Forms | **Netlify Forms** | Zero infra; spam protection built in |
| Hosting | **Netlify** | Per client preference |
| Analytics | **Plausible** or **Fathom** | Privacy-respecting, no cookie banner needed |
| Schema | Product (per strain), Organization, LocalBusiness, FAQPage | SEO essentials |
| Compliance | Age gate (21+), state geo-detect (optional) | NM legal req |

---

## 5. Open Decisions — Need Client Input

Before Phase 2 (positioning + sitemap + keyword map deep-dive + wireframes), need these decisions:

1. **Audience scope:** Wholesale-only B2B or also consumer brand site? (Recommend: hybrid — primary B2B, with consumer brand pages that drive shelf demand. Consumer ordering itself stays at the dispensary level.)
2. **Geographic scope:** NM-only, or planning to license into other states? Affects schema, copy, and IA.
3. **Brand assets available:**
   - Logo files (vector preferred)
   - Farm/founder photography (or do we need a shoot list as a deliverable?)
   - Strain photography (macro shots are non-negotiable for credibility)
   - COA PDFs (current batches)
   - License documentation
4. **Awards/press:** Have they entered NM Growers Cup or other comps? Any wins, mentions, magazine features?
5. **Stocking dispensaries:** Full list of dispensaries currently carrying Don Verde — needed for the locator at launch.
6. **Content workflow:** Who maintains strains/journal post-launch? (Determines CMS choice.)
7. **Domain strategy:** Stay on `donverdefarms.com` or short-form (`donverde.com` if available) for branding?
8. **Timeline:** Soft launch target?
