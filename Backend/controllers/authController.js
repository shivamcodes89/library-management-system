const User          = require("../models/User");
const Member        = require("../models/Member");
const generateToken = require("../utils/generateToken");

// ── REGISTER ─────────────────────────────────────────────
// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password, role, phone } = req.body;

    // Check karo email exist karta hai ya nahi
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // User banao
    const user = await User.create({ name, email, password, role: role || "member", phone });

    // Agar member hai toh Member record bhi banao
    if (user.role === "member") {
      await Member.create({ user: user._id, phone: phone || "" });
    }

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        _id:   user._id,
        name:  user.name,
        email: user.email,
        role:  user.role,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ── LOGIN ────────────────────────────────────────────────
// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Password bhi select karo (default mein select:false hai)
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: "Account suspended. Contact admin." });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: "Login successful",
      data: {
        _id:   user._id,
        name:  user.name,
        email: user.email,
        role:  user.role,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ── GET MY PROFILE ───────────────────────────────────────
// GET /api/auth/me
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// ── UPDATE PROFILE ───────────────────────────────────────
// PUT /api/auth/me
const updateMe = async (req, res, next) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone },
      { new: true, runValidators: true }
    );
    res.json({ success: true, message: "Profile updated", data: user });
  } catch (err) {
    next(err);
  }
};

// ── CHANGE PASSWORD ──────────────────────────────────────
// PUT /api/auth/change-password
const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");

    if (!(await user.matchPassword(oldPassword))) {
      return res.status(400).json({ success: false, message: "Old password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    next(err);
  }
};

// ── GET ALL USERS (Admin) ────────────────────────────────
// GET /api/auth/users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort("-createdAt");
    res.json({ success: true, count: users.length, data: users });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getMe, updateMe, changePassword, getAllUsers };