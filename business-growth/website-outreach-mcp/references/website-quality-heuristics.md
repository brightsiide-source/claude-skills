# Website Quality Heuristics

How `assess_website.py` interprets signals and why each one matters to a small-business owner.

## Upgrade priority (0-100)

The priority score starts at 20 (baseline "always room to improve") and adds 12 points per finding, capped at 100. Two situations fast-track the score:

| Situation | Effective floor |
|-----------|-----------------|
| No website at all | 100 |
| Site unreachable / DNS failing | 95 |
| Parked or placeholder page | 85 |
| No HTTPS | 75 |
| Any PSI category score < 50 | 80 |

A priority ≥ 70 is a good cold-outreach target. Below 40, the site is healthy enough that a cold pitch won't land.

## Individual signals

### `https` (boolean)

Chrome, Safari, and Firefox all show "Not secure" on plain HTTP sites. Customers bail. Free certs via Let's Encrypt have been standard for 7+ years — a non-HTTPS site is a strong signal of neglect.

### `cert_days_remaining`

Expired or soon-to-expire certs break the site for every visitor for minutes to days. Under 14 days is a pitchable urgency.

### `title` and `meta_description`

Both missing = the site is essentially invisible in search results. Google sometimes generates fallbacks, but the snippet is never as good as a handwritten one.

### `has_viewport_meta`

Without `<meta name="viewport" content="width=device-width, initial-scale=1">`, the site renders desktop-size on phones and users pinch-zoom to read. 60%+ of local-business traffic is mobile, so this signal alone is worth a pitch.

### `has_og_tags`

Open Graph tags (`og:title`, `og:image`, `og:description`) control how the page looks when shared on Facebook, WhatsApp, iMessage, Slack, etc. Missing = a broken-looking preview, which depresses click-through.

### `has_favicon`

A missing favicon shows as a generic globe icon in browser tabs. Not a huge problem on its own, but combined with other misses it signals "unfinished."

### `image_count` + `images_missing_alt`

Alt text is both an accessibility requirement (screen readers) and an SEO signal (Google uses it to understand images). >30% of images missing alt is a real issue.

### `looks_parked`

Specific phrases ("coming soon", "this domain is for sale", "GoDaddy Parked") plus a tiny HTML payload (<40 KB) strongly indicate the domain was registered but never built out. High-conviction lead.

### `html_bytes` under 2 KB

Often a template placeholder or a default hosting-provider page. Worth checking manually before pitching — occasionally it's a legitimate minimalist site.

### Stale copyright year

Footers with `© 2019` on a business selling current services are a reliable "nobody has touched this site in years" tell. Useful color for the outreach email.

## PageSpeed Insights signals

Lighthouse categories run 0-100:

| Category | What it measures | Good | Poor |
|----------|------------------|------|------|
| Performance | Core Web Vitals + load times | 90+ | <60 |
| Accessibility | Alt text, color contrast, labels | 90+ | <70 |
| Best Practices | HTTPS, deprecated APIs, console errors | 90+ | <70 |
| SEO | Meta tags, crawlability, mobile-friendliness | 90+ | <70 |

Core Web Vitals that matter for local SMB sites:

- **LCP (Largest Contentful Paint):** < 2.5s is good. > 4s is broken.
- **CLS (Cumulative Layout Shift):** < 0.1 is good. > 0.25 is a UX nightmare (buttons moving as the page loads).
- **TBT / INP:** proxies for interactivity. High numbers mean the page feels sluggish.

## What *doesn't* show up in the assessment

Stuff you should still eyeball manually before pitching:

- **Design quality** — a site can pass every heuristic and still look like it's from 2008
- **Conversion flow** — can a customer actually book/order/call from the homepage?
- **Content freshness** — are the services listed still services the business offers?
- **Photography** — stock-photo-heavy sites read as generic and erode trust

A 30-second manual look is worth more than any automated checker here.
