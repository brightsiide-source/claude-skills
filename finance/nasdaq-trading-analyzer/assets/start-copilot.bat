@echo off
title NQ Live Co-Pilot
cd /d "C:\Users\David Washburn\Desktop\claude-skills-claude-nasdaq-trading-analyzer-EEuO4\finance\nasdaq-trading-analyzer"
"C:\Users\David Washburn\AppData\Local\Python\pythoncore-3.14-64\python.exe" scripts\live_connector_alpaca.py --config my-config.json --min-score 65
pause
