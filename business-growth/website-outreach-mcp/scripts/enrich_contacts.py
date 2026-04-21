#!/usr/bin/env python3
"""Extract publicly available contact info from a business's existing website.

Pulls:
  - Email addresses (mailto: links and visible text)
  - Phone numbers (tel: links and E.164/US-style digits)
  - Social profiles (facebook, instagram, linkedin, x/twitter, tiktok, youtube)
  - Candidate contact page URLs (/contact, /about, /get-in-touch, ...)

Respects robots.txt is out of scope for a single-page fetch, but the script
only ever fetches pages the business has already published publicly. No
scraping at scale is performed here — this is a per-lead helper.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from typing import Any


EMAIL_RE = re.compile(r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}")
PHONE_RE = re.compile(r"(?:\+?\d{1,3}[\s.\-]?)?(?:\(?\d{2,4}\)?[\s.\-]?)?\d{3,4}[\s.\-]?\d{3,4}")

SOCIAL_HOSTS = {
    "facebook": ("facebook.com", "fb.com"),
    "instagram": ("instagram.com",),
    "linkedin": ("linkedin.com",),
    "twitter": ("twitter.com", "x.com"),
    "tiktok": ("tiktok.com",),
    "youtube": ("youtube.com", "youtu.be"),
}

CONTACT_PATHS = ("contact", "contact-us", "contactus", "about", "about-us",
                 "get-in-touch", "reach-us", "support", "help")


def _fetch(url: str, timeout: int = 15) -> tuple[str, str]:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 website-outreach-mcp/1.0"})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        body = resp.read(400_000).decode("utf-8", errors="replace")
        return body, resp.geturl()


def _is_plausible_phone(candidate: str) -> bool:
    digits = re.sub(r"\D", "", candidate)
    return 7 <= len(digits) <= 15


def extract_from_html(body: str, base_url: str) -> dict[str, Any]:
    emails = sorted({m.group(0).lower() for m in EMAIL_RE.finditer(body)
                     if not m.group(0).lower().endswith((".png", ".jpg", ".jpeg", ".gif", ".svg"))})

    phones_raw: set[str] = set()
    for m in re.finditer(r'href=["\']tel:([^"\']+)', body, re.I):
        phones_raw.add(m.group(1).strip())
    for m in PHONE_RE.finditer(body):
        c = m.group(0).strip()
        if _is_plausible_phone(c):
            phones_raw.add(c)
    phones = sorted({re.sub(r"\s+", " ", p) for p in phones_raw})

    socials: dict[str, list[str]] = {k: [] for k in SOCIAL_HOSTS}
    for m in re.finditer(r'href=["\']([^"\']+)', body, re.I):
        href = m.group(1)
        abs_url = urllib.parse.urljoin(base_url, href)
        host = (urllib.parse.urlparse(abs_url).hostname or "").lower()
        for platform, domains in SOCIAL_HOSTS.items():
            if any(host == d or host.endswith("." + d) for d in domains):
                if abs_url not in socials[platform]:
                    socials[platform].append(abs_url)
    socials = {k: v for k, v in socials.items() if v}

    contact_pages: list[str] = []
    for m in re.finditer(r'href=["\']([^"\']+)', body, re.I):
        href = m.group(1)
        abs_url = urllib.parse.urljoin(base_url, href)
        path = urllib.parse.urlparse(abs_url).path.strip("/").lower()
        segments = path.split("/")
        if any(seg in CONTACT_PATHS for seg in segments):
            if abs_url not in contact_pages:
                contact_pages.append(abs_url)

    return {
        "emails": emails,
        "phones": phones,
        "socials": socials,
        "contact_pages": contact_pages[:10],
    }


def enrich(url: str, crawl_contact_page: bool = True) -> dict[str, Any]:
    url = url.strip()
    if not url:
        return {"error": "no url provided"}
    if not re.match(r"^https?://", url, re.I):
        url = "https://" + url

    result: dict[str, Any] = {"input_url": url, "crawled_urls": []}
    try:
        body, final_url = _fetch(url)
        result["crawled_urls"].append(final_url)
    except urllib.error.URLError as e:
        return {"input_url": url, "error": str(e)}
    except Exception as e:
        return {"input_url": url, "error": str(e)}

    data = extract_from_html(body, final_url)

    if crawl_contact_page and data["contact_pages"]:
        try:
            cbody, curl = _fetch(data["contact_pages"][0])
            result["crawled_urls"].append(curl)
            extra = extract_from_html(cbody, curl)
            data["emails"] = sorted(set(data["emails"]) | set(extra["emails"]))
            data["phones"] = sorted(set(data["phones"]) | set(extra["phones"]))
            for k, v in extra["socials"].items():
                merged = sorted(set(data["socials"].get(k, [])) | set(v))
                data["socials"][k] = merged
        except Exception:
            pass

    result.update(data)
    return result


def format_human(r: dict[str, Any]) -> str:
    if "error" in r:
        return f"Contact enrichment failed for {r.get('input_url')}: {r['error']}"
    out = [f"Contacts for {r['input_url']}:"]
    out.append(f"  emails:  {', '.join(r.get('emails') or []) or '(none)'}")
    out.append(f"  phones:  {', '.join(r.get('phones') or []) or '(none)'}")
    socials = r.get("socials") or {}
    if socials:
        out.append("  socials:")
        for platform, urls in socials.items():
            out.append(f"    {platform}: {urls[0]}")
    else:
        out.append("  socials: (none)")
    if r.get("contact_pages"):
        out.append(f"  contact_pages: {', '.join(r['contact_pages'][:3])}")
    return "\n".join(out)


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="Extract public contact info from a business website.")
    p.add_argument("url", help="Website URL")
    p.add_argument("--no-crawl-contact", action="store_true",
                   help="Skip the second fetch of a discovered /contact page")
    p.add_argument("--format", choices=("json", "text"), default="text")
    args = p.parse_args(argv)

    r = enrich(args.url, crawl_contact_page=not args.no_crawl_contact)
    if args.format == "json":
        print(json.dumps(r, indent=2))
    else:
        print(format_human(r))
    return 0 if "error" not in r else 1


if __name__ == "__main__":
    sys.exit(main())
