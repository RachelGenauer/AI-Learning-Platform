from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# User Schemas

class UserBase(BaseModel):
    id_number: str
    name: str
    phone: str

class UserCreate(UserBase):
    pass

class UserOut(UserBase):
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
    user_id: str 
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
