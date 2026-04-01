#!/usr/bin/env python3
"""
Apex Trader Funding Risk Manager

Position sizing and risk calculator built around Apex Trader Funding
account rules with End-of-Day (EOD) drawdown system. Optimized for
1-min and 5-min NQ/MNQ scalping.

Usage:
    python3 risk_manager.py --account 50k --entry 18450.50 --stop 18430.00 --target 18490.00
    python3 risk_manager.py --account 100k --balance 101250 --pnl -500
    python3 risk_manager.py --account 50k --entry 18450 --stop 18430 --targets 18470,18490,18510
"""

import argparse
import json
import sys

# Apex Trader Funding Account Specifications (as of 2026)
# EOD (End-of-Day) drawdown system — drawdown is evaluated based on
# your end-of-day balance, NOT intraday equity swings.
APEX_ACCOUNTS = {
    "25k": {"balance": 25000, "drawdown": 1500, "max_nq": 4, "max_mnq": 40},
    "50k": {"balance": 50000, "drawdown": 2500, "max_nq": 10, "max_mnq": 100},
    "75k": {"balance": 75000, "drawdown": 2750, "max_nq": 12, "max_mnq": 120},
    "100k": {"balance": 100000, "drawdown": 3000, "max_nq": 14, "max_mnq": 140},
    "150k": {"balance": 150000, "drawdown": 5000, "max_nq": 17, "max_mnq": 170},
    "250k": {"balance": 250000, "drawdown": 6500, "max_nq": 27, "max_mnq": 270},
    "300k": {"balance": 300000, "drawdown": 7500, "max_nq": 35, "max_mnq": 350},
}

# Tick values
NQ_TICK = 0.25      # Minimum price movement
NQ_TICK_VALUE = 5.00  # Dollar value per tick
NQ_POINT_VALUE = 20.00  # Dollar value per point

MNQ_TICK = 0.25
MNQ_TICK_VALUE = 0.50
MNQ_POINT_VALUE = 2.00


