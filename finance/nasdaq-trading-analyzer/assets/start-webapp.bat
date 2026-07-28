@echo off
title NQ Live Co-Pilot - Web App
cd /d "C:\Users\David Washburn\Desktop\claude-skills-claude-nasdaq-trading-analyzer-EEuO4\finance\nasdaq-trading-analyzer"
echo ============================================================
echo   Starting NQ Live Co-Pilot Web App...
echo   When it says "Open: http://localhost:8000",
echo   open that address in Chrome.
echo ============================================================
start "" "http://localhost:8000"
"C:\Users\David Washburn\AppData\Local\Python\pythoncore-3.14-64\python.exe" web\server.py --config my-config.json --min-score 55
pause
