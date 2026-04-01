#!/usr/bin/env python3
"""
NASDAQ Futures News & Economic Calendar Scanner

Tracks high-impact economic events, FOMC dates, earnings,
and fetches news headlines via RSS — all relevant to NQ/MNQ.

Usage:
    python3 news_scanner.py
    python3 news_scanner.py --date 2026-04-03
    python3 news_scanner.py --week
    python3 news_scanner.py --impact high
    python3 news_scanner.py --news
"""

import argparse
import json
import sys
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from typing import List, Dict, Optional
from urllib.request import urlopen, Request
from urllib.error import URLError

# ─── Economic Calendar 2026 (Major NQ-Moving Events) ────────────────────────
# Format: (date, time_et, event, impact, typical_nq_move)
ECONOMIC_CALENDAR_2026 = [
    # January
    ("2026-01-10", "08:30", "Nonfarm Payrolls (Dec)", "HIGH", "50-150 pts"),
    ("2026-01-14", "08:30", "CPI (Dec)", "HIGH", "100-200 pts"),
    ("2026-01-15", "08:30", "PPI (Dec)", "MEDIUM", "30-80 pts"),
    ("2026-01-29", "14:00", "FOMC Rate Decision", "HIGH", "100-300 pts"),
    # February
    ("2026-02-07", "08:30", "Nonfarm Payrolls (Jan)", "HIGH", "50-150 pts"),
    ("2026-02-12", "08:30", "CPI (Jan)", "HIGH", "100-200 pts"),
    ("2026-02-13", "08:30", "PPI (Jan)", "MEDIUM", "30-80 pts"),
    # March
    ("2026-03-06", "08:30", "Nonfarm Payrolls (Feb)", "HIGH", "50-150 pts"),
    ("2026-03-11", "08:30", "CPI (Feb)", "HIGH", "100-200 pts"),
    ("2026-03-12", "08:30", "PPI (Feb)", "MEDIUM", "30-80 pts"),
    ("2026-03-18", "14:00", "FOMC Rate Decision + Dot Plot", "HIGH", "150-400 pts"),
    ("2026-03-26", "08:30", "GDP (Q4 Final)", "MEDIUM", "30-80 pts"),
    # April
    ("2026-04-02", "08:15", "ADP Employment (Mar)", "MEDIUM", "20-60 pts"),
    ("2026-04-03", "08:30", "Nonfarm Payrolls (Mar)", "HIGH", "50-150 pts"),
    ("2026-04-10", "08:30", "CPI (Mar)", "HIGH", "100-200 pts"),
    ("2026-04-14", "08:30", "PPI (Mar)", "MEDIUM", "30-80 pts"),
    ("2026-04-29", "08:30", "GDP (Q1 Advance)", "HIGH", "50-120 pts"),
    # May
    ("2026-05-01", "08:30", "Nonfarm Payrolls (Apr)", "HIGH", "50-150 pts"),
    ("2026-05-06", "14:00", "FOMC Rate Decision", "HIGH", "100-300 pts"),
    ("2026-05-13", "08:30", "CPI (Apr)", "HIGH", "100-200 pts"),
    ("2026-05-14", "08:30", "PPI (Apr)", "MEDIUM", "30-80 pts"),
    # June
    ("2026-06-05", "08:30", "Nonfarm Payrolls (May)", "HIGH", "50-150 pts"),
    ("2026-06-10", "08:30", "CPI (May)", "HIGH", "100-200 pts"),
    ("2026-06-17", "14:00", "FOMC Rate Decision + Dot Plot", "HIGH", "150-400 pts"),
    ("2026-06-25", "08:30", "GDP (Q1 Final)", "MEDIUM", "30-80 pts"),
    # July
    ("2026-07-02", "08:30", "Nonfarm Payrolls (Jun)", "HIGH", "50-150 pts"),
    ("2026-07-15", "08:30", "CPI (Jun)", "HIGH", "100-200 pts"),
    ("2026-07-29", "14:00", "FOMC Rate Decision", "HIGH", "100-300 pts"),
    ("2026-07-30", "08:30", "GDP (Q2 Advance)", "HIGH", "50-120 pts"),
    # August
    ("2026-08-07", "08:30", "Nonfarm Payrolls (Jul)", "HIGH", "50-150 pts"),
    ("2026-08-12", "08:30", "CPI (Jul)", "HIGH", "100-200 pts"),
    # September
    ("2026-09-04", "08:30", "Nonfarm Payrolls (Aug)", "HIGH", "50-150 pts"),
    ("2026-09-10", "08:30", "CPI (Aug)", "HIGH", "100-200 pts"),
    ("2026-09-16", "14:00", "FOMC Rate Decision + Dot Plot", "HIGH", "150-400 pts"),
    # October
    ("2026-10-02", "08:30", "Nonfarm Payrolls (Sep)", "HIGH", "50-150 pts"),
    ("2026-10-13", "08:30", "CPI (Sep)", "HIGH", "100-200 pts"),
    # November
    ("2026-11-04", "14:00", "FOMC Rate Decision", "HIGH", "100-300 pts"),
    ("2026-11-06", "08:30", "Nonfarm Payrolls (Oct)", "HIGH", "50-150 pts"),
    ("2026-11-12", "08:30", "CPI (Oct)", "HIGH", "100-200 pts"),
    ("2026-11-25", "08:30", "GDP (Q3 Second)", "MEDIUM", "30-80 pts"),
    # December
    ("2026-12-04", "08:30", "Nonfarm Payrolls (Nov)", "HIGH", "50-150 pts"),
    ("2026-12-10", "08:30", "CPI (Nov)", "HIGH", "100-200 pts"),
    ("2026-12-16", "14:00", "FOMC Rate Decision + Dot Plot", "HIGH", "150-400 pts"),
]

