import asyncio
from app.database import engine, Base
from app.models import user, category, sub_category, prompt

async def init_models():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

if __name__ == "__main__":
    asyncio.run(init_models())
