from mistralai.client import Mistral
from app.core.config import settings

client = Mistral(api_key=settings.MISTRAL_API_KEY)


async def generate_response(messages: list[dict], context: str = "") -> str:
    system_prompt = """Tu es Veine, un assistant documentaire intelligent et précis.
Tu réponds en français de manière claire et concise.
Tu t'appuies sur les informations fournies dans le contexte quand elles sont disponibles."""

    if context:
        system_prompt += f"\n\n{context}"

    full_messages = [{"role": "system", "content": system_prompt}, *messages]

    response = await client.chat.complete_async(
        model="mistral-small-latest", messages=full_messages
    )
    return response.choices[0].message.content
