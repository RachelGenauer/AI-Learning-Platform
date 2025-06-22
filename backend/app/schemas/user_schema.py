from pydantic import BaseModel
from typing import Optional

class DeleteResponse(BaseModel):
    detail: str


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