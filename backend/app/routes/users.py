from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas import UserCreate, UserOut
from app.services.user_service import create_user, get_all_users

router = APIRouter()

@router.post("/", response_model=UserOut)
async def create_user_route(user: UserCreate, db: AsyncSession = Depends(get_db)):
    return await create_user(user, db)

@router.get("/", response_model=list[UserOut])
async def get_all_users_route(db: AsyncSession = Depends(get_db)):
    return await get_all_users(db)
