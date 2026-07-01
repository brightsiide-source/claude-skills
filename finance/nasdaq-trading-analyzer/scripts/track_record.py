#!/usr/bin/env python3
"""
Track Record — Alert Outcome Summary

Reads the alert-outcomes.jsonl file produced by the live connector and
prints how each setup has actually performed (target hit vs stopped out).
Run it any evening to see the accumulating edge — no need to open the
full connector.

The live connector logs every fired alert and follows it forward to a
resolution: WIN (hit target), LOSS (hit stop), EXPIRED (triggered but
neither in 60 min), or NO_FILL (price never reached the entry).

Usage:
    python3 track_record.py
    python3 track_record.py --file ../assets/trade-logs/alert-outcomes.jsonl
    python3 track_record.py --min-n 10          # only show setups with 10+ resolved
    python3 track_record.py --format json
"""

import argparse
import json
import os
import sys
from collections import defaultdict


def load_outcomes(path):
    """Load resolved alert records from the JSONL file."""
    records = []
    try:
        with open(path) as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    records.append(json.loads(line))
                except json.JSONDecodeError:
                    continue
    except FileNotFoundError:
        return None
    return records


def _wr(win, loss):
    n = win + loss
    return (win / n * 100) if n else 0.0


def summarize(records):
    """Build aggregate statistics from the outcome records."""
    by_setup = defaultdict(lambda: {"win": 0, "loss": 0, "expired": 0,
                                    "no_fill": 0, "mfe": [], "mae": []})
    by_regime = defaultdict(lambda: {"win": 0, "loss": 0})
    by_direction = defaultdict(lambda: {"win": 0, "loss": 0})
    by_bracket = defaultdict(lambda: {"win": 0, "loss": 0})
    by_date = defaultdict(lambda: {"win": 0, "loss": 0})

    totals = {"win": 0, "loss": 0, "expired": 0, "no_fill": 0}

    for r in records:
        o = r.get("outcome")
        name = r.get("name", "?")
        # Collect run distance (max favorable excursion) for every filled trade
        if o in ("WIN", "LOSS", "EXPIRED") and r.get("mfe_pts") is not None:
            by_setup[name]["mfe"].append(r.get("mfe_pts", 0))
            by_setup[name]["mae"].append(r.get("mae_pts", 0))
        if o == "WIN":
            by_setup[name]["win"] += 1
            totals["win"] += 1
        elif o == "LOSS":
            by_setup[name]["loss"] += 1
            totals["loss"] += 1
        elif o == "EXPIRED":
            by_setup[name]["expired"] += 1
            totals["expired"] += 1
            continue
        elif o == "NO_FILL":
            by_setup[name]["no_fill"] += 1
            totals["no_fill"] += 1
            continue
        else:
            continue

        # Only WIN/LOSS reach here for the cross-tabs
        won = o == "WIN"
        key = "win" if won else "loss"
        by_regime[r.get("regime", "?") or "?"][key] += 1
        by_direction[r.get("direction", "?")][key] += 1
        by_date[r.get("date", "?")][key] += 1

        score = r.get("score", 0) or 0
        if score >= 85:
            bracket = "85-100 (A+)"
        elif score >= 75:
            bracket = "75-84  (A)"
        elif score >= 65:
            bracket = "65-74  (B+)"
        else:
            bracket = "50-64  (B)"
        by_bracket[bracket][key] += 1

    return {
        "totals": totals,
        "by_setup": dict(by_setup),
        "by_regime": dict(by_regime),
        "by_direction": dict(by_direction),
        "by_bracket": dict(by_bracket),
        "by_date": dict(by_date),
    }


