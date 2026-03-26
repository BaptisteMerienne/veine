from pydantic import BaseModel
from uuid import UUID
from typing import Optional


class KnowledgeEntryCreate(BaseModel):
    question: str
    answer: str
    category: Optional[str] = None


class KnowledgeEntryResponse(BaseModel):
    id: UUID
    question: str
    answer: str
    category: Optional[str]

    class Config:
        from_attributes = True
