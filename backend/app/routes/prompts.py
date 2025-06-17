from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database import get_db
from app.models.prompt import Prompt
from app.models.user import User
from app.schemas import PromptCreate, PromptOut
from datetime import datetime
import os
import httpx

router = APIRouter()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

@router.post("/", response_model=PromptOut)
async def create_prompt(data: PromptCreate, db: AsyncSession = Depends(get_db)):

    result = await db.execute(select(User).where(User.id_number == data.user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    
    headers = {"Authorization": f"Bearer {OPENAI_API_KEY}"}
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "You are a helpful learning assistant."},
            {"role": "user", "content": data.prompt}
        ]
    }

    async with httpx.AsyncClient() as client:
        response = await client.post("https://api.openai.com/v1/chat/completions", json=payload, headers=headers)
        ai_response = response.json()["choices"][0]["message"]["content"]

    new_prompt = Prompt(
        user_id=data.user_id,
        category_id=data.category_id,
        sub_category_id=data.sub_category_id,
        prompt=data.prompt,
        response=ai_response,
        created_at=datetime.utcnow()
    )
    db.add(new_prompt)
    await db.commit()
    await db.refresh(new_prompt)
    return new_prompt

@router.get("/{user_id}", response_model=list[PromptOut])
async def get_user_prompts(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Prompt).where(Prompt.user_id == user_id))
    prompts = result.scalars().all()
    return prompts
