from mistralai.client import Mistral
from app.core.config import settings

client = Mistral(api_key=settings.MISTRAL_API_KEY)


def generate_embedding(text: str) -> list[float]:
    response = client.embeddings.create(model="mistral-embed", inputs=[text])
    return response.data[0].embedding


def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> list[str]:
    words = text.split()
    chunks = []
    start = 0

    while start < len(words):
        end = start + chunk_size
        chunk = " ".join(words[start:end])
        chunks.append(chunk)
        start = end - overlap

    return chunks
