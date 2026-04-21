#!/usr/bin/env python3
"""Draft personalized outreach messages for a single business lead.

Inputs a JSON blob that combines a business record (from discover_businesses.py)
with an assessment result (from assess_website.py) and optional contact info
(from enrich_contacts.py). Outputs three hand-editable drafts:

  - email   : short, benefit-led, two paragraphs + CTA
  - sms     : <= 320 chars, warm, one CTA
  - voicemail : ~20 second script

No LLM calls are made. Personalization is driven by the findings list and a
small set of templates that change based on whether the lead has no site, a
broken/parked site, or a dated/low-quality site. All drafts are meant to be
read and edited before sending — never mass-sent as-is.
"""
from __future__ import annotations

import argparse
import json
import sys
from typing import Any


def _classify(business: dict[str, Any], assessment: dict[str, Any]) -> str:
    website = (business.get("website") or "").strip()
    if not website:
        return "no_site"
    if assessment.get("looks_parked") or not assessment.get("reachable"):
        return "broken_site"
    priority = assessment.get("upgrade_priority", 0) or 0
    if priority >= 70:
        return "needs_upgrade_major"
    if priority >= 40:
        return "needs_upgrade_minor"
    return "healthy"


def _finding_bullets(findings: list[str], limit: int = 3) -> list[str]:
    return findings[:limit]


def _signer(signer: dict[str, str] | None) -> dict[str, str]:
    s = signer or {}
    return {
        "name": s.get("name", "[Your Name]"),
        "company": s.get("company", "[Your Company]"),
        "phone": s.get("phone", "[Your Phone]"),
        "offer_summary": s.get("offer_summary", "modern websites for local businesses"),
        "offer_price_anchor": s.get("offer_price_anchor", ""),
    }


def draft_email(business: dict[str, Any], assessment: dict[str, Any],
                classification: str, signer: dict[str, str]) -> dict[str, str]:
    name = business.get("name", "there")
    bullets = _finding_bullets(assessment.get("findings", []))
    price_line = f"  I can usually turn this around in 2–3 weeks{(', ' + signer['offer_price_anchor']) if signer['offer_price_anchor'] else ''}." if signer["offer_price_anchor"] or classification != "healthy" else ""

    if classification == "no_site":
        subject = f"A simple website for {name} — quick idea"
        body = (
            f"Hi {name} team,\n\n"
            f"I noticed {name} doesn't have a website yet. A lot of customers in your area search "
            "online before they pick a business, so even a one-page site with your hours, services, "
            "and a way to contact you can drive a noticeable bump in calls and walk-ins.\n\n"
            f"I build {signer['offer_summary']}. Would you be open to a 10-minute call next week to "
            "see if it makes sense for you? No pressure either way.\n\n"
            f"{price_line}\n"
            f"Thanks,\n{signer['name']}\n{signer['company']}\n{signer['phone']}"
        )
    elif classification == "broken_site":
        subject = f"Your {name} site looks offline — a heads up"
        body = (
            f"Hi {name} team,\n\n"
            f"I was looking at {business.get('website')} today and the site appears to be down or "
            "parked — visitors are seeing a broken page instead of information about your business. "
            "Wanted to flag that in case nobody else has.\n\n"
            f"If it's useful, I help local businesses get a clean, reliable site back up quickly. "
            "Happy to share a couple of examples if you'd like.\n\n"
            f"Thanks,\n{signer['name']}\n{signer['company']}\n{signer['phone']}"
        )
    else:
        subject = f"A few quick wins for the {name} website"
        bullet_text = "\n".join(f"  • {b}" for b in bullets) if bullets else "  • A couple of small polish items that would make a real difference."
        body = (
            f"Hi {name} team,\n\n"
            f"I had a look at {business.get('website')} this morning and wanted to share a few "
            "things that stood out — these are the kinds of issues that quietly cost local businesses "
            "calls and bookings:\n\n"
            f"{bullet_text}\n\n"
            f"I build {signer['offer_summary']} and can usually fix this kind of thing without a "
            "full rebuild. Worth a 10-minute chat?\n\n"
            f"{price_line}\n"
            f"Thanks,\n{signer['name']}\n{signer['company']}\n{signer['phone']}"
        )
    return {"subject": subject, "body": body.strip()}


