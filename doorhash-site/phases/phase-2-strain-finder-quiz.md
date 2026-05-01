# Phase 2 — Strain finder quiz

**Status:** 📋 Spec ready
**Effort:** ~4 engineering days (1 week with polish)
**Owner:** TBD
**Depends on:** Phase 1 shipped (Klaviyo wired) so quiz answers can flow into segments

---

## Goal

Ship an interactive 4-5 question quiz at `/quiz` (and embedded on `/`) that asks "How do you want to feel?" and returns a **personalized cart of 6 products** drawn from the live menu. Captures email + creates a Klaviyo segment per "vibe."

## Why

From the [Top 5 plays roadmap](../doorhash-top-5-plays.pdf): *"Captures email, segments customers, addictive on social. Top Crop is a price wall; doorhash becomes a concierge."*

Top Crop and Mango both lead with menu/price. doorhash leads with **product matching** — same way Allbirds, Glossier, Stitch Fix opened up their categories. Massive social shareability ("I got matched to Tropic Thunder, what'd you get?").

## Acceptance criteria

- [ ] Live at `/quiz` with full-screen multi-step UI (one question per screen)
- [ ] Embedded entry point on homepage as a CTA section ("Not sure what to order? → Take the 60-second quiz")
- [ ] **4-5 questions total**, each with 4 visual options (icon + label):
  1. *How do you want to feel?* → Relaxed / Energized / Creative / Sleepy / Pain-free
  2. *When are you using it?* → Weeknight wind-down / Weekend hang / Active outdoors / Right before bed
  3. *Experience level?* → Curious newcomer / Casual / Daily / Seasoned
  4. *Format preference?* → Flower / Vape / Edible / Concentrate / Mix
  5. *Budget per order?* → Under $50 / $50-100 / $100-200 / $200+
- [ ] **Email gate** before showing results — single email input ("Send my matches to my inbox") — writes to Klaviyo with quiz answers as profile properties + tag (e.g., `Quiz — Vibe: Relaxed Weeknight Casual Vape`)
- [ ] **Results screen** shows 6 personalized products with:
  - Product card (consistent with Featured Drops styling)
  - "Why this for you" one-line explanation per product
  - "Add all to cart" → opens `/menu` with these products surfaced
  - Social share button ("Share my matches" — image + text)
- [ ] **Smooth transitions** between questions (Framer Motion page-style)
- [ ] **Progress indicator** (subtle dots or progress bar)
- [ ] **Skip / back** affordances
- [ ] **Mobile-first design** — questions readable, options thumb-tappable
- [ ] **Saved state** — if user navigates away mid-quiz, localStorage preserves progress
- [ ] Klaviyo segment per quiz vibe (e.g., `Vibe — Relaxed`, `Vibe — Energized`) — drives Phase 1 flows

## Out of scope

- ❌ Personalized homepage ("welcome back, here's your vibe-of-the-week") — Phase 7+
- ❌ Quiz result → checkout in one click (Dutchie iframe limitation, defer to Jane Roots phase)
- ❌ Real-time inventory check on results screen (use the Phase 3 strain library for this)
- ❌ A/B test framework (PostHog comes later)
- ❌ Auto-generating product matches via LLM (use deterministic mapping table for v1; AI matching is Phase 8+)
- ❌ Multiple quiz variants (just the one in v1)

## Dependencies

| Dependency | Owner | Status |
|---|---|---|
| Klaviyo integration shipped | Phase 1 | Blocking |
| Decision matrix (mapping quiz answers → product picks) | Marketing + budtender input | This phase, day 1 |
| Real product photography or polished icons | Brand team | Use emoji + gradients placeholder if not ready |
| Featured product list with metadata (effects, terpenes, format, price tier) | Already in `lib/products.ts` | Expand for matching |

## Technical approach

### File structure

```
doorhash-site/
├── app/
│   └── quiz/
│       ├── page.tsx                 # NEW — quiz container
│       ├── results/page.tsx         # NEW — results page (or in-place state)
│       └── layout.tsx               # NEW — full-screen quiz layout (no nav/footer)
├── components/
│   └── quiz/
│       ├── QuizContainer.tsx        # NEW — state machine
│       ├── QuestionScreen.tsx       # NEW — one question UI
│       ├── ResultsScreen.tsx        # NEW — 6-product display
│       └── ProgressBar.tsx          # NEW
├── lib/
│   ├── quiz/
│   │   ├── questions.ts             # NEW — question definitions
│   │   ├── matcher.ts               # NEW — answer → product matching
│   │   └── share.ts                 # NEW — generate social share image
│   └── products.ts                  # UPDATE — add matching tags (effects, format, tier)
```

### Matching strategy

Deterministic rule-based matcher in `lib/quiz/matcher.ts`. Each product gets tagged with:
- `effects: string[]` — ["relaxed", "creative", "sleepy", ...]
- `useCase: string[]` — ["weeknight", "active", "bedtime"]
- `experienceLevel: "newcomer" | "casual" | "daily" | "seasoned"`
- `format: "flower" | "vape" | "edible" | "concentrate"`
- `priceTier: 1-4`

Matcher scores each product against the user's answers, returns top 6 with score reason ("Matched on: relaxed + weeknight + flower + budget").

For LLM-driven matching: defer to Phase 8+. Deterministic is good enough for v1 and ships in days, not weeks.

### Klaviyo integration

After email capture:
```ts
klaviyo.identify({
  $email: email,
  quiz_vibe: vibe,            // "Relaxed"
  quiz_use_case: useCase,
  quiz_experience: experience,
  quiz_format_pref: format,
  quiz_price_tier: priceTier,
})
klaviyo.track('Quiz Completed', {
  matched_products: products.map(p => p.id),
})
```

This drives Phase 1's drip flows — e.g., "Vibe — Relaxed" gets weekend chill product drops, "Vibe — Energized" gets sativa drop alerts.

## Risks

- **Quiz drop-off mid-flow** — mitigated by saving state to localStorage so users can come back
- **Email gate kills conversion** — mitigated by making email gate skippable ("See results without saving") but only after question 4. Capture intent before friction.
- **Matching feels generic** — mitigated by including the "Why this for you" explanation per match (humanizes the deterministic logic)
- **Mobile fatigue** — questions need to be visually distinct + fast to answer. Test on actual phones before shipping.

## Effort breakdown

| Task | Days |
|---|---|
| Question copywriting + visual option icons | 0.5 |
| QuizContainer state machine + transitions | 1.0 |
| Question + Progress + Results screen components | 1.5 |
| `matcher.ts` + product tagging in `lib/products.ts` | 0.5 |
| Klaviyo integration + segment setup | 0.25 |
| Social share image generation (canvas or vercel/og) | 0.5 |
| Mobile QA + polish | 0.5 |
| **Total** | **~4-5 days** |

## Success metrics (4 weeks post-launch)

| Metric | Target | How measured |
|---|---|---|
| Quiz starts (homepage CTA → /quiz) | 500/wk | Plausible/GA |
| Completion rate | ≥60% | Analytics funnel |
| Email capture (of completers) | ≥75% | Klaviyo |
| Quiz completers → first order | ≥20% | Klaviyo + Dutchie |
| Social shares from results screen | 50/wk | Share-button click events |
| Repeat-order rate of quiz takers vs non-takers | +30% | Cohort analysis |

## Done state

When this phase ships:
- `/quiz` is live, beautiful, fast, mobile-first
- Homepage has a quiz CTA section above-the-fold or near-the-top
- Klaviyo has 5+ vibe-based segments populated
- Phase 1 flows now segment-personalize by vibe
- README updates: phase status flips to ✅

