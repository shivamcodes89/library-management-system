const Book        = require("../models/Book");
const APIFeatures = require("../utils/apiFeatures");

// ── GET ALL BOOKS ────────────────────────────────────────
// GET /api/books
const getBooks = async (req, res, next) => {
  try {
    const features = new APIFeatures(Book.find(), req.query)
      .search(["title", "author"])
      .filter()
      .sort()
      .paginate(12);

    const books = await features.query.populate("addedBy", "name email");
    const total = await Book.countDocuments();

    res.json({ success: true, count: books.length, total, data: books });
  } catch (err) {
    next(err);
  }
};

// ── GET SINGLE BOOK ──────────────────────────────────────
// GET /api/books/:id
const getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate("addedBy", "name");
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    res.json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
};

// ── ADD BOOK (Admin only) ────────────────────────────────
// POST /api/books
const addBook = async (req, res, next) => {
  try {
    req.body.addedBy  = req.user._id;
    req.body.available = req.body.totalCopies || 1;
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, message: "Book added", data: book });
  } catch (err) {
    next(err);
  }
};

// ── UPDATE BOOK (Admin only) ─────────────────────────────
// PUT /api/books/:id
const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new:            true,
      runValidators:  true,
    });
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    res.json({ success: true, message: "Book updated", data: book });
  } catch (err) {
    next(err);
  }
};

// ── DELETE BOOK (Admin only) ─────────────────────────────
// DELETE /api/books/:id
const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    if (book.available !== book.totalCopies) {
      return res.status(400).json({ success: false, message: "Cannot delete — some copies are borrowed" });
    }
    await book.deleteOne();
    res.json({ success: true, message: "Book deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getBooks, getBook, addBook, updateBook, deleteBook };