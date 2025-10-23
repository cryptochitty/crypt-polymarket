from fastapi import APIRouter
router = APIRouter()

@router.get("/all")
def get_portfolio():
    return {"portfolio": []}