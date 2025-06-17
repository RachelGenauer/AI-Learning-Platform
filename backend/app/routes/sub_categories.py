from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas import SubCategoryCreate, SubCategoryOut
from app.services.sub_category_service import create_sub_category, get_all_sub_categories

router = APIRouter()

@router.post("/", response_model=SubCategoryOut)
async def create_sub_category_route(sub_category: SubCategoryCreate, db: AsyncSession = Depends(get_db)):
    return await create_sub_category(sub_category, db)

@router.get("/", response_model=list[SubCategoryOut])
async def get_all_sub_categories_route(db: AsyncSession = Depends(get_db)):
    return await get_all_sub_categories(db)
