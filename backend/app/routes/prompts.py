from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.prompt_schema import PromptCreate, PromptResponse, PromptFullOut, PromptUpdate, DeleteResponse
from app.services.prompt_service import create_prompt, get_all_prompts, get_user_prompt_details, delete_prompt

router = APIRouter()

@router.post("/", response_model=PromptResponse)
async def create_prompt_route(data: PromptCreate, db: AsyncSession = Depends(get_db)):
    return await create_prompt(data, db)

@router.get("/all", response_model=list[PromptFullOut])
async def get_all_prompts_route(db: AsyncSession = Depends(get_db)):
    return await get_all_prompts(db)

@router.get("/{user_id}", response_model=list[PromptFullOut])
async def get_user_prompts_route(user_id: str, db: AsyncSession = Depends(get_db)):
    return await get_user_prompt_details(user_id, db)

@router.put("/{prompt_id}")
async def update_prompt_route(prompt_id: int, data: PromptUpdate, db: AsyncSession = Depends(get_db)):
    return await update_prompt(prompt_id, data, db)

@router.delete("/{prompt_id}", response_model=DeleteResponse)
async def delete_prompt_route(prompt_id: int, db: AsyncSession = Depends(get_db)):
    return await delete_prompt(prompt_id, db)