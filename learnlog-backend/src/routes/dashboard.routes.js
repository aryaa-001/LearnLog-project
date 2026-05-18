const express = require("express");
const isLoggedIn = require("../middlewares/auth.middleware");
const {
  getDashboardStats,
} = require("../controller/dashboard.controller");

const router = express.Router();

router.get("/", isLoggedIn, getDashboardStats);

module.exports = router;
