#!/usr/bin/env python3
"""
NASDAQ Futures Session Analyzer

Market session timing, key trading windows, and session statistics
for NQ/MNQ futures traders.

Usage:
    python3 session_analyzer.py
    python3 session_analyzer.py --timezone US/Central
    python3 session_analyzer.py --week
"""

import argparse
import json
import sys
from datetime import datetime, timedelta, timezone

# UTC offsets for common US trading timezones
TZ_OFFSETS = {
    "US/Eastern": -4,    # EDT (summer)
    "US/Central": -5,    # CDT
    "US/Mountain": -6,   # MDT
    "US/Pacific": -7,    # PDT
    "ET": -4,
    "CT": -5,
    "MT": -6,
    "PT": -7,
    "UTC": 0,
}

# Session definitions in ET (Eastern Time, UTC-4 during EDT)
SESSIONS = [
    {"name": "Globex Overnight", "start": "18:00", "end": "08:00", "spans_midnight": True,
     "character": "Lower volume, trend continuation from prior day. Asia/London flows."},
    {"name": "Pre-Market", "start": "08:00", "end": "09:30", "spans_midnight": False,
     "character": "Economic data releases, gap analysis, order flow buildup."},
    {"name": "Opening Drive", "start": "09:30", "end": "10:00", "spans_midnight": False,
     "character": "Highest volatility. Traps common. Wait for direction confirmation."},
    {"name": "Morning Session", "start": "10:00", "end": "12:00", "spans_midnight": False,
     "character": "BEST session for trends. Institutional flow drives direction."},
    {"name": "Lunch Chop", "start": "12:00", "end": "14:00", "spans_midnight": False,
     "character": "Low volume, range-bound. Avoid or scalp only. Many failed breakouts."},
    {"name": "Afternoon Session", "start": "14:00", "end": "15:00", "spans_midnight": False,
     "character": "Volume returns. Bond market close (14:00) can trigger moves."},
    {"name": "Power Hour", "start": "15:00", "end": "16:00", "spans_midnight": False,
     "character": "Institutional positioning for close. Strong directional moves."},
    {"name": "Post-Market", "start": "16:00", "end": "18:00", "spans_midnight": False,
     "character": "Cash close settlement. Reduced liquidity. Earnings reactions."},
]

KEY_TIMES_ET = [
    ("08:30", "Economic Data Release Window (CPI, PPI, NFP, GDP, Jobless Claims)"),
    ("09:30", "Cash Market Open — Opening Bell"),
    ("10:00", "ISM/Consumer data release window + Opening Drive ends"),
    ("10:30", "EIA Petroleum report (Wednesdays)"),
    ("11:30", "London Close — liquidity shift"),
    ("13:00", "FOMC Announcement Window (meeting days)"),
    ("14:00", "Bond Market Close"),
    ("15:00", "MOC (Market on Close) imbalance published"),
    ("15:45", "MOC orders final"),
    ("16:00", "Cash Market Close"),
    ("16:15", "CME futures settlement"),
]

# 2026 US Market Holidays (CME closed or early close)
HOLIDAYS_2026 = [
    ("2026-01-01", "New Year's Day", "CLOSED"),
    ("2026-01-19", "MLK Jr. Day", "CLOSED"),
    ("2026-02-16", "Presidents' Day", "CLOSED"),
    ("2026-04-03", "Good Friday", "CLOSED"),
    ("2026-05-25", "Memorial Day", "CLOSED"),
    ("2026-07-03", "Independence Day (observed)", "EARLY CLOSE 13:00 ET"),
    ("2026-09-07", "Labor Day", "CLOSED"),
    ("2026-11-26", "Thanksgiving", "CLOSED"),
    ("2026-11-27", "Black Friday", "EARLY CLOSE 13:00 ET"),
    ("2026-12-25", "Christmas", "CLOSED"),
]

DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]


def parse_time(time_str: str) -> tuple:
    """Parse HH:MM string to (hour, minute) tuple."""
    parts = time_str.split(":")
    return int(parts[0]), int(parts[1])


