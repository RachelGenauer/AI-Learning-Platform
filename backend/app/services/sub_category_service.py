from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.sub_category import SubCategory
from app.models.category import Category
from app.schemas import SubCategoryCreate
from fastapi import HTTPException

async def create_sub_category(data: SubCategoryCreate, db: AsyncSession) -> SubCategory:
    result = await db.execute(select(Category).where(Category.id == data.category_id))
    if result.scalar_one_or_none() is None:
        raise HTTPException(status_code=404, detail="Category not found")

    new_sub_category = SubCategory(name=data.name, category_id=data.category_id)
    db.add(new_sub_category)
    await db.commit()
    await db.refresh(new_sub_category)
    return new_sub_category

async def get_all_sub_categories(db: AsyncSession) -> list[SubCategory]:
    result = await db.execute(select(SubCategory))
    return result.scalars().all()