def format_text(summary, min_n):
    lines = []
    t = summary["totals"]
    resolved = t["win"] + t["loss"]

    lines.append("=" * 60)
    lines.append("  ALERT TRACK RECORD")
    lines.append("=" * 60)

    if resolved == 0:
        lines.append("")
        lines.append("  No resolved alerts yet. Keep the connector running")
        lines.append("  during market hours and the record will fill in.")
        lines.append("")
        if t["no_fill"] or t["expired"]:
            lines.append(f"  (Pending/unfilled so far: "
                         f"{t['no_fill']} no-fill, {t['expired']} expired)")
        lines.append("=" * 60)
        return "\n".join(lines)

    gwr = _wr(t["win"], t["loss"])
    lines.append(f"  OVERALL: {t['win']}W - {t['loss']}L   "
                 f"({gwr:.0f}% win rate, n={resolved})")
    lines.append(f"  Also: {t['no_fill']} never filled, {t['expired']} expired")
    n_flag = "  *** enough data to trust ***" if resolved >= 40 else \
             "  (need ~40 for a reliable read)"
    lines.append(n_flag)
    lines.append("-" * 60)

    # By setup
    lines.append("  BY SETUP (target hit vs stopped):")
    rows = sorted(summary["by_setup"].items(),
                  key=lambda kv: _wr(kv[1]["win"], kv[1]["loss"]), reverse=True)
    for name, st in rows:
        n = st["win"] + st["loss"]
        if n < min_n:
            continue
        wr = _wr(st["win"], st["loss"])
        flag = ""
        if n >= 10:
            flag = "  <- edge" if wr >= 55 else ("  <- losing" if wr < 45 else "")
        lines.append(f"    {name:<28} {st['win']:>2}W-{st['loss']:>2}L  "
                     f"{wr:>3.0f}%  (n={n}){flag}")
    lines.append("-" * 60)

    # How far setups run — the "hold vs take 10" answer
    has_run_data = any(st["mfe"] for st in summary["by_setup"].values())
    if has_run_data:
        lines.append("  HOW FAR THEY RUN (avg NQ points, once triggered):")
        lines.append("    setup                        avg run   worst dip   n")
        for name, st in rows:
            if not st["mfe"]:
                continue
            avg_mfe = sum(st["mfe"]) / len(st["mfe"])
            avg_mae = sum(st["mae"]) / len(st["mae"])
            lines.append(f"    {name:<26} {avg_mfe:>6.0f}pt   {avg_mae:>6.0f}pt   "
                         f"{len(st['mfe'])}")
        lines.append("    (avg run = how far it went your way before resolving —")
        lines.append("     high avg run = let winners ride; low = take quick profits)")
        lines.append("-" * 60)

    # By score bracket
    lines.append("  BY CONFIDENCE SCORE:")
    for bracket in ["85-100 (A+)", "75-84  (A)", "65-74  (B+)", "50-64  (B)"]:
        st = summary["by_bracket"].get(bracket)
        if not st:
            continue
        n = st["win"] + st["loss"]
        lines.append(f"    {bracket:<28} {st['win']:>2}W-{st['loss']:>2}L  "
                     f"{_wr(st['win'], st['loss']):>3.0f}%  (n={n})")
    lines.append("-" * 60)

    # By regime
    lines.append("  BY REGIME:")
    for regime, st in sorted(summary["by_regime"].items()):
        n = st["win"] + st["loss"]
        lines.append(f"    {regime:<28} {st['win']:>2}W-{st['loss']:>2}L  "
                     f"{_wr(st['win'], st['loss']):>3.0f}%  (n={n})")
    lines.append("-" * 60)

    # By direction
    lines.append("  BY DIRECTION:")
    for direction, st in sorted(summary["by_direction"].items()):
        n = st["win"] + st["loss"]
        lines.append(f"    {direction:<28} {st['win']:>2}W-{st['loss']:>2}L  "
                     f"{_wr(st['win'], st['loss']):>3.0f}%  (n={n})")
    lines.append("=" * 60)

    return "\n".join(lines)


def main():
    default_path = os.path.join(
        os.path.dirname(os.path.abspath(__file__)),
        "..", "assets", "trade-logs", "alert-outcomes.jsonl")

    parser = argparse.ArgumentParser(
        description="Summarize the live connector's alert track record")
    parser.add_argument("--file", default=default_path,
                        help="Path to alert-outcomes.jsonl")
    parser.add_argument("--min-n", type=int, default=1,
                        help="Only show setups with at least this many resolved trades")
    parser.add_argument("--format", choices=["text", "json"], default="text",
                        help="Output format")

    args = parser.parse_args()

    records = load_outcomes(args.file)
    if records is None:
        print(f"No outcomes file yet at:\n  {args.file}\n\n"
              f"Run the live connector during market hours first — it "
              f"creates this file automatically as alerts resolve.",
              file=sys.stderr)
        sys.exit(1)

    summary = summarize(records)

    if args.format == "json":
        print(json.dumps(summary, indent=2))
    else:
        print(format_text(summary, args.min_n))


if __name__ == "__main__":
    main()