# Weekly recurring events
WEEKLY_EVENTS = [
    ("Tuesday", "10:00", "Consumer Confidence", "MEDIUM", "20-50 pts"),
    ("Wednesday", "10:30", "EIA Petroleum Status", "LOW", "10-30 pts"),
    ("Wednesday", "14:00", "FOMC Minutes (release weeks)", "HIGH", "50-150 pts"),
    ("Thursday", "08:30", "Initial Jobless Claims", "MEDIUM", "20-50 pts"),
    ("Friday", "10:00", "U of Michigan Consumer Sentiment (prelim)", "MEDIUM", "20-50 pts"),
]

# Major NASDAQ earnings that move NQ (approximate dates — update each quarter)
EARNINGS_CALENDAR = [
    ("2026-01-28", "AAPL", "Apple Q1 Earnings", "HIGH"),
    ("2026-01-28", "MSFT", "Microsoft Q2 Earnings", "HIGH"),
    ("2026-01-29", "META", "Meta Q4 Earnings", "HIGH"),
    ("2026-01-30", "AMZN", "Amazon Q4 Earnings", "HIGH"),
    ("2026-02-04", "GOOGL", "Alphabet Q4 Earnings", "HIGH"),
    ("2026-02-19", "NVDA", "NVIDIA Q4 Earnings", "HIGH"),
    ("2026-04-22", "TSLA", "Tesla Q1 Earnings", "HIGH"),
    ("2026-04-29", "MSFT", "Microsoft Q3 Earnings", "HIGH"),
    ("2026-04-29", "GOOGL", "Alphabet Q1 Earnings", "HIGH"),
    ("2026-04-30", "META", "Meta Q1 Earnings", "HIGH"),
    ("2026-05-01", "AMZN", "Amazon Q1 Earnings", "HIGH"),
    ("2026-05-01", "AAPL", "Apple Q2 Earnings", "HIGH"),
    ("2026-05-28", "NVDA", "NVIDIA Q1 Earnings", "HIGH"),
]

# RSS feeds for market news (free, no API key)
RSS_FEEDS = [
    ("CNBC Markets", "https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=20910258"),
    ("Reuters Business", "https://feeds.reuters.com/reuters/businessNews"),
    ("MarketWatch Top", "https://feeds.marketwatch.com/marketwatch/topstories/"),
]


