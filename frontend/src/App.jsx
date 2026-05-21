import './App.css'
import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    math: '',
    science: '',
    english: ''
  })
  const [report, setReport] = useState(null)
  const [showReportPage, setShowReportPage] = useState(false)

  const fixedLogo = (
    <div className="logo-fixed">
      <div className="logo-mark">SR</div>
      <div className="logo-text">
        <strong>School Report</strong>
        <span>Academic Summary</span>
      </div>
    </div>
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const math = parseFloat(formData.math)
    const science = parseFloat(formData.science)
    const english = parseFloat(formData.english)

    const total = math + science + english
    const average = total / 3

    let grade
    if (average >= 90) grade = 'A+'
    else if (average >= 80) grade = 'A'
    else if (average >= 70) grade = 'B'
    else if (average >= 60) grade = 'C'
    else if (average >= 50) grade = 'D'
    else grade = 'F'

    setReport({
      name: formData.name,
      rollNumber: formData.rollNumber,
      math,
      science,
      english,
      total,
      average: average.toFixed(2),
      grade
    })
    setShowReportPage(false)
  }

  const handleViewFullReport = () => setShowReportPage(true)
  const handleBack = () => setShowReportPage(false)

  if (showReportPage && report) {
    return (
      <div className="app-wrapper">
        <div className="report-page">
          <div className="report-page-header">
            {fixedLogo}
            <div>
              <p className="subtitle">Final Report</p>
              <h2>Student Report Card</h2>
            </div>
          </div>

          <div className="report-summary">
            <div className="report-summary-row">
              <span>Name</span>
              <strong>{report.name}</strong>
            </div>
            <div className="report-summary-row">
              <span>Roll Number</span>
              <strong>{report.rollNumber}</strong>
            </div>
            <div className="report-summary-row">
              <span>Total Marks</span>
              <strong>{report.total}</strong>
            </div>
            <div className="report-summary-row">
              <span>Average</span>
              <strong>{report.average}</strong>
            </div>
            <div className="report-summary-row grade-row">
              <span>Grade</span>
              <strong>{report.grade}</strong>
            </div>
          </div>

          <div className="report-details">
            <h3>Subject Breakdown</h3>
            <div className="report-card-row">
              <span>Math</span>
              <strong>{report.math}</strong>
            </div>
            <div className="report-card-row">
              <span>Science</span>
              <strong>{report.science}</strong>
            </div>
            <div className="report-card-row">
              <span>English</span>
              <strong>{report.english}</strong>
            </div>
          </div>

          <div className="page-actions">
            <button type="button" onClick={handleBack}>Back to Details</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-wrapper">
      <div className="report-card">
        <section className="form-panel">
          <div className="header-row">
            {fixedLogo}
            <div className="header-copy">
              <h1>Student Report Card</h1>
              <p>Enter student details below. The final report will be generated on a separate page.</p>
            </div>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="field-group">
              <label>Student Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter student name"
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
                placeholder="Enter roll number"
                value={formData.rollNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field-row">
              <div className="field-group small">
                <label>Math Marks</label>
                <input
                  type="number"
                  name="math"
                  placeholder="0 - 100"
                  value={formData.math}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field-group small">
                <label>Science Marks</label>
                <input
                  type="number"
                  name="science"
                  placeholder="0 - 100"
                  value={formData.science}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field-group small">
                <label>English Marks</label>
                <input
                  type="number"
                  name="english"
                  placeholder="0 - 100"
                  value={formData.english}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit">Generate Report</button>
          </form>
        </section>

        <section className="summary-panel">
          <div className="summary-header">
            <div>
              <p className="subtitle">Student Details</p>
              <h2>Report Summary</h2>
            </div>
            <span className="status-chip">Details Only</span>
          </div>

          {report ? (
            <div className="summary-card">
              <div className="summary-row">
                <span>Student Name</span>
                <strong>{report.name}</strong>
              </div>
              <div className="summary-row">
                <span>Roll Number</span>
                <strong>{report.rollNumber}</strong>
              </div>
              <div className="summary-row separator">
                <span>Report Status</span>
                <strong>Ready for full view</strong>
              </div>
              <div className="page-actions">
                <button type="button" onClick={handleViewFullReport}>View Full Report Page</button>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <p>Submit the form to lock in the student details and generate the report on the next page.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default App