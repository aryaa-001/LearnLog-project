const mongoose = require("mongoose");

const entrySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    topic: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    studyDuration: {
      type: Number,
      required: true,
      min: 0.25, 
    },

    difficulty: {
      type: String,
      required: true,
      enum: ["Easy", "Medium", "Hard"],
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("entry", entrySchema);
