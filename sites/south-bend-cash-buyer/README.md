# South Bend Cash Home Buyers — Landing Site

A static, conversion-focused single-page site for a cash home wholesaling business serving South Bend, IN and the Michiana area. Built for **Netlify** with **Netlify Forms** for lead capture. No build step, no framework, no JavaScript dependencies.

## Stack

- Plain HTML / CSS / vanilla JS
- Inter font from Google Fonts
- LocalBusiness JSON-LD schema for local SEO
- Netlify Forms (with honeypot spam protection)
- Security headers + CSP via `netlify.toml`

## File Structure

```
south-bend-cash-buyer/
├── index.html          # Landing page (hero + form, how it works, FAQ, etc.)
├── thank-you.html      # Post-submit confirmation page
├── styles.css          # All styles (mobile-first, responsive)
├── script.js           # Mobile nav, footer year, phone/zip masking
├── netlify.toml        # Build config + security headers
├── robots.txt          # Allow indexing of homepage only
├── sitemap.xml         # 1-URL sitemap
└── README.md           # This file
```

## Deploy to Netlify

### Option A — Drag & Drop (fastest)
1. Sign in to https://app.netlify.com
2. Drag the entire `south-bend-cash-buyer/` folder into the "Sites" drop zone
3. Done. Netlify will auto-detect the form on first deploy

### Option B — Git-based deploy (recommended)
1. Push this folder to a Git repository (GitHub / GitLab / Bitbucket)
2. In Netlify: **Add new site → Import an existing project**
3. Pick the repo
4. Build settings:
   - **Base directory:** `sites/south-bend-cash-buyer`
   - **Build command:** *(leave blank)*
   - **Publish directory:** `sites/south-bend-cash-buyer`
5. Click Deploy

### Option C — Netlify CLI
```bash
npm install -g netlify-cli
cd sites/south-bend-cash-buyer
netlify deploy           # preview
netlify deploy --prod    # production
```

## Netlify Forms — How It Works Here

Netlify scrapes your published HTML at **deploy time** for any form with `data-netlify="true"`. Once detected, submissions arrive in **Site → Forms** in the Netlify dashboard. To make detection bulletproof for static (non-build) sites, we include both:

1. **A hidden, non-rendered form** at the top of `index.html` with `netlify` and all field names — this guarantees Netlify discovers every field even if JS rewrites the visible form.
2. **The real, visible form** with `data-netlify="true"`, `data-netlify-honeypot="bot-field"`, a hidden `form-name` input, and `action="/thank-you.html"`.

Both forms share `name="cash-offer"` so submissions are unified.

### After your first deploy
1. Go to **Site → Forms → cash-offer**
2. Add **Form notifications**: email, Slack, or webhook to your CRM
3. Optional: enable **reCAPTCHA** under Form settings → Spam filters

### Spam protection in place
- Honeypot field `bot-field` (hidden via CSS, bots fill it, humans don't)
- You can layer reCAPTCHA via Netlify dashboard with no code changes

## Customization Checklist

Before going live, search & replace these placeholders:

| Placeholder | Where | Replace with |
|---|---|---|
| `(574) 555-0123` | `index.html`, `thank-you.html` | Your real phone number |
| `+15745550123` | `tel:` links in both HTML files | Your phone in E.164 |
| `offers@example.com` | `index.html` footer + JSON-LD | Your email |
| `https://example.com` | `<link rel="canonical">`, OG tags, JSON-LD, `robots.txt`, `sitemap.xml` | Your real domain |
| `123 Main Street` / `46601` | JSON-LD address in `<head>` | Your business address |
| `South Bend Cash Home Buyers` | Logo text, footer, JSON-LD | Your brand name |
| Testimonials in `#testimonials` | `index.html` | Real customer quotes (use real first name + last initial) |
| BBB / "100+ homes" claims in topbar + hero | `index.html` | Real, verifiable claims only |

## Local Preview

```bash
# Python 3
cd sites/south-bend-cash-buyer
python3 -m http.server 8000
# open http://localhost:8000
```

Or use the Netlify CLI for an environment closer to production (forms work locally with `netlify dev`):

```bash
netlify dev
```

## SEO Notes

- Title and meta description are tuned around "sell house fast South Bend"
- LocalBusiness JSON-LD lists service areas (South Bend, Mishawaka, Granger, Elkhart, Niles MI, etc.)
- ZIPs called out in the Service Areas section help with long-tail queries
- `robots.txt` blocks `/thank-you.html` from indexing
- **Recommend after launch:** submit `sitemap.xml` to Google Search Console + create a Google Business Profile

## Compliance / Legal

The footer includes a basic disclaimer. Before launch you should add:
- A real **Privacy Policy** page (required by most state laws when collecting leads)
- A **Terms of Service** page if you'll be running paid ads
- TCPA-compliant consent text on the form if you plan to call/text leads (the current copy is a soft opt-in — strengthen it if needed for your jurisdiction)

## License

Internal / proprietary. Not for redistribution.
