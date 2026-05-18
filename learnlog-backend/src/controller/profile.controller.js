const userModel = require("../models/user.model");

const updateProfileInfo = async (req, res) => {
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  try {
    const { fullName, email, age } = req.body;

    const updateData = {
      fullName,
      email,
      age,
    };

    if (req.file) {
      updateData.profileImage = `https://learnlog-project-rx9c.onrender.com/uploads/${req.file.filename}`;
    }

    const user = await userModel
      .findByIdAndUpdate(req.user.userId, updateData, {
        new: true,
      })
      .select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { updateProfileInfo };
