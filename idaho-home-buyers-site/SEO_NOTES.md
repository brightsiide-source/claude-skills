# Casiano Homes — SEO Build-Out Notes

This document records the SEO build-out done in response to the Search Console
audit (thin/duplicate content, too few pages, weak local trust signals), and
the off-platform items that still need a human.

## What changed in this build-out

### 1. City pages deepened (thin-content / duplicate-canonical fix)
All 12 city pages were rewritten from ~700–800 words of near-duplicate copy to
**1,500–1,900+ words of genuinely unique local content**, each with:
- Correct county framing (Ada, Canyon, Twin Falls, Bonneville, Bannock, Kootenai, Nez Perce)
- Real neighborhood / landmark / economy detail specific to that city
- A "how we determine your offer" section, a costs-vs-listing comparison table, and a sale timeline table
- County selling notes (Idaho has **no real estate transfer tax**, taxes paid in arrears, homeowner's exemption) and a well/septic note for rural parcels
- A city-specific FAQ accordion backed by `FAQPage` JSON-LD
- `BreadcrumbList` + `RealEstateAgent` structured data with the local phone

This directly targets the "Crawled – currently not indexed" / "Duplicate
without user-selected canonical" exclusion reasons.

### 2. New commercial pages (near-miss ranking wins from the audit)
- **`/we-buy-houses-jerome-id.html`** — dedicated page for "cash home buyers jerome id"
  (was ranking ~pos 14 with no page of its own). Jerome County / Magic Valley content.
- **Eagle** — the `cities/eagle.html` page was deepened and now targets the exact
  query "we buy houses eagle" (was ~pos 27) in the H1, lead, a subheading, and FAQ.
  Exact-match pretty URLs `/we-buy-houses-eagle` and `/we-buy-houses-eagle-id`
  redirect to it (see `netlify.toml`).

### 3. New trust + content pages
- **`/reviews.html`** — testimonials + "leave a review" CTA (local trust signal).
- **`/blog/`** + **`/blog/idaho-foreclosure-timeline-2026.html`** — the long-form
  foreclosure guide the audit recommended, grounded in Idaho's non-judicial
  (deed-of-trust) process with a not-legal-advice disclaimer.

### 4. Internal linking + crawl plumbing
- Homepage nav, homepage footer, and every page footer now link Reviews + Blog.
- Jerome added to the homepage service-area grid, FAQ answers, and `areaServed` schema.
- `sitemap.xml` updated with all new URLs and fresh `lastmod` dates.
- `netlify.toml` pretty-URL redirects added for `/jerome`, `/reviews`, `/blog`,
  and the Eagle exact-match slugs.
- CSS components added (breadcrumbs, content tables, note boxes, reviews grid,
  blog/article layout) — no external dependencies, CSP-safe.

## Off-platform actions still required (a human must do these)

These are the highest-leverage items and **cannot be done in the codebase**:

1. **Verify a Google Business Profile (GBP)** for the Idaho business with a real
   Idaho (208) phone and a genuine local address. Without a GBP you cannot enter
   the Google Map Pack — that's roughly half the commercial upside for "we buy
   houses [city]" queries. This was also the key gap flagged in the Colorado audit.
2. **Pull the GSC "Why pages aren't indexed" report** (Indexing → Page indexing →
   Full report). The exact exclusion reason confirms whether the remaining fix is
   thin-content (addressed by the rewrites above) or duplicate-canonical. Screenshot
   it before/after so you can measure the effect of this build-out.
3. **Add real reviews + rating schema.** `reviews.html` currently reuses the
   homepage testimonials. Once the GBP has real reviews, replace them and add a
   `Review` / `AggregateRating` JSON-LD block using **only the real rating and
   count** — never fabricated numbers (Google treats fake review markup as spam).
4. **Build local citations** (NAP consistency across directories) once the GBP
   address/phone is finalized. Keep the name, address, and phone identical everywhere.
5. **Request indexing** in GSC for the new/expanded URLs and resubmit `sitemap.xml`.

## Content integrity note
City and blog copy uses real, verifiable Idaho geography, economy, and law
(counties, landmarks, no-transfer-tax, non-disclosure state, foreclosure statute
framework). It deliberately avoids invented precise statistics (median prices,
specific comp addresses). If you want hard local market numbers on the pages,
source them from MLS/county data and add them with citations.
