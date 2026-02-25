import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import RegisterForm from "../../components/auth/RegisterForm";

const RegisterPage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 bg-black order-2 lg:order-1">
        <div className="lg:scale-75 lg:origin-top">
          <RegisterForm />
        </div>
      </div>

      {/* Right Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden order-1 lg:order-2">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-purple via-purple-900 to-black">
          {/* Animated Orbs */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
          {/* Gold accent orb */}
          <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-primary-gold/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svgCsvg width=%2260%22 height=%2260+xml,%3%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

        {/* Content - Scaled */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-8 text-white lg:scale-75 lg:origin-top">
          {/* Logo */}
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/40 to-primary-gold/20 blur-2xl rounded-full"></div>
            <img
              src="/bifx-black-logo.jpeg"
              alt="BIFX Logo"
              className="w-48 h-48 object-contain rounded-full shadow-2xl relative z-10"
            />
          </div>

          {/* Brand Text */}
          <h1 className="text-4xl font-bold mb-3 text-center bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent">
            Join BIFX
          </h1>
          <p className="text-lg text-purple-200 mb-6 text-center max-w-md">
            Start your forex trading journey with world-class education
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
            <div className="text-center p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-primary-gold/30 hover:bg-white/10 transition-all duration-300 group">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary-gold to-yellow-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                10K+
              </div>
              <div className="text-xs text-purple-200">Students</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-primary-gold/30 hover:bg-white/10 transition-all duration-300 group">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary-gold to-yellow-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <div className="text-xs text-purple-200">Courses</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-primary-gold/30 hover:bg-white/10 transition-all duration-300 group">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary-gold to-yellow-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                100+
              </div>
              <div className="text-xs text-purple-200">Live Sessions</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-primary-gold/30 hover:bg-white/10 transition-all duration-300 group">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary-gold to-yellow-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                4.9
              </div>
              <div className="text-xs text-purple-200">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
