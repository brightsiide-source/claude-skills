#!/bin/bash
# NQ Live Co-Pilot launcher for macOS / Linux.
# Resolves the nasdaq-trading-analyzer directory relative to this script,
# so it works no matter where the repo is placed.
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR" || exit 1
python3 scripts/live_connector_alpaca.py --config my-config.json --min-score 55 --scalp --nq-ref 25000
