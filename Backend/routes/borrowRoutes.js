const express = require("express");
const router  = express.Router();

const {
  getAllRecords, getMyRecords,
  issueBook, returnBook, getStats,
} = require("../controllers/borrowController");

const { protect, adminOnly }          = require("../middleware/authMiddleware");
const { validate, borrowRules }       = require("../middleware/validationMiddleware");

router.get("/stats",    protect, adminOnly, getStats);           // Admin
router.get("/",         protect, adminOnly, getAllRecords);       // Admin
router.get("/my",       protect, getMyRecords);                  // Member
router.post("/issue",   protect, adminOnly, borrowRules, validate, issueBook); // Admin
router.put("/:id/return", protect, adminOnly, returnBook);       // Admin

module.exports = router;