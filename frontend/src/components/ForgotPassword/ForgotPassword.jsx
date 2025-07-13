import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOtpError("");
    setInfo("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setShowOtpInput(true);
        setInfo("OTP sent to your email.");
      } else {
        setError(data.message || "Failed to send OTP");
      }
    } catch {
      setError("Server error");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setOtpError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        navigate(`/resetpassword`, { state: { email, otp } });
      } else {
        setOtpError(data.message || "Invalid OTP");
      }
    } catch {
      setOtpError("Server error");
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-tr from-purple-300 via-pink-300 to-rose-300">
      <div className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl text-black font-extrabold text-center mb-6">Forgot Password</h2>
       <p className="text-center text-gray-600 mb-6 text-sm">
         Enter your registered email address and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
             <label className="block text-gray-700 text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg text-black"
              placeholder="Enter email"
            />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            {info && <p className="text-green-600 text-sm mt-1">{info}</p>}
          </div>

          <button type="submit" className="w-full bg-yellow-300 text-black font-bold py-3 rounded-lg shadow-md hover:bg-yellow-400">
            Send OTP
          </button>
        </form>

        {showOtpInput && (
          <form onSubmit={handleOtpSubmit} className="mt-6 space-y-4">
            <h3 className="text-lg font-bold text-center">Enter OTP</h3>
             <label className="block text-gray-700 text-sm font-semibold mb-1">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg text-black"
              placeholder="Enter OTP"
            />
            {otpError && <p className="text-red-600 text-sm text-center">{otpError}</p>}
            <button type="submit" className="w-full bg-purple-600 text-white font-bold py-2 rounded-lg hover:bg-purple-700">
              Verify OTP
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-gray-700">
          Remembered your password?{' '}
          <Link to="/login" className="text-purple-600 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

