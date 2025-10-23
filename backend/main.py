from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to call backend
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample market route
@app.get("/market/all")
def get_all_markets():
    return [
        {"id": "1", "title": "BTC Price Prediction"},
        {"id": "2", "title": "ETH Price Prediction"},
        {"id": "3", "title": "BNB Price Prediction"}
    ]

# Sample portfolio route
@app.get("/portfolio/all")
def get_portfolio():
    return [
        {"id": "1", "asset": "BTC", "amount": 0.5, "gain_loss": "+5%"},
        {"id": "2", "asset": "ETH", "amount": 2, "gain_loss": "-2%"},
        {"id": "3", "asset": "BNB", "amount": 10, "gain_loss": "+1%"}
    ]

# Sample alerts route
@app.get("/alerts/all")
def get_alerts():
    return [
        {"id": "1", "market": "BTC", "target_price": "40000", "status": "Pending"},
        {"id": "2", "market": "ETH", "target_price": "2500", "status": "Triggered"},
        {"id": "3", "market": "BNB", "target_price": "350", "status": "Pending"}
    ]

@app.get("/")
def root():
    return {"message": "Crypto Insight Tracker Backend Running"}
