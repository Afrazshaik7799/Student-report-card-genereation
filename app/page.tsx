"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { LandingPage } from "@/components/landing-page"
import { LoginPage } from "@/components/login-page"
import { DashboardPage } from "@/components/dashboard-page"
import { View, User, Student, SignupData, LoginData } from "@/lib/types"

// Mock API functions (simulating backend responses)
const mockUsers = [
  { username: "teacher", password: "teacher123", name: "Dr. Sarah Mitchell", role: "teacher" as const },
  { username: "student", password: "student123", name: "Alex Johnson", role: "student" as const },
]

const mockStudents: Record<string, Student> = {
  "2025001": {
    name: "Alex Johnson",
    rollNumber: "2025001",
    math: 92,
    science: 88,
    english: 95,
    total: 275,
    average: 91.67,
    grade: "A+",
    remarks: "Excellent performance! Keep up the great work.",
    className: "10th Grade",
    section: "A",
  },
  "2025002": {
    name: "Emma Wilson",
    rollNumber: "2025002",
    math: 78,
    science: 85,
    english: 82,
    total: 245,
    average: 81.67,
    grade: "A",
    remarks: "Very good performance. Shows consistent effort.",
    className: "10th Grade",
    section: "A",
  },
  "2025003": {
    name: "Michael Brown",
    rollNumber: "2025003",
    math: 65,
    science: 72,
    english: 70,
    total: 207,
    average: 69.00,
    grade: "C",
    remarks: "Satisfactory performance. Room for improvement in Mathematics.",
    className: "10th Grade",
    section: "B",
  },
}

function calculateGrade(average: number): { grade: string; remarks: string } {
  if (average >= 90) return { grade: "A+", remarks: "Excellent performance! Keep up the great work." }
  if (average >= 80) return { grade: "A", remarks: "Very good performance. Shows consistent effort." }
  if (average >= 70) return { grade: "B", remarks: "Good performance. Can improve further with practice." }
  if (average >= 60) return { grade: "C", remarks: "Satisfactory performance. Room for improvement." }
  if (average >= 50) return { grade: "D", remarks: "Needs improvement. Please focus on weak areas." }
  return { grade: "F", remarks: "Below average. Requires immediate attention and support." }
}

export default function StudentReportPortal() {
  const [view, setView] = useState<View>("landing")
  const [role, setRole] = useState<"teacher" | "student">("student")
  const [user, setUser] = useState<User | null>(null)
  const [loginData, setLoginData] = useState<LoginData>({ username: "", password: "" })
  const [loginError, setLoginError] = useState("")
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    math: "",
    science: "",
    english: "",
  })
  const [searchRoll, setSearchRoll] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [signupData, setSignupData] = useState<SignupData>({
    fullName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    role: "student",
  })
  const [signupMessage, setSignupMessage] = useState("")
  const [signupError, setSignupError] = useState("")

  const handleRoleSelect = (selectedRole: "teacher" | "student") => {
    setRole(selectedRole)
    setView("login")
    setLoginError("")
    setLoginData({ username: "", password: "" })
    setMessage("")
  }

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")
    setMessage("")

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const foundUser = mockUsers.find(
      (u) => u.username === loginData.username && u.password === loginData.password && u.role === role
    )

    if (foundUser) {
      setUser({ name: foundUser.name, username: foundUser.username, role: foundUser.role })
      setView("dashboard")
      setSelectedStudent(null)
      setMessage(`Logged in as ${foundUser.name}`)
    } else {
      setLoginError("Invalid credentials. Please check your username and password.")
    }
  }

  const handleLogout = () => {
    setView("landing")
    setRole("student")
    setUser(null)
    setSelectedStudent(null)
    setLoginData({ username: "", password: "" })
    setMessage("")
    setSignupMessage("")
    setSignupError("")
  }

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignupMessage("")
    setSignupError("")

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Validate
    if (!signupData.fullName || !signupData.email || !signupData.username || !signupData.password) {
      setSignupError("Please fill in all required fields.")
      return
    }

    // Mock success
    setSignupMessage("Account created successfully! You can now log in.")
    setSignupData({ fullName: "", email: "", phone: "", username: "", password: "", role: "student" })
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const math = Number(formData.math)
    const science = Number(formData.science)
    const english = Number(formData.english)
    const total = math + science + english
    const average = total / 3
    const { grade, remarks } = calculateGrade(average)

    const newStudent: Student = {
      name: formData.name,
      rollNumber: formData.rollNumber,
      math,
      science,
      english,
      total,
      average,
      grade,
      remarks,
      className: "10th Grade",
      section: "A",
    }

    // Add to mock database
    mockStudents[formData.rollNumber] = newStudent
    setSelectedStudent(newStudent)
    setMessage("Student report saved successfully.")
    setFormData({ name: "", rollNumber: "", math: "", science: "", english: "" })
  }

  const handleSearchStudent = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setSelectedStudent(null)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const student = mockStudents[searchRoll]
    if (student) {
      setSelectedStudent(student)
      setMessage("Student record found.")
    } else {
      setMessage("Student not found. Please check the roll number.")
    }
  }

  return (
    <AnimatePresence mode="wait">
      {view === "landing" && (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LandingPage
            onRoleSelect={handleRoleSelect}
            signupData={signupData}
            onSignupChange={handleSignupChange}
            onSignup={handleSignup}
            signupMessage={signupMessage}
            signupError={signupError}
          />
        </motion.div>
      )}

      {view === "login" && (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LoginPage
            role={role}
            loginData={loginData}
            onLoginChange={handleLoginChange}
            onLogin={handleLogin}
            loginError={loginError}
            onBack={() => setView("landing")}
          />
        </motion.div>
      )}

      {view === "dashboard" && user && (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DashboardPage
            user={user}
            onLogout={handleLogout}
            formData={formData}
            onFormChange={handleFormChange}
            onAddStudent={handleAddStudent}
            searchRoll={searchRoll}
            onSearchChange={setSearchRoll}
            onSearchStudent={handleSearchStudent}
            selectedStudent={selectedStudent}
            message={message}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
