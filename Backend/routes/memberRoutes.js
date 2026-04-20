const express = require("express");
const router  = express.Router();

const {
  getMembers, getMember, updateMember, toggleStatus, deleteMember,
} = require("../controllers/memberController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get   ("/",              protect, adminOnly, getMembers);
router.get   ("/:id",           protect, adminOnly, getMember);
router.put   ("/:id",           protect, adminOnly, updateMember);
router.put   ("/:id/toggle-status", protect, adminOnly, toggleStatus);
router.delete("/:id",           protect, adminOnly, deleteMember);

module.exports = router;