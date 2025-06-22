from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class DeleteResponse(BaseModel):
    detail: str


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



