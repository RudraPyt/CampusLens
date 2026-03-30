import numpy as np
from sklearn.ensemble import RandomForestClassifier
import pickle
import os

MODEL_PATH = "risk_model.pkl"

def generate_training_data():
    """Generate synthetic student data for training"""
    np.random.seed(42)
    n = 500

    attendance = np.random.uniform(40, 100, n)
    internal_marks = np.random.uniform(0, 30, n)
    assignment_score = np.random.uniform(0, 10, n)
    stress_level = np.random.randint(1, 11, n)
    sleep_hours = np.random.uniform(3, 9, n)

    # Risk label based on RTU rules
    labels = []
    for i in range(n):
        score = 0
        if attendance[i] < 75: score += 40
        elif attendance[i] < 80: score += 20
        if internal_marks[i] < 12: score += 30
        elif internal_marks[i] < 18: score += 15
        if stress_level[i] >= 8: score += 15
        if sleep_hours[i] < 5: score += 10
        if assignment_score[i] < 5: score += 5

        if score >= 60: labels.append(2)    # HIGH
        elif score >= 30: labels.append(1)  # MEDIUM
        else: labels.append(0)              # LOW

    X = np.column_stack([attendance, internal_marks, assignment_score, stress_level, sleep_hours])
    y = np.array(labels)
    return X, y

def train_model():
    """Train and save the model"""
    X, y = generate_training_data()
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)
    with open(MODEL_PATH, "wb") as f:
        pickle.dump(model, f)
    print("✅ ML model trained and saved!")
    return model

def load_model():
    """Load model if exists, else train"""
    if os.path.exists(MODEL_PATH):
        with open(MODEL_PATH, "rb") as f:
            return pickle.load(f)
    return train_model()

def predict_risk(attendance, internal_marks, assignment_score, stress_level, sleep_hours):
    """Predict risk level using ML model"""
    model = load_model()
    features = np.array([[attendance, internal_marks, assignment_score, stress_level, sleep_hours]])
    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0]

    level_map = {0: "LOW", 1: "MEDIUM", 2: "HIGH"}
    return {
        "ml_risk_level": level_map[prediction],
        "ml_confidence": round(float(max(probability)) * 100, 2),
        "probabilities": {
            "LOW": round(float(probability[0]) * 100, 2),
            "MEDIUM": round(float(probability[1]) * 100, 2),
            "HIGH": round(float(probability[2]) * 100, 2)
        }
    }