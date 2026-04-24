from sqlalchemy import Column, Integer, String, ForeignKey, Date, Float, Enum
from sqlalchemy.orm import relationship
from app.db.database import Base
import enum

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    STAFF = "staff"
    STUDENT = "student"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default=UserRole.STUDENT)

    transactions = relationship("Transaction", back_populates="user")

class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    author = Column(String, index=True, nullable=False)
    quantity = Column(Integer, default=1)
    price = Column(Float, default=0.0)

    transactions = relationship("Transaction", back_populates="book")

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    book_id = Column(Integer, ForeignKey("books.id"))
    issue_date = Column(Date, nullable=False)
    return_date = Column(Date, nullable=True)
    fine = Column(Float, default=0.0)

    user = relationship("User", back_populates="transactions")
    book = relationship("Book", back_populates="transactions")
