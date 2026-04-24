# AI-Powered Library Management System

A production-grade LMS with a FastAPI backend and a premium React/Three.js frontend.

## Features
- **3D Background**: Cinematic floating books and stars using Three.js.
- **AI Chatbot**: Context-aware library assistant (Local/Free mode).
- **Semantic Search**: Fast similarity search using FAISS and local embeddings.
- **RBAC**: Role-Based Access Control (Admin, Staff, Student).
- **Database**: Cloud-ready PostgreSQL integration (Supabase).

## Tech Stack
- **Backend**: FastAPI, SQLAlchemy, FAISS, Sentence-Transformers.
- **Frontend**: React, Vite, Three.js, Framer Motion, Tailwind CSS.
- **Database**: Supabase PostgreSQL.

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL (or Supabase URL)

### Backend Setup
1. Navigate to `backend/`.
2. Install dependencies: `pip install -r requirements.txt`.
3. Configure `.env` with your database credentials.
4. Seed the database: `python seed.py`.
5. Run the server: `uvicorn app.main:app --reload`.

### Frontend Setup
1. Navigate to `frontend/`.
2. Install dependencies: `npm install`.
3. Run the dev server: `npm run dev`.

## API Documentation
Once the backend is running, visit `http://localhost:8000/docs` for the interactive Swagger UI.
