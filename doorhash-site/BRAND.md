# BRAND.md — doorhash brand reference

> Locked palette + voice + visual rules. Reusable across this site, Don Verde Farms, and any sister brands the team builds.

## Core 4 colors

| Role | Hex | Where it shows up |
|---|---|---|
| **Leaf 500** | `#8DC63F` | Logo, primary CTAs, primary brand accent |
| **Black** | `#000000` | Default dark surface, text on light, primary CTA bg |
| **White** | `#FFFFFF` | Light text on dark, light surfaces, cards |
| **Gold 500** | `#C9A961` | Premium accent only — Top Shelf badge, Hash VIP, hairlines |

Three rules to live by:
1. **Green is identity** — leaf-500 is the brand color, used wherever brand recognition matters
2. **Gold is punctuation, not paragraph** — premium signal, never headlines or bodies
3. **No cream, no warm tones** — if it feels off-white or beige, it's wrong

## Full leaf scale

```
50    #f4faea     — almost white, very subtle leaf tint
100   #e6f4cf     — leaf wash backgrounds
200   #cfe9a3     — light leaf accents
300   #b3da72     ⭐ accent text on dark, headline highlight words
400   #9bcd4d     — hover states, secondary green
500   #8dc63f     ⭐⭐ THE brand green (logo, primary CTAs)
600   #6fa530     — darker accents on light
700   #557e26     — forest green stop
800   #406020     — deeper forest
900   #34501c     ⭐ hero gradient top stop
950   #1a2c0c     ⭐ hero gradient mid stop, deepest forest
```

⭐ = locked usage shown elsewhere in this doc.

## Full ink scale (neutrals)

```
50    #f6f6f6     — paper-warm tint (soft white-gray)
100   #e7e7e7     — paper-edge (card borders on light)
200   #d1d1d1
300   #b0b0b0
400   #888888
500   #6d6d6d
600   #5d5d5d     — muted paragraph color on light
700   #4f4f4f
800   #454545
900   #1a1a1a
950   #0a0a0a     — soft black where pure #000 is too harsh
```

## Full gold scale

```
50    #fbf6e8
100   #f4ebc7
200   #e8d490
300   #dabd5c     ⭐ gold accent text on dark (Lot # labels)
400   #cfa937
500   #c9a961     ⭐⭐ THE brand gold (Top Shelf badge, VIP frame)
600   #a88a3f
700   #856a2c
800   #5e4b1d
900   #403315
950   #2a210d
```

## Signature surfaces

```css
/* Hero / page header — forest green immersive */
.surface-leaf-dark {
  background: linear-gradient(180deg, #34501c 0%, #1a2c0c 50%, #000000 100%);
}

/* Rich green-black with radial leaf glow — used for HowItWorks, mobile drawer */
.surface-leaf-deep-mesh {
  background:
    radial-gradient(at 20% 10%, rgba(141,198,63,0.22), transparent 50%),
    radial-gradient(at 80% 30%, rgba(141,198,63,0.14), transparent 50%),
    radial-gradient(at 50% 90%, rgba(141,198,63,0.18), transparent 50%),
    #1a2c0c;
}

/* Default dark section — pure black */
.surface-dark { background: #000000; }

/* Glass card on dark — green hover */
.card-dark {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(20px) saturate(140%);
}
.card-dark:hover {
  background: rgba(141,198,63,0.06);
  border-color: rgba(141,198,63,0.4);
}

/* Premium leaf-tinted card */
.card-dark-leaf {
  background: linear-gradient(180deg, rgba(141,198,63,0.12) 0%, rgba(255,255,255,0.02) 100%);
  border: 1px solid rgba(141,198,63,0.28);
}

/* Gold hairline — only above legal copy / between premium tiers */
.gold-divider {
  background: linear-gradient(90deg, transparent, #c9a961 50%, transparent);
  height: 1px;
}

/* Glow on primary leaf CTAs */
.shadow-glow-leaf {
  box-shadow: 0 0 60px -10px rgba(141,198,63,0.5);
}
```

## Tailwind config snippet (drop-in)

