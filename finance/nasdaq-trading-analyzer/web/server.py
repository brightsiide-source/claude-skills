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
_HTML_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dashboard.html")


class Handler(BaseHTTPRequestHandler):
    def _send(self, code, body, content_type="application/json"):
        self.send_response(code)
        self.send_header("Content-Type", content_type)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path.startswith("/api/state"):
            state = _ENGINE.get_state() if _ENGINE else {"status": "no-engine"}
            self._send(200, json.dumps(state).encode("utf-8"))
        elif self.path in ("/", "/index.html", "/dashboard.html"):
            try:
                with open(_HTML_PATH, "rb") as f:
                    self._send(200, f.read(), "text/html; charset=utf-8")
            except FileNotFoundError:
                self._send(404, b"dashboard.html not found", "text/plain")
        elif self.path == "/health":
            self._send(200, b'{"ok":true}')
        else:
            self._send(404, b'{"error":"not found"}')

    def log_message(self, *args):
        pass  # quiet — no per-request console spam


def load_config(path):
    with open(path) as f:
        cfg = json.load(f)
    for k in ("api_key", "secret_key"):
        if k not in cfg:
            print(f"Error: config missing {k}", file=sys.stderr)
            sys.exit(1)
    return cfg


def main():
    global _ENGINE
    p = argparse.ArgumentParser(description="NQ Live Co-Pilot — web server")
    p.add_argument("--config", required=True)
    p.add_argument("--port", type=int, default=8000)
    p.add_argument("--host", default="0.0.0.0")
    p.add_argument("--min-score", type=int, default=55)
    p.add_argument("--nq-ref", type=float, default=25000)
    p.add_argument("--no-scalp", action="store_true",
                   help="Disable scalp calibration (use full-swing targets)")
    args = p.parse_args()

    cfg = load_config(args.config)
    scalp = None if args.no_scalp else {
        "stop_points": 12, "target_points": 20,
        "nq_ref": cfg.get("nq_reference_price", args.nq_ref),
    }

    _ENGINE = WebEngine(cfg, min_score=args.min_score, scalp=scalp)
    _ENGINE.start()

    server = ThreadingHTTPServer((args.host, args.port), Handler)
    print("=" * 60)
    print("  NQ LIVE CO-PILOT — Web Dashboard")
    print(f"  Open:  http://localhost:{args.port}")
    print(f"  Phone: http://<your-computer-ip>:{args.port}  (same wifi)")
    print(f"  Min score: {args.min_score}  |  Scalp: {not args.no_scalp}")
    print("  Ctrl+C to stop")
    print("=" * 60)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n  Shutting down...")
        server.shutdown()


if __name__ == "__main__":
    main()
