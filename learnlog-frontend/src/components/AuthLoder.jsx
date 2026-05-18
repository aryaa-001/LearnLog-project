import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { loginSuccess, authFinished } from "../Redux/authSlice";

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();

useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/api/auth/me");
      dispatch(loginSuccess(res.data.user));
    } catch (error) {
      dispatch(logout());
    }
  };

  checkAuth();
}, [dispatch]);

  return children;
};

export default AuthLoader;
