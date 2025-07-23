import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Optional: Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username); // optional

        navigate('/homepage');
      } else {
        // alert(data.message || 'Invalid email or password');
        setErrorMessage(data.message || 'Invalid email or password');


      }
    } catch (error) {


      console.error('Login error:', error);
      // alert('Something went wrong. Please try again.');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen w-screen overflow-hidden flex items-center justify-center bg-gradient-to-tr from-purple-300 via-pink-300 to-rose-300">
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md mx-4">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Login</h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-black w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-gray-600 hover:text-gray-800"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
              {errorMessage && (
                <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
              )}

            </div>
          </div>

          <div className="text-right -mt-4 mb-2">
            <Link to="/forgotpassword" className="text-sm text-purple-600 hover:underline font-medium">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-300 text-black font-bold py-3 rounded-lg shadow-md hover:bg-yellow-400 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-purple-700 hover:underline font-medium">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
