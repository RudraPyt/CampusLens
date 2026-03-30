from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.models.student import Student, get_db
from app.models.rtu_rules import calculate_risk
from app.models.ml_model import predict_risk
from app.insights import generate_insight

router = APIRouter(prefix="/students", tags=["Students"])

class StudentInput(BaseModel):
    name: str
    roll_number: str
    subject: str
    attendance_percentage: float
    internal_marks: float
    assignment_score: float
    stress_level: int
    sleep_hours: float

@router.post("/add")
def add_student(data: StudentInput, db: Session = Depends(get_db)):
    student = Student(**data.dict())
    db.add(student)
    db.commit()
    db.refresh(student)

    rules_risk = calculate_risk(student)
    ml_risk = predict_risk(
        data.attendance_percentage,
        data.internal_marks,
        data.assignment_score,
        data.stress_level,
        data.sleep_hours
    )

    insight = generate_insight(data.dict(), rules_risk, ml_risk)

    return {
        "student": data,
        "rules_analysis": rules_risk,
        "ml_prediction": ml_risk,
        "ai_insight": insight
    }

@router.get("/all")
def get_all_students(db: Session = Depends(get_db)):
    students = db.query(Student).all()
    results = []
    for s in students:
        rules_risk = calculate_risk(s)
        ml_risk = predict_risk(
            s.attendance_percentage,
            s.internal_marks,
            s.assignment_score,
            s.stress_level,
            s.sleep_hours
        )
        insight = generate_insight(
            {
                "name": s.name,
                "subject": s.subject,
                "attendance_percentage": s.attendance_percentage,
                "internal_marks": s.internal_marks,
                "assignment_score": s.assignment_score,
                "stress_level": s.stress_level,
                "sleep_hours": s.sleep_hours
            },
            rules_risk,
            ml_risk
        )
        results.append({
            "student": s,
            "rules_analysis": rules_risk,
            "ml_prediction": ml_risk,
            "ai_insight": insight
        })
    return results