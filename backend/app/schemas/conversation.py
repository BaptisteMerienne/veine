from pydantic import BaseModel
from datetime import datetime
from uuid import UUID
from typing import Optional


class MessageBase(BaseModel):
    role: str
    content: str


class MessageCreate(MessageBase):
    pass


class SourceResponse(BaseModel):
    filename: str
    excerpt: str


class MessageResponse(MessageBase):
    id: UUID
    conversation_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True


class ConversationCreate(BaseModel):
    title: Optional[str] = None


class ConversationResponse(BaseModel):
    id: UUID
    title: Optional[str]
    created_at: datetime
    messages: list[MessageResponse] = []

    class Config:
        from_attributes = True
