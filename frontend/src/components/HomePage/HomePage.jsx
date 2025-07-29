import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Sidebar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Close sidebar when navigating
  const handleSidebarClose = () => setMobileSidebarOpen(false);

  // Prevent scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileSidebarOpen]);

  return (

    <div className="h-screen flex flex-col">
      <Header toggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

      <div className="flex flex-1 overflow-hidden relative">
         {/* Desktop Sidebar  */}
        <aside className="hidden md:block w-64">
          <Sidebar onNavigate={handleSidebarClose} />
        </aside>

        {/* Mobile Sidebar */}
        {mobileSidebarOpen && (
          <>
           <div
  className="fixed inset-0 backdrop-blur bg-white/30 z-40"
  onClick={handleSidebarClose}
/>

            <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg md:hidden">
              <Sidebar onNavigate={handleSidebarClose} showClose />
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-tr from-purple-300 via-pink-300 to-rose-300 p-4 md:p-6">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
