from pydantic import BaseModel
from typing import Optional

class DeleteResponse(BaseModel):
    detail: str


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