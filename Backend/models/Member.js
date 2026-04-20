const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    user:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    phone:  { type: String, default: "" },
    address:{ type: String, default: "" },
    membershipId: { type: String, unique: true },
    status: { type: String, enum: ["active","suspended","expired"], default: "active" },
    totalBorrowed:     { type: Number, default: 0 },
    currentlyBorrowed: { type: Number, default: 0 },
    maxBorrowLimit:    { type: Number, default: 3  },
  },
  { timestamps: true }
);

memberSchema.pre("save", function (next) {
  if (!this.membershipId)
    this.membershipId = "LX" + Date.now().toString().slice(-6);
  next();
});

module.exports = mongoose.model("Member", memberSchema);