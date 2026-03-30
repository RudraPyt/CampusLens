from sqlalchemy import Column, Integer, String, Float, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    roll_number = Column(String, unique=True, nullable=False)
    subject = Column(String, nullable=False)
    attendance_percentage = Column(Float, default=0.0)
    internal_marks = Column(Float, default=0.0)   # out of 30
    assignment_score = Column(Float, default=0.0)  # out of 10
    stress_level = Column(Integer, default=5)       # 1-10 self reported
    sleep_hours = Column(Float, default=7.0)

# Database setup
import os
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./campuslens.db")
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)

def create_tables():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()