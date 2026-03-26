from mistralai.client import Mistral
from app.core.config import settings

client = Mistral(api_key=settings.MISTRAL_API_KEY)


async def generate_response(messages: list[dict]) -> str:
    response = await client.chat.complete_async(
        model="mistral-small-latest", messages=messages
    )
    return response.choices[0].message.content
