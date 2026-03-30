<div align="center">

# 🎓 CampusLens

### AI-Powered Student Academic Risk Detection System

[![Live Demo](https://img.shields.io/badge/Live%20Demo-campuslens8.netlify.app-blue?style=for-the-badge&logo=netlify)](https://campuslens8.netlify.app)
[![Backend](https://img.shields.io/badge/Backend-Render-purple?style=for-the-badge&logo=render)](https://campuslens-y388.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-RudraPyt-black?style=for-the-badge&logo=github)](https://github.com/RudraPyt/CampusLens)

**Built by MidNight Deploy 🚀 | Arya College of Engineering, Jaipur | RTU Affiliated**

</div>

---

## 🔥 The Problem

In RTU-affiliated engineering colleges, there is **zero early warning system** for academic failure. A student starts missing classes in Week 3, scores poorly in internals by Week 6, and by the time results drop — it's too late. Detention. Re-appear. Year loss.

**CampusLens solves this.**

---

## 💡 What is CampusLens?

CampusLens is a full-stack AI system that **predicts student academic risk 2–4 weeks before it becomes irreversible** — combining RTU-specific rules, a trained Machine Learning model, and an AI-powered personalized recovery plan.


---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🔴 **Risk Detection** | Classifies students as HIGH / MEDIUM / LOW risk in real time |
| 📏 **RTU Rules Engine** | Hardcoded RTU rules — 75% attendance cutoff, 12/30 internal marks threshold |
| 🤖 **ML Prediction** | RandomForest model with up to 99% confidence score |
| 📊 **Probability Charts** | Donut chart showing LOW / MEDIUM / HIGH risk probabilities |
| 💬 **AI Recovery Plan** | Personalized, actionable advice with exact numbers |
| 😰 **Stress Slider** | Intuitive emoji-based stress level input (😊 → 🔥) |
| 📈 **Summary Dashboard** | Live count of total, high, medium, low risk students |
| 🌐 **Fully Deployed** | Live on Netlify + Render, accessible from any device |

---

## 🛠️ Tech Stack

### Backend
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?style=flat)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=flat&logo=sqlite&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=flat&logo=scikit-learn&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22b5bf?style=flat)

### Deployment
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=netlify&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=white)

---

## 🧠 How It Works
```
Student Data Input
       │
       ▼
┌─────────────────────┐
│   RTU Rules Engine  │  ← Attendance < 75%? Marks < 12/30?
└─────────────────────┘
       │
       ▼
┌─────────────────────┐
│  ML Risk Predictor  │  ← RandomForest → HIGH / MEDIUM / LOW + confidence %
└─────────────────────┘
       │
       ▼
┌─────────────────────┐
│  AI Insight Engine  │  ← Personalized recovery plan with exact numbers
└─────────────────────┘
       │
       ▼
  React Dashboard  ←  Risk cards, donut charts, summary stats
```

---

## 🚀 Run Locally

### Prerequisites
- Python 3.10+
- Node.js 18+
- Git

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
```

Create a `.env` file inside `backend/`:
```
ANTHROPIC_API_KEY=your_api_key_here
```

Start the backend:
```bash
uvicorn app.main:app --reload
```
Backend runs at: `http://localhost:8000`
API Docs at: `http://localhost:8000/docs`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173`

---

## 📁 Project Structure
```
CampusLens/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   │   ├── student.py       # Database models
│   │   │   ├── rtu_rules.py     # RTU rules engine
│   │   │   └── ml_model.py      # RandomForest ML model
│   │   ├── routes/
│   │   │   └── students.py      # API endpoints
│   │   ├── insights.py          # AI recovery plan generator
│   │   └── main.py              # FastAPI entry point
│   ├── data/                    # SQLite database
│   └── requirements.txt
├── frontend/
│   └── src/
│       └── App.jsx              # React dashboard
├── .gitignore
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `POST` | `/students/add` | Add student + get risk analysis |
| `GET` | `/students/all` | Get all students with risk data |

---

## 📸 Screenshots

> Dashboard with risk cards, ML probability charts, and AI recovery plans

<img width="1676" height="1049" alt="Screenshot (16)" src="https://github.com/user-attachments/assets/c7441f05-4d77-46fc-a8c6-4ac6879e43f8" />


---

## 🏆 Why CampusLens is Different

Unlike a simple ChatGPT wrapper, CampusLens is a **real engineering system**:

- ✅ Persistent database with time-series student data
- ✅ RTU-specific business rules hardcoded into the engine
- ✅ Trained ML model — not just prompting an AI
- ✅ Dual-layer analysis (rules + ML) for higher accuracy
- ✅ Fully deployed and accessible from any device
- ✅ Built for a real, unsolved problem in Indian engineering colleges

---

## 👥 Team

**MidNight Deploy**

| Name | Role |
|------|------|
| Kumar Rudra | Full Stack + ML + AI Integration |

*Arya College of Engineering & Technology, Jaipur*
*Rajasthan Technical University (RTU)*

---

## 📄 License

MIT License — feel free to use, modify, and build on this project.

---

<div align="center">

**Built with 💙 by MidNight Deploy**

*If this helped you, give it a ⭐ on GitHub!*

</div>
