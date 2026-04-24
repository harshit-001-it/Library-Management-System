from pydantic import BaseModel

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
