const express = require("express");
const {userLogin, userRegister, getMe, userLogout, handleForgotPassword, resetPassword, changePassword} = require("../controller/auth.controller");
const validateRegister = require('../middlewares/registerValidation');
const isLoggedIn = require("../middlewares/auth.middleware.js")

const router = express.Router()

router.post("/login", userLogin);
router.post("/register", validateRegister, userRegister);
router.get("/me", isLoggedIn, getMe);
router.post("/logout", userLogout);
router.post("/forgot-password", handleForgotPassword)
router.put("/reset-password/:token", resetPassword)
router.put("/change-password",isLoggedIn,changePassword);

module.exports = router;
