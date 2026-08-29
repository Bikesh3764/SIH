import urllib.request

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

def fetch_url(url):
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        return f"Error: {e}"

market_jsx = fetch_url('https://raw.githubusercontent.com/Yashvi2874/ammachi_ai/main/frontend/src/pages/Market.jsx')
print("MARKET JSX (first 1200 chars):\n", market_jsx[:1200])

signup_jsx = fetch_url('https://raw.githubusercontent.com/Yashvi2874/ammachi_ai/main/frontend/src/pages/SignUp.jsx')
print("\nSIGNUP JSX (first 1000 chars):\n", signup_jsx[:1000])
