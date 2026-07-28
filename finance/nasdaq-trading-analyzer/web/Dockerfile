# NQ Live Co-Pilot — web app container
FROM python:3.12-slim

WORKDIR /app
COPY finance/nasdaq-trading-analyzer/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the skill (scripts + web)
COPY finance/nasdaq-trading-analyzer /app/nasdaq-trading-analyzer

WORKDIR /app/nasdaq-trading-analyzer
ENV PYTHONUNBUFFERED=1
# Cloud hosts inject $PORT; the server reads it automatically.
EXPOSE 8000
CMD ["python", "web/server.py"]