def draft_sms(business: dict[str, Any], assessment: dict[str, Any],
              classification: str, signer: dict[str, str]) -> str:
    name = business.get("name", "there")
    if classification == "no_site":
        msg = (f"Hi {name} — {signer['name']} from {signer['company']}. "
               "Noticed you don't have a website yet. I build simple sites for local businesses. "
               "Worth a 10-min chat this week?")
    elif classification == "broken_site":
        msg = (f"Hi {name} — {signer['name']} from {signer['company']}. "
               "Your website looks offline right now. Happy to help get it back up quickly. "
               "OK to send a short note with options?")
    else:
        msg = (f"Hi {name} — {signer['name']} from {signer['company']}. "
               "Quick review of your site flagged a few things that are likely costing you calls. "
               "Can I send a 3-bullet summary?")
    return msg[:320]


def draft_voicemail(business: dict[str, Any], classification: str,
                    signer: dict[str, str]) -> str:
    name = business.get("name", "there")
    if classification == "no_site":
        return (
            f"Hi, this is {signer['name']} from {signer['company']}. I was looking for {name} online "
            f"and saw there isn't a website yet. I help local businesses get a simple, good-looking "
            f"site up quickly. If that's interesting, give me a call back at {signer['phone']}. Thanks."
        )
    if classification == "broken_site":
        return (
            f"Hi, this is {signer['name']} from {signer['company']}. Wanted to give you a quick "
            f"heads-up that the {name} website appears to be offline or parked right now — "
            f"customers are seeing a broken page. If you'd like help getting it back up, I'm at "
            f"{signer['phone']}. No pressure either way."
        )
    return (
        f"Hi, this is {signer['name']} from {signer['company']}. I had a quick look at the {name} "
        f"website and noticed a couple of things that are likely costing you calls — nothing major, "
        f"but worth a short conversation. My number is {signer['phone']}. Thanks."
    )


def run(payload: dict[str, Any]) -> dict[str, Any]:
    business = payload.get("business") or {}
    assessment = payload.get("assessment") or {}
    signer = _signer(payload.get("signer"))
    classification = _classify(business, assessment)
    email = draft_email(business, assessment, classification, signer)
    sms = draft_sms(business, assessment, classification, signer)
    vm = draft_voicemail(business, classification, signer)
    return {
        "classification": classification,
        "email": email,
        "sms": sms,
        "voicemail": vm,
        "notes": [
            "Edit before sending — treat these as first drafts.",
            "Match the tone you would use in person.",
            "Follow local anti-spam and do-not-call rules before any outbound send.",
        ],
    }


def format_human(r: dict[str, Any]) -> str:
    lines = [f"Draft outreach — classification: {r['classification']}", ""]
    lines.append("=== EMAIL ===")
    lines.append(f"Subject: {r['email']['subject']}")
    lines.append("")
    lines.append(r["email"]["body"])
    lines.append("")
    lines.append("=== SMS ===")
    lines.append(r["sms"])
    lines.append("")
    lines.append("=== VOICEMAIL ===")
    lines.append(r["voicemail"])
    lines.append("")
    lines.append("Notes:")
    for n in r["notes"]:
        lines.append(f"  - {n}")
    return "\n".join(lines)


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="Draft outreach for a single lead.")
    p.add_argument("payload", help="Path to JSON payload {business, assessment, signer}")
    p.add_argument("--format", choices=("json", "text"), default="text")
    args = p.parse_args(argv)
    try:
        with open(args.payload, "r", encoding="utf-8") as f:
            payload = json.load(f)
    except Exception as e:
        print(f"ERROR: cannot read payload: {e}", file=sys.stderr)
        return 2
    result = run(payload)
    if args.format == "json":
        print(json.dumps(result, indent=2))
    else:
        print(format_human(result))
    return 0


if __name__ == "__main__":
    sys.exit(main())
