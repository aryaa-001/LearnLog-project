require("dotenv").config();
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user)
      res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again",
    });
  }
};

const userRegister = async (req, res) => {
  const { fullName, email, password, age } = req.body;
  if (!fullName || !email || !password || !age) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const newEmail = email.toLowerCase().trim();
    const user = await userModel.create({
      fullName,
      email: newEmail,
      password: hashedPass,
      age,
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
    });

    const userWithoutPassword = await userModel
      .findById(user._id)
      .select("-password");

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error, please try again after sometime",
    });
  }
};

const getMe = async (req, res) => {
  const user = await userModel.findById(req.user.userId).select("-password");
  res.status(200).json({
    success: true,
    user,
  });
};

const userLogout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "user logged out",
  });
};

const handleForgotPassword = async (req, res) => {
  try {
    const normalizedEmail = req.body.email.toLowerCase().trim();

    const user = await userModel.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "If an account with that email exists, a reset link has been sent.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: `Click the following link to reset your password: ${resetUrl}`,
    });

    return res.status(200).json({
      success: true,
      message: "Password reset link has been sent to your email",
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await userModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset link",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        message: "New password must be different from current password",
      });
    }

    const user = await userModel.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  userLogin,
  userRegister,
  getMe,
  userLogout,
  handleForgotPassword,
  resetPassword,
  changePassword,
};
