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
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-black order-2 lg:order-1">
        <RegisterForm />
      </div>

      {/* Right Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden order-1 lg:order-2">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-purple via-purple-900 to-black">
          {/* Animated Orbs */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svgCsvg width=%2260%22 height=%2260+xml,%3%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-white">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
              <span className="text-3xl font-bold">B</span>
            </div>
          </div>

          {/* Brand Text */}
          <h1 className="text-5xl font-bold mb-4 text-center">Join BIFX</h1>
          <p className="text-xl text-purple-200 mb-8 text-center max-w-md">
            Start your forex trading journey with world-class education
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
            <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="text-3xl font-bold text-primary-gold">10K+</div>
              <div className="text-sm text-purple-200">Students</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="text-3xl font-bold text-primary-gold">50+</div>
              <div className="text-sm text-purple-200">Courses</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="text-3xl font-bold text-primary-gold">100+</div>
              <div className="text-sm text-purple-200">Live Sessions</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="text-3xl font-bold text-primary-gold">4.9</div>
              <div className="text-sm text-purple-200">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
