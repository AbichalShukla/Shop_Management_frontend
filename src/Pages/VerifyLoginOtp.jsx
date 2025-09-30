import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/Api";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
   const location = useLocation();
    const email = location.state?.email || ""; 
    const navigate = useNavigate();
 const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/verify-otp", { email, otp });
      console.log(response.data); // debug
      if (response.data.success === true) {
        alert("OTP verification successful");
        navigate("/login");
      } else {
        alert("OTP verification failed");
      }
    } catch (err) {
      console.error(err);
      alert("OTP verification failed");
    }
  };
  const handleResend = () => {
    alert("Resend OTP functionality to be implemented");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Icon Section */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-2xl mb-4">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Verify OTP
            </h1>
            <p className="text-gray-500">
              We've sent a code to <span className="font-semibold text-gray-700">{email}</span>
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-2 text-center"
                htmlFor="otp"
              >
                Enter Verification Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="otp"
                  placeholder="• • • • • •"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 text-center text-2xl font-bold tracking-widest transition-all"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength="6"
                />
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                Please enter the 6-digit code
              </p>
            </div>

            <button
              onClick={handleVerify}
              className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Verify OTP
            </button>
          </div>

          <div className="mt-6 text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Didn't receive the OTP?</span>
              </div>
            </div>
            <button
              onClick={handleResend}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Resend OTP
            </button>
          </div>

          {/* Timer or additional info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              The code will expire in 10 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}