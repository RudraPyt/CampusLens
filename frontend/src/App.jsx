import { useState, useEffect } from "react"
import axios from "axios"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

const API = "https://campuslens-y388.onrender.com"
const RISK_COLORS = { HIGH: "#ef4444", MEDIUM: "#f59e0b", LOW: "#22c55e" }

function stressColor(level) {
  if (!level || level <= 3) return "#22c55e"
  if (level <= 6) return "#f59e0b"
  if (level <= 8) return "#f97316"
  return "#ef4444"
}

function RiskBadge({ level }) {
  return (
    <span style={{
      background: RISK_COLORS[level],
      color: "white",
      padding: "4px 14px",
      borderRadius: "999px",
      fontWeight: "bold",
      fontSize: "13px"
    }}>{level}</span>
  )
}

function SummaryBar({ students }) {
  const high = students.filter(s => s.rules_analysis.risk_level === "HIGH").length
  const medium = students.filter(s => s.rules_analysis.risk_level === "MEDIUM").length
  const low = students.filter(s => s.rules_analysis.risk_level === "LOW").length

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
      {[
        { label: "Total Students", value: students.length, color: "#3b82f6" },
        { label: "High Risk", value: high, color: "#ef4444" },
        { label: "Medium Risk", value: medium, color: "#f59e0b" },
        { label: "Low Risk", value: low, color: "#22c55e" },
      ].map(stat => (
        <div key={stat.label} style={{
          background: "#1e1e2e", borderRadius: "14px", padding: "20px",
          borderTop: `3px solid ${stat.color}`, textAlign: "center"
        }}>
          <p style={{ color: stat.color, fontSize: "32px", fontWeight: "bold", margin: "0 0 6px" }}>{stat.value}</p>
          <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

function StudentCard({ item }) {
  const { student, rules_analysis, ml_prediction, ai_insight } = item
  const riskColor = RISK_COLORS[rules_analysis.risk_level]

  const pieData = [
    { name: "LOW", value: ml_prediction.probabilities.LOW },
    { name: "MEDIUM", value: ml_prediction.probabilities.MEDIUM },
    { name: "HIGH", value: ml_prediction.probabilities.HIGH },
  ]

  return (
    <div style={{
      background: "#1e1e2e", border: `1px solid ${riskColor}`,
      borderRadius: "16px", padding: "24px", marginBottom: "20px",
      boxShadow: `0 0 24px ${riskColor}22`
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h2 style={{ color: "white", margin: 0, fontSize: "20px" }}>{student.name}</h2>
          <p style={{ color: "#888", margin: "4px 0 0", fontSize: "13px" }}>{student.roll_number} • {student.subject}</p>
        </div>
        <RiskBadge level={rules_analysis.risk_level} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "20px" }}>
        {[
          { label: "Attendance", value: `${student.attendance_percentage}%`, warn: student.attendance_percentage < 75 },
          { label: "Internal Marks", value: `${student.internal_marks}/30`, warn: student.internal_marks < 12 },
          { label: "Sleep", value: `${student.sleep_hours} hrs`, warn: student.sleep_hours < 5 },
          { label: "Stress", value: `${student.stress_level}/10`, warn: student.stress_level >= 8 },
          { label: "Assignment", value: `${student.assignment_score}/10`, warn: student.assignment_score < 5 },
          { label: "ML Confidence", value: `${ml_prediction.ml_confidence}%`, warn: false },
        ].map(stat => (
          <div key={stat.label} style={{
            background: "#2a2a3e", borderRadius: "10px", padding: "12px",
            borderLeft: `3px solid ${stat.warn ? "#ef4444" : "#22c55e"}`
          }}>
            <p style={{ color: "#888", fontSize: "11px", margin: "0 0 4px" }}>{stat.label}</p>
            <p style={{ color: stat.warn ? "#ef4444" : "white", fontWeight: "bold", margin: 0 }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "20px" }}>
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value">
              {pieData.map((entry) => (
                <Cell key={entry.name} fill={RISK_COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => `${v}%`} />
          </PieChart>
        </ResponsiveContainer>
        <div>
          <p style={{ color: "#888", fontSize: "12px", margin: "0 0 8px" }}>ML Risk Probabilities</p>
          {pieData.map(d => (
            <p key={d.name} style={{ margin: "4px 0", fontSize: "13px", color: RISK_COLORS[d.name], fontWeight: "bold" }}>
              {d.name}: {d.value}%
            </p>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <p style={{ color: "#888", fontSize: "12px", marginBottom: "8px" }}>⚠️ Risk Factors</p>
        {rules_analysis.reasons.map((r, i) => (
          <p key={i} style={{ color: "#fbbf24", fontSize: "13px", margin: "4px 0" }}>• {r}</p>
        ))}
      </div>

      {ai_insight && (
        <div style={{ background: "#0d1f3c", borderRadius: "12px", padding: "16px", borderLeft: "4px solid #3b82f6" }}>
          <p style={{ color: "#60a5fa", fontSize: "12px", fontWeight: "bold", margin: "0 0 8px" }}>🤖 AI Recovery Plan</p>
          <p style={{ color: "#e2e8f0", fontSize: "14px", margin: 0, lineHeight: "1.7" }}>{ai_insight}</p>
        </div>
      )}
    </div>
  )
}

function AddStudentForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "", roll_number: "", subject: "",
    attendance_percentage: "", internal_marks: "",
    assignment_score: "", stress_level: 5, sleep_hours: ""
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!form.name || !form.roll_number || !form.subject) {
      alert("Please fill in all fields!")
      return
    }
    setLoading(true)
    try {
      await axios.post(`${API}/students/add`, {
        ...form,
        attendance_percentage: parseFloat(form.attendance_percentage),
        internal_marks: parseFloat(form.internal_marks),
        assignment_score: parseFloat(form.assignment_score),
        stress_level: parseInt(form.stress_level),
        sleep_hours: parseFloat(form.sleep_hours),
      })
      onAdd()
      setForm({ name: "", roll_number: "", subject: "", attendance_percentage: "", internal_marks: "", assignment_score: "", stress_level: 5, sleep_hours: "" })
    } catch (e) {
      alert("Error: " + (e.response?.data?.detail || e.message))
    }
    setLoading(false)
  }

  const fields = [
    { key: "name", label: "Full Name", placeholder: "Rahul Sharma" },
    { key: "roll_number", label: "Roll Number", placeholder: "21IT001" },
    { key: "subject", label: "Subject", placeholder: "Mathematics" },
    { key: "attendance_percentage", label: "Attendance %", placeholder: "68" },
    { key: "internal_marks", label: "Internal Marks (out of 30)", placeholder: "10" },
    { key: "assignment_score", label: "Assignment Score (out of 10)", placeholder: "4" },
    { key: "sleep_hours", label: "Sleep Hours", placeholder: "4.5" },
  ]

  const stressLabel = form.stress_level <= 3 ? "😊 Relaxed"
    : form.stress_level <= 6 ? "😐 Moderate"
      : form.stress_level <= 8 ? "😰 High"
        : "🔥 Burnout"

  return (
    <div style={{ background: "#1e1e2e", borderRadius: "16px", padding: "24px", marginBottom: "32px", border: "1px solid #3b82f6" }}>
      <h2 style={{ color: "white", marginTop: 0, marginBottom: "20px" }}>➕ Add Student</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px" }}>
        {fields.map(f => (
          <div key={f.key}>
            <label style={{ color: "#888", fontSize: "12px", display: "block", marginBottom: "6px" }}>{f.label}</label>
            <input
              placeholder={f.placeholder}
              value={form[f.key]}
              onChange={e => setForm({ ...form, [f.key]: e.target.value })}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: "8px",
                background: "#2a2a3e", border: "1px solid #444",
                color: "white", fontSize: "14px", boxSizing: "border-box", outline: "none"
              }}
            />
          </div>
        ))}

        {/* Stress Slider - spans full width */}
        <div style={{ gridColumn: "span 2" }}>
          <label style={{ color: "#888", fontSize: "12px", display: "block", marginBottom: "10px" }}>
            Stress Level —{" "}
            <span style={{ color: stressColor(form.stress_level), fontWeight: "bold" }}>
              {form.stress_level} / 10 &nbsp; {stressLabel}
            </span>
          </label>
          <input
            type="range" min="1" max="10"
            value={form.stress_level}
            onChange={e => setForm({ ...form, stress_level: parseInt(e.target.value) })}
            style={{ width: "100%", accentColor: stressColor(form.stress_level), cursor: "pointer" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
            <span style={{ color: "#22c55e", fontSize: "11px" }}>😊 No stress</span>
            <span style={{ color: "#f59e0b", fontSize: "11px" }}>😐 Moderate</span>
            <span style={{ color: "#ef4444", fontSize: "11px" }}>🔥 Burnout</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: "20px", padding: "12px 36px",
          background: loading ? "#444" : "#3b82f6",
          color: "white", border: "none", borderRadius: "10px",
          fontSize: "15px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Analyzing..." : "Analyze Risk 🔍"}
      </button>
    </div>
  )
}

export default function App() {
  const [students, setStudents] = useState([])

  const fetchStudents = async () => {
    const res = await axios.get(`${API}/students/all`)
    setStudents(res.data.reverse())
  }

  useEffect(() => { fetchStudents() }, [])

  return (
    <div style={{ minHeight: "100vh", background: "#13131f", padding: "32px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ color: "white", fontSize: "36px", margin: 0, fontWeight: "800" }}>🎓 CampusLens</h1>
          <p style={{ color: "#555", margin: "8px 0 0", fontSize: "15px" }}>
            AI-powered student academic risk detection • RTU Affiliated • MidNight Deploy
          </p>
        </div>

        {students.length > 0 && <SummaryBar students={students} />}
        <AddStudentForm onAdd={fetchStudents} />

        <h2 style={{ color: "white", marginBottom: "20px" }}>📊 Student Risk Dashboard</h2>
        {students.length === 0
          ? <p style={{ color: "#555" }}>No students yet. Add one above!</p>
          : students.map((item, i) => <StudentCard key={i} item={item} />)
        }
      </div>
    </div>
  )
}