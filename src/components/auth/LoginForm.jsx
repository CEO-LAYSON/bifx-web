import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { loginUser } from "../../store/slices/authSlice";
import { loginSchema } from "../../utils/validation/authSchema";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import LockoutTimer from "./LockoutTimer";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const { email } = useSelector((state) => state.auth.lockoutInfo);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const emailValue = watch("email");

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="w-full max-w-md">
      {/* Mobile Logo - Only visible on small screens */}
      <div className="lg:hidden text-center mb-6">
        <div className="relative inline-block mb-4">
          <img
            src="/bifx-black-logo.jpeg"
            alt="BIFX Logo"
            className="w-32 h-32 object-contain mx-auto rounded-2xl shadow-lg"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-purple/20 to-primary-gold/20 blur-xl"></div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-gray-400">Sign in to your BIFX account</p>
      </div>

      {/* Desktop Welcome - Only visible on large screens */}
      <div className="hidden lg:block text-center mb-6">
        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/30 to-primary-gold/20 blur-2xl rounded-full"></div>
          <img
            src="/bifx-black-logo.jpeg"
            alt="BIFX Logo"
            className="w-24 h-24 object-contain relative z-10 rounded-xl"
          />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-gray-400">
          Sign in to continue your learning journey
        </p>
      </div>

      {error && error.includes("TOO_MANY_REQUESTS") && (
        <LockoutTimer errorMessage={error} email={emailValue} />
      )}

      {error && !error.includes("TOO_MANY_REQUESTS") && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm">
          <Alert type="error" message={error} />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Input */}
        <div className="relative group">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-primary-purple transition-colors" />
            </div>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="username"
              className={`w-full pl-12 pr-4 py-3 bg-gray-900/60 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-purple/50 focus:border-primary-purple transition-all duration-300 backdrop-blur-sm ${
                errors.email
                  ? "border-red-500 bg-red-500/5"
                  : "border-gray-700 hover:border-gray-600 hover:bg-gray-900/80"
              }`}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-400 rounded-full"></span>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="relative group">
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-primary-purple hover:text-primary-gold transition-colors duration-200"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-primary-purple transition-colors" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              className={`w-full pl-12 pr-14 py-3 bg-gray-900/60 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-purple/50 focus:border-primary-purple transition-all duration-300 backdrop-blur-sm ${
                errors.password
                  ? "border-red-500 bg-red-500/5"
                  : "border-gray-700 hover:border-gray-600 hover:bg-gray-900/80"
              }`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-primary-purple transition-colors duration-200"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-400 rounded-full"></span>
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={isLoading}
          className="w-full group relative overflow-hidden"
        >
          <span className="flex items-center justify-center gap-2 relative z-10">
            Sign In
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-purple to-primary-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-6 bg-black text-gray-500 text-xs uppercase tracking-widest">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-3 px-5 py-3 bg-gray-900/60 border border-gray-700 rounded-xl hover:bg-gray-800 hover:border-primary-purple/50 transition-all duration-300 group backdrop-blur-sm">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-gray-300 group-hover:text-white transition-colors font-medium text-sm">
            Google
          </span>
        </button>
        <button className="flex items-center justify-center gap-3 px-5 py-3 bg-gray-900/60 border border-gray-700 rounded-xl hover:bg-gray-800 hover:border-primary-purple/50 transition-all duration-300 group backdrop-blur-sm">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span className="text-gray-300 group-hover:text-white transition-colors font-medium text-sm">
            GitHub
          </span>
        </button>
      </div>

      {/* Register Link */}
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary-purple hover:text-primary-gold font-semibold inline-flex items-center gap-2 transition-colors duration-200 group"
          >
            Sign up
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
