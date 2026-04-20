const express = require("express");
const router  = express.Router();

const {
  getBooks, getBook, addBook, updateBook, deleteBook,
} = require("../controllers/bookController");

const { protect, adminOnly }        = require("../middleware/authMiddleware");
const { validate, bookRules }       = require("../middleware/validationMiddleware");

router.get  ("/",    protect, getBooks);                          // All users
router.get  ("/:id", protect, getBook);                           // All users
router.post ("/",    protect, adminOnly, bookRules, validate, addBook);    // Admin only
router.put  ("/:id", protect, adminOnly, updateBook);             // Admin only
router.delete("/:id",protect, adminOnly, deleteBook);             // Admin only

module.exports = router;