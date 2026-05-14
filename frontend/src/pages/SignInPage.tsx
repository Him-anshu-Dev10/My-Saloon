import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", mobile: "" });
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((prev) => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Welcome, ${form.name}!`);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center font-sans text-stone-800 overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 mx-auto w-full max-w-7xl absolute top-0 left-0 right-0 z-10">
        <div className="text-2xl font-semibold font-serif text-[#C49B89]">
          Glowup
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm tracking-wide font-medium text-stone-600">
          <a href="#" className="hover:text-stone-900 transition-colors">
            DISCOVER
          </a>
          <a href="#" className="hover:text-stone-900 transition-colors">
            TREATMENTS
          </a>
          <a href="#" className="hover:text-stone-900 transition-colors">
            MEMBERSHIPS
          </a>
          <a href="#" className="hover:text-stone-900 transition-colors">
            CONCIERGE
          </a>
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
      {/* Background Image/Overlay */}
      <div className="absolute inset-0 -z-10 bg-[#f5e9e2]">
        <img
          src={"/src/assets/sign.jpg"}
          alt="Salon background"
          className="w-full h-full object-cover object-center opacity-70"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Optional: If you want a soft white overlay, uncomment below */}
        {/* <div className="absolute inset-0 bg-white/40"></div> */}
      </div>
      {/* Step-by-step Sign In Card */}
      <div className="relative z-10 mt-25 bg-white/70 p-10 rounded-2xl shadow-2xl max-w-sm w-full flex flex-col items-center backdrop-blur-md">
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={step === 3 ? handleSubmit : handleNext}
        >
          <h2 className="text-3xl font-bold text-[#22223b] mb-2 text-center">
            Sign In
          </h2>
          {step === 1 && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="px-4 py-3 border border-[#c9ada7] rounded-lg text-base bg-white text-[#22223b] focus:outline-none focus:ring-2 focus:ring-[#9a8c98]"
                required
                autoFocus
              />
              <button
                type="submit"
                className="py-3 bg-[#c9ada7] hover:bg-[#9a8c98] text-white rounded-lg text-lg font-semibold transition-colors"
                disabled={!form.name}
              >
                Next
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={form.mobile}
                onChange={handleChange}
                className="px-4 py-3 border border-[#c9ada7] rounded-lg text-base bg-white text-[#22223b] focus:outline-none focus:ring-2 focus:ring-[#9a8c98]"
                required
                autoFocus
              />
              <button
                type="submit"
                className="py-3 bg-[#c9ada7] hover:bg-[#9a8c98] text-white rounded-lg text-lg font-semibold transition-colors"
                disabled={!form.mobile}
              >
                Next
              </button>
            </>
          )}
          {step === 3 && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="px-4 py-3 border border-[#c9ada7] rounded-lg text-base bg-white text-[#22223b] focus:outline-none focus:ring-2 focus:ring-[#9a8c98]"
                required
                autoFocus
              />
              <button
                type="submit"
                className="py-3 bg-[#c9ada7] hover:bg-[#9a8c98] text-white rounded-lg text-lg font-semibold transition-colors"
                disabled={!form.email}
              >
                Sign In
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
