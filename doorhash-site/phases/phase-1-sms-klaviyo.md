# Phase 1 — SMS + Klaviyo automation

**Status:** 📋 Spec ready
**Effort:** ~5 engineering days (1 week)
**Owner:** TBD
**Depends on:** Klaviyo account provisioned, NM cannabis SMS compliance attorney sign-off

---

## Goal

Wire up Klaviyo for **email + SMS marketing automation** so every customer email and phone collected via the doorhash site flows into segmented Klaviyo lists with abandoned-cart, drop-alert, restock, and birthday flows running automatically.

## Why

From the [Top 5 plays roadmap](../doorhash-top-5-plays.pdf): *"Repeat order rate roughly 2x at cannabis brands that run SMS automation well. Highest revenue lift per dollar — period."*

This is the fastest revenue lift in the roadmap. Lower engineering effort than the strain quiz, higher dollar impact. Ships first.

## Acceptance criteria

- [ ] Klaviyo account configured with **email + SMS subscriptions enabled** (cannabis-friendly profile signed)
- [ ] **Newsletter signup** on `/locations` (existing email input) writes to Klaviyo `Las Cruces — Soft Launch List` segment
- [ ] **Hash Pass signup** on `/rewards` collects email + phone, writes to Klaviyo with `Hash Pass — Tier: Hash` tag
- [ ] **AgeGate** captures email opt-in (optional checkbox) on first visit, writes to `Site Visitor — Pre-Customer` segment if checked
- [ ] **Footer** has email-capture form with single-line CTA ("Get drops + deals — early")
- [ ] **Klaviyo flows live and triggering:**
  - **Welcome flow** (3-email + 1-SMS) — fires on first signup, includes Don Verde origin story + first-time 25% off code
  - **Abandoned-cart flow** (Dutchie webhook → Klaviyo) — *requires Dutchie Plus or webhook proxy*
  - **Birthday flow** (1-SMS + 1-email) — fires 3 days before birthday, $25 off code
  - **VIP drop alert** (manual broadcast template) — for Hash+ and VIP segments
  - **Win-back flow** — fires at 60 days inactive, free pre-roll offer
- [ ] **Compliance:** every SMS opt-in includes the legally-required language ("By providing your number, you agree to receive recurring marketing texts. Reply STOP to opt out, HELP for help. Msg & data rates may apply.")
- [ ] **Double opt-in for SMS** (TCPA requirement)
- [ ] **Unsubscribe** links work in every email; STOP keyword works in SMS
- [ ] All forms write via Klaviyo's **client-side `klaviyo.js`** (no server-side API key in client) — see Technical approach
- [ ] Server-side API key only used for backend operations (e.g., piping Dutchie order data into Klaviyo as metric events)

## Out of scope

