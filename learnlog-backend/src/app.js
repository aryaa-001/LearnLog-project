const express = require("express");
const cors = require("cors");
const entryRouter = require("./routes/entry.routes");
const authRouter = require("./routes/auth.routes");
const dashboardRouter = require("./routes/dashboard.routes")
const profileRouter = require("./routes/profile.routes")
const cookieParser = require('cookie-parser');

const app = express();
app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser())

app.use("/api/entries", entryRouter);
app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter)
app.use('/api/profile-update', profileRouter)

module.exports = app;
