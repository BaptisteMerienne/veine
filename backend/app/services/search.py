from sqlalchemy.orm import Session
from app.models.document import DocumentChunk
from app.services.embeddings import generate_embedding


def semantic_search(query: str, db: Session, limit: int = 3) -> list[DocumentChunk]:
    query_embedding = generate_embedding(query)

    chunks = (
        db.query(DocumentChunk)
        .order_by(DocumentChunk.embedding.cosine_distance(query_embedding))
        .limit(limit)
        .all()
    )

    return chunks


def format_chunks_context(chunks: list[DocumentChunk]) -> str:
    if not chunks:
        return ""

    context = "Voici les extraits pertinents trouvés dans vos documents :\n\n"
    for i, chunk in enumerate(chunks, 1):
        context += f"Extrait {i} (document: {chunk.document.filename}):\n"
        context += f"{chunk.content}\n\n"

    return context
