# Phase 5 — Live delivery tracker

**Status:** 📋 Spec ready
**Effort:** ~20 engineering days (3-4 weeks)
**Owner:** TBD
**Depends on:** Phase 1 (Klaviyo for SMS notifications), Phase 4 (provenance receipts wire pattern), and Dutchie Plus tier OR Jane Roots migration

---

## Goal

Ship a **Domino's-pizza-tracker for cannabis** — every order gets a real-time tracking page at `/track/[orderId]` showing driver location on a map, ETA countdown, driver name + photo, order status timeline. Pushed to customers via SMS the moment a driver picks up their order.

## Why

From the [Top 5 plays roadmap](../doorhash-top-5-plays.pdf): *"Goes viral on social. Mango has an app for this — we'd ship it on the open web with no install required."*

This is the **biggest-wow play** in the roadmap. Expect to be screenshotted, posted, and shared. Mango's app users have a tracker; doorhash will have one **on the open web with zero install friction.** That's the kind of difference that turns a category brand into a cult brand.

It's also the highest engineering lift, which is why it ships **last** in the sequence — by the time we're here, we have email/SMS infrastructure (Phase 1), customer behavior data (Phase 2), brand-defining content (Phase 3), and operational provenance pipes (Phase 4) to back it up.

## Acceptance criteria

- [ ] **Real-time tracker page** at `/track/[orderId]` with:
  - Map view (Mapbox or Google Maps) — driver pin moves in real time toward customer pin
  - ETA countdown (live-updating, e.g., "ETA: 12 min")
  - Order status timeline: Confirmed → Preparing → Driver assigned → On the way → Delivered
  - Driver card: name, photo, "Marco — Las Cruces team since 2025"
  - Order summary: items, total, lot #s (links to provenance receipts)
  - "Contact driver" button (phone or in-app message)
  - Subtle animation on each status step
- [ ] **SMS push** when driver picks up order: "Your doorhash order is on the way! Track Marco live: {url}" (Klaviyo flow + webhook from dispatch)
- [ ] **No login required** — signed URL with order-token + customer phone hash
- [ ] **Mobile-first** — most users open from SMS link on phone
- [ ] **Driver app or driver dashboard** (or 3rd-party integration) feeds real-time location:
  - Option A: Build minimal driver web app (driver opens URL on phone, navigator.geolocation streams)
  - Option B: Integrate **Onfleet** or **Tookan** ($300-1500/mo) — they handle dispatch + driver app + customer tracker, we build the customer-facing UI on their API
  - **Decision: integrate Onfleet** — proven, cannabis-friendly, half the build time
- [ ] **Realtime location updates** via WebSocket or Server-Sent Events (poll every 10s as fallback)
- [ ] **Privacy:** location data never persisted past delivery completion. Driver is identifiable to customer only during their active delivery.
- [ ] **Status webhook from Dutchie** (Plus tier) or Jane (Roots) → updates tracker state
- [ ] **Tracker becomes part of the order email** — "View your delivery in real time: {url}"
- [ ] **Post-delivery:** tracker page becomes a delivery summary (no live map) with link to provenance receipt
- [ ] **Branded loading + animation** — leaf-mesh backdrop, driver pin uses doorhash leaf-500 marker, smooth car-icon animation along route

## Out of scope

