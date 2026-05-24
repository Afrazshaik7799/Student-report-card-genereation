import './App.css'
import { useState } from 'react'
import API from './api'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

function App() {
  const [view, setView] = useState('landing')
  const [role, setRole] = useState('')
  const [user, setUser] = useState(null)
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    math: '',
    science: '',
    english: '',
  })
  const [searchRoll, setSearchRoll] = useState('')
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    role: 'student',
  })
  const [signupMessage, setSignupMessage] = useState('')
  const [signupError, setSignupError] = useState('')
  const [backendLink, setBackendLink] = useState('')

  const fixedLogo = (
    <div className="logo-fixed">
      <div className="logo-mark">SR</div>
      <div className="logo-text">
        <strong>School Report</strong>
        <span>Academic Summary</span>
      </div>
    </div>
  )

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole)
    setView('login')
    setLoginError('')
    setLoginData({ username: '', password: '' })
    setMessage('')
  }

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    setMessage('')

    try {
      const response = await API.post('/auth/login', {
        username: loginData.username,
        password: loginData.password,
        role,
      })
      setUser(response.data)
      setView('dashboard')
      setSelectedStudent(null)
      setMessage(`Logged in as ${response.data.name}`)
    } catch (error) {
      setLoginError(error?.response?.data?.message || 'Login failed')
    }
  }

  const handleLogout = () => {
    setView('landing')
    setRole('')
    setUser(null)
    setSelectedStudent(null)
    setLoginData({ username: '', password: '' })
    setMessage('')
    setSignupMessage('')
    setSignupError('')
  }

  const handleSignupChange = (e) => {
    const { name, value } = e.target
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setSignupMessage('')
    setSignupError('')
    setBackendLink('')

    try {
      const response = await API.post('/users/signup', signupData)
      setSignupMessage('Signup successful!')
      setBackendLink(response.data.backendUrl || 'http://localhost:5000/api/users')
      setSignupData({ fullName: '', email: '', phone: '', username: '', password: '', role: 'student' })
    } catch (error) {
      setSignupError(error?.response?.data?.message || 'Signup failed.')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddStudent = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      const response = await API.post('/students/add', {
        name: formData.name,
        rollNo: formData.rollNumber,
        maths: Number(formData.math),
        science: Number(formData.science),
        english: Number(formData.english),
      })
      setSelectedStudent(response.data)
      setMessage('Student report saved successfully.')
      setFormData({ name: '', rollNumber: '', math: '', science: '', english: '' })
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Unable to save student report.')
    }
  }

  const handleSearchStudent = async (e) => {
    e.preventDefault()
    setMessage('')
    setSelectedStudent(null)
    try {
      const response = await API.get(`/students/roll/${searchRoll}`)
      setSelectedStudent(response.data)
      setMessage('Student record found.')
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Student not found.')
    }
  }

  const generatePDF = (student) => {
    const doc = new jsPDF()
    const rollNo = student.rollNumber || student.rollNo || ''
    const maths = student.maths ?? student.math ?? 0
    const science = student.science ?? 0
    const english = student.english ?? 0
    const total = student.total ?? maths + science + english
    const percentage = student.percentage ?? student.average ?? 0

    doc.setFontSize(16)
    doc.text('Global School of Science', 105, 20, { align: 'center' })
    doc.setFontSize(10)
    doc.text('123 Education Lane, Cityville, State 45678', 105, 26, { align: 'center' })
    doc.text('Phone: +1 234 567 8901 | Email: info@globalschool.edu', 105, 31, { align: 'center' })
    doc.setLineWidth(0.5)
    doc.line(20, 34, 190, 34)

    doc.setFontSize(14)
    doc.text('Student Report Card', 105, 44, { align: 'center' })

    doc.setFontSize(11)
    doc.text(`Generated by: ${user?.name || 'School Report System'}`, 20, 54)
    doc.text(`Role: ${user?.role || ''}`, 20, 60)
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 60)

    doc.text(`Student Name: ${student.name}`, 20, 74)
    doc.text(`Roll Number: ${rollNo}`, 20, 80)
    doc.text(`Class: ${student.className || '10th Grade'}`, 20, 86)
    doc.text(`Section: ${student.section || 'A'}`, 20, 92)

    autoTable(doc, {
      startY: 100,
      head: [['Subject', 'Marks']],
      body: [
        ['Maths', maths],
        ['Science', science],
        ['English', english],
      ],
    })

    doc.setFontSize(11)
    doc.text(`Total: ${total}`, 20, 140)
    doc.text(`Percentage: ${Number(percentage).toFixed(2)}%`, 20, 148)
    doc.text(`Grade: ${student.grade}`, 20, 156)
    doc.text(`Remarks: ${student.remarks}`, 20, 164)

    doc.setFontSize(10)
    doc.text('Grading Scale', 20, 178)
    doc.text('A+ : 90 - 100', 20, 186)
    doc.text('A  : 80 - 89', 20, 192)
    doc.text('B  : 70 - 79', 20, 198)
    doc.text('C  : 60 - 69', 20, 204)
    doc.text('D  : 50 - 59', 20, 210)
    doc.text('F  : Below 50', 20, 216)

    doc.save(`${student.name || 'student'}_ReportCard.pdf`)
  }

  const loginLabel = role === 'teacher' ? 'Teacher Login' : 'Student Login'
  const headerSection = (
    <div className="header-row">
      {fixedLogo}
      <div className="header-copy">
        <h1>School Report Portal</h1>
        <p>Role-based access for teachers and students.</p>
      </div>
    </div>
  )

  if (view === 'landing') {
    return (
      <div className="app-wrapper">
        <div className="landing-page">
          <div className="landing-hero">
            <div className="hero-copy">
              <span className="eyebrow">AFRAZ COLLEGE OF TECHNOLOGY</span>
              <h1>Engineering excellence, top placements, and national Olympiad champions.</h1>
              <p>Located in the heart of Tech City, AFRAZ College of Technology delivers world-class education, strong industry ties, and campus life that shapes future leaders.</p>
              <div className="hero-stats">
                <div>
                  <strong>Dr. Nina Kapoor</strong>
                  <span>Principal</span>
                </div>
                <div>
                  <strong>Mr. Arjun Shah</strong>
                  <span>Vice Principal</span>
                </div>
                <div>
                  <strong>98%</strong>
                  <span>Placement Rate</span>
                </div>
              </div>
              <div className="contact-grid">
                <div>
                  <p><strong>Address</strong></p>
                  <p>451 Innovation Avenue, Tech City, TX 75201</p>
                </div>
                <div>
                  <p><strong>Email</strong></p>
                  <p>admissions@afraztech.edu</p>
                  <p>info@afraztech.edu</p>
                </div>
                <div>
                  <p><strong>Phone</strong></p>
                  <p>+1 800 123 4567</p>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80" alt="College campus" />
            </div>
          </div>

          <div className="landing-content">
            <section className="overview-card">
              <h2>Our Achievements</h2>
              <ul>
                <li>First place in National Olympiad 2025</li>
                <li>98% placement success with top tech firms</li>
                <li>Industry-accredited programs and research labs</li>
                <li>Startup incubator and mentorship programs</li>
              </ul>
            </section>

            <section className="signup-card">
              <h2>Join AFRAZ College</h2>
              <p>Sign up on the first page to save your profile details and access the student portal.</p>
              <form className="form" onSubmit={handleSignup}>
                <div className="field-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={signupData.fullName}
                    onChange={handleSignupChange}
                    required
                  />
                </div>
                <div className="field-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    required
                  />
                </div>
                <div className="field-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={signupData.phone}
                    onChange={handleSignupChange}
                    required
                  />
                </div>
                <div className="field-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={signupData.username}
                    onChange={handleSignupChange}
                    required
                  />
                </div>
                <div className="field-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    required
                  />
                </div>
                <div className="field-group">
                  <label>Role</label>
                  <select name="role" value={signupData.role} onChange={handleSignupChange}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>
                <button type="submit">Sign Up</button>
              </form>
              {signupMessage && <p className="success-text">{signupMessage}</p>}
              {signupError && <p className="error-text">{signupError}</p>}
              {backendLink && (
                <p className="backend-link">Backend signup saved at: <a href={backendLink}>{backendLink}</a></p>
              )}
            </section>
          </div>

          <section className="role-selection">
            <h2>Already registered?</h2>
            <div className="role-buttons">
              <button type="button" onClick={() => handleRoleSelect('teacher')}>
                Teacher Login
              </button>
              <button type="button" onClick={() => handleRoleSelect('student')}>
                Student Login
              </button>
            </div>
            <p className="note">Choose your role to login and access the dashboard.</p>
          </section>
        </div>
      </div>
    )
  }

  if (view === 'login') {
    return (
      <div className="app-wrapper">
        <div className="login-page">
          {headerSection}
          <div className="login-panel">
            <h2>{loginLabel}</h2>
            <form onSubmit={handleLogin} className="form">
              <div className="field-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={loginData.username}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="field-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              {loginError && <p className="error-text">{loginError}</p>}
              <div className="page-actions">
                <button type="submit">Sign In</button>
                <button type="button" onClick={() => setView('landing')}>
                  Back
                </button>
              </div>
            </form>
            <p className="help-text">
              Use <strong>teacher/teacher123</strong> or <strong>student/student123</strong>.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-wrapper">
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div>
            <p className="subtitle">Dashboard</p>
            <h2>Welcome, {user?.name}</h2>
            <p>{user?.role === 'teacher'
              ? 'Teacher access: read and write student marks.'
              : 'Student access: search and download your marks.'}
            </p>
          </div>
          <div className="dashboard-actions">
            <button type="button" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <div className="dashboard-grid">
          {user?.role === 'teacher' && (
            <section className="card-panel">
              <h3>Add / Update Marks</h3>
              <form className="form" onSubmit={handleAddStudent}>
                <div className="field-group">
                  <label>Student Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field-group">
                  <label>Roll Number</label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field-row">
                  <div className="field-group small">
                    <label>Maths</label>
                    <input
                      type="number"
                      name="math"
                      value={formData.math}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      required
                    />
                  </div>
                  <div className="field-group small">
                    <label>Science</label>
                    <input
                      type="number"
                      name="science"
                      value={formData.science}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      required
                    />
                  </div>
                  <div className="field-group small">
                    <label>English</label>
                    <input
                      type="number"
                      name="english"
                      value={formData.english}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      required
                    />
                  </div>
                </div>
                <button type="submit">Save Report</button>
              </form>
            </section>
          )}

          <section className="card-panel">
            <h3>{user?.role === 'teacher' ? 'Search Student Marks' : 'Download Your Marks'}</h3>
            <form className="form" onSubmit={handleSearchStudent}>
              <div className="field-group">
                <label>Roll Number</label>
                <input
                  type="text"
                  value={searchRoll}
                  onChange={(e) => setSearchRoll(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Search</button>
            </form>

            {message && <p className="info-text">{message}</p>}

            {selectedStudent && (
              <div className="summary-card">
                <div className="summary-row">
                  <span>Name</span>
                  <strong>{selectedStudent.name}</strong>
                </div>
                <div className="summary-row">
                  <span>Roll Number</span>
                  <strong>{selectedStudent.rollNumber}</strong>
                </div>
                <div className="summary-row">
                  <span>Maths</span>
                  <strong>{selectedStudent.math ?? selectedStudent.maths}</strong>
                </div>
                <div className="summary-row">
                  <span>Science</span>
                  <strong>{selectedStudent.science}</strong>
                </div>
                <div className="summary-row">
                  <span>English</span>
                  <strong>{selectedStudent.english}</strong>
                </div>
                <div className="summary-row separator">
                  <span>Total</span>
                  <strong>{selectedStudent.total}</strong>
                </div>
                <div className="summary-row">
                  <span>Average</span>
                  <strong>{selectedStudent.average}</strong>
                </div>
                <div className="summary-row grade-row">
                  <span>Grade</span>
                  <strong>{selectedStudent.grade}</strong>
                </div>
                <div className="page-actions">
                  <button type="button" onClick={() => generatePDF(selectedStudent)}>
                    Download PDF
                  </button>
                </div>
              </div>
            )}
          </section>

          <section className="card-panel full-width">
            <h3>Grading Guide</h3>
            <div className="grading-grid">
              <div><strong>A+</strong><span>90 - 100</span></div>
              <div><strong>A</strong><span>80 - 89</span></div>
              <div><strong>B</strong><span>70 - 79</span></div>
              <div><strong>C</strong><span>60 - 69</span></div>
              <div><strong>D</strong><span>50 - 59</span></div>
              <div><strong>F</strong><span>Below 50</span></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
