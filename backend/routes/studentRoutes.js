const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

const gradeForAverage = (average) => {
  if (average >= 90) return { grade: "A+", remarks: "Excellent" };
  if (average >= 80) return { grade: "A", remarks: "Very Good" };
  if (average >= 70) return { grade: "B", remarks: "Good" };
  if (average >= 60) return { grade: "C", remarks: "Needs Improvement" };
  if (average >= 50) return { grade: "D", remarks: "Satisfactory" };
  return { grade: "F", remarks: "Failed" };
};

router.post("/add", async (req, res) => {
  try {
    const { name, rollNo, maths, science, english } = req.body;
    const mathScore = Number(maths);
    const scienceScore = Number(science);
    const englishScore = Number(english);

    const total = mathScore + scienceScore + englishScore;
    const average = Number((total / 3).toFixed(2));
    const { grade, remarks } = gradeForAverage(average);

    const student = new Student({
      name,
      rollNumber: rollNo,
      math: mathScore,
      science: scienceScore,
      english: englishScore,
      total,
      average,
      grade,
      remarks,
    });

    await student.save();

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/roll/:rollNumber", async (req, res) => {
  try {
    const student = await Student.findOne({ rollNumber: req.params.rollNumber });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;