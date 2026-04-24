from pydantic import BaseModel
from typing import Optional
from datetime import date
from app.schemas.book import BookResponse

class TransactionBase(BaseModel):
    user_id: int
    book_id: int
    issue_date: date
    return_date: Optional[date] = None
    fine: float = 0.0

class TransactionCreate(BaseModel):
    book_id: int

class TransactionResponse(TransactionBase):
    id: int
    book: BookResponse
    class Config:
        from_attributes = True
