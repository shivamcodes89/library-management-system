const express = require("express");
const router  = express.Router();

const {
  register, login, getMe,
  updateMe, changePassword, getAllUsers,
} = require("../controllers/authController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const {
  validate, registerRules, loginRules,
} = require("../middleware/validationMiddleware");

// Public routes
router.post("/register", registerRules, validate, register);
router.post("/login",    loginRules,    validate, login);

// Protected routes
router.get ("/me",              protect, getMe);
router.put ("/me",              protect, updateMe);
router.put ("/change-password", protect, changePassword);

// Admin routes
router.get ("/users", protect, adminOnly, getAllUsers);

module.exports = router;