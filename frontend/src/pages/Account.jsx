import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { toast } from 'react-toastify';

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token missing. Please login again.");
        setLoading(false);
        return;
      }

      const res = await axios.get("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user info:", err);
      toast.error("Failed to fetch user info. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 1000); 
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-600 text-lg">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-red-500 font-semibold">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-300 via-pink-300 to-rose-300 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 sm:p-8 border border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
          <FaUser /> Account Info
        </h1>

        <div className="flex items-center gap-4 sm:gap-6 mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold shadow">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-1 text-sm sm:text-base">
            <p className="text-gray-700">
              <span className="font-semibold">Username:</span> {user.username}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition duration-200 shadow flex items-center justify-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
