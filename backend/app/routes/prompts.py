from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas import PromptCreate, PromptOut
from app.services.prompt_service import create_prompt, get_user_prompts

router = APIRouter()

@router.post("/", response_model=PromptOut)
async def create_prompt_route(data: PromptCreate, db: AsyncSession = Depends(get_db)):
    return await create_prompt(data, db)

@router.get("/{user_id}", response_model=list[PromptOut])
async def get_user_prompts_route(user_id: str, db: AsyncSession = Depends(get_db)):
    return await get_user_prompts(user_id, db)