def get_events_for_date(date_str: str, impact_filter: str = None) -> List[Dict]:
    """Get economic events for a specific date."""
    events = []
    for date, time, name, impact, move in ECONOMIC_CALENDAR_2026:
        if date == date_str:
            if impact_filter and impact.upper() != impact_filter.upper():
                continue
            events.append({
                "date": date,
                "time_et": time,
                "event": name,
                "impact": impact,
                "typical_nq_move": move,
            })

    # Add earnings
    for date, ticker, name, impact in EARNINGS_CALENDAR:
        if date == date_str:
            if impact_filter and impact.upper() != impact_filter.upper():
                continue
            events.append({
                "date": date,
                "time_et": "16:00+",
                "event": f"[EARNINGS] {name}",
                "impact": impact,
                "ticker": ticker,
            })

    return events


def get_events_for_week(start_date: str, impact_filter: str = None) -> List[Dict]:
    """Get all events for the trading week."""
    start = datetime.strptime(start_date, "%Y-%m-%d")
    # Find Monday
    monday = start - timedelta(days=start.weekday())
    events = []

    for i in range(5):  # Mon-Fri
        day = monday + timedelta(days=i)
        day_str = day.strftime("%Y-%m-%d")
        day_events = get_events_for_date(day_str, impact_filter)
        for e in day_events:
            e["day_of_week"] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][i]
        events.extend(day_events)

    return events


def get_upcoming_events(from_date: str, days: int = 7, impact_filter: str = None) -> List[Dict]:
    """Get upcoming events within N days."""
    start = datetime.strptime(from_date, "%Y-%m-%d")
    events = []
    for i in range(days):
        day = start + timedelta(days=i)
        day_str = day.strftime("%Y-%m-%d")
        events.extend(get_events_for_date(day_str, impact_filter))
    return events


def fetch_rss_news(max_items: int = 10) -> List[Dict]:
    """Fetch latest market news from RSS feeds."""
    all_items = []

    for feed_name, url in RSS_FEEDS:
        try:
            req = Request(url, headers={"User-Agent": "NQ-Scanner/1.0"})
            with urlopen(req, timeout=5) as response:
                xml_data = response.read()
            root = ET.fromstring(xml_data)

            # Handle both RSS 2.0 and Atom
            items = root.findall(".//item") or root.findall(".//{http://www.w3.org/2005/Atom}entry")
            for item in items[:5]:
                title = item.findtext("title") or item.findtext("{http://www.w3.org/2005/Atom}title") or ""
                pub_date = item.findtext("pubDate") or item.findtext("{http://www.w3.org/2005/Atom}updated") or ""

                # Filter for market-relevant keywords
                keywords = ["nasdaq", "stock", "market", "fed", "rate", "inflation",
                            "earnings", "tech", "nvidia", "apple", "microsoft", "amazon",
                            "meta", "google", "tesla", "futures", "s&p", "economy",
                            "gdp", "jobs", "employment", "cpi", "treasury", "yield"]
                title_lower = title.lower()
                if any(kw in title_lower for kw in keywords):
                    all_items.append({
                        "source": feed_name,
                        "title": title.strip(),
                        "published": pub_date.strip(),
                    })
        except (URLError, ET.ParseError, OSError):
            continue

    # Deduplicate by title similarity
    seen_titles = set()
    unique_items = []
    for item in all_items:
        short_title = item["title"][:50].lower()
        if short_title not in seen_titles:
            seen_titles.add(short_title)
            unique_items.append(item)

    return unique_items[:max_items]


