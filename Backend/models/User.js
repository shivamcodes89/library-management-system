const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, "Name is required"],
      trim:     true,
      maxlength:[50, "Name max 50 characters"],
    },
    email: {
      type:     String,
      required: [true, "Email is required"],
      unique:   true,
      lowercase: true,
      match:    [/^\S+@\S+\.\S+$/, "Invalid email"],
    },
    password: {
      type:     String,
      required: [true, "Password is required"],
      minlength:[6, "Min 6 characters"],
      select:   false,
    },
    role: {
      type:    String,
      enum:    ["admin", "member"],
      default: "member",
    },
    phone:    { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model("User", userSchema);