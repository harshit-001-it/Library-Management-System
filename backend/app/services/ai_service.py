import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from typing import List, Dict, Any
from app.core.config import settings
from app.db import models
from sqlalchemy.orm import Session

class AIService:
    def __init__(self):
        # Load a small, fast model for free local embeddings
        self.model = SentenceTransformer(settings.EMBEDDING_MODEL)
        self.index = None
        self.book_ids = []

    def update_index(self, db: Session):
        books = db.query(models.Book).all()
        if not books:
            return
        
        descriptions = [f"{b.name} by {b.author}" for b in books]
        self.book_ids = [b.id for b in books]
        
        embeddings = self.model.encode(descriptions)
        dimension = embeddings.shape[1]
        
        self.index = faiss.IndexFlatL2(dimension)
        self.index.add(np.array(embeddings).astype('float32'))

    def search_books(self, query: str, db: Session, k: int = 5) -> List[models.Book]:
        if self.index is None or not self.book_ids:
            self.update_index(db)
        
        if self.index is None:
            return []

        query_vector = self.model.encode([query])
        distances, indices = self.index.search(np.array(query_vector).astype('float32'), k)
        
        result_ids = [self.book_ids[i] for i in indices[0] if i != -1]
        
        # Maintain order of results
        books = {b.id: b for b in db.query(models.Book).filter(models.Book.id.in_(result_ids)).all()}
        return [books[rid] for rid in result_ids if rid in books]

    def get_chat_response(self, query: str) -> str:
        # Check for Gemini API Key in environment
        gemini_key = os.getenv("GEMINI_API_KEY")
        
        if gemini_key:
            try:
                import google.generativeai as genai
                genai.configure(api_key=gemini_key)
                model = genai.GenerativeModel('gemini-pro')
                response = model.generate_content(
                    f"You are a helpful library assistant for the 'Knowledge Vault' LMS. "
                    f"Answer the user query briefly and professionally: {query}"
                )
                return response.text
            except Exception as e:
                print(f"Gemini Error: {e}")
                return self._get_local_fallback(query)
        
        return self._get_local_fallback(query)

    def _get_local_fallback(self, query: str) -> str:
        query_lower = query.lower()
        if "suggest" in query_lower or "recommend" in query_lower:
            return "I can help with that! Try searching for subjects like 'AI', 'Python', or 'Physics' using our semantic search bar for the best recommendations based on your interests."
        elif "how to" in query_lower:
            return "To issue a book, find it in the library and click 'Issue'. You have 14 days to return it before a fine is applied."
        else:
            return f"That's an interesting question about '{query}'. I'm currently in 'Free Mode' using local models. I can help you find books or explain library rules!"

ai_service = AIService()
