from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.conversation import Conversation, Message
from app.schemas.conversation import (
    ConversationCreate,
    ConversationResponse,
    MessageCreate,
    MessageResponse,
    SourceResponse,
)
from app.services.llm import generate_response
from app.services.knowledge import search_knowledge, format_context
from app.services.search import semantic_search, format_chunks_context

router = APIRouter()


@router.post("/conversations", response_model=ConversationResponse)
def create_conversation(data: ConversationCreate, db: Session = Depends(get_db)):
    conversation = Conversation(title=data.title)
    db.add(conversation)
    db.commit()
    db.refresh(conversation)
    return conversation


@router.get("/conversations/{conversation_id}", response_model=ConversationResponse)
def get_conversation(conversation_id: str, db: Session = Depends(get_db)):
    conversation = (
        db.query(Conversation).filter(Conversation.id == conversation_id).first()
    )
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return conversation


@router.post(
    "/conversations/{conversation_id}/messages", response_model=MessageResponse
)
async def add_message(
    conversation_id: str, data: MessageCreate, db: Session = Depends(get_db)
):
    user_message = Message(
        conversation_id=conversation_id, role="user", content=data.content
    )
    db.add(user_message)
    db.commit()

    knowledge_entries = search_knowledge(data.content, db)
    knowledge_context = format_context(knowledge_entries)

    semantic_chunks = semantic_search(data.content, db)
    semantic_context = format_chunks_context(semantic_chunks)

    full_context = knowledge_context + semantic_context

    conversation = (
        db.query(Conversation).filter(Conversation.id == conversation_id).first()
    )

    history = [
        {"role": msg.role, "content": msg.content} for msg in conversation.messages
    ]

    ai_response = await generate_response(history, full_context)

    assistant_message = Message(
        conversation_id=conversation_id, role="assistant", content=ai_response
    )
    db.add(assistant_message)
    db.commit()
    db.refresh(assistant_message)

    sources = [
        SourceResponse(
            filename=chunk.document.filename if chunk.document else "inconnu",
            excerpt=chunk.content[:150] + "..."
        )
        for chunk in semantic_chunks
    ]

    return {
        "id": str(assistant_message.id),
        "conversation_id": str(assistant_message.conversation_id),
        "role": assistant_message.role,
        "content": assistant_message.content,
        "created_at": assistant_message.created_at,
        "sources": [s.dict() for s in sources],
    }
