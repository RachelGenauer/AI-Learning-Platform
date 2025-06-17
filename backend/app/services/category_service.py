from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.category import Category
from app.schemas import CategoryCreate
from fastapi import HTTPException

async def create_category(category: CategoryCreate, db: AsyncSession) -> Category:
    result = await db.execute(select(Category).where(Category.name == category.name))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Category already exists")

    new_category = Category(name=category.name)
    db.add(new_category)
    await db.commit()
    await db.refresh(new_category)
    return new_category

async def get_all_categories(db: AsyncSession) -> list[Category]:
    result = await db.execute(select(Category))
    return result.scalars().all()
