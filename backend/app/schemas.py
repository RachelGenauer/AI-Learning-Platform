from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class DeleteResponse(BaseModel):
    detail: str

# User Schemas

from pydantic import BaseModel

class UserBase(BaseModel):
    id_number: str
    name: str
    phone: str

class UserCreate(UserBase):
    pass

class UserOut(UserBase):
    class Config:
        orm_mode = True


class UserLogin(BaseModel):
    name: str
    phone: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None

# Category Schemas

class CategoryBase(BaseModel):
    name: str

class CategoryCreate(CategoryBase):
    pass

class CategoryOut(CategoryBase):
    id: int

    class Config:
        orm_mode = True

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    
# SubCategory Schemas

class SubCategoryBase(BaseModel):
    name: str
    category_id: int

class SubCategoryCreate(BaseModel):
    name: str
    category_name: str

class SubCategoryOut(SubCategoryBase):
    id: int

    class Config:
        orm_mode = True


class SubCategoryDelete(BaseModel):
    id: int 
    name: str

    class Config:
        orm_mode = True
        
class SubCategoryUpdate(BaseModel):
    name: Optional[str] = None
    category_name: Optional[str] = None 

# Prompt Schemas

class PromptBase(BaseModel):
    user_id: str
    category_name: str
    sub_category_name: str
    prompt: str


class PromptCreate(PromptBase):
    pass

class PromptResponse(BaseModel):
    response: str



class PromptFullOut(PromptBase):
    id: int
    response: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class PromptUpdate(BaseModel):
    prompt: Optional[str] = None
    response: Optional[str] = None



