from sqlalchemy import Column, String, Text
from sqlalchemy.dialects.postgresql import UUID
from app.db.database import Base
import uuid


class KnowledgeEntry(Base):
    __tablename__ = "knowledge_entries"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    category = Column(String, nullable=True)
