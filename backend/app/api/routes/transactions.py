from typing import Any, List
from datetime import date
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api import deps
from app.db import models
from app.schemas.transaction import TransactionCreate, TransactionResponse

router = APIRouter()

@router.post("/issue", response_model=TransactionResponse)
def issue_book(
    *,
    db: Session = Depends(deps.get_db),
    transaction_in: TransactionCreate,
    current_user: models.User = Depends(deps.get_current_user)
) -> Any:
    book = db.query(models.Book).filter(models.Book.id == transaction_in.book_id).first()
    if not book or book.quantity <= 0:
        raise HTTPException(status_code=400, detail="Book not available")
    
    # Check if user already has this book issued
    existing = db.query(models.Transaction).filter(
        models.Transaction.user_id == current_user.id,
        models.Transaction.book_id == transaction_in.book_id,
        models.Transaction.return_date == None
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="You already have this book issued")

    transaction = models.Transaction(
        user_id=current_user.id,
        book_id=transaction_in.book_id,
        issue_date=date.today()
    )
    book.quantity -= 1
    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    return transaction

@router.post("/return/{transaction_id}", response_model=TransactionResponse)
def return_book(
    *,
    db: Session = Depends(deps.get_db),
    transaction_id: int,
    current_user: models.User = Depends(deps.get_current_user)
) -> Any:
    transaction = db.query(models.Transaction).filter(
        models.Transaction.id == transaction_id,
        models.Transaction.user_id == current_user.id,
        models.Transaction.return_date == None
    ).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    
    transaction.return_date = date.today()
    book = db.query(models.Book).filter(models.Book.id == transaction.book_id).first()
    if book:
        book.quantity += 1
    
    # Simple fine calculation (e.g., 5 units per day after 14 days)
    delta = (transaction.return_date - transaction.issue_date).days
    if delta > 14:
        transaction.fine = (delta - 14) * 5.0
    
    db.commit()
    db.refresh(transaction)
    return transaction
