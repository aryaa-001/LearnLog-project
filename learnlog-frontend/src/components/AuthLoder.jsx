import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  loginSuccess,
  authFinished,
} from "../Redux/authSlice";
import axios from "axios";

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5858/api/auth/me",
          {
            withCredentials: true,
          }
        );

        dispatch(loginSuccess(res.data.user));
      } catch (error) {
        dispatch(authFinished());
      }
    };

    checkAuth();
  }, [dispatch]);

  return children;
};

export default AuthLoader;