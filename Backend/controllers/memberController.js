const User   = require("../models/User");
const Member = require("../models/Member");

// ── GET ALL MEMBERS (Admin) ──────────────────────────────
// GET /api/members
const getMembers = async (req, res, next) => {
  try {
    const members = await Member.find()
      .populate("user", "name email isActive createdAt")
      .sort("-createdAt");

    res.json({ success: true, count: members.length, data: members });
  } catch (err) {
    next(err);
  }
};

// ── GET SINGLE MEMBER ────────────────────────────────────
// GET /api/members/:id
const getMember = async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id).populate("user", "name email phone");
    if (!member) return res.status(404).json({ success: false, message: "Member not found" });
    res.json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
};

// ── UPDATE MEMBER ────────────────────────────────────────
// PUT /api/members/:id
const updateMember = async (req, res, next) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    }).populate("user", "name email");

    if (!member) return res.status(404).json({ success: false, message: "Member not found" });
    res.json({ success: true, message: "Member updated", data: member });
  } catch (err) {
    next(err);
  }
};

// ── TOGGLE SUSPEND / ACTIVATE ────────────────────────────
// PUT /api/members/:id/toggle-status
const toggleStatus = async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: "Member not found" });

    member.status = member.status === "active" ? "suspended" : "active";
    await member.save();

    // User ka isActive bhi update karo
    await User.findByIdAndUpdate(member.user, {
      isActive: member.status === "active",
    });

    res.json({ success: true, message: `Member ${member.status}`, data: member });
  } catch (err) {
    next(err);
  }
};

// ── DELETE MEMBER ────────────────────────────────────────
// DELETE /api/members/:id
const deleteMember = async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: "Member not found" });

    await User.findByIdAndDelete(member.user);
    await member.deleteOne();

    res.json({ success: true, message: "Member deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMembers, getMember, updateMember, toggleStatus, deleteMember };