const { body, validationResult } = require("express-validator");

// Validation errors check karo
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors:  errors.array(),
    });
  }
  next();
};

// Register validation rules
const registerRules = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 50 }).withMessage("Max 50 chars"),
  body("email").isEmail().withMessage("Valid email required").normalizeEmail(),
  body("password").isLength({ min: 6 }).withMessage("Password min 6 characters"),
  body("role").optional().isIn(["admin", "member"]).withMessage("Role must be admin or member"),
];

// Login validation rules
const loginRules = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Book validation rules
const bookRules = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("author").trim().notEmpty().withMessage("Author is required"),
  body("totalCopies").optional().isInt({ min: 1 }).withMessage("Min 1 copy"),
];

// Borrow validation rules
const borrowRules = [
  body("bookId").notEmpty().withMessage("Book ID required"),
  body("memberId").notEmpty().withMessage("Member ID required"),
  body("dueDate").isISO8601().withMessage("Valid due date required"),
];

module.exports = { validate, registerRules, loginRules, bookRules, borrowRules };