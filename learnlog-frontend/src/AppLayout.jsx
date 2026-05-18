import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <main className="lg:ml-72 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;