def get_utc_now() -> datetime:
    """Get current UTC time."""
    return datetime.now(timezone.utc)


def utc_to_tz(utc_dt: datetime, tz_offset: int) -> datetime:
    """Convert UTC datetime to target timezone."""
    return utc_dt + timedelta(hours=tz_offset)


def time_to_minutes(h: int, m: int) -> int:
    return h * 60 + m


def get_current_session(now_et: datetime) -> dict:
    """Determine current trading session."""
    current_minutes = time_to_minutes(now_et.hour, now_et.minute)
    weekday = now_et.weekday()  # 0=Monday

    # Weekend check
    if weekday == 5 and current_minutes >= time_to_minutes(18, 0):
        pass  # Sunday Globex open (weekday 5 = Saturday... actually need Sunday)
    if weekday >= 5:
        return {
            "name": "WEEKEND — Markets Closed",
            "character": "Futures reopen Sunday 6:00 PM ET",
            "active": False,
        }

    for session in SESSIONS:
        start_h, start_m = parse_time(session["start"])
        end_h, end_m = parse_time(session["end"])
        start_min = time_to_minutes(start_h, start_m)
        end_min = time_to_minutes(end_h, end_m)

        if session["spans_midnight"]:
            if current_minutes >= start_min or current_minutes < end_min:
                return {**session, "active": True}
        else:
            if start_min <= current_minutes < end_min:
                return {**session, "active": True}

    return {"name": "Between Sessions", "character": "Market closed", "active": False}


def get_next_key_time(now_et: datetime) -> dict:
    """Find the next key time event."""
    current_minutes = time_to_minutes(now_et.hour, now_et.minute)

    for time_str, desc in KEY_TIMES_ET:
        h, m = parse_time(time_str)
        event_min = time_to_minutes(h, m)
        if event_min > current_minutes:
            mins_until = event_min - current_minutes
            return {
                "time": time_str,
                "description": desc,
                "minutes_until": mins_until,
                "countdown": f"{mins_until // 60}h {mins_until % 60}m",
            }

    return {"time": "08:30", "description": "Next day — Economic Data Window", "minutes_until": None}


def check_holidays(date: datetime) -> dict:
    """Check if date is a market holiday."""
    date_str = date.strftime("%Y-%m-%d")
    for h_date, h_name, h_status in HOLIDAYS_2026:
        if date_str == h_date:
            return {"is_holiday": True, "name": h_name, "status": h_status}
    return {"is_holiday": False}


def get_week_schedule(start_date: datetime) -> list:
    """Generate schedule for the trading week."""
    # Find Monday of current week
    monday = start_date - timedelta(days=start_date.weekday())
    schedule = []

    for i in range(5):  # Mon-Fri
        day = monday + timedelta(days=i)
        holiday = check_holidays(day)
        day_info = {
            "date": day.strftime("%Y-%m-%d"),
            "day": DAYS_OF_WEEK[day.weekday()],
        }
        if holiday["is_holiday"]:
            day_info["status"] = holiday["status"]
            day_info["holiday"] = holiday["name"]
        else:
            day_info["status"] = "NORMAL"
            day_info["sessions"] = "6:00 PM (prev day) — 5:00 PM ET"
        schedule.append(day_info)

    return schedule


