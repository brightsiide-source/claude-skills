# Sac Cash Home Buyers — Sacramento Wholesaling Landing Page

Static, single-page website for a Sacramento, CA cash home-buying / wholesaling business. Hosted on **Netlify** with **Netlify Forms** for lead capture.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Main landing page (hero, benefits, how-it-works, comparison table, testimonials, areas served, FAQ, CTA, footer) |
| `thanks.html` | Post-submit thank-you page (Netlify form `action` redirects here) |
| `styles.css` | All styling (no framework — pure CSS with design tokens) |
| `script.js` | Footer year + lightweight client-side validation |
| `netlify.toml` | Netlify config (publish dir, security headers, asset caching) |

## Lead form (Netlify Forms)

The form on `index.html` is wired for Netlify Forms:

- `name="cash-offer"` — form name shown in the Netlify dashboard
- `data-netlify="true"` — enables Netlify form processing
- `netlify-honeypot="bot-field"` — spam trap (the `bot-field` input is hidden via CSS)
- Hidden `<input name="form-name" value="cash-offer">` — required for SPA-style submissions
- `action="/thanks.html"` — redirect target on success

After deploy, submissions appear under **Netlify dashboard → Forms → cash-offer**. Configure email/Slack/webhook notifications there.

## Deploying to Netlify

**Option A — Drag & drop:**
1. Open https://app.netlify.com/drop
2. Drag the `sacramento-cash-buyers/` folder onto the page
3. Done

**Option B — Connect Git repo:**
1. New site → Import from Git → pick this repo
2. Set base directory: `sacramento-cash-buyers`
3. Build command: *(leave blank)*
4. Publish directory: `sacramento-cash-buyers` (or `.` if base is set)

**Option C — Netlify CLI:**
```bash
cd sacramento-cash-buyers
netlify deploy --prod --dir=.
```

## Customizing

| Where | What to change |
| --- | --- |
| `index.html` (and `thanks.html`) | Phone `(916) 555-0123`, email `offers@saccashhomebuyers.com`, business name, JSON-LD schema |
| `styles.css` | `:root` design tokens — green/gold palette, radii, shadows |
| `index.html` `<meta>` block | Title, description, keywords, canonical URL, Open Graph |

## Notes

- Mobile-responsive (breakpoints at 600 / 700 / 760 / 880 / 900 px)
- Sticky header, smooth scroll, semantic HTML
- LocalBusiness JSON-LD schema for SEO
- No external JS/CSS dependencies — fully self-contained
- A11y: ARIA labels on nav/forms, keyboard-focusable buttons, `prefers-reduced-motion` safe (no animations on critical paths)
