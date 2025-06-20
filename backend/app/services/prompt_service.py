import os
from datetime import datetime
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.user import User
from app.models.prompt import Prompt
from app.models.category import Category
from app.models.sub_category import SubCategory
from app.schemas import PromptCreate, PromptUpdate
import httpx
from dotenv import load_dotenv

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

async def create_prompt(data: PromptCreate, db: AsyncSession) -> dict:
    result = await db.execute(select(User).where(User.id_number == data.user_id))
    if result.scalar_one_or_none() is None:
        raise HTTPException(status_code=404, detail="User not found")

    category_result = await db.execute(select(Category).where(Category.name == data.category_name))
    category = category_result.scalar_one_or_none()
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")

    sub_category_result = await db.execute(
        select(SubCategory).where(
            SubCategory.name == data.sub_category_name,
            SubCategory.category_id == category.id
        )
    )
    sub_category = sub_category_result.scalar_one_or_none()
    if sub_category is None:
        raise HTTPException(status_code=404, detail="Sub-category not found")

    headers = {"Authorization": f"Bearer {OPENAI_API_KEY}"}
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "You are a helpful learning assistant."},
            {"role": "user", "content": data.prompt}
        ]
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.openai.com/v1/chat/completions",
                json=payload,
                headers=headers
            )
            response.raise_for_status()
            response_json = response.json()
            ai_response = response_json["choices"][0]["message"]["content"]
    except Exception:
        ai_response = "Unable to connect to the AI service at the moment. Please try again later."
    new_prompt = Prompt(
        user_id=data.user_id,
        category_id=category.id,
        sub_category_id=sub_category.id,
        prompt=data.prompt,
        response=ai_response,
        created_at=datetime.utcnow()
    )
    db.add(new_prompt)
    await db.commit()
    await db.refresh(new_prompt)

    return {
        "response": ai_response
    }

async def get_all_prompts(db: AsyncSession):
    stmt = (
        select(
            Prompt.id,
            Prompt.user_id,
            Prompt.prompt,
            Prompt.response,
            Prompt.created_at,
            Category.name.label("category_name"),
            SubCategory.name.label("sub_category_name")
        )
        .join(Category, Category.id == Prompt.category_id)
        .join(SubCategory, SubCategory.id == Prompt.sub_category_id)
    )
    result = await db.execute(stmt)
    return [
        {
            "id": row.id,
            "user_id": row.user_id,
            "prompt": row.prompt,
            "response": row.response,
            "created_at": row.created_at,
            "category_name": row.category_name,
            "sub_category_name": row.sub_category_name
        }
        for row in result.all()
    ]


async def get_user_prompt_details(user_id: str, db: AsyncSession):
    stmt = (
        select(
            Prompt.id,
            Prompt.user_id,
            Prompt.prompt,
            Prompt.response,
            Prompt.created_at,
            Category.name.label("category_name"),
            SubCategory.name.label("sub_category_name")
        )
        .join(Category, Category.id == Prompt.category_id)
        .join(SubCategory, SubCategory.id == Prompt.sub_category_id)
        .where(Prompt.user_id == user_id)
    )
    result = await db.execute(stmt)
    rows = result.all()

    if not rows:
        raise HTTPException(status_code=404, detail="User ID not found or has no prompts.")

    return [
        {
            "id": row.id,
            "user_id": row.user_id,
            "prompt": row.prompt,
            "response": row.response,
            "created_at": row.created_at,
            "category_name": row.category_name,
            "sub_category_name": row.sub_category_name
        }
        for row in rows
    ]


async def update_prompt(prompt_id: int, data: PromptUpdate, db: AsyncSession):
    result = await db.execute(select(Prompt).where(Prompt.id == prompt_id))
    prompt = result.scalar_one_or_none()
    if not prompt:
        raise HTTPException(status_code=404, detail="Prompt not found")
    if data.prompt:
        prompt.prompt = data.prompt
    if data.response:
        prompt.response = data.response
    await db.commit()
    await db.refresh(prompt)
    return prompt

async def delete_prompt(prompt_id: int, db: AsyncSession):
    prompt = await db.get(Prompt, prompt_id)
    if not prompt:
        raise HTTPException(status_code=404, detail="Prompt not found")
    await db.delete(prompt)
    await db.commit()
    return {"detail": "Prompt deleted successfully"}