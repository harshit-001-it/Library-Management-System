from app.db import models
from app.db.database import SessionLocal, engine
from app.core import security
from datetime import date

# Create tables
models.Base.metadata.create_all(bind=engine)

db = SessionLocal()

def seed():
    # Create Admin
    admin = db.query(models.User).filter(models.User.email == "admin@library.com").first()
    if not admin:
        admin = models.User(
            name="System Admin",
            email="admin@library.com",
            password=security.get_password_hash("admin123"),
            role="admin"
        )
        db.add(admin)
    
    # Create Staff
    staff = db.query(models.User).filter(models.User.email == "staff@library.com").first()
    if not staff:
        staff = models.User(
            name="Library Staff",
            email="staff@library.com",
            password=security.get_password_hash("staff123"),
            role="staff"
        )
        db.add(staff)

    # Create Student
    student = db.query(models.User).filter(models.User.email == "student@library.com").first()
    if not student:
        student = models.User(
            name="John Doe",
            email="student@library.com",
            password=security.get_password_hash("student123"),
            role="student"
        )
        db.add(student)

    # Sample Books
    books = [
        {"name": "The Art of Computer Programming", "author": "Donald Knuth", "quantity": 5, "price": 1200},
        {"name": "Clean Code", "author": "Robert C. Martin", "quantity": 10, "price": 800},
        {"name": "Deep Learning", "author": "Ian Goodfellow", "quantity": 3, "price": 1500},
        {"name": "Artificial Intelligence: A Modern Approach", "author": "Stuart Russell", "quantity": 4, "price": 1800},
        {"name": "The Pragmatic Programmer", "author": "Andrew Hunt", "quantity": 7, "price": 900},
    ]

    for b in books:
        if not db.query(models.Book).filter(models.Book.name == b["name"]).first():
            db.add(models.Book(**b))
    
    db.commit()
    print("Database seeded successfully!")

if __name__ == "__main__":
    seed()
