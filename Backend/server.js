const express   = require("express");
const dotenv    = require("dotenv");
const cors      = require("cors");
const morgan    = require("morgan");
const helmet    = require("helmet");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ── MIDDLEWARE ──────────────────────────
app.use(helmet());
app.use(cors({
  origin:      process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// ── ROUTES ──────────────────────────────
app.use("/api/auth",    require("./routes/authRoutes"));
app.use("/api/books",   require("./routes/bookRoutes"));
app.use("/api/members", require("./routes/memberRoutes"));
app.use("/api/borrow",  require("./routes/borrowRoutes"));

// ── HEALTH CHECK ────────────────────────
app.get("/", (req, res) =>
  res.json({ message: "📖 LEXICON API running!", status: "OK" })
);

// ── 404 ─────────────────────────────────
app.use((req, res) =>
  res.status(404).json({ success: false, message: "Route not found" })
);

// ── GLOBAL ERROR ─────────────────────────
app.use(require("./middleware/errorMiddleware"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server: http://localhost:${PORT}`);
  console.log(`🌍 Mode  : ${process.env.NODE_ENV}`);
});