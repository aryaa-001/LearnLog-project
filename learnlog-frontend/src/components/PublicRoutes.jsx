import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoutes = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoutes;
