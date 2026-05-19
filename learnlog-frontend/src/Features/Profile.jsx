import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { User, Save, Lock, Camera } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, logoutSuccess } from "../Redux/authSlice";
import { getAssetUrl } from "../utils/assetUrl";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(
    getAssetUrl(user?.profileImage),
  );

  const navigate = useNavigate();

  const {
    handleSubmit: handleProfileSubmit,
    register: registerProfile,
    reset,
    formState: { isSubmitting: isProfileSubmitting },
  } = useForm();

  const {
    handleSubmit: handlePasswordSubmit,
    register: registerPassword,
    reset: resetPasswordForm,
    watch,
    formState: { isSubmitting: isPasswordSubmitting },
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || "",
        email: user.email || "",
        age: user.age || "",
      });

      setPreviewImage(getAssetUrl(user.profileImage));
    }
  }, [user, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));
  };

  const onProfileSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("age", data.age);

      if (data.profileImage?.[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }

      const res = await axiosInstance.put("/api/profile-update", formData);

      dispatch(loginSuccess(res.data.user));
      toast.success(res.data.message || "Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      const message = error.response?.data?.message;

      if (Array.isArray(message)) {
        message.forEach((msg) => toast.error(msg));
      } else {
        toast.error(message || "Failed to update your profile");
      }
    }
  };

  const onPasswordSubmit = async (data) => {
    try {
      const res = await axiosInstance.put("/api/auth/change-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      resetPasswordForm();
      setShowPasswordModal(false);

      toast.success(
        res.data.message ||
          "Password changed successfully. Please login again.",
      );

      dispatch(logoutSuccess());
      navigate("/login", { replace: true });
    } catch (error) {
      const message = error.response?.data?.message;

      if (Array.isArray(message)) {
        message.forEach((msg) => toast.error(msg));
      } else {
        toast.error(message || "Failed to change password");
      }
    }
  };
  return (
    <>
      <div className="space-y-6">
        <div className="bg-linear-to-r from-black via-gray-900 to-black rounded-3xl shadow-xl p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-yellow-400 text-black flex items-center justify-center">
              <User size={26} />
            </div>

            <div>
              <h1 className="text-3xl font-bold">My Profile</h1>
              <p className="text-gray-300 mt-1">
                Manage your account details and security settings.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-yellow-200 rounded-3xl shadow-sm">
          <div className="px-6 py-5 border-b border-yellow-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Personal Details
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                View and update your profile information.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-black text-yellow-400 rounded-xl font-medium hover:bg-gray-900 transition"
            >
              {isEditing ? "Cancel" : "Edit Info"}
            </button>
          </div>

          <form
            onSubmit={handleProfileSubmit(onProfileSubmit)}
            className="p-6 space-y-6"
          >
            <div className="flex flex-col items-center">
              <div className="relative">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-yellow-400 shadow-md"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-black text-yellow-400 border-4 border-yellow-400 shadow-md flex items-center justify-center">
                    <User size={48} />
                  </div>
                )}

                {isEditing && (
                  <label className="absolute bottom-0 right-0 w-10 h-10 bg-black text-yellow-400 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-gray-900">
                    <Camera size={18} />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      {...registerProfile("profileImage", {
                        onChange: handleImageChange,
                      })}
                    />
                  </label>
                )}
              </div>

              <p className="text-sm text-gray-500 mt-3">Account Profile</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              {isEditing ? (
                <input
                  type="text"
                  {...registerProfile("fullName")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              ) : (
                <p className="px-1 py-3 text-gray-900 font-medium">
                  {user?.fullName || "Not provided"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              {isEditing ? (
                <input
                  type="email"
                  {...registerProfile("email")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              ) : (
                <p className="px-1 py-3 text-gray-900 font-medium">
                  {user?.email || "Not provided"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>

              {isEditing ? (
                <input
                  type="number"
                  {...registerProfile("age")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              ) : (
                <p className="px-1 py-3 text-gray-900 font-medium">
                  {user?.age || "Not provided"}
                </p>
              )}
            </div>

            {isEditing && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isProfileSubmitting}
                  className="flex items-center gap-2 px-6 py-3 bg-black text-yellow-400 rounded-xl font-semibold hover:bg-gray-900 transition shadow-md disabled:opacity-60"
                >
                  <Save size={18} />
                  {isProfileSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="bg-white border border-yellow-200 rounded-3xl shadow-sm">
          <div className="px-6 py-5 border-b border-yellow-100">
            <h2 className="text-xl font-bold text-gray-900">Security</h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage your password and account security.
            </p>
          </div>

          <div className="p-6 flex justify-start">
            <button
              type="button"
              onClick={() => setShowPasswordModal(true)}
              className="px-5 py-3 bg-black text-yellow-400 rounded-xl hover:bg-gray-900 transition shadow-md"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-yellow-200">
            <div className="px-6 py-5 border-b border-yellow-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Change Password
              </h2>
            </div>

            <form
              onSubmit={handlePasswordSubmit(onPasswordSubmit)}
              className="p-6 space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  {...registerPassword("currentPassword")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  {...registerPassword("newPassword")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  {...registerPassword("confirmPassword", {
                    validate: (value) =>
                      value === watch("newPassword") ||
                      "Passwords do not match",
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    resetPasswordForm();
                  }}
                  className="px-5 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isPasswordSubmitting}
                  className="flex items-center gap-2 px-5 py-3 bg-black text-yellow-400 rounded-xl font-semibold hover:bg-gray-900 transition disabled:opacity-60"
                >
                  <Lock size={18} />
                  {isPasswordSubmitting ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
