# RESimpli → Clever Leads Status Mapping Reference

## Overview

This reference documents the complete mapping between RESimpli CRM lead statuses and Clever Leads (Lead Partnership) update types, including API payload schemas for each update type.

---

## Time-Based Decision Logic

The sync uses lead age (days since `Lead Created Date`) to determine whether a lead is still active or should be marked as lost.

### Thresholds

| RESimpli Status | Active Window | Active → | Stale → |
|---|---|---|---|
| Attempting Contact | ≤10 days | `reached_out` | `lost` |
| Contact Made - Follow Up | ≤20 days | `connected` | `lost` |
| Qualified | ≤30 days | `connected` | `lost` |
| Negotiation | ≤30 days | `connected` | `lost` |

### Always-Same Statuses

| RESimpli Status | Always Maps To |
|---|---|
| New Leads | Skip (no update) |
| Warm Lead | `lost` |
| Dead Lead | `lost` |
| Referred To Agent | `lost` |
| Offers Made | `offer_made` |
| Under Contract | `under_contract` |

---

## Clever Leads API Payload Schemas

### `reached_out`

```json
{
    "update_type": "reached_out",
    "payload": {
        "notes": "Attempting contact — synced from CRM"
    }
}
```

### `connected`

```json
{
    "update_type": "connected",
    "payload": {
        "seller_motivation": "3",
        "conversation_summary": "Contact made, following up",
        "likely_next_step": "Need More Info",
        "notes": "Contact made — synced from CRM"
    }
}
```

**Fields:**
- `seller_motivation` — String "1" to "5" (1 = low, 5 = high). Default "3".
- `conversation_summary` — Free text summary of the conversation.
- `likely_next_step` — One of: "Need More Info", "Schedule Appointment", "Make Offer", "Not Interested"
- `notes` — Additional notes.

### `offer_made`

```json
{
    "update_type": "offer_made",
    "payload": {
        "notes": "Offer at $150,000",
        "initial_offer_amount": 150000.0,
        "acquisition_strategy": "Wholesale",
        "offer_amount": 150000.0,
        "offer_type": "Cash"
    }
}
```

**Fields:**
- `initial_offer_amount` — Float, the offer price.
- `acquisition_strategy` — "Wholesale", "Fix & Flip", "Buy & Hold", "Subject To", "Seller Finance"
- `offer_amount` — Float, same as initial_offer_amount.
- `offer_type` — "Cash", "Financing", "Creative"

### `under_contract`

```json
{
    "update_type": "under_contract",
    "payload": {
        "notes": "Under contract at $145,000",
        "final_purchase_price": 145000.0,
        "acquisition_strategy": "Wholesale",
        "purchase_price": 145000.0,
        "close_date": "2026-04-15",
        "confidence": "High"
    }
}
```

**Fields:**
- `final_purchase_price` — Float, the contract price.
- `purchase_price` — Float, same as final_purchase_price.
- `close_date` — ISO date string (YYYY-MM-DD).
- `confidence` — "High", "Medium", "Low"

### `lost`

```json
{
    "update_type": "lost",
    "payload": {
        "reason": "Other",
        "notes": "Lead went cold — no response",
        "buy_box_mismatch_reason": [],
        "buy_box_update_requested": false
    }
}
```

**Reason options:**
- `"Outside My Buy Box"` — with `buy_box_mismatch_reason`: `["Location"]`, `["Price"]`, `["Condition"]`
- `"Could Not Connect"`
- `"Price Too High"`
- `"Other"` — with free-text `notes`

---

## Address Normalization Rules

Used for fuzzy matching between RESimpli property addresses and Clever connection addresses.

### Direction Abbreviations
| Full | Abbreviated |
|---|---|
| North | N |
| South | S |
| East | E |
| West | W |
| Northeast | NE |
| Northwest | NW |
| Southeast | SE |
| Southwest | SW |

### Street Suffix Abbreviations
| Full | Abbreviated |
|---|---|
| Street | St |
| Avenue | Ave |
| Boulevard | Blvd |
| Drive | Dr |
| Court | Ct |
| Place | Pl |
| Lane | Ln |
| Road | Rd |
| Circle | Cir |
| Terrace | Ter |
| Trail | Trl |
| Parkway | Pkwy |
| Highway | Hwy |

### Additional Normalization
- Strip apartment/unit/suite numbers (`apt`, `unit`, `suite`, `ste`, `#`)
- Remove punctuation (commas, periods)
- Collapse whitespace
- Lowercase everything

---

## RESimpli CSV Expected Columns

| Column Name | Required | Description |
|---|---|---|
| Lead Status | Yes | Current status in RESimpli |
| Property Street Address | Yes* | Property address for matching |
| Property City | No | City for display |
| Property State | No | State for display |
| Property Zip | No | Zip code for display |
| Email Address | Yes* | Email for matching |
| First Name | No | Lead first name |
| Last Name | No | Lead last name |
| Lead Created Date | Yes | YYYY-MM-DD format for age calculation |
| Offer Price | No | Used for Offers Made status |
| Offer Date | No | Used for Offers Made status |
| Under Contract Price | No | Used for Under Contract status |
| Under Contract Date | No | Used for Under Contract status |

*At least one of Property Street Address or Email Address is required for matching.

---

## API Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/portal/connections?page=N&per_page=25&sort=-created_at` | GET | Fetch connections (paginated) |
| `/api/portal/connections/{id}/updates` | POST | Post a status update |

Base URL: `https://investors.cleveroffers.com`

Authentication: `Authorization: Bearer <clerk_token>` header. Tokens are issued by Clerk and expire quickly (~60 seconds).
