from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.category_schema import CategoryCreate, CategoryOut, CategoryUpdate, DeleteResponse
from app.services.category_service import create_category, get_all_categories, delete_category

router = APIRouter()

@router.post("/", response_model=CategoryOut)
async def create_category_route(category: CategoryCreate, db: AsyncSession = Depends(get_db)):
    return await create_category(category, db)

@router.get("/", response_model=list[CategoryOut])
async def get_all_categories_route(db: AsyncSession = Depends(get_db)):
    return await get_all_categories(db)

@router.put("/{category_id}")
async def update_category_route(category_id: int, data: CategoryUpdate, db: AsyncSession = Depends(get_db)):
    return await update_category(category_id, data, db)

@router.delete("/{category_id}", response_model=DeleteResponse)
async def delete_category_route(category_id: int, db: AsyncSession = Depends(get_db)):
    return await delete_category(category_id, db)
