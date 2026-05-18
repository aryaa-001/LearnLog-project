import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { Eye, EyeOff, BookOpen, TrendingUp, Target } from "lucide-react";
import { loginSuccess } from "../Redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleSubmit, register, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/api/auth/login", data);

      reset();
      toast.success(res.data.message);
      dispatch(loginSuccess(res.data.user));
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-yellow-200">
        <div className="hidden lg:flex flex-col justify-between bg-linear-to-br from-black via-gray-900 to-black text-white p-12">
          <div>
            <div className="w-16 h-16 rounded-2xl bg-yellow-400 text-black flex items-center justify-center mb-8 shadow-lg">
              <BookOpen size={30} />
            </div>

            <h1 className="text-4xl font-bold leading-tight mb-4">
              Welcome to LearnLog
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Track your daily learning journey, measure your progress, and
              build a consistent study habit.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400">
                <BookOpen size={20} />
              </div>
              <span className="text-gray-300">
                Record what you learn every day
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400">
                <TrendingUp size={20} />
              </div>
              <span className="text-gray-300">
                Visualize your study progress
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400">
                <Target size={20} />
              </div>
              <span className="text-gray-300">Stay focused and consistent</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">
            <div className="lg:hidden text-center mb-8">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-black text-yellow-400 flex items-center justify-center shadow-lg">
                <BookOpen size={26} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">LearnLog</h1>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-500">
                Sign in to continue your learning journey.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-amber-600 hover:text-amber-700"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: true,
                    })}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black hover:bg-gray-900 text-yellow-400 py-3 rounded-xl font-semibold shadow-lg transition duration-200"
              >
                Sign In
              </button>
            </form>

            <p className="mt-6 text-sm text-center text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-amber-600 hover:text-amber-700"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
