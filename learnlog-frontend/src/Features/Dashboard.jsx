import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BookOpen, Clock, TrendingUp, Target, User } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      const res = await axiosInstance.get("/api/dashboard");

      setStats(res.data.stats);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch dashboard data",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-sm p-12 text-center">
        <h2 className="text-lg font-semibold text-gray-700">
          Loading dashboard...
        </h2>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-white rounded-3xl shadow-sm p-12 text-center">
        <h2 className="text-lg font-semibold text-gray-700">
          No dashboard data available.
        </h2>
      </div>
    );
  }

  const weeklyData = stats.weeklySummary || [];
  const recentEntries = stats.recentLogs || [];

  const maxHours = Math.max(...weeklyData.map((item) => item.hours), 1);

  const cards = [
    {
      title: "Total Entries",
      value: stats.totalEntries,
      icon: BookOpen,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-700",
      border: "border-yellow-200",
    },
    {
      title: "Total Study Hours",
      value: `${stats.totalStudyHours}h`,
      icon: Clock,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-700",
      border: "border-amber-200",
    },
    {
      title: "This Week",
      value: `${stats.thisWeekHours}h`,
      icon: TrendingUp,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-700",
      border: "border-orange-200",
    },
    {
      title: "Productivity",
      value: stats.productivity,
      icon: Target,
      iconBg: "bg-black",
      iconColor: "text-yellow-400",
      border: "border-gray-900",
      dark: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-black via-gray-900 to-black rounded-3xl shadow-xl p-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-300 mt-2">
              Track your learning progress and stay consistent.
            </p>
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-400 shadow-md transition group-hover:scale-105 group-hover:shadow-lg bg-black flex items-center justify-center">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={20} className="text-yellow-400" />
              )}
            </div>

            <span className="text-xs text-gray-300 group-hover:text-yellow-400 transition">
              Profile
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className={`rounded-3xl shadow-sm p-6 border ${
                card.dark ? "bg-gray-950 text-white" : "bg-white"
              } ${card.border}`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${card.iconBg} ${card.iconColor}`}
              >
                <Icon size={24} />
              </div>

              <p
                className={`text-sm ${
                  card.dark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-1">{card.value}</h2>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white border border-yellow-200 rounded-3xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900">
            Weekly Learning Summary
          </h2>

          <p className="text-sm text-gray-500 mt-1 mb-6">
            Study hours over the last 7 days.
          </p>

          <div className="space-y-4">
            {weeklyData.map((item) => (
              <div key={item.day}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{item.day}</span>
                  <span className="font-medium text-gray-900">
                    {item.hours}h
                  </span>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className="bg-linear-to-r from-yellow-400 to-amber-500 h-2.5 rounded-full"
                    style={{
                      width: `${(item.hours / maxHours) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-yellow-200 rounded-3xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Logs</h2>

          <p className="text-sm text-gray-500 mt-1 mb-6">
            Your latest learning entries.
          </p>

          <div className="space-y-4">
            {recentEntries.length === 0 ? (
              <p className="text-sm text-gray-500">No recent entries found.</p>
            ) : (
              recentEntries.map((entry) => (
                <div
                  key={entry._id}
                  className="border border-gray-200 rounded-2xl p-4 hover:border-yellow-300 transition"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {entry.topic}
                    </h3>

                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 whitespace-nowrap">
                      {entry.difficulty}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500">
                    {entry.studyDuration} hours studied
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(entry.date).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