def calculate_risk(entry: float, stop: float, target: float = None,
                   targets: list = None, account_key: str = "50k",
                   balance: float = None, instrument: str = "NQ") -> dict:
    """Calculate position sizing and risk metrics."""
    acct = APEX_ACCOUNTS.get(account_key.lower())
    if not acct:
        return {"error": f"Unknown account type: {account_key}. Use: {', '.join(APEX_ACCOUNTS.keys())}"}

    is_long = entry > stop
    direction = "LONG" if is_long else "SHORT"

    # Point and tick calculations
    stop_distance = abs(entry - stop)
    stop_ticks = stop_distance / NQ_TICK

    point_value = NQ_POINT_VALUE if instrument.upper() == "NQ" else MNQ_POINT_VALUE
    tick_value = NQ_TICK_VALUE if instrument.upper() == "NQ" else MNQ_TICK_VALUE
    max_contracts = acct["max_nq"] if instrument.upper() == "NQ" else acct["max_mnq"]

    risk_per_contract = stop_distance * point_value
    current_balance = balance if balance else acct["balance"]

    # EOD drawdown floor — based on end-of-day settled balance, not intraday
    drawdown_limit = acct["drawdown"]
    drawdown_floor = current_balance - drawdown_limit

    # Max risk should be fraction of drawdown
    # For 1m/5m scalping with EOD drawdown, you can take more trades per day
    # since the floor only moves on settled EOD balance
    conservative_risk = drawdown_limit * 0.15  # 15% of drawdown
    moderate_risk = drawdown_limit * 0.25      # 25% of drawdown
    aggressive_risk = drawdown_limit * 0.40    # 40% of drawdown

    def contracts_for_risk(max_risk):
        if risk_per_contract <= 0:
            return 0
        return min(int(max_risk / risk_per_contract), max_contracts)

    sizing = {
        "conservative": {
            "contracts": contracts_for_risk(conservative_risk),
            "risk_dollars": round(contracts_for_risk(conservative_risk) * risk_per_contract, 2),
            "pct_of_drawdown": 15,
        },
        "moderate": {
            "contracts": contracts_for_risk(moderate_risk),
            "risk_dollars": round(contracts_for_risk(moderate_risk) * risk_per_contract, 2),
            "pct_of_drawdown": 25,
        },
        "aggressive": {
            "contracts": contracts_for_risk(aggressive_risk),
            "risk_dollars": round(contracts_for_risk(aggressive_risk) * risk_per_contract, 2),
            "pct_of_drawdown": 40,
        },
    }

    result = {
        "account": {
            "type": account_key.upper(),
            "starting_balance": acct["balance"],
            "current_balance": current_balance,
            "eod_drawdown": drawdown_limit,
            "drawdown_floor": drawdown_floor,
            "drawdown_type": "END-OF-DAY",
            "max_contracts": max_contracts,
            "instrument": instrument.upper(),
        },
        "trade": {
            "direction": direction,
            "entry": entry,
            "stop": stop,
            "stop_distance_points": round(stop_distance, 2),
            "stop_distance_ticks": int(stop_ticks),
            "risk_per_contract": round(risk_per_contract, 2),
        },
        "position_sizing": sizing,
    }

    # Scalping metrics (for 1m/5m traders)
    result["scalp_metrics"] = {
        "ticks_to_stop": int(stop_ticks),
        "risk_per_tick_nq": NQ_TICK_VALUE,
        "risk_per_tick_mnq": MNQ_TICK_VALUE,
        "breakeven_ticks": max(1, int(stop_ticks * 0.1)),  # Approximate for commissions
        "note": "EOD drawdown = intraday unrealized P&L does NOT move the floor",
    }

    # Target analysis
    target_list = []
    if targets:
        target_list = targets
    elif target:
        target_list = [target]

    if target_list:
        target_analysis = []
        for i, t in enumerate(target_list):
            reward_distance = abs(t - entry)
            reward_per_contract = reward_distance * point_value
            rr_ratio = reward_distance / stop_distance if stop_distance > 0 else 0

            target_info = {
                "target": t,
                "distance_points": round(reward_distance, 2),
                "distance_ticks": int(reward_distance / NQ_TICK),
                "reward_per_contract": round(reward_per_contract, 2),
                "risk_reward_ratio": f"1:{rr_ratio:.2f}",
                "rr_numeric": round(rr_ratio, 2),
            }

            # P&L at each sizing level
            for level in ["conservative", "moderate", "aggressive"]:
                contracts = sizing[level]["contracts"]
                target_info[f"{level}_pnl"] = round(contracts * reward_per_contract, 2)

            target_analysis.append(target_info)

        result["targets"] = target_analysis

        # Scale-out plan (if multiple targets)
        if len(target_list) > 1:
            mod_contracts = sizing["moderate"]["contracts"]
            if mod_contracts > 1:
                scale_plan = []
                remaining = mod_contracts
                for i, t in enumerate(target_list):
                    if i == len(target_list) - 1:
                        exit_qty = remaining
                    else:
                        exit_qty = max(1, remaining // (len(target_list) - i))
                    remaining -= exit_qty
                    scale_plan.append({
                        "target": t,
                        "exit_contracts": exit_qty,
                        "remaining_after": remaining,
                    })
                result["scale_out_plan"] = scale_plan

    # Drawdown warnings
    warnings = []
    if current_balance and current_balance <= drawdown_floor + drawdown_limit * 0.3:
        warnings.append(f"WARNING: EOD balance within 30% of drawdown floor (${drawdown_floor:.2f})")
    if sizing["conservative"]["contracts"] == 0:
        warnings.append("WARNING: Risk per contract exceeds conservative risk limit — reduce stop distance or use MNQ")
    if risk_per_contract > drawdown_limit * 0.5:
        warnings.append("DANGER: Single contract risk exceeds 50% of total drawdown — do NOT take this trade")

    if warnings:
        result["warnings"] = warnings

    return result


def calculate_drawdown_status(account_key: str, balance: float, pnl: float = 0) -> dict:
    """Calculate current EOD drawdown status.

    With EOD drawdown, only your end-of-day settled balance matters.
    Intraday unrealized P&L does NOT move the drawdown floor.
    The floor trails up based on highest EOD closing balance only.
    """
    acct = APEX_ACCOUNTS.get(account_key.lower())
    if not acct:
        return {"error": f"Unknown account: {account_key}"}

    # EOD balance = settled balance + realized P&L from today
    eod_balance = balance + pnl
    drawdown_limit = acct["drawdown"]

    # The EOD floor is based on the highest end-of-day balance seen
    # (passed in as --balance, which should be yesterday's closing balance)
    eod_floor = balance - drawdown_limit
    remaining = eod_balance - eod_floor
    pct_used = ((drawdown_limit - remaining) / drawdown_limit) * 100 if remaining < drawdown_limit else 0

    status = "SAFE"
    if remaining < drawdown_limit * 0.2:
        status = "CRITICAL"
    elif remaining < drawdown_limit * 0.4:
        status = "CAUTION"
    elif remaining < drawdown_limit * 0.6:
        status = "WATCH"

    return {
        "account_type": account_key.upper(),
        "drawdown_type": "END-OF-DAY",
        "starting_balance": acct["balance"],
        "prior_eod_balance": balance,
        "session_pnl": pnl,
        "projected_eod_balance": round(eod_balance, 2),
        "eod_drawdown_limit": drawdown_limit,
        "eod_floor": round(eod_floor, 2),
        "remaining_to_floor": round(remaining, 2),
        "drawdown_used_pct": round(pct_used, 1),
        "status": status,
        "max_eod_loss": round(remaining, 2),
        "note": "Floor based on EOD settled balance — intraday swings do NOT affect it",
    }


def format_text(result: dict) -> str:
    """Format results as human-readable text."""
    lines = []

    if "error" in result:
        return f"Error: {result['error']}"

    # Drawdown status mode
    if "projected_eod_balance" in result:
        lines.append("=" * 60)
        lines.append("  APEX EOD DRAWDOWN STATUS")
        lines.append("=" * 60)
        lines.append(f"  Account:            {result['account_type']}")
        lines.append(f"  Drawdown Type:      {result['drawdown_type']}")
        lines.append(f"  Prior EOD Balance:  ${result['prior_eod_balance']:,.2f}")
        lines.append(f"  Session P&L:        ${result['session_pnl']:+,.2f}")
        lines.append(f"  Projected EOD Bal:  ${result['projected_eod_balance']:,.2f}")
        lines.append("")
        lines.append(f"  EOD Drawdown Limit: ${result['eod_drawdown_limit']:,.2f}")
        lines.append(f"  EOD Floor:          ${result['eod_floor']:,.2f}")
        lines.append(f"  Remaining:          ${result['remaining_to_floor']:,.2f}")
        lines.append(f"  Used:               {result['drawdown_used_pct']:.1f}%")
        lines.append("")
        status = result["status"]
        if status == "CRITICAL":
            lines.append(f"  >>> STATUS: {status} — STOP TRADING <<<")
        elif status == "CAUTION":
            lines.append(f"  >>> STATUS: {status} — Reduce size or stop <<<")
        else:
            lines.append(f"  >>> STATUS: {status} <<<")
        lines.append(f"  Max EOD loss before breach: ${result['max_eod_loss']:,.2f}")
        lines.append("")
        lines.append(f"  NOTE: {result['note']}")
        lines.append("=" * 60)
        return "\n".join(lines)

    # Trade risk mode
    acct = result["account"]
    trade = result["trade"]

    lines.append("=" * 60)
    lines.append("  APEX RISK MANAGER (EOD Drawdown)")
    lines.append("=" * 60)
    lines.append(f"  Account:       {acct['type']} ({acct['instrument']})")
    lines.append(f"  Balance:       ${acct['current_balance']:,.2f}")
    lines.append(f"  EOD Drawdown:  ${acct['eod_drawdown']:,.2f}")
    lines.append(f"  Drawdown Type: {acct['drawdown_type']}")
    lines.append(f"  Max Contracts: {acct['max_contracts']}")
    lines.append("")
    lines.append("-" * 60)
    lines.append(f"  TRADE SETUP: {trade['direction']}")
    lines.append("-" * 60)
    lines.append(f"  Entry:       {trade['entry']:.2f}")
    lines.append(f"  Stop:        {trade['stop']:.2f}")
    lines.append(f"  Stop Dist:   {trade['stop_distance_points']:.2f} pts ({trade['stop_distance_ticks']} ticks)")
    lines.append(f"  Risk/Ct:     ${trade['risk_per_contract']:.2f}")
    lines.append("")

    # Scalp metrics
    if "scalp_metrics" in result:
        sm = result["scalp_metrics"]
        lines.append("-" * 60)
        lines.append("  SCALP METRICS (1m/5m)")
        lines.append("-" * 60)
        lines.append(f"  Ticks to stop:     {sm['ticks_to_stop']}")
        lines.append(f"  $/tick (NQ):       ${sm['risk_per_tick_nq']:.2f}")
        lines.append(f"  $/tick (MNQ):      ${sm['risk_per_tick_mnq']:.2f}")
        lines.append(f"  EOD Advantage:     Intraday swings do NOT move the floor")
        lines.append("")

    lines.append("-" * 60)
    lines.append("  POSITION SIZING")
    lines.append("-" * 60)
    for level, data in result["position_sizing"].items():
        lines.append(f"  {level.upper():.<15s} {data['contracts']} contracts  (${data['risk_dollars']:,.2f} risk, {data['pct_of_drawdown']}% of drawdown)")
    lines.append("")

    if "targets" in result:
        lines.append("-" * 60)
        lines.append("  TARGET ANALYSIS")
        lines.append("-" * 60)
        for t in result["targets"]:
            lines.append(f"  Target {t['target']:.2f}:")
            lines.append(f"    Distance:   {t['distance_points']:.2f} pts ({t['distance_ticks']} ticks)")
            lines.append(f"    R:R:        {t['risk_reward_ratio']}")
            lines.append(f"    Reward/Ct:  ${t['reward_per_contract']:.2f}")
            lines.append(f"    P&L (mod):  ${t['moderate_pnl']:,.2f}")
            lines.append("")

    if "scale_out_plan" in result:
        lines.append("-" * 60)
        lines.append("  SCALE-OUT PLAN (moderate sizing)")
        lines.append("-" * 60)
        for step in result["scale_out_plan"]:
            lines.append(f"  @ {step['target']:.2f} -> exit {step['exit_contracts']} contracts (remaining: {step['remaining_after']})")
        lines.append("")

    if "warnings" in result:
        lines.append("-" * 60)
        for w in result["warnings"]:
            lines.append(f"  !! {w}")
        lines.append("-" * 60)

    lines.append("=" * 60)
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(
        description="Apex Trader Funding Risk Manager — EOD drawdown position sizing and tracking"
    )
    parser.add_argument("--account", required=True,
                        help=f"Apex account type: {', '.join(APEX_ACCOUNTS.keys())}")
    parser.add_argument("--entry", type=float, help="Trade entry price")
    parser.add_argument("--stop", type=float, help="Stop loss price")
    parser.add_argument("--target", type=float, help="Single profit target")
    parser.add_argument("--targets", help="Comma-separated profit targets for scale-out plan")
    parser.add_argument("--balance", type=float, help="Prior EOD closing balance (default: starting balance)")
    parser.add_argument("--pnl", type=float, help="Current session realized P&L (for EOD drawdown tracking)")
    parser.add_argument("--instrument", choices=["NQ", "MNQ"], default="NQ",
                        help="Instrument: NQ or MNQ (default: NQ)")
    parser.add_argument("--format", choices=["text", "json"], default="text",
                        help="Output format (default: text)")

    args = parser.parse_args()

    # Drawdown status mode
    if args.pnl is not None and args.entry is None:
        balance = args.balance or APEX_ACCOUNTS.get(args.account.lower(), {}).get("balance", 0)
        result = calculate_drawdown_status(args.account, balance, args.pnl)
    elif args.entry is not None and args.stop is not None:
        targets = [float(x) for x in args.targets.split(",")] if args.targets else None
        result = calculate_risk(
            entry=args.entry,
            stop=args.stop,
            target=args.target,
            targets=targets,
            account_key=args.account,
            balance=args.balance,
            instrument=args.instrument,
        )
    else:
        parser.print_help()
        sys.exit(1)

    if args.format == "json":
        print(json.dumps(result, indent=2))
    else:
        print(format_text(result))


if __name__ == "__main__":
    main()