- ❌ Push notifications (Phase 2+ when we add PWA)
- ❌ Native iOS/Android app SMS (no apps yet)
- ❌ Replacing Klaviyo with Alpine IQ or Springbig (revisit at Phase 7+)
- ❌ Building our own segmentation UI (use Klaviyo's)
- ❌ Migrating existing customer list (no existing list — this is greenfield)
- ❌ Designing Klaviyo email templates beyond minimal brand-matched HTML (proper template design is a separate visual-design phase)

## Dependencies

| Dependency | Owner | Status |
|---|---|---|
| Klaviyo account (with cannabis profile approved) | Mike / Drew | TBD — typically 24-48hr approval |
| `NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY` (client-side write) | Klaviyo onboarding | TBD |
| `KLAVIYO_PRIVATE_API_KEY` (server-side, store in Netlify env) | Klaviyo onboarding | TBD |
| NM cannabis SMS compliance language reviewed | NM cannabis attorney | TBD |
| Sample SMS messages reviewed for "no claims about effects, no targeting minors" rules | NM cannabis attorney | TBD |
| Dutchie order webhooks (optional, for abandoned-cart + post-purchase flows) | Dutchie Plus tier | $$$ — defer if Dutchie embed only |
| Brand-aligned email templates (HTML) | This phase | Build |

## Technical approach

### File structure

```
doorhash-site/
├── lib/
│   └── klaviyo.ts                   # NEW — client wrapper
├── components/
│   └── ui/
│       ├── EmailCaptureForm.tsx     # NEW — reusable
│       └── HashPassSignupForm.tsx   # NEW — captures email + phone + tier
├── app/
│   ├── api/
│   │   └── klaviyo/
│   │       ├── subscribe/route.ts   # NEW — server-side proxy if needed
│   │       └── event/route.ts       # NEW — for Dutchie webhook → Klaviyo metric events
│   └── layout.tsx                   # UPDATE — inject klaviyo.js script
└── lib/
    └── site.ts                      # UPDATE — Klaviyo config block
```

### Implementation strategy

1. **Inject Klaviyo script** in `app/layout.tsx` via `<Script>` from `next/script` with `strategy="afterInteractive"`. Public key in `NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY`.
2. **Build `EmailCaptureForm`** — single-input + button, handles loading state, success state, error state. Uses `klaviyo.identify()` + `klaviyo.track()` client-side.
3. **Replace existing forms** in `/locations`, `/rewards`, `<Footer>` with `<EmailCaptureForm>` + `<HashPassSignupForm>`.
4. **AgeGate** gets an optional opt-in checkbox; if checked, fires `klaviyo.identify({ $email: email, source: 'age_gate' })`.
5. **Server-side route** (`/api/klaviyo/event/route.ts`) for piping Dutchie order events to Klaviyo. Stub for now; wire up when Dutchie webhooks are available.
6. **Klaviyo flows** built in Klaviyo UI by marketing — engineering provides the events/properties they need (e.g., `Order Placed`, `Cart Abandoned`, `Hash Pass Tier Changed`).

### Compliance checklist (don't ship without)

- [ ] SMS double opt-in flow tested
- [ ] STOP / HELP keywords confirmed working
- [ ] Privacy policy + Terms updated to mention Klaviyo, SMS, marketing emails
- [ ] All SMS messages reviewed for: no health claims, no targeting <21, no "free weed" language
- [ ] Email footer includes physical address (TCPA + CAN-SPAM)

## Risks

- **Klaviyo cannabis approval delay** — could take 24-48hrs or be denied. Backup: Postscript (SMS) + a different ESP. Revisit if denied.
- **Dutchie webhooks gated behind paid tier** — if we can't afford Dutchie Plus, abandoned-cart flow needs a creative workaround (e.g., periodic polling of Dutchie API at the iframe level, which is unreliable).
- **NM SMS rules stricter than expected** — possible we need state-specific opt-in language beyond TCPA defaults. Mitigated by attorney review.
- **Spam complaints / deliverability** — protect domain reputation by warming up sender slowly, not blasting all signups on day 1.

## Effort breakdown

| Task | Days |
|---|---|
| Klaviyo account setup + cannabis profile + script integration | 0.5 |
| `EmailCaptureForm` + `HashPassSignupForm` components + form swap on 3 surfaces | 1.0 |
| API routes for server-side events + Dutchie webhook stub | 1.0 |
| Klaviyo flow templates (welcome, abandoned cart, birthday, VIP, win-back) | 1.5 |
| Compliance review + double opt-in flow + STOP/HELP testing | 0.5 |
| QA across forms, segments, flows, mobile | 0.5 |
| **Total** | **~5 days** |

## Success metrics (4 weeks post-launch)

| Metric | Target | How measured |
|---|---|---|
| Email list growth | 200+ subscribers | Klaviyo dashboard |
| SMS opt-in rate (of email signups) | ≥40% | Klaviyo |
| Welcome flow open rate | ≥50% | Klaviyo |
| Welcome flow → first order conversion | ≥15% | Klaviyo + Dutchie reconciliation |
| Repeat order rate vs pre-launch baseline | +50% (target +100% by month 3) | Dutchie + Klaviyo |
| Abandoned cart recovery (if Dutchie Plus active) | ≥10% recovery rate | Klaviyo |

## Done state

When this phase ships:
- Every form on the site captures email + (optionally) phone into Klaviyo
- 5 automated flows are live and triggering
- Compliance language is in production
- Marketing has dashboard access + can send VIP broadcasts
- README updates: phase status flips to ✅, Phase 2 becomes the new active phase

