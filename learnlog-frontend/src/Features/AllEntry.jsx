import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

import toast from "react-hot-toast";
import {
  BookOpen,
  Search,
  Clock,
  Calendar,
  Pencil,
  Trash2,
  X,
  Filter,
} from "lucide-react";

const AllEntries = () => {
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editData, setEditData] = useState({
    topic: "",
    description: "",
  });

  const fetchEntries = async () => {
    try {
      const res = await axiosInstance.get("/api/entries/showall");

      setEntries(res.data.entries);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch entries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?",
    );

    if (!confirmDelete) return;

    try {
      const res = await axiosInstance.delete(`/api/entries/delete/${id}`);

      setEntries((prev) => prev.filter((entry) => entry._id !== id));

      toast.success(res.data.message || "Entry deleted successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete this entry",
      );
    }
  };

  const handleOpenEdit = (entry) => {
    setSelectedEntry(entry);
    setEditData({
      topic: entry.topic,
      description: entry.description,
    });
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setSelectedEntry(null);
    setEditData({
      topic: "",
      description: "",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:5858/api/entries/edit/${selectedEntry._id}`,
        editData,
        {
          withCredentials: true,
        },
      );

      setEntries((prev) =>
        prev.map((entry) =>
          entry._id === selectedEntry._id
            ? {
                ...entry,
                topic: editData.topic,
                description: editData.description,
              }
            : entry,
        ),
      );

      toast.success(res.data.message || "Entry updated successfully");

      handleCloseEdit();
    } catch (error) {
      const message = error.response?.data?.message;

      if (Array.isArray(message)) {
        message.forEach((msg) => toast.error(msg));
      } else {
        toast.error(message || "Failed to update your entry");
      }
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setDifficultyFilter("");
    setDateFilter("");
  };

  const getDifficultyClasses = (difficulty) => {
    if (difficulty === "Easy") {
      return "bg-green-100 text-green-700";
    }

    if (difficulty === "Medium") {
      return "bg-yellow-100 text-yellow-800";
    }

    if (difficulty === "Hard") {
      return "bg-red-100 text-red-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch = entry.topic
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesDifficulty =
      difficultyFilter === "" || entry.difficulty === difficultyFilter;

    const matchesDate =
      dateFilter === "" ||
      new Date(entry.date).toISOString().split("T")[0] === dateFilter;

    return matchesSearch && matchesDifficulty && matchesDate;
  });

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-sm p-12 text-center">
        <h2 className="text-lg font-semibold text-gray-700">
          Loading entries...
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="bg-linear-to-r from-black via-gray-900 to-black rounded-3xl shadow-xl p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-yellow-400 text-black flex items-center justify-center">
              <BookOpen size={26} />
            </div>

            <div>
              <h1 className="text-3xl font-bold">All Entries</h1>
              <p className="text-gray-300 mt-1">
                View, search, edit, and delete your learning logs.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-yellow-200 rounded-3xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={18} className="text-yellow-600" />
            <h2 className="font-semibold text-gray-900">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search by topic name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {(searchTerm || difficultyFilter || dateFilter) && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="text-sm font-medium text-yellow-700 hover:text-yellow-800"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {filteredEntries.length === 0 ? (
          <div className="bg-white border border-yellow-200 rounded-3xl shadow-sm p-12 text-center">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No entries found
            </h3>
            <p className="text-gray-500">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <div
                key={entry._id}
                className="bg-white border border-yellow-200 rounded-3xl shadow-sm p-6 hover:shadow-md transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h2 className="text-xl font-bold text-gray-900">
                        {entry.topic}
                      </h2>

                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${getDifficultyClasses(
                          entry.difficulty,
                        )}`}
                      >
                        {entry.difficulty}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {entry.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        {entry.studyDuration} hours
                      </div>

                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        {new Date(entry.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(entry)}
                      className="p-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(entry._id)}
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-yellow-200">
            <div className="flex items-center justify-between px-6 py-5 border-b border-yellow-100">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Edit Entry</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Update the topic and description.
                </p>
              </div>

              <button
                onClick={handleCloseEdit}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic
                </label>
                <input
                  type="text"
                  value={editData.topic}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      topic: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows="6"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 resize-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseEdit}
                  className="px-5 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 bg-black text-yellow-400 rounded-xl font-semibold hover:bg-gray-900"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AllEntries;
