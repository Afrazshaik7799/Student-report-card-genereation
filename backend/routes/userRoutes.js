const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, phone, username, password, role } = req.body;

    if (!fullName || !email || !phone || !username || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email or username already exists." });
    }

    const user = new User({
      fullName,
      email,
      phone,
      username,
      password,
      role,
    });

    await user.save();
    res.status(201).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      username: user.username,
      role: user.role,
      backendUrl: `${req.protocol}://${req.get("host")}/api/users`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
