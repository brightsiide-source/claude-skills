#!/usr/bin/env python3
"""
Alpaca Markets API Client

Handles REST authentication and WebSocket connections for
real-time market data streaming via Alpaca's free paper trading API.

Requirements:
    pip install websocket-client

This module is used by live_connector_alpaca.py — not run directly.
"""

import json
import ssl
import sys
import threading
import time
from datetime import datetime, timezone
from queue import Queue, Empty
from typing import Callable, Dict, List, Optional
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

try:
    import websocket
    HAS_WEBSOCKET = True
except ImportError:
    HAS_WEBSOCKET = False

# ─── Alpaca API Endpoints ────────────────────────────────────────────────

ENVIRONMENTS = {
    "paper": {
        "api": "https://paper-api.alpaca.markets",
        "data": "https://data.alpaca.markets",
        "stream": "wss://stream.data.alpaca.markets/v1beta1/crypto",
        "stream_stocks": "wss://stream.data.alpaca.markets/v2/iex",
        "stream_news": "wss://stream.data.alpaca.markets/v1beta1/news",
    },
    "live": {
        "api": "https://api.alpaca.markets",
        "data": "https://data.alpaca.markets",
        "stream": "wss://stream.data.alpaca.markets/v1beta1/crypto",
        "stream_stocks": "wss://stream.data.alpaca.markets/v2/sip",
        "stream_news": "wss://stream.data.alpaca.markets/v1beta1/news",
    },
}


def check_dependencies():
    """Verify required packages are installed."""
    if not HAS_WEBSOCKET:
        print("=" * 60, file=sys.stderr)
        print("  MISSING DEPENDENCY: websocket-client", file=sys.stderr)
        print("  Install with: pip install websocket-client", file=sys.stderr)
        print("=" * 60, file=sys.stderr)
        sys.exit(1)


# ─── REST API Client ────────────────────────────────────────────────────

class AlpacaREST:
    """Alpaca REST API client for account info and historical data."""

    def __init__(self, api_key: str, secret_key: str, env: str = "paper"):
        self.api_key = api_key
        self.secret_key = secret_key
        self.base_url = ENVIRONMENTS[env]["api"]
        self.data_url = ENVIRONMENTS[env]["data"]

    def _headers(self) -> dict:
        return {
            "APCA-API-KEY-ID": self.api_key,
            "APCA-API-SECRET-KEY": self.secret_key,
            "Content-Type": "application/json",
            "Accept": "application/json",
        }

    def _request(self, url: str, method: str = "GET", body: dict = None) -> dict:
        data = json.dumps(body).encode("utf-8") if body else None
        req = Request(url, data=data, headers=self._headers(), method=method)
        try:
            with urlopen(req, timeout=10) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except HTTPError as e:
            error_body = e.read().decode("utf-8") if e.fp else str(e)
            raise ConnectionError(f"Alpaca API error {e.code}: {error_body}")
        except URLError as e:
            raise ConnectionError(f"Connection failed: {e.reason}")

    def get_account(self) -> dict:
        """Get account information."""
        return self._request(f"{self.base_url}/v2/account")

    def get_positions(self) -> list:
        """Get all open positions."""
        return self._request(f"{self.base_url}/v2/positions")

    def get_bars(self, symbol: str, timeframe: str = "1Min",
                 limit: int = 200, days_back: int = 3,
                 adjustment: str = "raw") -> list:
        """Get historical bars.

        Args:
            symbol: e.g. 'NQ=F' for NQ futures, 'QQQ' for NASDAQ ETF
            timeframe: '1Min', '5Min', '15Min', '1Hour', '1Day'
            limit: number of bars (max 10000)
            days_back: how many calendar days back to look (default 3)
            adjustment: 'raw' | 'split' | 'dividend' | 'all'. Use 'all' for
                multi-year backtests so stock splits/dividends don't create
                fake price cliffs. Intraday live use keeps 'raw' to match the
                live quote.
        """
        from datetime import datetime, timedelta, timezone
        start = (datetime.now(timezone.utc) - timedelta(days=days_back)).strftime("%Y-%m-%dT%H:%M:%SZ")
        url = (f"{self.data_url}/v2/stocks/{symbol}/bars"
               f"?timeframe={timeframe}&limit={limit}&start={start}"
               f"&adjustment={adjustment}&feed=iex")
        result = self._request(url)
        return result.get("bars", [])

    def get_latest_quote(self, symbol: str) -> dict:
        """Get the latest quote for a symbol."""
        url = f"{self.data_url}/v2/stocks/{symbol}/quotes/latest?feed=iex"
        return self._request(url)

    def get_latest_trade(self, symbol: str) -> dict:
        """Get the latest trade for a symbol."""
        url = f"{self.data_url}/v2/stocks/{symbol}/trades/latest?feed=iex"
        return self._request(url)


# ─── WebSocket Streaming Client ──────────────────────────────────────────

