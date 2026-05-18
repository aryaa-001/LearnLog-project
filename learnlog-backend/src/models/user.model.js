const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      requied: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("user", userSchema);
