from pydantic import BaseModel
from typing import Optional

class DeleteResponse(BaseModel):
    detail: str


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