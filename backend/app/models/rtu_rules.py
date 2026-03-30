def calculate_risk(student):
    risk_score = 0
    reasons = []

    # RTU Rule 1: Attendance below 75% = detained
    if student.attendance_percentage < 75:
        risk_score += 40
        reasons.append(f"Attendance is {student.attendance_percentage}% — below RTU's 75% minimum")
    elif student.attendance_percentage < 80:
        risk_score += 20
        reasons.append(f"Attendance is {student.attendance_percentage}% — dangerously close to cutoff")

    # RTU Rule 2: Internal marks below 40% = fail (12/30)
    if student.internal_marks < 12:
        risk_score += 30
        reasons.append(f"Internal marks are {student.internal_marks}/30 — below passing threshold")
    elif student.internal_marks < 18:
        risk_score += 15
        reasons.append(f"Internal marks are {student.internal_marks}/30 — need improvement")

    # Lifestyle factors
    if student.stress_level >= 8:
        risk_score += 15
        reasons.append(f"Stress level is very high ({student.stress_level}/10)")

    if student.sleep_hours < 5:
        risk_score += 10
        reasons.append(f"Sleeping only {student.sleep_hours} hours — affects performance")

    if student.assignment_score < 5:
        risk_score += 5
        reasons.append(f"Assignment score is low ({student.assignment_score}/10)")

    # Determine risk level
    if risk_score >= 60:
        risk_level = "HIGH"
    elif risk_score >= 30:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    return {
        "risk_score": risk_score,
        "risk_level": risk_level,
        "reasons": reasons
    }