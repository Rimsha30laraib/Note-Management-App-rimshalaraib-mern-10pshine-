//add account
import React, { useEffect, useState } from "react";
import axios from "axios";

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user info:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  if (!user) return <div className="p-4 text-red-500">User not found</div>;

  return (
    <div className="p-6 max-w-xl mx-auto text-black bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">👤 Account Info</h1>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-11 h-11 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold text-lg shadow-md">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Account;
