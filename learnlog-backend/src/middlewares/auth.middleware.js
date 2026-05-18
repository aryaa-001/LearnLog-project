const express = require("express");
const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token not found, please login ",
    });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch (error) {
    res.clearCookie("token");
    res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }
};

module.exports = isLoggedIn;