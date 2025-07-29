import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, otp } = location.state || {};

  const [newpass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!email || !otp) {
    return <p className="text-center text-red-500 mt-4">Missing email or OTP. Please restart the flow.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newpass !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/reset-password', {
        email,
        otp,
        newPassword: newpass,
      });

      toast.success("Password reset successful. Logging in...");

      const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password: newpass,
      });

      localStorage.setItem('token', loginRes.data.token);
      localStorage.setItem('username', loginRes.data.username);
      navigate('/homepage');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen w-screen overflow-hidden flex items-center justify-center bg-gradient-to-tr from-purple-300 via-pink-300 to-rose-300">
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900">Reset Password</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={newpass}
              onChange={(e) => setNewPass(e.target.value)}
              required
              className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
              placeholder="New password"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
              placeholder="Confirm new password"
            />
          </div>

          <div className="text-sm flex items-center gap-2">
            <input
              type="checkbox"
              onChange={(e) => setShowPassword(e.target.checked)}
              id="showPass"
            />
            <label htmlFor="showPass" className="text-gray-700">Show Password</label>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-300 text-black font-bold py-3 rounded-lg shadow-md hover:bg-yellow-400 transition"
          >
            Confirm & Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
