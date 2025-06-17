from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

# User Schemas

class UserBase(BaseModel):
    name: str = Field(..., example="ישראל ישראלי")
    phone: str = Field(..., example="050-1234567")

class UserCreate(UserBase):
    pass

class UserOut(UserBase):
    id: int

    class Config:
        orm_mode = True

# Category Schemas

class CategoryBase(BaseModel):
    name: str

class CategoryCreate(CategoryBase):
    pass

class CategoryOut(CategoryBase):
    id: int

    class Config:
        orm_mode = True

# SubCategory Schemas

class SubCategoryBase(BaseModel):
    name: str
    category_id: int

class SubCategoryCreate(SubCategoryBase):
    pass

class SubCategoryOut(SubCategoryBase):
    id: int

    class Config:
        orm_mode = True

# Prompt Schemas

class PromptBase(BaseModel):
    user_id: int
    category_id: int
    sub_category_id: int
    prompt: str

class PromptCreate(PromptBase):
    pass

class PromptOut(PromptBase):
    id: int
    response: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True
