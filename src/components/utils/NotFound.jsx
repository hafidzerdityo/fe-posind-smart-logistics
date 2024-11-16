// NotFound.js
import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-error mb-4">404</h1>
        <p className="text-2xl">Page not found</p>
      </div>
    </div>
  );
};

export default NotFound;
