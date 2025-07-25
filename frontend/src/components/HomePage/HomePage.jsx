import React from "react";
import Header from "../Header/Header";
import Sidebar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (

    <div className="h-screen flex flex-col">
      {/* Header */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {/* <aside className="w-64"> */}
          <Sidebar />
        {/* </aside> */}

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-tr from-purple-300 via-pink-300 to-rose-300 p-6">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
