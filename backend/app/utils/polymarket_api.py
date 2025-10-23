import requests

POLY_API = "https://api.polymarket.com/v1/markets"

def get_market_data():
    response = requests.get(POLY_API)
    if response.status_code == 200:
        return response.json()
    return {"error": "Unable to fetch market data"}