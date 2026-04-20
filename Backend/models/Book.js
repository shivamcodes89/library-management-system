const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title:  { type: String, required: [true, "Title required"], trim: true },
    author: { type: String, required: [true, "Author required"], trim: true },
    isbn:   { type: String, unique: true, sparse: true, trim: true },
    category: {
      type:    String,
      enum:    ["Fiction","Classic","Dystopia","Fantasy","History","Self-Help","Science","Biography","Other"],
      default: "Other",
    },
    totalCopies: { type: Number, default: 1, min: [1, "Min 1 copy"] },
    available:   { type: Number, default: 1, min: [0, "Cannot be negative"] },
    coverImage:  { type: String, default: "" },
    description: { type: String, default: "" },
    addedBy:     { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);