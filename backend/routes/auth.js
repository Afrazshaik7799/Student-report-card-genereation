const express = require("express");
const router = express.Router();
const User = require("../models/User");

const teacherAccounts = [
  { username: "teacher", password: "teacher123", name: "Teacher User", role: "teacher" },
];

const studentAccounts = [
  { username: "student", password: "student123", name: "Student User", role: "student" },
];

router.post("/login", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "Username, password and role are required" });
  }

  if (role === "teacher" || role === "student") {
    const dbUser = await User.findOne({ username, password, role });
    if (dbUser) {
      return res.json({ username: dbUser.username, name: dbUser.fullName, role: dbUser.role });
    }
  }

  if (role === "teacher") {
    const user = teacherAccounts.find(
      (account) => account.username === username && account.password === password
    );
    if (!user) return res.status(401).json({ message: "Invalid teacher credentials" });
    return res.json({ username: user.username, name: user.name, role: user.role });
  }

  if (role === "student") {
    const user = studentAccounts.find(
      (account) => account.username === username && account.password === password
    );
    if (!user) return res.status(401).json({ message: "Invalid student credentials" });
    return res.json({ username: user.username, name: user.name, role: user.role });
  }

  return res.status(400).json({ message: "Role must be teacher or student" });
});

module.exports = router;
