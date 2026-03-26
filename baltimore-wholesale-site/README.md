# Baltimore Cash Home Buyers — We Buy Houses Website

A high-converting, SEO-optimized wholesaling real estate website for the Baltimore, MD metro area. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **SEO Optimized**: Full meta tags, Open Graph, Twitter Cards, structured data (JSON-LD)
- **Local SEO**: Google Business schema, geo meta tags, NAP consistency, local keywords
- **Google Maps Integration**: Embedded map showing Baltimore metro service area
- **Schema Markup**: RealEstateAgent + FAQPage structured data for rich snippets
- **Mobile-First**: Fully responsive design with mobile hamburger menu
- **High-Converting**: Multiple CTAs, lead capture forms, trust signals
- **Netlify Ready**: Static export with `netlify.toml` pre-configured

## Color Scheme

- **Primary**: Royal Blue (#1d22d6 / royal-700)
- **Secondary**: White (#ffffff)
- **Accent**: Gold/Yellow (#fbbf24 / gold-400)

## Deploy to Netlify

### Option 1: Netlify CLI
```bash
npm install
npm run build
npx netlify deploy --prod --dir=out
```

### Option 2: Git Integration
1. Push this repo to GitHub
2. Connect the repo in Netlify Dashboard
3. Build command: `npm run build`
4. Publish directory: `out`

### Option 3: Drag & Drop
```bash
npm install
npm run build
# Drag the "out" folder to Netlify's deploy page
```

## Customization Checklist

Before going live, update these placeholders:

- [ ] Phone number: Replace `(410) 555-CASH` with your real number
- [ ] Email: Replace `offers@baltimorewebuyhomes.com` with your email
- [ ] Address: Replace `100 E Pratt St` with your office address
- [ ] Domain: Replace `baltimorewebuyhomes.com` with your actual domain
- [ ] Google Maps: Update the embed URL with your Google Business listing
- [ ] Google CID: Replace `YOUR_GOOGLE_CID` in schema with your actual CID
- [ ] Social links: Update Facebook, Google, YouTube URLs in footer
- [ ] Add real testimonials from actual clients
- [ ] Add Google Analytics / Tag Manager tracking code
- [ ] Set up form backend (Netlify Forms, Formspree, etc.)
- [ ] Add favicon and OG image to `/public/images/`

## Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Tech Stack

- Next.js 14 (Static Export)
- TypeScript
- Tailwind CSS
- Deployed on Netlify