class AlpacaStream:
    """Alpaca WebSocket client for real-time market data.

    Alpaca WebSocket protocol:
    1. Connect to wss://stream.data.alpaca.markets/v2/iex (or /v2/sip for live)
    2. Send auth message: {"action":"auth","key":"...","secret":"..."}
    3. Receive: [{"T":"success","msg":"authenticated"}]
    4. Subscribe: {"action":"subscribe","bars":["TQQQ"],"quotes":["TQQQ"]}
    5. Receive real-time data as JSON arrays
    """

    def __init__(self, api_key: str, secret_key: str, env: str = "paper",
                 on_bar: Callable = None, on_quote: Callable = None,
                 on_trade: Callable = None, on_error: Callable = None):
        self.api_key = api_key
        self.secret_key = secret_key
        self.env = env
        self.on_bar_cb = on_bar
        self.on_quote_cb = on_quote
        self.on_trade_cb = on_trade
        self.on_error_cb = on_error
        self.ws: Optional[websocket.WebSocketApp] = None
        self.thread: Optional[threading.Thread] = None
        self.connected = False
        self.authenticated = False
        self._subscriptions: Dict[str, list] = {"bars": [], "quotes": [], "trades": []}

    def connect(self):
        """Connect to the WebSocket in a background thread."""
        check_dependencies()
        url = ENVIRONMENTS[self.env]["stream_stocks"]

        self.ws = websocket.WebSocketApp(
            url,
            on_open=self._on_open,
            on_message=self._on_message,
            on_error=self._on_error,
            on_close=self._on_close,
        )
        self.thread = threading.Thread(
            target=self.ws.run_forever,
            kwargs={"sslopt": {"cert_reqs": ssl.CERT_NONE}},
            daemon=True,
        )
        self.thread.start()

        # Wait for auth
        deadline = time.time() + 15
        while not self.authenticated and time.time() < deadline:
            time.sleep(0.1)

        if not self.authenticated:
            raise ConnectionError("Failed to authenticate with Alpaca within 15s")

    def subscribe(self, bars: list = None, quotes: list = None,
                  trades: list = None):
        """Subscribe to real-time data for symbols."""
        msg = {"action": "subscribe"}
        if bars:
            msg["bars"] = bars
            self._subscriptions["bars"].extend(bars)
        if quotes:
            msg["quotes"] = quotes
            self._subscriptions["quotes"].extend(quotes)
        if trades:
            msg["trades"] = trades
            self._subscriptions["trades"].extend(trades)
        self.ws.send(json.dumps(msg))

    def unsubscribe(self, bars: list = None, quotes: list = None,
                    trades: list = None):
        """Unsubscribe from symbols."""
        msg = {"action": "unsubscribe"}
        if bars:
            msg["bars"] = bars
        if quotes:
            msg["quotes"] = quotes
        if trades:
            msg["trades"] = trades
        self.ws.send(json.dumps(msg))

    def close(self):
        if self.ws:
            self.ws.close()
        self.connected = False
        self.authenticated = False

    def _on_open(self, ws):
        self.connected = True
        # Send auth
        auth_msg = {
            "action": "auth",
            "key": self.api_key,
            "secret": self.secret_key,
        }
        ws.send(json.dumps(auth_msg))

    def _on_message(self, ws, raw):
        try:
            messages = json.loads(raw)
        except json.JSONDecodeError:
            return

        if not isinstance(messages, list):
            messages = [messages]

        for msg in messages:
            if not isinstance(msg, dict):
                continue

            msg_type = msg.get("T")

            # Auth response
            if msg_type == "success" and msg.get("msg") == "authenticated":
                self.authenticated = True
                continue

            if msg_type == "error":
                if self.on_error_cb:
                    self.on_error_cb(msg.get("msg", "Unknown error"))
                continue

            # Bar data
            if msg_type == "b":
                if self.on_bar_cb:
                    bar = {
                        "symbol": msg.get("S", ""),
                        "open": float(msg.get("o", 0)),
                        "high": float(msg.get("h", 0)),
                        "low": float(msg.get("l", 0)),
                        "close": float(msg.get("c", 0)),
                        "volume": int(msg.get("v", 0)),
                        "datetime": msg.get("t", ""),
                        "vwap": float(msg.get("vw", 0)),
                    }
                    self.on_bar_cb(bar)

            # Quote data
            elif msg_type == "q":
                if self.on_quote_cb:
                    quote = {
                        "symbol": msg.get("S", ""),
                        "bid": float(msg.get("bp", 0)),
                        "ask": float(msg.get("ap", 0)),
                        "bid_size": int(msg.get("bs", 0)),
                        "ask_size": int(msg.get("as", 0)),
                        "datetime": msg.get("t", ""),
                    }
                    self.on_quote_cb(quote)

            # Trade data
            elif msg_type == "t":
                if self.on_trade_cb:
                    trade = {
                        "symbol": msg.get("S", ""),
                        "price": float(msg.get("p", 0)),
                        "size": int(msg.get("s", 0)),
                        "datetime": msg.get("t", ""),
                    }
                    self.on_trade_cb(trade)

    def _on_error(self, ws, error):
        if self.on_error_cb:
            self.on_error_cb(str(error))

    def _on_close(self, ws, code, msg):
        self.connected = False
        self.authenticated = False
