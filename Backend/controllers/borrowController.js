const BorrowRecord = require("../models/BorrowRecord");
const Book         = require("../models/Book");
const Member       = require("../models/Member");

// ── GET ALL RECORDS (Admin) ──────────────────────────────
// GET /api/borrow
const getAllRecords = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const records = await BorrowRecord.find(filter)
      .populate("book",   "title author coverImage")
      .populate("member", "name email")
      .populate("issuedBy","name")
      .sort("-createdAt");

    res.json({ success: true, count: records.length, data: records });
  } catch (err) {
    next(err);
  }
};

// ── GET MY RECORDS (Member) ──────────────────────────────
// GET /api/borrow/my
const getMyRecords = async (req, res, next) => {
  try {
    const records = await BorrowRecord.find({ member: req.user._id })
      .populate("book", "title author coverImage")
      .sort("-createdAt");

    res.json({ success: true, data: records });
  } catch (err) {
    next(err);
  }
};

// ── ISSUE BOOK (Admin) ───────────────────────────────────
// POST /api/borrow/issue
const issueBook = async (req, res, next) => {
  try {
    const { bookId, memberId, dueDate, notes } = req.body;

    // Book check karo
    const book = await Book.findById(bookId);
    if (!book)             return res.status(404).json({ success: false, message: "Book not found" });
    if (book.available < 1) return res.status(400).json({ success: false, message: "No copies available" });

    // Member check karo
    const member = await Member.findOne({ user: memberId });
    if (!member) return res.status(404).json({ success: false, message: "Member not found" });
    if (member.status !== "active") return res.status(400).json({ success: false, message: "Member is suspended" });
    if (member.currentlyBorrowed >= member.maxBorrowLimit)
      return res.status(400).json({ success: false, message: `Borrow limit reached (max ${member.maxBorrowLimit})` });

    // Record banao
    const record = await BorrowRecord.create({
      book:     bookId,
      member:   memberId,
      issuedBy: req.user._id,
      dueDate:  new Date(dueDate),
      notes:    notes || "",
    });

    // Book available count kam karo
    book.available -= 1;
    await book.save();

    // Member stats update karo
    member.totalBorrowed     += 1;
    member.currentlyBorrowed += 1;
    await member.save();

    await record.populate([
      { path: "book",   select: "title author" },
      { path: "member", select: "name email" },
    ]);

    res.status(201).json({ success: true, message: "Book issued successfully", data: record });
  } catch (err) {
    next(err);
  }
};

// ── RETURN BOOK ──────────────────────────────────────────
// PUT /api/borrow/:id/return
const returnBook = async (req, res, next) => {
  try {
    const record = await BorrowRecord.findById(req.params.id);
    if (!record)              return res.status(404).json({ success: false, message: "Record not found" });
    if (record.status === "returned") return res.status(400).json({ success: false, message: "Already returned" });

    const today = new Date();

    // Fine calculate karo — Rs.5 per day overdue
    let fine = 0;
    if (today > record.dueDate) {
      const days = Math.ceil((today - record.dueDate) / (1000 * 60 * 60 * 24));
      fine = days * 5;
    }

    record.returnDate = today;
    record.status     = "returned";
    record.fine       = fine;
    await record.save();

    // Book available count badhao
    await Book.findByIdAndUpdate(record.book, { $inc: { available: 1 } });

    // Member stats update karo
    await Member.findOneAndUpdate(
      { user: record.member },
      { $inc: { currentlyBorrowed: -1 } }
    );

    res.json({ success: true, message: "Book returned successfully", fine, data: record });
  } catch (err) {
    next(err);
  }
};

// ── STATS (Admin Dashboard) ──────────────────────────────
// GET /api/borrow/stats
const getStats = async (req, res, next) => {
  try {
    const total    = await BorrowRecord.countDocuments();
    const active   = await BorrowRecord.countDocuments({ status: "active" });
    const returned = await BorrowRecord.countDocuments({ status: "returned" });

    // Overdue update karo — jo due ho gayi aur abhi bhi active hain
    const now = new Date();
    await BorrowRecord.updateMany(
      { status: "active", dueDate: { $lt: now } },
      { status: "overdue" }
    );
    const overdue = await BorrowRecord.countDocuments({ status: "overdue" });

    const totalBooks   = await Book.countDocuments();
    const totalMembers = await Member.countDocuments();

    res.json({
      success: true,
      data: { total, active, returned, overdue, totalBooks, totalMembers },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllRecords, getMyRecords, issueBook, returnBook, getStats };