# ABQ Cash Home Buyers — Albuquerque, NM

Static, multi-page cash-home-buyer marketing site. Pure HTML / CSS / vanilla JS — no build step. Optimized for Netlify with Netlify Forms. SEO-tuned for Albuquerque, Rio Rancho, and central New Mexico.

## File map

```
albuquerque-cash-buyers/
├── index.html            # Homepage
├── rio-rancho/           # Service area: Rio Rancho, NM
│   └── index.html
├── foreclosure/          # Situation: stop foreclosure in NM
│   └── index.html
├── inherited/            # Situation: inherited / probate sale
│   └── index.html
├── divorce/              # Situation: divorce sale
│   └── index.html
├── styles.css            # Modern monochrome theme — white + cobalt + ink
├── script.js             # Mobile nav, form validation, Netlify Forms AJAX
├── netlify.toml          # Security headers, cache control
├── robots.txt
├── sitemap.xml
├── site.webmanifest      # PWA manifest
├── favicon.svg           # SVG favicon (works in all modern browsers)
└── assets/
    ├── og-image.svg      # Branded OG image (convert to .jpg for Facebook compat)
    └── (drop logo.png, og-image.jpg here for production)
```

## Deploy to Netlify (Git-connected — recommended)

1. **Add new site → Import from Git → GitHub** → pick this repo.
2. Settings:
   - **Branch:** `claude/albuquerque-real-estate-site-lrr8u` (or wherever you've merged)
   - **Base directory:** `albuquerque-cash-buyers`
   - **Build command:** *(leave empty)*
   - **Publish directory:** `albuquerque-cash-buyers`
3. Deploy. Every push auto-redeploys with correct cache headers.

### Why not drag-and-drop
The drag-and-drop deploy ignores `netlify.toml`, which means the cache-control headers don't get applied. Result: browsers cache CSS for 24h and stale styles haunt you. Git-connected fixes it permanently.

## Netlify Forms — already wired

All five pages submit to a single `lead` form (Netlify aggregates them). Each submission includes a hidden `page` field so you know which page generated the lead.

- Honeypot enabled (`bot-field`)
- AJAX submit + no-JS fallback (`?submitted=true` query param)
- After first deploy: **Forms tab → Notifications → add an email address**
- Free tier: 100 submissions/mo

## Pre-launch checklist (DO NOT SKIP)

These placeholder values appear across **all 5 pages** — search-and-replace globally:

| Placeholder | Replace with | Where it appears |
|---|---|---|
| `https://example.com/` | Your real domain (with trailing slash) | Canonical, og:url, JSON-LD `url`, sitemap.xml, robots.txt |
| `(505) 555-0123` | Real phone, formatted | Header, footer, CTAs, form success msg |
| `+15055550123` | Real phone, E.164 | All `tel:` links |
| `+1-505-555-0123` | Real phone, hyphenated E.164 | JSON-LD `telephone` |
| `offers@example.com` | Real email | Footer, JSON-LD `email` |
| `123 Central Ave NE` | Real street | Footer, JSON-LD `streetAddress` |
| `87102` | Real ZIP | JSON-LD `postalCode` |
| Testimonial (Marisol R.) | Real testimonial with permission, OR remove | Homepage testimonial section + Review JSON-LD |
| `4.9` / `82` rating + count | Real Google Business Profile numbers | LocalBusiness JSON-LD `aggregateRating` |
| `2014` founding date | Real year | LocalBusiness JSON-LD `foundingDate` |

**Critical:** the `aggregateRating` schema currently says 4.9 stars from 82 reviews. If those aren't real numbers you can defend, **remove that block from `index.html`** — Google penalizes fake review schema heavily and can manually de-index the site.

## OG image — quick conversion

I shipped `assets/og-image.svg` (1200×630, branded). It works on Twitter/X, LinkedIn, Discord, Slack, iMessage out of the box.

**Facebook still wants raster.** Quickest convert:

```bash
# macOS / Linux with rsvg-convert installed
rsvg-convert -w 1200 -h 630 -o assets/og-image.jpg assets/og-image.svg

# Or open assets/og-image.svg in Chrome at 1200×630, screenshot, save as JPG.
# Or upload to https://cloudconvert.com/svg-to-jpg
```

Drop the resulting `og-image.jpg` into `assets/`. The meta tags already point to `og-image.jpg` so Facebook will pick it up automatically.

## SEO — what's been done

This site has been tuned for ~95+ SEO score. Implemented:

**Schema.org structured data** (huge for Google rich snippets):
- `LocalBusiness` with NAP, geo, hours, areas served, aggregate rating
- `HowTo` for the 3-step process
- `FAQPage` (8 Q&A on home, 3 on each situation page) — generates accordion rich snippets in search results
- `Review` for the featured testimonial
- `Service` for foreclosure / inherited / divorce pages
- `BreadcrumbList` on every page

**On-page**:
- Unique title + description + H1 on every page
- Geo meta tags (Bing local + legacy)
- Open Graph + Twitter Card complete with image dimensions
- Single H1 per page, clean H2/H3 hierarchy
- Internal links between all pages

**Technical**:
- Non-render-blocking Google Fonts (preload + media swap)
- Critical CSS inlined for paint-stable fallback
- SVG favicon + web manifest + theme-color
- Skip-to-content a11y link
- `<main>` landmark
- Mobile-responsive, sticky CTA bar, semantic HTML throughout

**Content depth**:
- Homepage: ~2,400 words across 9 sections
- 4 supporting pages each with 500–800 unique words on a high-intent query

## After-deploy validation

Once live, run these against the real URL:

1. **Google Rich Results Test** — https://search.google.com/test/rich-results
   - Should detect: LocalBusiness, HowTo, FAQPage, Review, BreadcrumbList
2. **PageSpeed Insights** — https://pagespeed.web.dev/
   - Target: 95+ mobile, 99+ desktop
3. **Schema.org Validator** — https://validator.schema.org/
   - Paste live URL, fix any warnings
4. **Google Search Console** — submit `sitemap.xml` (`/sitemap.xml`)
5. **Google Business Profile** — claim/create one for the real business address. Single biggest local-SEO lever; not on-site SEO but should be done.

## Local preview

```bash
cd albuquerque-cash-buyers
python3 -m http.server 8080
# open http://localhost:8080
```

Note: Netlify Forms will not work locally. Test forms after deploying to a Netlify draft URL.

## What's intentionally NOT here

- No tracking pixel (add GA4, Meta Pixel, etc. in `<head>` when ready)
- No live chat widget
- No CMS / blog (yet — would be the next SEO multiplier)
