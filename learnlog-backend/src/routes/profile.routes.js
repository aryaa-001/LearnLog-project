const express = require("express");
const upload = require("../middlewares/upload.middleware");
const isLoggedIn = require("../middlewares/auth.middleware");
const { updateProfileInfo } = require("../controller/profile.controller");

const router = express.Router();

router.put("/", isLoggedIn, upload.single("profileImage"), updateProfileInfo);

module.exports = router;