def analyze_sessions(tz_name: str = "US/Eastern", show_week: bool = False) -> dict:
    """Full session analysis."""
    tz_offset = TZ_OFFSETS.get(tz_name, TZ_OFFSETS.get("US/Eastern"))
    utc_now = get_utc_now()
    local_now = utc_to_tz(utc_now, tz_offset)
    et_now = utc_to_tz(utc_now, TZ_OFFSETS["US/Eastern"])

    result = {
        "current_time": {
            "utc": utc_now.strftime("%Y-%m-%d %H:%M:%S UTC"),
            "local": local_now.strftime("%Y-%m-%d %H:%M:%S"),
            "eastern": et_now.strftime("%Y-%m-%d %H:%M:%S ET"),
            "timezone": tz_name,
        },
        "day_of_week": DAYS_OF_WEEK[et_now.weekday()],
    }

    # Holiday check
    holiday = check_holidays(et_now)
    if holiday["is_holiday"]:
        result["holiday"] = holiday

    # Current session
    result["current_session"] = get_current_session(et_now)

    # Next key time
    result["next_key_time"] = get_next_key_time(et_now)

    # All sessions with times
    result["sessions"] = []
    for s in SESSIONS:
        result["sessions"].append({
            "name": s["name"],
            "time_et": f"{s['start']} — {s['end']} ET",
            "character": s["character"],
        })

    # Key times
    result["key_times"] = [{"time_et": t, "event": d} for t, d in KEY_TIMES_ET]

    # Week schedule
    if show_week:
        result["week_schedule"] = get_week_schedule(et_now)

    return result


def format_text(result: dict) -> str:
    """Format as human-readable text."""
    lines = []
    lines.append("=" * 60)
    lines.append("  NQ/MNQ SESSION ANALYZER")
    lines.append("=" * 60)

    ct = result["current_time"]
    lines.append(f"  Time (ET):    {ct['eastern']}")
    lines.append(f"  Time (Local): {ct['local']} ({ct['timezone']})")
    lines.append(f"  Day:          {result['day_of_week']}")

    if "holiday" in result:
        h = result["holiday"]
        lines.append(f"  HOLIDAY:      {h['name']} — {h['status']}")

    lines.append("")

    # Current session
    cs = result["current_session"]
    lines.append("-" * 60)
    lines.append(f"  CURRENT SESSION: {cs['name']}")
    lines.append("-" * 60)
    lines.append(f"  {cs['character']}")
    if cs.get("start"):
        lines.append(f"  Hours: {cs['start']} — {cs['end']} ET")
    lines.append("")

    # Next key time
    nkt = result["next_key_time"]
    lines.append(f"  NEXT KEY TIME: {nkt['time']} ET — {nkt['description']}")
    if nkt.get("countdown"):
        lines.append(f"  Countdown:     {nkt['countdown']}")
    lines.append("")

    # All sessions
    lines.append("-" * 60)
    lines.append("  SESSION SCHEDULE (Eastern Time)")
    lines.append("-" * 60)
    for s in result["sessions"]:
        lines.append(f"  {s['name']:<25s} {s['time_et']}")
        lines.append(f"    {s['character']}")
    lines.append("")

    # Key times
    lines.append("-" * 60)
    lines.append("  KEY TIMES (Eastern Time)")
    lines.append("-" * 60)
    for kt in result["key_times"]:
        lines.append(f"  {kt['time_et']}  {kt['event']}")
    lines.append("")

    # Week schedule
    if "week_schedule" in result:
        lines.append("-" * 60)
        lines.append("  WEEK SCHEDULE")
        lines.append("-" * 60)
        for day in result["week_schedule"]:
            status = day["status"]
            extra = f" ({day.get('holiday', '')})" if day.get("holiday") else ""
            lines.append(f"  {day['day']:<12s} {day['date']}  {status}{extra}")
        lines.append("")

    lines.append("=" * 60)
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(
        description="NQ/MNQ Session Analyzer — market session timing and key events"
    )
    parser.add_argument("--timezone", default="US/Eastern",
                        help=f"Timezone: {', '.join(TZ_OFFSETS.keys())} (default: US/Eastern)")
    parser.add_argument("--week", action="store_true", help="Show full week schedule")
    parser.add_argument("--format", choices=["text", "json"], default="text",
                        help="Output format (default: text)")

    args = parser.parse_args()

    result = analyze_sessions(tz_name=args.timezone, show_week=args.week)

    if args.format == "json":
        print(json.dumps(result, indent=2))
    else:
        print(format_text(result))


if __name__ == "__main__":
    main()
