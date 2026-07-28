#!/bin/bash
# NQ Live Co-Pilot Web App launcher for macOS / Linux.
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR" || exit 1
echo "Starting web app... open http://localhost:8000 in your browser"
( sleep 2; (command -v open >/dev/null && open http://localhost:8000) || \
  (command -v xdg-open >/dev/null && xdg-open http://localhost:8000) ) &
python3 web/server.py --config my-config.json --min-score 55
