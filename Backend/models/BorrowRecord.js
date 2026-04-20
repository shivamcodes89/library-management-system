const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema(
  {
    book:       { type: mongoose.Schema.Types.ObjectId, ref: "Book",   required: true },
    member:     { type: mongoose.Schema.Types.ObjectId, ref: "User",   required: true },
    issuedBy:   { type: mongoose.Schema.Types.ObjectId, ref: "User"   },
    issueDate:  { type: Date, default: Date.now },
    dueDate:    { type: Date, required: true },
    returnDate: { type: Date, default: null },
    status:     { type: String, enum: ["active","returned","overdue"], default: "active" },
    fine:       { type: Number, default: 0 },
    notes:      { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BorrowRecord", borrowSchema);