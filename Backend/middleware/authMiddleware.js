const jwt  = require("jsonwebtoken");
const User = require("../models/User");

// ── PROTECT — login zaroori hai ─────────────
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized — no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    if (!req.user.isActive) {
      return res.status(403).json({ success: false, message: "Account suspended" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Token invalid or expired" });
  }
};

// ── ADMIN ONLY ───────────────────────────────
const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admin access only" });
  }
  next();
};

// ── ADMIN OR SAME USER ───────────────────────
const adminOrSelf = (req, res, next) => {
  if (req.user?.role === "admin" || req.user?._id.toString() === req.params.id) {
    return next();
  }
  return res.status(403).json({ success: false, message: "Not authorized" });
};

module.exports = { protect, adminOnly, adminOrSelf };