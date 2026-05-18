const entryModel = require("../models/entry.model");
const userModel = require("../models/user.model");

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    const entries = await entryModel
      .find({ user: userId })
      .sort({ createdAt: -1 });

    const totalEntries = entries.length;

    const totalStudyHours = entries.reduce(
      (sum, entry) => sum + entry.studyDuration,
      0,
    );

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const weeklyEntries = entries.filter(
      (entry) => new Date(entry.date) >= sevenDaysAgo,
    );

    const thisWeekHours = weeklyEntries.reduce(
      (sum, entry) => sum + entry.studyDuration,
      0,
    );

    let productivity = "Beginner";

    if (totalEntries == 0) {
      productivity = "Newbie";
    } else {
      if (thisWeekHours >= 34) {
        productivity = "Excellent";
      } else if (thisWeekHours >= 24) {
        productivity = "Focused";
      } else if (thisWeekHours >= 10) {
        productivity = "Improving";
      } else {
        productivity = "Backbencher";
      }
    }

    const weeklySummary = [];

    for (let i = 6; i >= 0; i--) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - i);
      currentDate.setHours(0, 0, 0, 0);

      const nextDate = new Date(currentDate);
      nextDate.setDate(nextDate.getDate() + 1);

      const hours = entries
        .filter((entry) => {
          const entryDate = new Date(entry.date);
          return entryDate >= currentDate && entryDate < nextDate;
        })
        .reduce((sum, entry) => sum + entry.studyDuration, 0);

      weeklySummary.push({
        day: currentDate.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        hours: Number(hours.toFixed(1)),
      });
    }

    const recentLogs = entries.slice(0, 3);

    res.status(200).json({
      success: true,
      stats: {
        totalEntries,
        totalStudyHours: Number(totalStudyHours.toFixed(1)),
        thisWeekHours: Number(thisWeekHours.toFixed(1)),
        productivity,
        weeklySummary,
        recentLogs,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
};

module.exports = { getDashboardStats };
