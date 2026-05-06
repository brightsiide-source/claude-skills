# Tree Frogs Tree Service — Website

A modern, dependency-free static site for Tree Frogs Tree Service serving the
Quad Cities and Western Illinois (Moline, Davenport, Bettendorf, Milan,
Geneseo, Kewanee, Annawan).

## Deploy to Netlify

This folder is the publish root.

**Drag-and-drop deploy:**
1. Go to https://app.netlify.com/drop
2. Drag the entire `tree-frogs-website/` folder

**Git deploy:**
1. Connect your repo in Netlify.
2. Set the **base directory** to `tree-frogs-website`.
3. Build command: *(leave blank)*
4. Publish directory: `tree-frogs-website` (or `.` if base is set).

`netlify.toml` is already configured with security headers, asset cache rules,
and friendly redirects.

## Forms

The contact form on `/contact.html` uses Netlify Forms (`data-netlify="true"`).
Submissions are visible in your Netlify site dashboard. The included
`/thanks.html` page is the success redirect.

## Update business details

Search and replace the placeholder values site-wide:

| Placeholder | Where |
|---|---|
| `(309) 555-0137` | Phone number |
| `hello@treefrogstree.com` | Email |
| `1200 River Dr, Moline, IL 61265` | Address |
| `https://treefrogstree.com` | Canonical / OG / sitemap URLs |
| `41.5067, -90.5151` | Geo coordinates (LocalBusiness JSON-LD) |
| `4.9` and `187` | Aggregate rating + review count |

## SEO checklist (already implemented)

- Per-page unique `<title>` and `<meta name="description">`
- Canonical URLs on every page
- Open Graph + Twitter Card meta + 1200×630 OG image
- Theme-color, color-scheme, viewport, lang
- `robots.txt` and `sitemap.xml` (root)
- LocalBusiness / TreeService JSON-LD with full `areaServed` list
- Service-level + Breadcrumb + FAQ + ContactPage JSON-LD
- Semantic HTML (`<main>`, `<header>`, `<nav>`, `<section>`, `<article>`, headings in order)
- All images have descriptive `alt` (decorative ones use `alt=""`)
- Responsive (clamp-based fluid typography, mobile nav)
- Accessibility: skip link, focus-visible styles, ARIA labels, reduced-motion support
- Performance: preconnect-free (no third-party fonts), single CSS file,
  deferred JS, SVG-only imagery, `loading="eager"` on hero / `decoding="async"`
- HTTPS-only via Netlify, HSTS preload, strict CSP, X-Frame-Options DENY

## Local preview

```bash
cd tree-frogs-website
python3 -m http.server 8000
# open http://localhost:8000
```
