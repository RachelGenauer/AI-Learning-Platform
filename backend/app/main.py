from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import users, prompts, categories, sub_categories
from app.handlers.error_handlers import (
    value_error_handler,
    lookup_error_handler,
    generic_error_handler,
)

app = FastAPI(
    title="AI Learning Platform API",
    description="A platform to manage users, prompts, categories, and sub-categories",
    version="1.0.0",
)

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
app.include_router(sub_categories.router, prefix="/sub-categories", tags=["Sub-Categories"])

app.add_exception_handler(ValueError, value_error_handler)
app.add_exception_handler(LookupError, lookup_error_handler)
app.add_exception_handler(Exception, generic_error_handler)

@app.get("/")
def read_root():
    return {"msg": "Welcome to the AI Learning Platform API"}
