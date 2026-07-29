#!/usr/bin/env python3
"""
Web Server — serves the NQ Live Co-Pilot as a browser dashboard.

Phase 1 of the web-app build: reuses the full analysis engine and exposes it
over HTTP so you (and anyone you point at the URL on your network) can watch
the co-pilot in a browser or phone instead of a terminal. Uses only the
standard library plus websocket-client (same single dependency as the CLI).

Run:
    python3 web/server.py --config my-config.json
    python3 web/server.py --config my-config.json --port 8000 --min-score 55

Then open http://localhost:8000  (or http://<your-LAN-ip>:8000 from a phone
on the same wifi).

Deployment (Phase 2) is the same command on a cloud host with the port
exposed — no code changes needed.
"""

import argparse
import json
import os
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "scripts"))

from engine import WebEngine  # noqa: E402

_ENGINE = None
_WEB_DIR = os.path.dirname(os.path.abspath(__file__))
_HTML_PATH = os.path.join(_WEB_DIR, "dashboard.html")
_CATALOG_HTML = os.path.join(_WEB_DIR, "catalog.html")
_OUTCOMES = os.path.join(_WEB_DIR, "..", "assets", "trade-logs", "alert-outcomes.jsonl")


class Handler(BaseHTTPRequestHandler):
    def _send(self, code, body, content_type="application/json"):
        self.send_response(code)
        self.send_header("Content-Type", content_type)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _serve_file(self, path):
        try:
            with open(path, "rb") as f:
                self._send(200, f.read(), "text/html; charset=utf-8")
        except FileNotFoundError:
            self._send(404, b"not found", "text/plain")

    def do_GET(self):
        if self.path.startswith("/api/state"):
            state = _ENGINE.get_state() if _ENGINE else {"status": "no-engine"}
            self._send(200, json.dumps(state).encode("utf-8"))
        elif self.path.startswith("/api/catalog"):
            try:
                from catalog import build_catalog
                body = json.dumps(build_catalog(_OUTCOMES))
            except Exception as e:
                body = json.dumps({"error": str(e)})
            self._send(200, body.encode("utf-8"))
        elif self.path.startswith("/catalog"):
            self._serve_file(_CATALOG_HTML)
        elif self.path in ("/", "/index.html", "/dashboard.html"):
            self._serve_file(_HTML_PATH)
        elif self.path == "/health":
            self._send(200, b'{"ok":true}')
        else:
            self._send(404, b'{"error":"not found"}')

    def log_message(self, *args):
        pass  # quiet — no per-request console spam


def load_config(path=None):
    """Load config from a file and/or environment variables.

    For local use, pass a --config JSON file. For cloud deployment, set the
    keys as environment variables (ALPACA_API_KEY, ALPACA_SECRET_KEY, etc.)
    so no secrets ever live in the repo. Env vars override the file.
    """
    cfg = {}
    if path:
        with open(path) as f:
            cfg = json.load(f)
    env_map = {
        "api_key": "ALPACA_API_KEY", "secret_key": "ALPACA_SECRET_KEY",
        "environment": "ALPACA_ENV", "symbol": "SYMBOL",
        "apex_account": "APEX_ACCOUNT", "apex_balance": "APEX_BALANCE",
        "instrument": "INSTRUMENT",
    }
    for key, env in env_map.items():
        if os.environ.get(env):
            val = os.environ[env]
            if key == "apex_balance":
                try:
                    val = float(val)
                except ValueError:
                    continue
            cfg[key] = val
    for k in ("api_key", "secret_key"):
        if k not in cfg:
            print(f"Error: missing {k}. Provide --config or set ALPACA_API_KEY "
                  f"/ ALPACA_SECRET_KEY env vars.", file=sys.stderr)
            sys.exit(1)
    return cfg


def main():
    global _ENGINE
    p = argparse.ArgumentParser(description="NQ Live Co-Pilot — web server")
    p.add_argument("--config", default=None,
                   help="Config JSON (optional if ALPACA_* env vars are set)")
    p.add_argument("--port", type=int, default=int(os.environ.get("PORT", 8000)),
                   help="Port (defaults to $PORT for cloud hosts, else 8000)")
    p.add_argument("--host", default="0.0.0.0")
    p.add_argument("--min-score", type=int, default=None,
                   help="Override the profile's min score")
    p.add_argument("--nq-ref", type=float,
                   default=float(os.environ.get("NQ_REF", 25000)))
    p.add_argument("--profile", default=os.environ.get("PROFILE", "scalper"),
                   help="Trading profile: scalper | swing | position | stocks")
    p.add_argument("--no-scalp", action="store_true")
    args = p.parse_args()

    cfg = load_config(args.config)

    from profiles import get_profile
    prof = get_profile(args.profile)

    # Precedence: explicit flag > MIN_SCORE env > profile default
    if args.min_score is not None:
        min_score = args.min_score
    elif os.environ.get("MIN_SCORE"):
        min_score = int(os.environ["MIN_SCORE"])
    else:
        min_score = prof.get("min_score", 55)

    scalp = None
    if not args.no_scalp and prof.get("scalp"):
        scalp = dict(prof["scalp"])
        scalp["nq_ref"] = cfg.get("nq_reference_price", args.nq_ref)

    _ENGINE = WebEngine(cfg, min_score=min_score, scalp=scalp)
    _ENGINE.state_dashboard.meta = {
        "profile": args.profile, "profile_label": prof.get("label", args.profile),
        "asset_class": prof.get("asset_class", "futures"),
    }
    _ENGINE.start()

    server = ThreadingHTTPServer((args.host, args.port), Handler)
    print("=" * 60)
    print("  NQ LIVE CO-PILOT — Web Dashboard")
    print(f"  Profile: {prof.get('label', args.profile)}")
    print(f"  Open:  http://localhost:{args.port}")
    print(f"  Phone: http://<your-computer-ip>:{args.port}  (same wifi)")
    print(f"  Min score: {min_score}  |  Scalp: {scalp is not None}")
    print("  Ctrl+C to stop")
    print("=" * 60)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n  Shutting down...")
        server.shutdown()


if __name__ == "__main__":
    main()
