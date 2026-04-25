import numpy as np
import faiss
import os
from typing import List, Dict, Any
from app.core.config import settings
from app.db import models
from sqlalchemy.orm import Session
import google.generativeai as genai

class AIService:
    def __init__(self):
        self.index = None
        self.book_ids = []
        self.gemini_key = getattr(settings, 'GEMINI_API_KEY', None)
        if self.gemini_key:
            genai.configure(api_key=self.gemini_key)

    def get_embedding(self, text: str) -> List[float]:
        if not self.gemini_key:
            # Very simple fallback for local dev if no key
            return [0.0] * 768
            
        try:
            result = genai.embed_content(
                model="models/embedding-001",
                content=text,
                task_type="retrieval_document"
            )
            return result['embedding']
        except Exception as e:
            print(f"Embedding Error: {e}")
            return [0.0] * 768

    def update_index(self, db: Session):
        books = db.query(models.Book).all()
        if not books:
            return
        
        descriptions = [f"{b.name} by {b.author}" for b in books]
        self.book_ids = [b.id for b in books]
        
        all_embeddings = []
        for desc in descriptions:
            all_embeddings.append(self.get_embedding(desc))
            
        embeddings_array = np.array(all_embeddings).astype('float32')
        dimension = embeddings_array.shape[1]
        
        self.index = faiss.IndexFlatL2(dimension)
        self.index.add(embeddings_array)

    def search_books(self, query: str, db: Session, k: int = 5) -> List[models.Book]:
        if self.index is None or not self.book_ids:
            self.update_index(db)
        
        if self.index is None:
            return []

        try:
            query_embedding = genai.embed_content(
                model="models/embedding-001",
                content=query,
                task_type="retrieval_query"
            )['embedding']
            
            query_vector = np.array([query_embedding]).astype('float32')
            distances, indices = self.index.search(query_vector, k)
            
            result_ids = [self.book_ids[i] for i in indices[0] if i != -1]
            
            # Maintain order of results
            books_map = {b.id: b for b in db.query(models.Book).filter(models.Book.id.in_(result_ids)).all()}
            return [books_map[rid] for rid in result_ids if rid in books_map]
        except Exception as e:
            print(f"Search Error: {e}")
            # Fallback to simple keyword search
            return db.query(models.Book).filter(
                (models.Book.name.ilike(f"%{query}%")) | 
                (models.Book.author.ilike(f"%{query}%"))
            ).limit(k).all()

    def get_chat_response(self, query: str) -> str:
        if not self.gemini_key:
            return self._get_local_fallback(query)
            
        try:
            model = genai.GenerativeModel('gemini-pro')
            response = model.generate_content(
                f"You are a helpful library assistant for the 'Knowledge Vault' LMS. "
                f"Answer the user query briefly and professionally: {query}"
            )
            return response.text
        except Exception as e:
            print(f"Gemini Chat Error: {e}")
            return self._get_local_fallback(query)

    def _get_local_fallback(self, query: str) -> str:
        query_lower = query.lower()
        if "suggest" in query_lower or "recommend" in query_lower:
            return "I can help with that! Try searching for subjects like 'AI', 'Python', or 'Physics' using our semantic search bar."
        elif "how to" in query_lower:
            return "To issue a book, find it in the library and click 'Issue'. You have 14 days to return it."
        else:
            return f"That's an interesting question about '{query}'. I'm currently in 'Cloud Mode'. If I can't reach the AI, I'll help you with library rules!"

ai_service = AIService()
