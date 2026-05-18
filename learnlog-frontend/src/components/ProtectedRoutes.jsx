import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Login";
import Loading from "./Loading";

const ProtectedRoutes = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  return isAuthenticated? <Outlet/> : <Navigate to="/login" replace/>
}

export default ProtectedRoutes;
