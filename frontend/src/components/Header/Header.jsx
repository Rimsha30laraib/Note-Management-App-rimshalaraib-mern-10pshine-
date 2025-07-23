// src/components/Header.jsx
import React from "react";

const Header = () => {
  const username = localStorage.getItem("username") || "User";

  return (
    <header className="w-full bg-gradient-to-r from-purple-100 via-white to-pink-100 backdrop-blur-md shadow-md px-4 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-3xl font-bold text-purple-700 tracking-tight flex items-center gap-2">
        🗒️ <span>NoteKeeper</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold text-lg shadow-md">
          {username.charAt(0).toUpperCase()}
        </div>
        <span className="text-gray-700 font-medium hidden sm:block">
          {username}
        </span>
      </div>
    </header>
  );
};

export default Header;
