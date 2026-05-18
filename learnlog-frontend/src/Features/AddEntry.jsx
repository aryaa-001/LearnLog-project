import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  PenSquare,
  Save,
  RotateCcw,
} from "lucide-react";

const AddEntry = () => {
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = async (data) => {
    try {
      await axios.post(
        "http://localhost:5858/api/entries/add",
        data,
        {
          withCredentials: true,
        },
      );

      toast.success(
        "Learning entry created successfully",
      );

      reset({
        topic: "",
        description: "",
        studyDuration: "",
        difficulty: "",
        date: new Date()
          .toISOString()
          .split("T")[0],
      });
    } catch (error) {
      const message = error.response?.data?.message;

      if (Array.isArray(message)) {
        message.forEach((msg) =>
          toast.error(msg),
        );
      } else {
        toast.error(
          message ||
            "Failed to create learning entry",
        );
      }
    }
  };

  const handleClear = () => {
    reset({
      topic: "",
      description: "",
      studyDuration: "",
      difficulty: "",
      date: new Date()
        .toISOString()
        .split("T")[0],
    });

    toast("Form cleared");
  };

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-black via-gray-900 to-black rounded-3xl shadow-xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-yellow-400 text-black flex items-center justify-center">
            <PenSquare size={26} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Add Learning Entry
            </h1>
            <p className="text-gray-300 mt-1">
              Record what you studied today.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-yellow-200 rounded-3xl shadow-sm">
        <div className="px-6 py-5 border-b border-yellow-100">
          <h2 className="text-xl font-bold text-gray-900">
            Create Your Log
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details of your study
            session.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topic Name
            </label>
            <input
              type="text"
              {...register("topic")}
              placeholder="e.g. React Hooks"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows="6"
              {...register("description")}
              placeholder="What did you learn?"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 resize-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Study Duration (Hours)
              </label>
              <input
                type="number"
                step="0.25"
                min="0.25"
                {...register(
                  "studyDuration",
                )}
                placeholder="2"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                {...register("difficulty")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">
                  Select Difficulty
                </option>
                <option value="Easy">
                  Easy
                </option>
                <option value="Medium">
                  Medium
                </option>
                <option value="Hard">
                  Hard
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Study Date
              </label>
              <input
                type="date"
                {...register("date")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center justify-center gap-2 px-5 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <RotateCcw size={18} />
              Clear Form
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-yellow-400 rounded-xl font-semibold hover:bg-gray-900 transition shadow-md"
            >
              <Save size={18} />
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEntry;