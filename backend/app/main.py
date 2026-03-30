from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models.student import create_tables
from app.routes.students import router as student_router

app = FastAPI(title="CampusLens API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_tables()
app.include_router(student_router)

@app.get("/")
def root():
    return {"message": "CampusLens backend is running 🚀"}