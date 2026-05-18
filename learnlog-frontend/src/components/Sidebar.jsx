import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  BookOpen,
  PlusCircle,
  Search,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../Redux/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5858/api/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );

      dispatch(logoutSuccess());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Logout failed",
      );
    }
  };

  const navLinkClass = ({ isActive }) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 font-medium ${
      isActive
        ? "bg-yellow-400 text-black shadow-md"
        : "text-gray-300 hover:bg-gray-800 hover:text-yellow-400"
    }`;

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-linear-to-b from-black via-gray-950 to-black border-r border-gray-800 shadow-2xl hidden lg:flex flex-col">
      <div className="px-6 py-6 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-yellow-400">
         LearnLog
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Student Learning Journal
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-3">
        <NavLink to="/" end className={navLinkClass}>
          <BookOpen size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/add-entry" className={navLinkClass}>
          <PlusCircle size={20} />
          Add Entry
        </NavLink>

        <NavLink to="/entries" className={navLinkClass}>
          <Search size={20} />
          All Entries
        </NavLink>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 py-3 rounded-2xl font-medium hover:bg-red-500/20 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;