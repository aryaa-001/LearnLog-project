import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="bg-white shadow-lg rounded-2xl px-8 py-6 flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-indigo-100 rounded-full"></div>
          <div className="absolute inset-0 w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>

        <div className="text-center">
          <h2 className="text-base font-semibold text-gray-800">Loading</h2>
          <p className="text-sm text-gray-500">Please wait...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
