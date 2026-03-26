from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.conversations import router as conversations_router
from app.api.knowledge import router as knowledge_router
from app.db.database import Base, engine
from app.models import conversation, knowledge

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://172.22.83.193:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(conversations_router, prefix="/api")
app.include_router(knowledge_router, prefix="/api")


@app.get("/")
def read_root():
    return {"message": "Veine API is running"}
