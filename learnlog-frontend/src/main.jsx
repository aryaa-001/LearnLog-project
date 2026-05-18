import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import "./index.css";
import store from "./Redux/store";
import AuthLoader from "./components/AuthLoder";
import PublicRoutes from "./components/PublicRoutes";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPass from "./components/ForgotPass";
import AppLayout from "./AppLayout";
import Dashboard from "./Features/Dashboard";
import AddEntry from "./Features/AddEntry";
import AllEntry from "./Features/AllEntry";
import Profile from "./Features/Profile";
import ResetPassword from "./components/ResetPassword";

const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPass />,
      },
    ],
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/add-entry",
            element: <AddEntry />,
          },
          {
            path: "/entries",
            element: <AllEntry />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthLoader>
      <RouterProvider router={router} />
      <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      borderRadius: "16px",
      background: "#111827",
      color: "#f9fafb",
      border: "1px solid #facc15",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)",
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: "500",
    },
    success: {
      style: {
        background: "#111827",
        color: "#f9fafb",
        border: "1px solid #facc15",
      },
      iconTheme: {
        primary: "#facc15",
        secondary: "#111827",
      },
    },
    error: {
      style: {
        background: "#111827",
        color: "#f9fafb",
        border: "1px solid #ef4444",
      },
      iconTheme: {
        primary: "#ef4444",
        secondary: "#111827",
      },
    },
  }}
/>
    </AuthLoader>
  </Provider>,
);
