from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.category import Category
from app.schemas.category_schema import CategoryCreate, CategoryUpdate
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

async def update_category(category_id: int, data: CategoryUpdate, db: AsyncSession):
    result = await db.execute(select(Category).where(Category.id == category_id))
    category = result.scalar_one_or_none()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    if data.name:
        category.name = data.name
    await db.commit()
    await db.refresh(category)
    return category

async def delete_category(category_id: int, db: AsyncSession):
    category = await db.get(Category, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    await db.delete(category)
    await db.commit()
    return {"detail": "Category deleted successfully"}

