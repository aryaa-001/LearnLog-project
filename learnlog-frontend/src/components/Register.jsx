import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  BookOpen,
  TrendingUp,
  Target,
  UserPlus,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const { handleSubmit, register, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5858/api/auth/register",
        data,
        {
          withCredentials: true,
        }
      );

      reset();
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      const messages = error.response?.data?.message;

      if (Array.isArray(messages)) {
        messages.forEach((msg) => toast.error(msg));
      } else {
        toast.error(messages || "Registration failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-yellow-200">
        <div className="hidden lg:flex flex-col justify-between bg-linear-to-br from-black via-gray-900 to-black text-white p-12">
          <div>
            <div className="w-16 h-16 rounded-2xl bg-yellow-400 text-black flex items-center justify-center mb-8 shadow-lg">
              <UserPlus size={30} />
            </div>

            <h1 className="text-4xl font-bold leading-tight mb-4">
              Start Your Learning Journey
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Create your LearnLog account and begin tracking your daily
              progress, study hours, and achievements.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400">
                <BookOpen size={20} />
              </div>
              <span className="text-gray-300">
                Document your daily learning sessions
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400">
                <TrendingUp size={20} />
              </div>
              <span className="text-gray-300">
                View analytics and performance insights
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400">
                <Target size={20} />
              </div>
              <span className="text-gray-300">
                Build a consistent study habit
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10 lg:p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="lg:hidden text-center mb-8">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-black text-yellow-400 flex items-center justify-center shadow-lg">
                <UserPlus size={26} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                LearnLog
              </h1>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-gray-500">
                Sign up to start tracking your learning journey.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  {...register("fullName")}
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Create a secure password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Age
                </label>
                <input
                  {...register("age")}
                  type="number"
                  placeholder="Enter your age"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black hover:bg-gray-900 text-yellow-400 py-3 rounded-xl font-semibold shadow-lg transition duration-200"
              >
                Create Account
              </button>
            </form>

            <p className="text-sm text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-amber-600 hover:text-amber-700"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;