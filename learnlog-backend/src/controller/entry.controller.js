const entryModel = require("../models/entry.model");

const createEntry = async (req, res) => {
  try {
    const { topic, description, studyDuration, difficulty, date } = req.body;

    const entry = await entryModel.create({
      user: req.user.userId,
      topic,
      description,
      studyDuration,
      difficulty,
      date,
    });

    res.status(201).json({
      success: true,
      message: "Learning entry created successfully",
      entry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create learning entry",
    });
  }
};

const getAllEntries = async (req, res) => {
  try {
    const entries = await entryModel
      .find({
        user: req.user.userId,
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      entries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch entries",
    });
  }
};

const updateEntry = async (req, res) => {
  try {
    const { topic, description } = req.body;

    const updatedEntry = await entryModel.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId,
      },
      {
        topic,
        description,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedEntry) {
      return res.status(404).json({
        success: false,
        message: "Entry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Entry updated successfully",
      entry: updatedEntry,
    });
  } catch (error) {
    console.log(req.params.id);
    res.status(500).json({
      success: false,
      message: "Failed to update entry",
    });
  }
};

const deleteEntry = async (req, res) => {
  try {
    const deletedEntry = await entryModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!deletedEntry) {
      return res.status(404).json({
        success: false,
        message: "Entry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Entry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete entry",
    });
  }
};


module.exports = { createEntry, getAllEntries, updateEntry, deleteEntry };
