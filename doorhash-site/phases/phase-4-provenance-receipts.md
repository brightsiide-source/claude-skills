# Phase 4 — Provenance receipts

**Status:** 📋 Spec ready
**Effort:** ~10 engineering days (2 weeks)
**Owner:** TBD
**Depends on:** Phase 3 shipped (strain library has the lot/cultivation metadata we'll print on receipts)

---

## Goal

Every doorhash flower order ships with a **digital provenance receipt** — a printable, shareable PDF + web page showing exactly where the flower came from, when it was harvested, who hand-trimmed it, and how long it cured. Tied to a real Lot # from Don Verde Farms cultivation records.

## Why

From the [Top 5 plays roadmap](../doorhash-top-5-plays.pdf): *"Nobody else can do this because nobody else owns their farm. The whole Don Verde wedge made tangible."*

The single most defensible differentiator in the doorhash arsenal. Mango doesn't grow. Top Crop sources from various cultivators. **doorhash is the only NM brand that can ship "seed-to-door provenance" because it owns the farm.** This phase makes that abstract claim into a physical artifact every customer experiences.

It's also a viral asset — customers share their receipts on Instagram ("look at the cultivation paperwork that came with my weed lol"), which is unprintable advertising.

## Acceptance criteria

- [ ] **Lot data model** — every Don Verde batch has a complete record: lot #, strain, harvest date, cure days, hand-trimmer name, cultivation notes, lab COA link
- [ ] **Per-order receipt** — when a customer orders a Don Verde flower product, they get a unique URL `/receipt/[orderId]` with their personalized provenance
- [ ] **Receipt content:**
  - Header: doorhash logo, order # (anonymized), customer first name only
  - Per-product block: strain name, lot #, big harvest-date "12 days ago" timestamp, cure days, hand-trimmer name + photo (where consent given)
  - Cultivation note: 1-2 sentences from the grower about this specific batch
  - Lab COA link/embed (THC %, terpenes, no contaminants)
  - Footer: Don Verde Farms branding, "grown indoor in Southern New Mexico"
- [ ] **Print-ready PDF version** — generates on demand via `/api/receipt/[orderId]/pdf`. Letter-sized, brand-aligned, prints cleanly on standard paper.
- [ ] **Email delivery** — receipt link auto-sent via Klaviyo "Order Delivered" trigger (post-Dutchie webhook)
- [ ] **Shareable** — Twitter/Instagram share buttons with auto-generated OG image showing key provenance details (anonymized — no order #, no name)
- [ ] **Save to wallet** — Apple Wallet / Google Wallet pass for the receipt (nice-to-have if cheap)
- [ ] **Archive page** — logged-in customers can see all past receipts at `/account/receipts`
- [ ] **Don Verde brand consistency** — receipts feel like a craft product certificate, not a CVS receipt
- [ ] **No PII leakage in shareable URLs** — anonymized public version + private detailed version

## Out of scope

- ❌ Account/login system (use email-magic-link or signed URL for v1)
- ❌ Real-time grow camera footage (Phase 8+ moonshot)
- ❌ Blockchain "NFT receipt" gimmick (no, just no)
- ❌ Per-product video stories (cool but Phase 7+)
- ❌ Auto-generating cultivation notes via LLM (real grower voice or nothing)
- ❌ Receipts for partner brand products (Don Verde only — those have provenance to claim)

## Dependencies

| Dependency | Owner | Status |
|---|---|---|
| **Cultivation data integration** — Don Verde's grow records → API or CSV export | Don Verde Farms ops | Needs internal pipeline. Could be manual CSV update for v1. |
| **Hand-trimmer photo + consent** | HR / Don Verde team | Sensitive — get written consent. Default to first-name only if no photo consent. |
| **Lab COA URLs per batch** | Compliance team | Already required for compliance — likely already exists |
| **Dutchie order webhook** (or polling) — for "order delivered" trigger | Dutchie Plus tier | $$$ — defer email delivery to manual until tier unlocks |
| **PDF generation infrastructure** | This phase | Use `@react-pdf/renderer` or Puppeteer-based service |
| **Strain library shipped** | Phase 3 | Provides strain metadata that powers receipts |

## Technical approach

### File structure

```
doorhash-site/
├── app/
│   ├── receipt/
│   │   └── [orderId]/page.tsx              # Public receipt page (signed URL)
│   ├── account/
│   │   └── receipts/page.tsx               # Customer's archive (auth-gated)
│   └── api/
│       └── receipt/
│           ├── [orderId]/route.ts          # JSON data
│           ├── [orderId]/pdf/route.ts      # PDF generation
│           └── [orderId]/og/route.ts       # OG image for social shares
├── lib/
│   ├── receipts/
│   │   ├── types.ts
│   │   ├── load.ts                         # join order + lot data
│   │   ├── pdf.ts                          # @react-pdf/renderer template
│   │   └── share.ts                        # OG image + share URL signing
│   └── lots/
│       ├── data.ts                         # lot # → cultivation metadata
│       └── load.ts
├── content/
│   └── lots/                               # MDX or JSON, one per batch
│       ├── DV-04-26.mdx
│       └── ...
└── components/
    └── receipt/
        ├── ReceiptHero.tsx
        ├── LotProvenance.tsx
        ├── HandTrimmerCard.tsx
        ├── COALink.tsx
        └── ShareButtons.tsx
```

### Lot data model

```ts
// lib/lots/types.ts
export type Lot = {
  id: string;                  // "DV-04-26"
  strainSlug: string;          // → /strains/tropic-thunder
  harvestDate: string;         // ISO date
  cureDays: number;            // 21
  handTrimmedBy: {
    name: string;              // "Maria"
    photoUrl?: string;         // optional, consent-gated
    quote?: string;            // 1-line cultivation note
  };
  growType: "indoor";          // doorhash is indoor only
  facility: "Don Verde Farms — Southern NM";
  thcPct: number;
  topTerpenes: string[];
  coaUrl: string;              // public lab cert URL
  growerNote: string;          // 1-2 sentences, real grower voice
  packagingDate: string;
};
```

### Receipt URL signing

Public receipts at `/receipt/[orderId]?token=xxx` — token is HMAC-signed with order ID + customer email hash. Prevents URL enumeration. Anonymized info only on the public version (no real names, no full order amounts).

Private archive at `/account/receipts` requires email magic-link auth.

### PDF generation

Use `@react-pdf/renderer` for clean, brand-aligned PDFs. Avoid Puppeteer in Netlify functions (cold-start hell). Generate inline; cache result for 1hr.

### Klaviyo wire-up

When Dutchie order webhook fires "Order Delivered":
1. Look up lot data for each Don Verde flower product in the order
2. Generate receipt URL
3. Trigger Klaviyo "Receipt Email" flow with `{{ event.receipt_url }}` merge tag

Email subject: "{{ first_name }}, here's where your flower came from."

## Risks

- **Cultivation data pipeline doesn't exist yet** — Don Verde may not currently track lot → trimmer → cure days digitally. Mitigation: start with a simple CSV/Airtable that the cultivation lead updates daily. Build full integration later.
- **Hand-trimmer consent + privacy** — sensitive. Default to first-name only. Photo only with written consent. Have legal review the consent form.
- **Lot # mapping** — Dutchie may not pass lot # in order data. Mitigation: assume each strain has a "current lot" mapping that updates when batches change. Ops team owns this.
- **PDF design effort** — making a beautiful, print-ready PDF is 2x as hard as it sounds. Budget time for it.
- **Marketing claims compliance** — anything we claim about cultivation must be verifiable. NM compliance requires substantiation. Don't say "best-in-class" or imply medical efficacy.

## Effort breakdown

| Task | Days |
|---|---|
| Lot data model + content pipeline (CSV → JSON sync) | 1.5 |
| Receipt page UI + components | 2.0 |
| PDF template (@react-pdf/renderer) | 2.0 |
| OG image generation (per-receipt social share) | 0.5 |
| URL signing + auth flow for archive | 1.0 |
| Dutchie webhook → Klaviyo trigger pipeline | 1.5 |
| QA across desktop/mobile/print | 0.5 |
| First batch of real lot data + trimmer consent | 1.0 |
| **Total** | **~10 days** |

## Success metrics (8 weeks post-launch)

| Metric | Target | How measured |
|---|---|---|
| Receipts viewed (open rate) | ≥60% of orders | Analytics |
| Social shares from receipts | 50/wk | Share button clicks |
| Press mentions of provenance receipt | 1+ feature in cannabis trade press | Manual |
| Customer-survey unaided recall of "doorhash = farm-to-door" | ≥40% | Post-purchase survey |
| Repeat-order rate of customers who viewed receipt vs not | +25% | Cohort analysis |

## Done state

When this phase ships:
- Every Don Verde flower order ships with a unique provenance receipt
- Receipts are beautiful on web, printable as PDF, shareable on social
- Hand-trimmer photo + name shows when consent is given
- Klaviyo "Order Delivered" flow sends receipt to every customer
- Receipt becomes a permanent doorhash brand artifact (mentioned in About page, in PR, in marketing)
- README updates: phase status flips to ✅

