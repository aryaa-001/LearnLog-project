const express = require("express");
const cors = require("cors");
const entryRouter = require("./routes/entry.routes");
const authRouter = require("./routes/auth.routes");
const dashboardRouter = require("./routes/dashboard.routes");
const profileRouter = require("./routes/profile.routes");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
app.set("trust proxy", 1);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

const allowedOrigins = [
  "http://localhost:5173",
  "https://vishal-learnlog.vercel.app",
  "https://learn-log-project.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/entries", entryRouter);
app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/profile-update", profileRouter);

module.exports = app;
