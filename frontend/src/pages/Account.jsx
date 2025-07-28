//add account
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { toast } from 'react-toastify';

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="p-4">Loading...</div>;

  if (!user) return <div className="p-4 text-red-500">User not found</div>;

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
      </div>
    </div>
  );
};

export default Account;
