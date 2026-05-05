# Phases

Machine-readable specs for GSD's `/gsd-discuss-phase` → `/gsd-plan-phase` → `/gsd-execute-phase` loop. Each file is a self-contained brief that an LLM can plan and execute against without re-reading the chat history.

## Active sequence

| # | Phase | Status | Effort | Revenue impact |
|---|---|---|---|---|
| 0 | [Site scaffold + brand lock](../README.md) | ✅ Shipped | — | — |
| 1 | [SMS + Klaviyo](./phase-1-sms-klaviyo.md) | 📋 Spec ready | 1 wk | 🟢🟢🟢 (highest) |
| 2 | [Strain finder quiz](./phase-2-strain-finder-quiz.md) | 📋 Spec ready | 1 wk | 🟢🟢 |
| 3 | [Strain library + programmatic SEO](./phase-3-strain-library-seo.md) | 📋 Spec ready | 2-3 wk | 🟢🟢 (compounding) |
| 4 | [Provenance receipts](./phase-4-provenance-receipts.md) | 📋 Spec ready | 2 wk | 🟡 (brand) |
| 5 | [Live delivery tracker](./phase-5-live-delivery-tracker.md) | 📋 Spec ready | 3-4 wk | 🟢🟢🟢 (viral) |

## Status legend

- 📋 **Spec ready** — brief written, hasn't been planned/executed yet
- 🟢 **In flight** — currently being built (GSD has an active workspace)
- ✅ **Shipped** — deployed, in production
- ⏸ **Paused** — partial work, can be resumed via `/gsd-resume-work`

## Deferred (small, low-risk, do-when-you-have-time)

These are scoped enough to skip a full phase spec but worth tracking so they don't get lost:

- **Don Walker pre-rolls as menu sub-category** — Don Verde Farms ships an infused pre-roll sub-brand called Don Walker. Worth surfacing as its own category card on `/menu` and a tile slot in `FeaturedDrops`. Effort: ~2 hours.
- **Cross-brand JSON-LD graph linkage** — link our `Organization.parentOrganization.@id` to Don Verde's `https://donverdefarms.com/#org` so AI engines see the same entity graph from either site. Effort: ~15 min.
- **Founding date + license number on Organization schema** — once we have the official NM dispensary license number, populate `lib/site.ts` and the `Organization` JSON-LD. Effort: ~10 min.
- **Replace inline `Logo.tsx` SVG with official asset** — currently an approximation; swap when brand team delivers vector file. Effort: ~5 min.
- **Real photography swap** — once product/cultivation/team photos exist, replace emoji placeholders in `FeaturedDrops`, `FarmStory`, and `/about` team avatars. Effort: ~1 day.

## How to use

In a Claude Code session inside `doorhash-site/`:

```
/gsd-discuss-phase phases/phase-1-sms-klaviyo.md
   ↓ refines spec, asks clarifying questions
/gsd-plan-phase
   ↓ produces step-by-step execution plan
/gsd-execute-phase
   ↓ ships the work, branch + commits + PR
/gsd-ship
   ↓ closes the phase, updates this README's status table
```

## Spec template

Each phase file follows:

1. **Goal** — one sentence
2. **Why** — strategic context, link to the [Top 5 PDF](../doorhash-top-5-plays.pdf)
3. **Acceptance criteria** — checklist of "this is done when…"
4. **Out of scope** — explicit "this phase does NOT include…"
5. **Dependencies** — what must exist before starting
6. **Technical approach** — high-level architecture, files to touch, libs to add
7. **Risks** — known unknowns
8. **Effort estimate** — engineering days
9. **Success metrics** — how we measure post-launch

