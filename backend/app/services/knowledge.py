from sqlalchemy.orm import Session
from app.models.knowledge import KnowledgeEntry


SYNONYMS = {
    "combien": ["tarif", "prix", "coût", "formule"],
    "coûte": ["tarif", "prix", "coût", "formule"],
    "cout": ["tarif", "prix", "coût", "formule"],
    "joindre": ["contact", "support", "téléphone", "email"],
    "contacter": ["contact", "support", "téléphone", "email"],
    "horaire": ["ouverture", "heure", "disponible"],
    "ouvert": ["horaire", "ouverture", "heure"],
}


def expand_query(query: str) -> list[str]:
    words = query.lower().split()
    expanded = list(words)
    for word in words:
        if word in SYNONYMS:
            expanded.extend(SYNONYMS[word])
    return expanded


def search_knowledge(query: str, db: Session) -> list[KnowledgeEntry]:
    entries = db.query(KnowledgeEntry).all()
    expanded_words = expand_query(query)
    relevant = []

    for entry in entries:
        if any(
            word in entry.question.lower() or word in entry.answer.lower()
            for word in expanded_words
            if len(word) > 3
        ):
            relevant.append(entry)

    return relevant[:3]


def format_context(entries: list[KnowledgeEntry]) -> str:
    if not entries:
        return ""

    context = "Voici des informations pertinentes de la base de connaissances :\n\n"
    for entry in entries:
        context += f"Q: {entry.question}\nR: {entry.answer}\n\n"

    return context
