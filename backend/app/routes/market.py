from fastapi import APIRouter
from ..utils.polymarket_api import get_market_data
router = APIRouter()

@router.get("/all")
def fetch_all_markets():
    return get_market_data()