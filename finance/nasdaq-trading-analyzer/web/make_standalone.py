#!/usr/bin/env python3
"""
Build a clean, standalone deployable package of the Co-Pilot web app.

Copies ONLY the files the web app needs into a fresh folder with a root-level
Dockerfile, requirements, render.yaml (with a persistent disk so outcome data
survives restarts), .gitignore, and README. The result is ready to be its own
private GitHub repo and deployed on Render / Railway / Fly.

Run:
    python3 web/make_standalone.py              # -> ./nq-copilot-standalone
    python3 web/make_standalone.py /path/to/out
"""

import os
import shutil
import sys

HERE = os.path.dirname(os.path.abspath(__file__))          # .../web
SKILL = os.path.dirname(HERE)                              # .../nasdaq-trading-analyzer

# Only these script modules are imported by the web path.
NEEDED_SCRIPTS = [
    "live_connector_alpaca.py",
    "technical_analyzer.py",
    "alpaca_api.py",
    "risk_manager.py",
    "news_scanner.py",
    "track_record.py",
]
WEB_FILES = [
    "server.py", "engine.py", "multi_engine.py", "profiles.py", "catalog.py",
    "landing.html", "dashboard.html", "catalog.html",
]

REQUIREMENTS = "websocket-client>=1.6\n"

DOCKERFILE = """\
# NQ Live Co-Pilot — standalone web app
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY scripts/ ./scripts/
COPY web/ ./web/
RUN mkdir -p /app/assets/trade-logs
ENV PYTHONUNBUFFERED=1
EXPOSE 8000
CMD ["python", "web/server.py"]
"""

RENDER_YAML = """\
# Render blueprint. New > Blueprint on render.com, point at your private repo.
# Set ALPACA_API_KEY and ALPACA_SECRET_KEY as secrets in the dashboard.
services:
  - type: web
    name: nq-live-copilot
    runtime: docker
    dockerfilePath: ./Dockerfile
    plan: starter            # ~$7/mo, always-on (required for live streaming)
    disk:
      name: data
      mountPath: /app/assets/trade-logs   # outcome data survives restarts
      sizeGB: 1
    envVars:
      - key: ALPACA_API_KEY
        sync: false          # set in dashboard (secret)
      - key: ALPACA_SECRET_KEY
        sync: false          # set in dashboard (secret)
      - key: ALPACA_ENV
        value: paper
      - key: SYMBOL
        value: TQQQ
      - key: PROFILE
        value: scalper
      - key: MIN_SCORE
        value: "55"
"""

GITIGNORE = """\
__pycache__/
*.pyc
my-config.json
assets/trade-logs/
.env
.DS_Store
"""

README = """\
# NQ Live Co-Pilot

Real-time NASDAQ setup scanner. Streams a live market proxy, scores setups for
confluence, flags high-quality entries with exact stop/target/size, and tracks
the outcome of every alert to measure the edge.

**For educational and informational purposes only — not financial advice.**

## Run locally

```
pip3 install -r requirements.txt
# provide keys via env vars or a web/my-config.json file
ALPACA_API_KEY=... ALPACA_SECRET_KEY=... python3 web/server.py
```

Open http://localhost:8000  (catalog at /catalog).

## Deploy to a public URL (Render)

1. Push this folder to a **private GitHub repo**:
   ```
   git init
   git add .
   git commit -m "NQ Live Co-Pilot"
   git branch -M main
   git remote add origin git@github.com:YOU/nq-copilot.git
   git push -u origin main
   ```
2. On https://render.com : **New > Blueprint** > pick the repo (reads render.yaml).
3. In the service **Environment** tab, set the secrets:
   - `ALPACA_API_KEY`, `ALPACA_SECRET_KEY`
4. Deploy. ~3 min later you get a public URL.

The `starter` plan keeps it always-on (needed for continuous streaming) and
the persistent disk keeps your outcome track-record across restarts.

Railway and Fly.io work the same way (persistent container from a private repo).
"""


def main():
    args = [a for a in sys.argv[1:] if a != "--force"]
    force = "--force" in sys.argv
    out = args[0] if args else os.path.join(os.getcwd(), "nq-copilot-standalone")
    out = os.path.abspath(out)
    if os.path.exists(out) and not force:
        print(f"Refusing to overwrite existing path: {out}\n"
              f"Re-run with --force to refresh the code in place "
              f"(keeps your .git history):\n"
              f"  python3 web/make_standalone.py \"{out}\" --force", file=sys.stderr)
        sys.exit(1)

    os.makedirs(os.path.join(out, "scripts"), exist_ok=True)
    os.makedirs(os.path.join(out, "web"), exist_ok=True)

    for f in NEEDED_SCRIPTS:
        shutil.copy2(os.path.join(SKILL, "scripts", f), os.path.join(out, "scripts", f))
    for f in WEB_FILES:
        shutil.copy2(os.path.join(HERE, f), os.path.join(out, "web", f))

    def write(rel, content):
        with open(os.path.join(out, rel), "w") as fh:
            fh.write(content)

    write("requirements.txt", REQUIREMENTS)
    write("Dockerfile", DOCKERFILE)
    write("render.yaml", RENDER_YAML)
    write(".gitignore", GITIGNORE)
    write("README.md", README)

    n = len(NEEDED_SCRIPTS) + len(WEB_FILES) + 5
    print(f"Built standalone package ({n} files):\n  {out}\n")
    print("Next steps:")
    print(f"  1. cd \"{out}\"")
    print("  2. git init && git add . && git commit -m \"NQ Live Co-Pilot\"")
    print("  3. Create a PRIVATE repo on GitHub, then:")
    print("     git branch -M main")
    print("     git remote add origin <your-private-repo-url>")
    print("     git push -u origin main")
    print("  4. Render.com > New > Blueprint > pick the repo; set ALPACA_* secrets.")


if __name__ == "__main__":
    main()
