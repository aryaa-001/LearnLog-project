import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const ForgotPass = () => {
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post(
        "/api/auth/forgot-password",
        data
      );
      console.log("jbckld")

      reset();
      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Forgot Password
        </h1>

        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>

            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("email", { required: true })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPass;