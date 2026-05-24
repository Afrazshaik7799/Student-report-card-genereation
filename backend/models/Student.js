const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  math: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  science: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  english: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  total: {
    type: Number,
    required: true,
  },
  average: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
    required: true,
    trim: true,
  },
  remarks: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Student", studentSchema);