from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import users, prompts, categories, sub_categories
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(prompts.router, prefix="/prompts", tags=["Prompts"])
app.include_router(categories.router, prefix="/categories", tags=["Categories"])
app.include_router(sub_categories.router, prefix="/sub-categories", tags=["SubCategories"])


@app.get("/")
def read_root():
    return {"msg": "Welcome to the AI Learning Platform API"}