- ❌ Native iOS/Android driver app (use web-app or Onfleet's app)
- ❌ Predictive ETA via ML (use Onfleet's built-in or simple haversine-distance estimate)
- ❌ Customer-driver chat (just call/SMS)
- ❌ Live cooking-cam style "watching your order being packed" (cool but Phase 8+)
- ❌ Multi-stop optimization for batched deliveries (Onfleet handles this)
- ❌ Customer rating of driver post-delivery (Phase 6+)
- ❌ Tip flow (handled in Dutchie/Jane checkout)

## Dependencies

| Dependency | Owner | Status |
|---|---|---|
| **Onfleet account** + cannabis-friendly approval | Ops | $300-1500/mo, ~1 week setup |
| **Dispatch process integrated with Onfleet** | Ops | Drivers must use Onfleet driver app |
| **Dutchie Plus tier OR Jane Roots migration** — for order webhooks | Phase 6 prereq | Major dependency |
| **Mapbox account** (or Google Maps) | This phase | $0-200/mo depending on volume |
| **Driver photos + consent** | HR | Sensitive, like Phase 4 |
| **Klaviyo SMS infrastructure** | Phase 1 | Must be live |
| **NM cannabis delivery tracking compliance** | Attorney | Verify location-tracking is allowed under NM rules |

## Technical approach

### Architecture

```
[Dutchie/Jane]              [Onfleet]              [doorhash]
  Order placed   ────────►  Task created  ────────► /track URL signed
  Order paid     ────────►  Driver assigned ──────► SMS sent (Klaviyo)
                            Driver location  ──────► WebSocket → /track
                            Delivered       ──────► Tracker → summary mode
```

### File structure

```
doorhash-site/
├── app/
│   ├── track/
│   │   └── [orderId]/page.tsx               # Public tracker
│   ├── api/
│   │   ├── track/
│   │   │   └── [orderId]/route.ts           # Initial state + token verify
│   │   └── webhooks/
│   │       ├── onfleet/route.ts             # Onfleet → our DB
│   │       └── dutchie/route.ts             # Dutchie → our DB
│   └── ws/                                  # if using SSE/WebSocket
├── lib/
│   ├── tracking/
│   │   ├── types.ts
│   │   ├── onfleet.ts                       # Onfleet API client
│   │   ├── state.ts                         # Order state machine
│   │   └── token.ts                         # URL signing
│   └── realtime/
│       └── channel.ts                       # WebSocket / SSE wrapper
├── components/
│   └── track/
│       ├── DeliveryMap.tsx                  # Mapbox/Google Maps wrapper
│       ├── DriverCard.tsx
│       ├── StatusTimeline.tsx
│       ├── ETACountdown.tsx
│       └── OrderSummary.tsx
└── workers/                                  # Netlify Functions / Edge
    └── tracker-relay.ts                     # ws relay
```

### Realtime strategy

- **Server-Sent Events (SSE)** for one-way driver-position pushes — simpler than WebSocket, works through HTTP/2
- Fallback to **polling at 10s intervals** if SSE not supported
- Use Netlify Edge Functions (or Vercel) for the SSE handler — keep latency low

### Order state machine

```
[order_placed] → [order_paid] → [preparing] → [driver_assigned]
  → [picked_up] → [in_transit] → [arriving] → [delivered]
```

Each state transition triggers UI animation + optional SMS. State is persisted in Postgres or KV (Netlify Blobs / Upstash Redis).

### Tracker URL pattern

`/track/[orderId]?t={signedToken}` — token is HMAC-signed with `orderId + customerPhoneHash + expiresAt`. 24hr TTL after delivery.

### Privacy rules

- Driver location only streamed to verified token holders
- Location data deleted from our system 24hrs after delivery
- Driver name + photo only visible during active delivery; redacted in archive
- No permanent driver-tracking dashboard

## Risks

- **Engineering lift is real** — this is a 3-4 week phase, plus ops integration. Don't ship if Onfleet integration isn't solid first.
- **Onfleet cannabis approval** — they're known to work with cannabis but verify before signing.
- **Driver UX** — drivers must religiously use Onfleet driver app. If they forget, the tracker breaks. Build in fallback: "Order is on the way" generic state when GPS unavailable.
- **Real-time infra costs** — SSE connections aren't free. Budget for 1k concurrent during peak.
- **Compliance** — NM may require specific privacy disclosures around location tracking. Attorney review mandatory.
- **Battery drain on driver phones** — continuous GPS streaming kills batteries. Onfleet handles this gracefully; building our own would not.

## Effort breakdown

| Task | Days |
|---|---|
| Onfleet account setup + driver onboarding (ops) | 2.0 (parallel) |
| Onfleet API integration + webhook handlers | 3.0 |
| Order state machine + persistence (Postgres / Upstash) | 2.0 |
| Realtime channel (SSE) + polling fallback | 2.0 |
| Tracker page UI + components | 4.0 |
| Mapbox integration + driver-marker animation | 2.0 |
| Klaviyo SMS trigger flow + email integration | 1.5 |
| URL signing + token verification | 1.0 |
| QA across mobile devices, network conditions | 1.5 |
| Compliance review + privacy copy | 1.0 |
| **Total** | **~20 days** |

## Success metrics (8 weeks post-launch)

| Metric | Target | How measured |
|---|---|---|
| Tracker page open rate (per order) | ≥85% | Analytics |
| Average tracker session duration | ≥3 min | Analytics |
| SMS click-through to tracker | ≥75% | Klaviyo + UTM |
| Social shares of tracker | 30+/wk | Manual + share buttons |
| Press mentions ("doorhash has a Domino's-style tracker") | 1+ feature | Manual |
| NPS lift after delivery vs pre-tracker baseline | +10 points | Post-delivery survey |
| Customer support tickets re: "where's my order" | -50% | Support tool |

## Done state

When this phase ships:
- Every order gets an SMS-pushed tracker URL within seconds of driver pickup
- Tracker is beautiful, fast, mobile-first, brand-immersive
- Customers can see driver photo, ETA, and live position
- "Where's my order?" support tickets drop substantially
- Tracker becomes a feature in PR/marketing
- Customer NPS measurably improves
- README updates: phase status flips to ✅, Phase 6 (Jane Roots migration) becomes the new active phase

