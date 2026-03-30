# Veine

> Extrayez la connaissance de vos documents

Veine est un assistant documentaire intelligent qui permet de poser des questions en langage naturel sur une base de connaissances composée de FAQ et de documents PDF, grâce à un pipeline RAG moderne.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green)
![Mistral](https://img.shields.io/badge/Mistral-AI-orange)
![pgvector](https://img.shields.io/badge/pgvector-Supabase-blue)

---

## Fonctionnalités

- Chat en temps réel avec historique de conversation
- Pipeline RAG complet — recherche sémantique sur documents PDF
- Upload et indexation de PDF depuis l'interface admin
- Réponses enrichies avec sources citées
- Base de connaissances FAQ avec recherche par mots-clés
- Interface moderne et responsive

---

## Stack technique

**Frontend**
- Next.js 16 + TypeScript
- Tailwind CSS + shadcn/ui

**Backend**
- FastAPI + Python
- SQLAlchemy + Pydantic

**Base de données**
- Supabase (PostgreSQL + pgvector)

**IA**
- Mistral AI — génération de réponses
- sentence-transformers — embeddings locaux
- PyMuPDF — extraction de texte PDF

---

## Architecture
```
Utilisateur
    |
    v
Next.js Frontend (Vercel)
    |
    v
FastAPI Backend (Railway)
    |
    +---> Supabase PostgreSQL + pgvector
    |
    +---> Mistral API
    |
    +---> sentence-transformers (embeddings locaux)
    |
    +---> PyMuPDF (extraction PDF)
```

### Flux RAG

1. L'utilisateur pose une question
2. Le backend génère un embedding de la question
3. pgvector recherche les chunks les plus proches sémantiquement
4. Les extraits pertinents sont injectés dans le prompt
5. Mistral génère une réponse contextualisée
6. La réponse et les sources sont retournées au frontend

---

## Installation locale

### Prérequis

- Node.js 20+
- Python 3.12+
- Un compte Supabase
- Une clé API Mistral

### Frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Remplir les variables dans .env.local
npm run dev
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Remplir les variables dans .env
uvicorn main:app --reload
```

---

## Variables d'environnement

### Frontend — `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend — `.env`
```env
DATABASE_URL=postgresql://...
MISTRAL_API_KEY=...
```

---

## Screenshots

> À venir — démo en ligne disponible sur [veine.app](#)

---

## Roadmap

- [x] Interface de chat
- [x] Historique de conversation
- [x] Intégration LLM Mistral
- [x] Base de connaissances FAQ
- [x] Pipeline RAG avec PDF
- [x] Recherche sémantique pgvector
- [x] Interface admin upload PDF
- [x] Sources citées dans les réponses
- [ ] Streaming des réponses
- [ ] Authentification utilisateur
- [ ] Dashboard analytics
- [ ] Support Markdown dans le chat
- [ ] Filtres par document
- [ ] Mode sombre

---

## Auteur

Baptiste Merienne — [GitHub](https://github.com/BaptisteMerienne)

---

## Licence

MIT