from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.sub_category import SubCategory
from app.models.category import Category
from app.schemas import SubCategoryCreate, SubCategoryUpdate
from fastapi import HTTPException

async def create_sub_category(data: SubCategoryCreate, db: AsyncSession) -> SubCategory:
    result = await db.execute(select(Category).where(Category.name == data.category_name))
    category = result.scalar_one_or_none()
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")

    new_sub_category = SubCategory(name=data.name, category_id=category.id)
    db.add(new_sub_category)
    await db.commit()
    await db.refresh(new_sub_category)
    return new_sub_category

async def get_all_sub_categories(db: AsyncSession) -> list[SubCategory]:
    result = await db.execute(select(SubCategory))
    return result.scalars().all()

async def get_sub_categories_by_category_name(category_name: str, db: AsyncSession):
    category_result = await db.execute(select(Category).where(Category.name == category_name))
    category = category_result.scalar_one_or_none()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    # שליפת כל תת-הקטגוריות עם כל השדות, לא רק name
    result = await db.execute(select(SubCategory).where(SubCategory.category_id == category.id))
    sub_categories = result.scalars().all()
    
    # החזרת id ו-name כך שהפרונט ידע למחוק לפי id
    return [{"id": sc.id, "name": sc.name} for sc in sub_categories]

async def update_sub_category(sub_category_id: int, data: SubCategoryUpdate, db: AsyncSession):
    result = await db.execute(select(SubCategory).where(SubCategory.id == sub_category_id))
    sub_category = result.scalar_one_or_none()
    if not sub_category:
        raise HTTPException(status_code=404, detail="Sub-category not found")
    if data.name:
        sub_category.name = data.name
    if data.category_name:
        category_result = await db.execute(select(Category).where(Category.name == data.category_name))
        category = category_result.scalar_one_or_none()
        if not category:
            raise HTTPException(status_code=404, detail="New category not found")
        sub_category.category_id = category.id
    await db.commit()
    await db.refresh(sub_category)
    return sub_category

async def delete_sub_category(sub_category_id: int, db: AsyncSession):
    sub_category = await db.get(SubCategory, sub_category_id)
    if not sub_category:
        raise HTTPException(status_code=404, detail="Sub-category not found")
    await db.delete(sub_category)
    await db.commit()
    return {"detail": "Sub-category deleted successfully"}
