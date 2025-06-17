from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas import CategoryCreate, CategoryOut
from app.services.category_service import create_category, get_all_categories

router = APIRouter()

@router.post("/", response_model=CategoryOut)
async def create_category_route(category: CategoryCreate, db: AsyncSession = Depends(get_db)):
    return await create_category(category, db)

@router.get("/", response_model=list[CategoryOut])
async def get_all_categories_route(db: AsyncSession = Depends(get_db)):
    return await get_all_categories(db)
