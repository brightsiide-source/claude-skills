#!/usr/bin/env python3
"""Assess a business website's quality and flag upgrade opportunities.

Assessment combines two signal sources:

  1. HEAD + GET heuristics (free, no key):
       - DNS resolves + HTTP reachable
       - HTTPS available and cert not expired via redirect chain
       - Title and meta description present
       - Mobile viewport meta tag present
       - Rough HTML size, has <img> with alt, has Open Graph, has favicon
       - Detects obvious "under construction" / parked pages

  2. PageSpeed Insights (optional, needs PAGESPEED_API_KEY — free):
       - Performance, Accessibility, Best-Practices, SEO scores
       - Core Web Vitals (LCP, CLS, INP proxies)

Output includes a simple upgrade_priority score (0-100, higher = more urgent
to pitch) and a list of human-readable findings to drop into an outreach
email.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import socket
import ssl
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from typing import Any


PSI_URL = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"

PARKED_MARKERS = (
    "coming soon", "under construction", "website coming soon",
    "domain is for sale", "buy this domain", "parked free", "godaddy",
)


def _normalize_url(url: str) -> str:
    url = url.strip()
    if not url:
        return ""
    if not re.match(r"^https?://", url, re.I):
        url = "https://" + url
    return url


def _http_get(url: str, timeout: int = 15) -> tuple[int, dict[str, str], str, str]:
    """Returns (status, headers_lower, body_text, final_url). Follows redirects."""
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 website-outreach-mcp/1.0"})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        raw = resp.read(400_000)  # cap at 400 KB to keep it snappy
        try:
            body = raw.decode("utf-8", errors="replace")
        except Exception:
            body = ""
        headers = {k.lower(): v for k, v in resp.getheaders()}
        return resp.status, headers, body, resp.geturl()


def _cert_days_remaining(hostname: str, port: int = 443, timeout: int = 10) -> int | None:
    try:
        ctx = ssl.create_default_context()
        with socket.create_connection((hostname, port), timeout=timeout) as sock:
            with ctx.wrap_socket(sock, server_hostname=hostname) as ssock:
                cert = ssock.getpeercert()
        not_after = cert.get("notAfter")
        if not not_after:
            return None
        expires = datetime.strptime(not_after, "%b %d %H:%M:%S %Y %Z").replace(tzinfo=timezone.utc)
        return (expires - datetime.now(timezone.utc)).days
    except Exception:
        return None


def heuristic_assess(url: str) -> dict[str, Any]:
    findings: list[str] = []
    details: dict[str, Any] = {
        "input_url": url,
        "reachable": False,
        "status_code": None,
        "final_url": None,
        "https": False,
        "cert_days_remaining": None,
        "title": None,
        "meta_description": None,
        "has_viewport_meta": False,
        "has_og_tags": False,
        "has_favicon": False,
        "image_count": 0,
        "images_missing_alt": 0,
        "html_bytes": 0,
        "looks_parked": False,
    }
    normalized = _normalize_url(url)
    if not normalized:
        findings.append("No website URL provided — opportunity to pitch a brand-new site.")
        details["reachable"] = False
        details["upgrade_priority"] = 100
        details["findings"] = findings
        return details

    try:
        status, headers, body, final_url = _http_get(normalized)
    except urllib.error.URLError as e:
        # Fallback: try http:// if https failed
        try:
            status, headers, body, final_url = _http_get(normalized.replace("https://", "http://", 1))
        except Exception:
            findings.append(f"Site unreachable ({e}). Domain or hosting may be broken.")
            details["findings"] = findings
            details["upgrade_priority"] = 95
            return details
    except Exception as e:
        findings.append(f"Fetch failed: {e}")
        details["findings"] = findings
        details["upgrade_priority"] = 90
        return details

    details["reachable"] = True
    details["status_code"] = status
    details["final_url"] = final_url
    details["html_bytes"] = len(body)
    details["https"] = final_url.startswith("https://")

    if details["https"]:
        try:
            host = urllib.parse.urlparse(final_url).hostname or ""
            if host:
                details["cert_days_remaining"] = _cert_days_remaining(host)
        except Exception:
            pass
    else:
        findings.append("No HTTPS — browsers mark the site 'Not secure'.")

    if details["cert_days_remaining"] is not None and details["cert_days_remaining"] < 14:
        findings.append(f"SSL certificate expires in {details['cert_days_remaining']} days.")

    low = body.lower()
    m = re.search(r"<title[^>]*>(.*?)</title>", body, re.I | re.S)
    if m:
        details["title"] = re.sub(r"\s+", " ", m.group(1)).strip()[:200]
    else:
        findings.append("Missing <title> tag (hurts SEO and browser tab clarity).")

    m = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']+)', body, re.I)
    if m:
        details["meta_description"] = m.group(1)[:300]
    else:
        findings.append("Missing meta description (hurts search-result click-through).")

    details["has_viewport_meta"] = bool(re.search(r'<meta[^>]+name=["\']viewport["\']', body, re.I))
    if not details["has_viewport_meta"]:
        findings.append("No mobile viewport meta tag — site likely not mobile-friendly.")

    details["has_og_tags"] = bool(re.search(r'<meta[^>]+property=["\']og:', body, re.I))
    if not details["has_og_tags"]:
        findings.append("No Open Graph tags — link previews on social and chat will look broken.")

    details["has_favicon"] = bool(re.search(r'<link[^>]+rel=["\'][^"\']*icon', body, re.I))
    if not details["has_favicon"]:
        findings.append("No favicon — site looks unfinished in browser tabs.")

    imgs = re.findall(r"<img\b[^>]*>", body, re.I)
    details["image_count"] = len(imgs)
    details["images_missing_alt"] = sum(1 for t in imgs if not re.search(r'\balt\s*=', t, re.I))
    if details["image_count"] and details["images_missing_alt"] / details["image_count"] > 0.3:
        findings.append(
            f"{details['images_missing_alt']}/{details['image_count']} images missing alt text "
            "(accessibility + SEO issue)."
        )

    if any(marker in low for marker in PARKED_MARKERS) and details["html_bytes"] < 40_000:
        details["looks_parked"] = True
        findings.append("Site appears to be a parked / coming-soon page — not a real site yet.")

    if details["html_bytes"] < 2_000 and not details["looks_parked"]:
        findings.append("Very thin HTML (<2 KB) — likely a template placeholder.")

    # Copyright year staleness
    years = [int(y) for y in re.findall(r"(?:©|&copy;|copyright)\s*(?:&nbsp;|\s)*(\d{4})", body, re.I)]
    if years:
        newest = max(years)
        this_year = datetime.now(timezone.utc).year
        if newest < this_year - 1:
            findings.append(f"Footer copyright shows {newest} — site looks abandoned.")

    # Priority score: start at 20, add per finding
    score = 20 + min(len(findings) * 12, 60)
    if details["looks_parked"]:
        score = max(score, 85)
    if not details["https"]:
        score = max(score, 75)
    details["upgrade_priority"] = min(score, 100)
    details["findings"] = findings
    return details


def pagespeed_assess(url: str, api_key: str, strategy: str = "mobile") -> dict[str, Any]:
    params = {"url": url, "strategy": strategy, "key": api_key,
              "category": ["performance", "accessibility", "best-practices", "seo"]}
    qs = urllib.parse.urlencode(params, doseq=True)
    req = urllib.request.Request(f"{PSI_URL}?{qs}",
                                 headers={"User-Agent": "website-outreach-mcp/1.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    lr = data.get("lighthouseResult", {}) or {}
    cats = lr.get("categories", {}) or {}
    def sc(k: str) -> int | None:
        v = (cats.get(k) or {}).get("score")
        return int(v * 100) if isinstance(v, (int, float)) else None
    audits = lr.get("audits", {}) or {}
    def disp(k: str) -> str | None:
        return (audits.get(k) or {}).get("displayValue")
    return {
        "strategy": strategy,
        "performance": sc("performance"),
        "accessibility": sc("accessibility"),
        "best_practices": sc("best-practices"),
        "seo": sc("seo"),
        "lcp": disp("largest-contentful-paint"),
        "cls": disp("cumulative-layout-shift"),
        "tbt": disp("total-blocking-time"),
        "fcp": disp("first-contentful-paint"),
    }


def format_human(result: dict[str, Any]) -> str:
    lines = [f"Website assessment: {result.get('input_url') or '(none)'}"]
    lines.append(f"  upgrade_priority: {result.get('upgrade_priority', 0)}/100")
    lines.append(f"  reachable: {result.get('reachable')}  https: {result.get('https')}  status: {result.get('status_code')}")
    if result.get("cert_days_remaining") is not None:
        lines.append(f"  cert_days_remaining: {result['cert_days_remaining']}")
    if result.get("title"):
        lines.append(f"  title: {result['title']}")
    if "pagespeed" in result and result["pagespeed"]:
        ps = result["pagespeed"]
        lines.append(f"  pagespeed ({ps.get('strategy')}): perf={ps.get('performance')} a11y={ps.get('accessibility')} bp={ps.get('best_practices')} seo={ps.get('seo')}")
        lines.append(f"    LCP={ps.get('lcp')}  CLS={ps.get('cls')}  TBT={ps.get('tbt')}  FCP={ps.get('fcp')}")
    lines.append("  findings:")
    for f in result.get("findings", []):
        lines.append(f"    - {f}")
    if not result.get("findings"):
        lines.append("    (none — site is in reasonable shape)")
    return "\n".join(lines)


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="Assess a website for upgrade opportunities.")
    p.add_argument("url", nargs="?", default="", help="Website URL (blank = score as 'no site'")
    p.add_argument("--pagespeed", action="store_true",
                   help="Also call PageSpeed Insights (needs PAGESPEED_API_KEY)")
    p.add_argument("--strategy", choices=("mobile", "desktop"), default="mobile")
    p.add_argument("--format", choices=("json", "text"), default="text")
    args = p.parse_args(argv)

    result = heuristic_assess(args.url)
    if args.pagespeed and result.get("reachable"):
        key = os.environ.get("PAGESPEED_API_KEY")
        if not key:
            print("WARN: PAGESPEED_API_KEY not set — skipping PSI", file=sys.stderr)
        else:
            try:
                result["pagespeed"] = pagespeed_assess(result.get("final_url") or args.url, key, args.strategy)
                ps = result["pagespeed"]
                findings = result.setdefault("findings", [])
                for metric, label in (("performance", "Performance"), ("accessibility", "Accessibility"),
                                       ("seo", "SEO"), ("best_practices", "Best-Practices")):
                    v = ps.get(metric)
                    if isinstance(v, int) and v < 60:
                        findings.append(f"{label} score is {v}/100 on {ps['strategy']}.")
                # bump priority if PSI is rough
                scores = [ps.get("performance"), ps.get("accessibility"), ps.get("seo")]
                scores = [s for s in scores if isinstance(s, int)]
                if scores and min(scores) < 50:
                    result["upgrade_priority"] = max(result.get("upgrade_priority", 0), 80)
            except Exception as e:
                print(f"WARN: PageSpeed call failed: {e}", file=sys.stderr)

    if args.format == "json":
        print(json.dumps(result, indent=2))
    else:
        print(format_human(result))
    return 0


if __name__ == "__main__":
    sys.exit(main())
