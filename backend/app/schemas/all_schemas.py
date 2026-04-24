from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import date

# User Schemas
class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: Optional[str] = "student"

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    class Config:
        from_attributes = True

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# Book Schemas
class BookBase(BaseModel):
    name: str
    author: str
    quantity: int = 1
    price: float = 0.0

class BookCreate(BookBase):
    pass

class BookResponse(BookBase):
    id: int
    class Config:
        from_attributes = True

# Transaction Schemas
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
