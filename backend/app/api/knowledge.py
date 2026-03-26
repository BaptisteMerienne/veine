from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.knowledge import KnowledgeEntry
from app.schemas.knowledge import KnowledgeEntryCreate, KnowledgeEntryResponse

router = APIRouter()


@router.post("/knowledge", response_model=KnowledgeEntryResponse)
def create_entry(data: KnowledgeEntryCreate, db: Session = Depends(get_db)):
    entry = KnowledgeEntry(
        question=data.question, answer=data.answer, category=data.category
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry


@router.get("/knowledge", response_model=list[KnowledgeEntryResponse])
def get_entries(db: Session = Depends(get_db)):
    return db.query(KnowledgeEntry).all()
