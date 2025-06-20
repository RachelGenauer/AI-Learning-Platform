from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas import SubCategoryCreate, SubCategoryOut, SubCategoryDelete, SubCategoryUpdate, DeleteResponse
from app.services.sub_category_service import create_sub_category, get_all_sub_categories, get_sub_categories_by_category_name, delete_sub_category

router = APIRouter()

@router.post("/", response_model=SubCategoryOut)
async def create_sub_category_route(sub_category: SubCategoryCreate, db: AsyncSession = Depends(get_db)):
    return await create_sub_category(sub_category, db)

@router.get("/sub-categories", response_model=list[SubCategoryOut])
async def get_all_sub_categories_route(db: AsyncSession = Depends(get_db)):
    return await get_all_sub_categories(db)

@router.get("/{category_name}", response_model=list[SubCategoryDelete])
async def get_sub_categories_by_category_name_route(category_name: str, db: AsyncSession = Depends(get_db)):
    return await get_sub_categories_by_category_name(category_name, db)

@router.put("/{sub_category_id}")
async def update_sub_category_route(sub_category_id: int, data: SubCategoryUpdate, db: AsyncSession = Depends(get_db)):
    return await update_sub_category(sub_category_id, data, db)

@router.delete("/{sub_category_id}", response_model=DeleteResponse)
async def delete_sub_category_route(sub_category_id: int, db: AsyncSession = Depends(get_db)):
    return await delete_sub_category(sub_category_id, db)
