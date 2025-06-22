from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.user_schema import UserCreate, UserOut, UserLogin, UserUpdate, DeleteResponse
from app.services.user_service import create_user, get_all_users, login_user, delete_user, update_user

router = APIRouter()

@router.post("/", response_model=UserOut)
async def create_user_route(user: UserCreate, db: AsyncSession = Depends(get_db)):
    return await create_user(user, db)

@router.get("/", response_model=list[UserOut])
async def get_all_users_route(db: AsyncSession = Depends(get_db)):
    return await get_all_users(db)

@router.post("/login")
async def login_route(data: UserLogin, db: AsyncSession = Depends(get_db)):
    return await login_user(data, db)

@router.put("/{user_id}")
async def update_user_route(user_id: int, data: UserUpdate, db: AsyncSession = Depends(get_db)):
    return await update_user(user_id, data, db)

@router.delete("/{user_id}", response_model=DeleteResponse)
async def delete_user_route(user_id: str, db: AsyncSession = Depends(get_db)):
    return await delete_user(user_id, db)
