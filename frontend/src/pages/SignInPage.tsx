import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((prev) => prev + 1);
  };

  // SEND OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOtpError("");

    try {
      const res = await fetch("http://localhost:3000/api/v1/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: form.email,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        alert("OTP sent successfully");
      } else {
        setOtpError(data.message || "Failed to send OTP");
      }
    } catch (err) {
      setOtpError("Network error");
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOtpError("");

    try {
      const res = await fetch("http://localhost:3000/api/v1/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: form.email,
          otp,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem("isVerified", "true");
        alert(`Welcome ${form.name}, Email verified successfully`);
        navigate("/"); // Redirect after success
      } else {
        setOtpError(data.message || "Invalid OTP");
      }
    } catch (err) {
      setOtpError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center font-sans text-stone-800 overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 mx-auto w-full max-w-7xl absolute top-0 left-0 right-0 z-10">
        <div className="text-2xl font-semibold font-serif text-[#C49B89]">
          Glowup
        </div>

        <div className="flex items-center space-x-6">
          <button
            className="bg-[#6B554D] hover:bg-[#5C4841] text-white px-6 py-2.5 rounded-md text-sm font-medium transition-colors"
            onClick={() => navigate("/")}
          >
            Home
          </button>
        </div>
      </nav>

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[#f5e9e2]">
        <img
          src={"/src/assets/sign.jpg"}
          alt="Salon background"
          className="w-full h-full object-cover object-center opacity-70"
        />
      </div>

      {/* Card */}
      <div className="relative z-10 mt-25 bg-white/70 p-10 rounded-2xl shadow-2xl max-w-sm w-full flex flex-col items-center backdrop-blur-md">
        <h2 className="text-2xl font-serif mb-6 text-[#6B554D]">Sign In</h2>

        <form
          className="w-full flex flex-col gap-5"
          onSubmit={
            step === 3
              ? otpSent
                ? handleVerifyOtp
                : handleSendOtp
              : handleNext
          }
        >
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="px-4 py-3 border border-[#c9ada7] rounded-lg"
                required
              />
              <button
                type="submit"
                className="py-3 bg-[#c9ada7] text-white rounded-lg hover:bg-[#b89a94] transition-colors"
              >
                Next
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={form.mobile}
                onChange={handleChange}
                className="px-4 py-3 border border-[#c9ada7] rounded-lg"
                required
              />
              <button
                type="submit"
                className="py-3 bg-[#c9ada7] text-white rounded-lg hover:bg-[#b89a94] transition-colors"
              >
                Next
              </button>
            </>
          )}

          {/* STEP 3 SEND OTP */}
          {step === 3 && !otpSent && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="px-4 py-3 border border-[#c9ada7] rounded-lg"
                required
              />
              <button
                type="submit"
                className="py-3 bg-[#c9ada7] text-white rounded-lg disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
              {otpError && (
                <div className="text-red-500 text-sm">{otpError}</div>
              )}
            </>
          )}

          {/* VERIFY OTP */}
          {step === 3 && otpSent && (
            <>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="px-4 py-3 border border-[#c9ada7] rounded-lg text-center tracking-widest"
                required
                maxLength={6}
              />
              <button
                type="submit"
                className="py-3 bg-[#c9ada7] text-white rounded-lg disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
              {otpError && (
                <div className="text-red-500 text-sm">{otpError}</div>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
