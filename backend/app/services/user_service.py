from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.user import User
from app.schemas import UserCreate
from fastapi import HTTPException

async def create_user(user_data: UserCreate, db: AsyncSession) -> User:
    
    result = await db.execute(select(User).where(User.id_number == user_data.id_number))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="User with this ID already exists")

    new_user = User(
        id_number=user_data.id_number,
        name=user_data.name,
        phone=user_data.phone
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user

async def get_all_users(db: AsyncSession) -> list[User]:
    result = await db.execute(select(User))
    return result.scalars().all()
