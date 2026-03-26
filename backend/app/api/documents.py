from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.document import Document, DocumentChunk
from app.services.pdf import extract_text_from_pdf
from app.services.embeddings import generate_embedding, chunk_text
from pydantic import BaseModel
from uuid import UUID

router = APIRouter()


class DocumentResponse(BaseModel):
    id: UUID
    filename: str

    class Config:
        from_attributes = True


@router.post("/documents", response_model=DocumentResponse)
async def upload_document(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400, detail="Seuls les fichiers PDF sont acceptés"
        )

    file_bytes = await file.read()
    text = extract_text_from_pdf(file_bytes)

    document = Document(filename=file.filename, content=text)
    db.add(document)
    db.commit()
    db.refresh(document)

    chunks = chunk_text(text)
    for i, chunk_content in enumerate(chunks):
        embedding = generate_embedding(chunk_content)
        chunk = DocumentChunk(
            document_id=document.id,
            content=chunk_content,
            chunk_index=i,
            embedding=embedding,
        )
        db.add(chunk)

    db.commit()
    return document


@router.get("/documents", response_model=list[DocumentResponse])
def get_documents(db: Session = Depends(get_db)):
    return db.query(Document).all()


@router.delete("/documents/{document_id}")
def delete_document(document_id: str, db: Session = Depends(get_db)):
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document non trouvé")
    db.delete(document)
    db.commit()
    return {"message": "Document supprimé"}
