from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.sub_category import SubCategory
from app.models.category import Category
from app.schemas.sub_category_schema import SubCategoryCreate, SubCategoryUpdate
from app.exceptions import NotFoundException, AlreadyExistsException


async def create_sub_category(data: SubCategoryCreate, db: AsyncSession) -> SubCategory:
    result = await db.execute(select(Category).where(Category.name == data.category_name))
    category = result.scalar_one_or_none()
    if category is None:
        raise NotFoundException("Category")

    existing_sub = await db.execute(
        select(SubCategory).where(
            SubCategory.name == data.name,
            SubCategory.category_id == category.id
        )
    )
    if existing_sub.scalar_one_or_none():
        raise AlreadyExistsException("Sub-category")

    new_sub_category = SubCategory(name=data.name, category_id=category.id)
    db.add(new_sub_category)
    await db.commit()
    await db.refresh(new_sub_category)
    return new_sub_category


async def get_all_sub_categories(db: AsyncSession) -> list[SubCategory]:
    result = await db.execute(select(SubCategory))
    return result.scalars().all()


async def get_sub_categories_by_category_name(category_name: str, db: AsyncSession) -> list[dict]:
    result = await db.execute(select(Category).where(Category.name == category_name))
    category = result.scalar_one_or_none()
    if not category:
        raise NotFoundException("Category")

    result = await db.execute(select(SubCategory).where(SubCategory.category_id == category.id))
    sub_categories = result.scalars().all()

    return [{"id": sc.id, "name": sc.name} for sc in sub_categories]


async def update_sub_category(sub_category_id: int, data: SubCategoryUpdate, db: AsyncSession) -> SubCategory:
    result = await db.execute(select(SubCategory).where(SubCategory.id == sub_category_id))
    sub_category = result.scalar_one_or_none()
    if not sub_category:
        raise NotFoundException("Sub-category")

    if data.name:
        sub_category.name = data.name

    if data.category_name:
        result = await db.execute(select(Category).where(Category.name == data.category_name))
        category = result.scalar_one_or_none()
        if not category:
            raise NotFoundException("New category")
        sub_category.category_id = category.id

    await db.commit()
    await db.refresh(sub_category)
    return sub_category


async def delete_sub_category(sub_category_id: int, db: AsyncSession) -> dict:
    sub_category = await db.get(SubCategory, sub_category_id)
    if not sub_category:
        raise NotFoundException("Sub-category")
    await db.delete(sub_category)
    await db.commit()
    return {"detail": "Sub-category deleted successfully"}
