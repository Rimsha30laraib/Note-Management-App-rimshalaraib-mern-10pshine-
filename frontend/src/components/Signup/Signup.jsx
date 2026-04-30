import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      // const res = await axios.post('http://localhost:5000/api/auth/signup', {
      //   username,
      //   email,
      //   password
      // });
        const res = await axios.post('note-management-backend-deploy-owm0t882m.vercel.app
/api/auth/signup', {
        username,
        email,
        password
      });

      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        toast.success('Signup successful!');
        navigate('/homepage');
      } else {
        toast.error(res.data.message || 'User already exists');
      }
    } catch (err) {
      console.error('Signup failed:', err);
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen w-screen overflow-hidden flex items-center justify-center bg-gradient-to-tr from-purple-300 via-pink-300 to-rose-300">
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Create Account</h2>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-black w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-gray-600 hover:text-gray-800"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-yellow-300 text-black font-bold py-3 rounded-lg shadow-md hover:bg-yellow-400 transition">
            Signup
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
