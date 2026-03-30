def generate_insight(student_data: dict, rules_analysis: dict, ml_prediction: dict) -> str:
    name = student_data['name'].split()[0]  # First name only
    attendance = student_data['attendance_percentage']
    internal_marks = student_data['internal_marks']
    stress = student_data['stress_level']
    sleep = student_data['sleep_hours']
    risk = rules_analysis['risk_level']

    insight = f"Hey {name}, "

    # Attendance advice
    if attendance < 75:
        classes_needed = round((0.75 * 100 - attendance) / (1 - 0.75))
        insight += f"your attendance is at {attendance}% which is below RTU's 75% minimum — you need approximately {classes_needed} consecutive classes to recover. "
    elif attendance < 80:
        insight += f"your attendance is at {attendance}% — you're close to the danger zone, don't miss any more classes. "
    else:
        insight += f"your attendance looks okay at {attendance}%, keep it up. "

    # Marks advice
    if internal_marks < 12:
        insight += f"Your internal marks ({internal_marks}/30) are below the passing threshold of 12 — focus hard on your next internal exam. "
    elif internal_marks < 18:
        insight += f"Your internal marks ({internal_marks}/30) need improvement — aim for at least 20 in the next exam. "

    # Lifestyle advice
    if stress >= 8:
        insight += f"Your stress level is very high ({stress}/10) — try taking short breaks and talking to someone you trust. "

    if sleep < 5:
        insight += f"Sleeping only {sleep} hours is seriously affecting your focus — aim for at least 7 hours. "

    # Final motivational line based on risk
    if risk == "HIGH":
        insight += "Things look tough right now, but it's not too late to turn it around — start with one small step today. 💪"
    elif risk == "MEDIUM":
        insight += "You're in a recoverable position — stay consistent and things will improve. 👍"
    else:
        insight += "You're doing well — keep the momentum going! 🌟"

    return insight