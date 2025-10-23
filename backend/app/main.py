from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import market, portfolio, alerts


app = FastAPI(title="Crypto Insight Tracker API")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(market.router, prefix="/market")
app.include_router(portfolio.router, prefix="/portfolio")
app.include_router(alerts.router, prefix="/alerts")

@app.get("/")
def read_root():
    return {"message": "Crypto Insight Tracker API is live!"}