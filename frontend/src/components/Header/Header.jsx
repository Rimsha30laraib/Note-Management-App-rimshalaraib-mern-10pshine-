import React from "react";

const Header = ({ toggleSidebar }) => {
  const username = localStorage.getItem("username") || "User";

  return (
    <header className="w-full bg-gradient-to-r from-purple-100 via-white to-pink-100 backdrop-blur-md shadow-md px-4 py-4 flex justify-between items-center sticky top-0 z-50">
      
      <div className="flex items-center gap-4">
       
        <button
          onClick={toggleSidebar}
          className="md:hidden text-purple-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="text-2xl font-bold text-purple-700 flex items-center gap-2">
          🗒️ <span>NoteKeeper</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold text-lg shadow-md">
          {username.charAt(0).toUpperCase()}
        </div>
        <span className="hidden sm:block text-gray-700 font-medium">
          {username}
        </span>
      </div>
    </header>
  );
};

export default Header;
