from typing import Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api import deps
from app.db import models
from app.services.ai_service import ai_service
from app.schemas.book import BookResponse
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class SearchRequest(BaseModel):
    query: str

@router.post("/search", response_model=List[BookResponse])
def semantic_search(
    request: SearchRequest,
    db: Session = Depends(deps.get_db)
) -> Any:
    return ai_service.search_books(request.query, db)

@router.post("/chat")
def chat(
    request: ChatRequest
) -> Any:
    response = ai_service.get_chat_response(request.message)
    return {"response": response}

@router.post("/recommend", response_model=List[BookResponse])
def recommend(
    db: Session = Depends(deps.get_db),
    current_user: Any = Depends(deps.get_current_user)
) -> Any:
    # Basic recommendation: search based on user's last issued book author/name
    last_transaction = db.query(models.Transaction).filter(
        models.Transaction.user_id == current_user.id
    ).order_by(models.Transaction.issue_date.desc()).first()
    
    if not last_transaction:
        return ai_service.search_books("popular books", db)
    
    book = db.query(models.Book).filter(models.Book.id == last_transaction.book_id).first()
    return ai_service.search_books(f"more by {book.author} or like {book.name}", db)