```ts
// tailwind.config.ts → theme.extend.colors
{
  leaf: {
    50: "#f4faea", 100: "#e6f4cf", 200: "#cfe9a3", 300: "#b3da72",
    400: "#9bcd4d", 500: "#8dc63f", 600: "#6fa530", 700: "#557e26",
    800: "#406020", 900: "#34501c", 950: "#1a2c0c",
  },
  ink: {
    50: "#f6f6f6", 100: "#e7e7e7", 200: "#d1d1d1", 300: "#b0b0b0",
    400: "#888888", 500: "#6d6d6d", 600: "#5d5d5d", 700: "#4f4f4f",
    800: "#454545", 900: "#1a1a1a", 950: "#0a0a0a",
  },
  gold: {
    50: "#fbf6e8", 100: "#f4ebc7", 200: "#e8d490", 300: "#dabd5c",
    400: "#cfa937", 500: "#c9a961", 600: "#a88a3f", 700: "#856a2c",
    800: "#5e4b1d", 900: "#403315", 950: "#2a210d",
  },
}
```

## Typography

| Use | Font | Notes |
|---|---|---|
| Display + body | **DM Sans** (variable, 400–800) | Loaded via `next/font/google` |
| Mono | **JetBrains Mono** | Rare — code samples, lot numbers |

`text-display-1` clamps to 3rem→7.5rem with -0.04em letter-spacing. Defined in `tailwind.config.ts`.

## Logo rules

- **Wordmark only** — no separate icon mark in v1. Logo file: `components/Logo.tsx` (inline SVG approximation until official asset lands).
- **Always lowercase** — `doorhash`, never `DoorHash` or `Door Hash` in marketing copy. Title-case only in legal/metadata contexts (`DoorHash` is the `legalName` in `lib/site.ts`).
- **Color usage:**
  - On dark backgrounds: `door` lime (leaf-500) + `hash` cream (#f7f4ec or pure white)
  - On light backgrounds: `door` lime (leaf-500) + `hash` near-black (#0a0a0a)
- **Minimum size:** 96px wide on web. Below that, the leaf-on-d detail disappears.
- **Don't:** stretch, recolor outside the palette, place on busy photography without a backdrop.

## Voice + tone

| Yes | No |
|---|---|
| Plainspoken, confident, app-coded | Folksy / fruit-stand / mango-tropical |
| "Top-shelf cannabis, at your door." | "Welcome to our family! 🥭" |
| "Speed. Discretion. Soul." | "Premier dispensary destination" |
| Specific numbers — *"30-min average ETA"* | Vague — *"fast delivery"* |
| Reference Don Verde Farms by name | Hide the parent brand |
| One word: **doorhash** | Two words or capitalized variants |

**Closer to:** DoorDash, Caviar, Gopuff, modern Apple product pages
**Not like:** Mango Cannabis, Eaze, Top Crop's "premier / exceptional / widest selection"

## Photography direction (TBD — placeholder behavior)

Until real photography lands, the site uses:
- Emoji + colorful gradient backdrops on Featured Drops cards
- Solid-color leaf placeholder squares on team avatars
- Faux-grid map mock with animated pins for the Coverage map
- Lot-number glass card on FarmStory (no real plant photo yet)

When real photography arrives, use:
- **Macro flower shots** — tight crops on trichomes, sticky bud detail
- **Hand-trim moments** — human hands working the plant
- **Driver-at-the-door shots** — discreet packaging, real driver, real customer
- **Cultivation environment** — clean indoor grow rooms (Don Verde provenance)
- **Flat-lays** — single product against neutral or leaf-tinted background

Avoid: stock photo "people smiling at laptops," cliché bong/joint-in-hand, anything that could read as appealing to minors.

## Component inventory

These are the named primitives. If you find yourself building a new section, check first whether you can compose with these.

- `<Reveal delay={n}>` — scroll-in fade+slide animation
- `<TiltCard>` — 3D tilt + glare on hover
- `<Marquee speed="slow|normal|fast" reverse>` — infinite-scroll ticker
- `<PageHeader eyebrow title description>` — sub-page hero
- `<Logo invert>` — wordmark, optional inverted color
- `<Nav>` — sticky glass nav with mobile drawer
- `<Footer>` — global footer
- `<AgeGate>` — 21+ gate, localStorage-cached
- JSON-LD: `<LocalBusinessJsonLd>`, `<WebsiteJsonLd>`, `<FaqJsonLd>`, `<BreadcrumbJsonLd>`

## Reusing this for the other site Drew is building

If you want to extend this palette + voice + utilities to a sister brand or a different vertical:

1. **Copy** `tailwind.config.ts` (the `colors` block) and `app/globals.css` `@layer utilities` block
2. **Swap** the leaf-500 brand color if the new brand uses a different primary
3. **Keep** the gold accent if the brand wants a "premium accent" — gold works in most categories that aren't already gold-saturated
4. **Keep** the surface-utility pattern. Section bg colors as named utilities is what made our 3 palette pivots cheap
5. **Keep** the voice rules, adapt the brand name + tagline

The system is the asset. The colors are the easy part.

