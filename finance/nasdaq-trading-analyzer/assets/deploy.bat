@echo off
title Deploy NQ Co-Pilot
echo ============================================================
echo   DEPLOYING NQ LIVE CO-PILOT
echo ============================================================
echo.
echo [1/4] Pulling the latest source...
cd /d "C:\Users\David Washburn\Desktop\trading-src\finance\nasdaq-trading-analyzer"
git pull
echo.
echo [2/4] Refreshing the deploy package...
python web\make_standalone.py "C:\Users\David Washburn\Desktop\nq-copilot" --force
echo.
echo [3/4] Committing the update...
cd /d "C:\Users\David Washburn\Desktop\nq-copilot"
git add .
git commit -m "Deploy update"
echo.
echo [4/4] Pushing (Render auto-redeploys in ~3 min)...
git push
echo.
echo ============================================================
echo   DONE. Wait ~3 min, then hard-refresh your site.
echo ============================================================
pause
