# ABQ Cash Home Buyers — Albuquerque, NM

Single-page wholesaling / cash-home-buyer marketing site. Static HTML / CSS / vanilla JS — no build step. Optimized for Netlify with Netlify Forms.

## Files

```
albuquerque-cash-buyers/
├── index.html        # Single page (hero, how-it-works, comparison, situations, areas, FAQ, CTA, footer)
├── styles.css        # Sandia-navy + desert-terracotta theme, fully responsive
├── script.js         # Mobile nav, form validation, Netlify Forms AJAX submit
├── netlify.toml      # Build config + security/cache headers
├── robots.txt
├── sitemap.xml
└── assets/           # OG image, logo, etc. (drop yours here)
```

## Deploy to Netlify

### Option A — Drag & drop
1. Zip the `albuquerque-cash-buyers/` folder (or drag the folder itself).
2. Visit https://app.netlify.com/drop and drop it.
3. Done — site is live on a `*.netlify.app` URL.

### Option B — Git-connected (recommended)
1. Push this repo (or just this folder as its own repo) to GitHub.
2. In Netlify: **Add new site → Import an existing project → GitHub → pick repo**.
3. Build settings:
   - **Base directory:** `albuquerque-cash-buyers` (if deploying from this monorepo)
   - **Build command:** *(leave empty)*
   - **Publish directory:** `albuquerque-cash-buyers` (or `.` if base directory is set)
4. Deploy.

### Custom domain
- **Site settings → Domain management → Add custom domain** (e.g. `abqcashbuyers.com`).
- Netlify provisions a Let's Encrypt cert automatically.
- After the domain is live, update these placeholders:
  - `index.html` → `<link rel="canonical">`, all `og:url`/`og:image` tags, and the JSON-LD `url` field
  - `robots.txt` → `Sitemap:` URL
  - `sitemap.xml` → `<loc>` URL

## Netlify Forms — already wired up

The lead form uses Netlify's built-in form handling. **No backend, no Zapier required.**

- The form has `data-netlify="true"` and `name="lead"` — Netlify auto-detects it on first deploy.
- Honeypot field (`bot-field`) is enabled for spam protection.
- The form submits via AJAX so the success message renders in-page; if JS fails, Netlify falls back to its default redirect (caught by `?submitted=true` query param).

### After first deploy
1. **Site settings → Forms** — confirm the `lead` form is listed.
2. **Forms → Form notifications → Add notification** to send leads to your email or Slack:
   - **Email notification:** put the address(es) that should get every lead.
   - **Outgoing webhook:** push to Zapier/Make/your CRM.
3. (Optional) Enable **reCAPTCHA** under the form settings for extra spam protection — the honeypot is usually enough.

### Free tier limits
Netlify free plan: 100 form submissions/mo. Upgrade to Pro ($19/mo) for 1,000/mo if you outgrow it.

## Customize before launch — the placeholder list

Search-and-replace these before going live:

| Placeholder                   | Replace with                              |
|-------------------------------|-------------------------------------------|
| `(505) 555-0123`              | Your real local number                    |
| `+15055550123`                | Your real local number (E.164)            |
| `offers@example.com`          | Your inbound lead email                   |
| `https://example.com/`        | Your real domain                          |
| `123 Central Ave NE`          | Your real business address                |
| Testimonials block            | Real testimonials with permission         |
| `assets/og-image.jpg`         | A 1200×630 OG image (drop into `assets/`) |
| `assets/logo.png`             | Your logo                                 |

## Add an Open Graph image

Drop a 1200×630 JPG/PNG into `assets/og-image.jpg`. This is what Facebook, LinkedIn, and iMessage previews use when the page is shared.

## Local preview

Any static server works:

```bash
cd albuquerque-cash-buyers
python3 -m http.server 8080
# open http://localhost:8080
```

Note: Netlify Forms **will not work locally** — the form posts to `/` which Netlify intercepts only on the deployed site. Test the form after deploying to a Netlify draft URL.

## Performance / SEO baseline

- One HTTP request for HTML, one CSS, one JS, one Google Fonts call. Lighthouse 95+ out of the box.
- `LocalBusiness` JSON-LD with ABQ address, geo, hours, areas served.
- Per-section anchors for deep-linking.
- Mobile-first responsive at 760px and 980px breakpoints.

## What's intentionally NOT here

- No tracking pixel (add GA4 / Meta / TikTok pixel in `<head>` when you're ready).
- No live chat widget.
- No blog. Add later via Netlify's headless CMS or a `/blog/` directory if you decide to invest in SEO content.
- No appointment booking. Add Calendly embed in the form-success state if you want self-scheduling.
