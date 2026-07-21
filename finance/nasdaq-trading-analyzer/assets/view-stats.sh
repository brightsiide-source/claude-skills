#!/bin/bash
# Track-record viewer for macOS / Linux.
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR" || exit 1
python3 scripts/track_record.py
