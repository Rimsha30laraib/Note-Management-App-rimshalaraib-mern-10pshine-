import React, { useState } from 'react';

const ResetPassword = () => {
  const [newpass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleNewpass = (e) => {
    e.preventDefault();
    if (newpass !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    console.log('New Password Set:', newpass);
    alert('Your password has been set successfully!');
  };

  return (
    <div className="min-h-screen w-screen overflow-hidden flex items-center justify-center bg-gradient-to-tr from-purple-300 via-pink-300 to-rose-300">
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900">Set New Password</h2>

        <form onSubmit={handleNewpass} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newpass}
                placeholder="Enter new password"
                onChange={(e) => setNewPass(e.target.value)}
                required
                className="text-black w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-3 text-sm text-gray-600 hover:text-gray-800"
              >
                {showNewPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirm}
                placeholder="Confirm password"
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="text-black w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-sm text-gray-600 hover:text-gray-800"
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 font-medium -mt-4">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-300 text-black font-bold py-3 rounded-lg shadow-md hover:bg-yellow-400 transition"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
