import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("OTP sent to your email");
        setShowModal(true);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("OTP verified");
        setShowModal(false);
        navigate(`/resetpassword`, { state: { email, otp } });
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch {
      toast.error("Server error");
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-300 text-black font-bold py-3 rounded-lg shadow-md hover:bg-yellow-400 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          Remembered your password?{" "}
          <Link to="/login" className="text-purple-600 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gradient-to-tr from-purple-300 via-pink-300 to-rose-300 z-50 flex items-center justify-center">
          <div className="bg-white/90 p-8 rounded-3xl shadow-2xl w-full max-w-md relative">
            <button
              className="absolute top-3 right-4 text-gray-500 text-2xl hover:text-red-600"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-center text-black mb-2">Enter Security Code</h3>
            <p className="text-sm text-center text-gray-700 mb-5">
              Please check your email for a message with your code.<br />
              Your code is 6 numbers long.
            </p>

            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <label className="block text-gray-700 text-sm font-semibold">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-lg text-black"
                placeholder="Enter 6-digit OTP"
              />
              <button
                type="submit"
                className="w-full bg-yellow-300 text-black font-bold py-2 rounded-lg hover:bg-yellow-400"
              >
                Verify OTP
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