def scan(date: str = None, week: bool = False, impact: str = None,
         include_news: bool = False) -> Dict:
    """Run the full news/calendar scan."""
    now = datetime.now(timezone.utc)
    target_date = date or now.strftime("%Y-%m-%d")

    result = {
        "scan_date": target_date,
        "scan_time_utc": now.strftime("%Y-%m-%d %H:%M:%S UTC"),
    }

    if week:
        result["events"] = get_events_for_week(target_date, impact)
        result["scope"] = "week"
    else:
        result["events"] = get_events_for_date(target_date, impact)
        result["upcoming_7d"] = get_upcoming_events(target_date, 7, "HIGH")
        result["scope"] = "day"

    # Count by impact
    impacts = {"HIGH": 0, "MEDIUM": 0, "LOW": 0}
    for e in result["events"]:
        impacts[e.get("impact", "LOW")] = impacts.get(e.get("impact", "LOW"), 0) + 1
    result["impact_summary"] = impacts

    # Trading guidance
    high_count = impacts.get("HIGH", 0)
    if high_count >= 2:
        result["trading_guidance"] = "EXTREME CAUTION — Multiple high-impact events. Consider sitting out or reducing size significantly."
    elif high_count == 1:
        result["trading_guidance"] = "CAUTION — High-impact event today. Flatten positions before the release or widen stops."
    else:
        result["trading_guidance"] = "NORMAL — No high-impact scheduled events. Standard trading conditions."

    # News
    if include_news:
        result["news"] = fetch_rss_news()

    return result


def format_text(result: Dict) -> str:
    """Format as human-readable text."""
    lines = []
    lines.append("=" * 60)
    lines.append("  NQ/MNQ NEWS & ECONOMIC CALENDAR")
    lines.append("=" * 60)
    lines.append(f"  Date:  {result['scan_date']}")
    lines.append(f"  Scope: {result['scope'].upper()}")
    lines.append("")

    # Trading guidance
    lines.append(f"  >>> {result['trading_guidance']} <<<")
    lines.append("")

    # Impact summary
    imp = result["impact_summary"]
    lines.append(f"  Events: {imp.get('HIGH', 0)} HIGH | {imp.get('MEDIUM', 0)} MEDIUM | {imp.get('LOW', 0)} LOW")
    lines.append("")

    # Events
    if result["events"]:
        lines.append("-" * 60)
        lines.append("  SCHEDULED EVENTS")
        lines.append("-" * 60)
        for e in result["events"]:
            day = f" ({e['day_of_week']})" if "day_of_week" in e else ""
            impact_marker = "!!!" if e["impact"] == "HIGH" else "! " if e["impact"] == "MEDIUM" else "  "
            lines.append(f"  {impact_marker} {e['date']}{day} {e['time_et']} ET")
            lines.append(f"      {e['event']}")
            if "typical_nq_move" in e:
                lines.append(f"      Typical NQ Move: {e['typical_nq_move']}")
            lines.append("")
    else:
        lines.append("  No scheduled events for this date.")
        lines.append("")

    # Upcoming high-impact
    if "upcoming_7d" in result and result["upcoming_7d"]:
        lines.append("-" * 60)
        lines.append("  UPCOMING HIGH-IMPACT (Next 7 Days)")
        lines.append("-" * 60)
        for e in result["upcoming_7d"]:
            lines.append(f"  {e['date']} {e['time_et']} — {e['event']}")
        lines.append("")

    # News
    if "news" in result:
        lines.append("-" * 60)
        lines.append("  MARKET NEWS HEADLINES")
        lines.append("-" * 60)
        if result["news"]:
            for n in result["news"]:
                lines.append(f"  [{n['source']}]")
                lines.append(f"    {n['title']}")
                lines.append("")
        else:
            lines.append("  No relevant headlines found (feeds may be unavailable).")
            lines.append("")

    lines.append("=" * 60)
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(
        description="NQ/MNQ News & Economic Calendar Scanner — track market-moving events"
    )
    parser.add_argument("--date", help="Date to scan (YYYY-MM-DD, default: today)")
    parser.add_argument("--week", action="store_true", help="Show full week calendar")
    parser.add_argument("--impact", choices=["high", "medium", "low"],
                        help="Filter by impact level")
    parser.add_argument("--news", action="store_true", help="Include RSS news headlines")
    parser.add_argument("--format", choices=["text", "json"], default="text",
                        help="Output format (default: text)")

    args = parser.parse_args()

    result = scan(
        date=args.date,
        week=args.week,
        impact=args.impact.upper() if args.impact else None,
        include_news=args.news,
    )

    if args.format == "json":
        print(json.dumps(result, indent=2))
    else:
        print(format_text(result))


if __name__ == "__main__":
    main()
