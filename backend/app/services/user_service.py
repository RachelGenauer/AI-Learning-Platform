from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.user import User
from app.schemas import UserCreate, UserLogin, UserUpdate
from fastapi import HTTPException



async def create_user(user_data: UserCreate, db: AsyncSession) -> User:
    result = await db.execute(
        select(User).where(
            (User.id_number == user_data.id_number) |
            (User.name == user_data.name) |
            (User.phone == user_data.phone)
        )
    )
    existing_user = result.scalar_one_or_none()

    if existing_user:
        if existing_user.id_number == user_data.id_number:
            raise HTTPException(status_code=400, detail="id_number already exists")
        elif existing_user.name == user_data.name:
            raise HTTPException(status_code=400, detail="name already exists")
        elif existing_user.phone == user_data.phone:
            raise HTTPException(status_code=400, detail="phone already exists")

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

async def login_user(data: UserLogin, db: AsyncSession):
    result = await db.execute(select(User).where(User.name == data.name))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.phone != data.phone:
        raise HTTPException(status_code=400, detail="Phone number is incorrect")

    return {
        "id": user.id_number,
        "name": user.name,
        "phone": user.phone  
    }



async def update_user(user_id: str, data: UserUpdate, db: AsyncSession):
    result = await db.execute(select(User).where(User.id_number == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if data.name:
        user.name = data.name
    if data.phone:
        user.phone = data.phone
    await db.commit()
    await db.refresh(user)
    return user

async def delete_user(user_id: str, db: AsyncSession):
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    await db.delete(user)
    await db.commit()
    return {"detail": "User deleted successfully"}

