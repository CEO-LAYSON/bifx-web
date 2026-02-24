import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { registerUser } from "../../store/slices/authSlice";
import { registerSchema } from "../../utils/validation/authSchema";
import Button from "../ui/Button";
import Alert from "../ui/Alert";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  // Password strength indicators
  const hasMinLength = passwordValue.length >= 8;
  const hasUpperCase = /[A-Z]/.test(passwordValue);
  const hasLowerCase = /[a-z]/.test(passwordValue);
  const hasNumber = /[0-9]/.test(passwordValue);
  const passwordStrength = [
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
  ].filter(Boolean).length;

  return (
    <div className="w-full max-w-md">
      {/* Mobile Logo - Only visible on small screens */}
      <div className="lg:hidden text-center mb-8">
        <div className="relative inline-block mb-4">
          <img
            src="/bifx-black-logo.jpeg"
            alt="BIFX Logo"
            className="w-32 h-32 object-contain mx-auto rounded-2xl shadow-lg"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-purple/20 to-primary-gold/20 blur-xl"></div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-gray-400">Join BIFX to start learning</p>
      </div>

      {/* Desktop Welcome - Only visible on large screens */}
      <div className="hidden lg:block text-center mb-8">
        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/30 to-primary-gold/20 blur-2xl rounded-full"></div>
          <img
            src="/bifx-black-logo.jpeg"
            alt="BIFX Logo"
            className="w-24 h-24 object-contain relative z-10 rounded-xl"
          />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-gray-400">Join BIFX to start your trading journey</p>
      </div>

      {error && error.includes("TOO_MANY_REQUESTS") && (
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl backdrop-blur-sm">
          <Alert
            type="warning"
            message="Too many registration attempts. Please try again in 30 minutes."
          />
        </div>
      )}

      {error && !error.includes("TOO_MANY_REQUESTS") && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm">
          <Alert type="error" message={error} />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name Input */}
        <div className="relative group">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-500 group-focus-within:text-primary-purple transition-colors" />
            </div>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              className={`w-full pl-12 pr-4 py-4 bg-gray-900/60 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-purple/50 focus:border-primary-purple transition-all duration-300 backdrop-blur-sm ${
                errors.fullName
                  ? "border-red-500 bg-red-500/5"
                  : "border-gray-700 hover:border-gray-600 hover:bg-gray-900/80"
              }`}
              {...register("fullName")}
            />
          </div>
          {errors.fullName && (
            <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-400 rounded-full"></span>
              {errors.fullName.message}
            </p>
          )}
        </div>

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
              className={`w-full pl-12 pr-4 py-4 bg-gray-900/60 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-purple/50 focus:border-primary-purple transition-all duration-300 backdrop-blur-sm ${
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

        {/* Phone Input */}
        <div className="relative group">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-500 group-focus-within:text-primary-purple transition-colors" />
            </div>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              autoComplete="tel"
              className={`w-full pl-12 pr-4 py-4 bg-gray-900/60 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-purple/50 focus:border-primary-purple transition-all duration-300 backdrop-blur-sm ${
                errors.phone
                  ? "border-red-500 bg-red-500/5"
                  : "border-gray-700 hover:border-gray-600 hover:bg-gray-900/80"
              }`}
              {...register("phone")}
            />
          </div>
          {errors.phone && (
            <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-400 rounded-full"></span>
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="relative group">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-primary-purple transition-colors" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              autoComplete="new-password"
              className={`w-full pl-12 pr-14 py-4 bg-gray-900/60 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-purple/50 focus:border-primary-purple transition-all duration-300 backdrop-blur-sm ${
                errors.password
                  ? "border-red-500 bg-red-500/5"
                  : "border-gray-700 hover:border-gray-600 hover:bg-gray-900/80"
              }`}
              {...register("password")}
              onChange={(e) => setPasswordValue(e.target.value)}
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

          {/* Password Strength Indicators */}
          {passwordValue && (
            <div className="mt-4 space-y-3">
              {/* Strength Bar */}
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      passwordStrength >= level
                        ? passwordStrength <= 2
                          ? "bg-red-500"
                          : passwordStrength === 3
                          ? "bg-yellow-500"
                          : "bg-green-500"
                        : "bg-gray-700"
                    }`}
                  ></div>
                ))}
              </div>
              <p
                className={`text-xs ${
                  passwordStrength <= 2
                    ? "text-red-400"
                    : passwordStrength === 3
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                Password strength:{" "}
                {passwordStrength <= 2
                  ? "Weak"
                  : passwordStrength === 3
                  ? "Medium"
                  : "Strong"}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div
                  className={`flex items-center gap-2 text-xs ${
                    hasMinLength ? "text-green-400" : "text-gray-500"
                  }`}
                >
                  <CheckCircle
                    className={`w-3 h-3 ${
                      hasMinLength ? "opacity-100" : "opacity-30"
                    }`}
                  />
                  <span>8+ characters</span>
                </div>
                <div
                  className={`flex items-center gap-2 text-xs ${
                    hasUpperCase ? "text-green-400" : "text-gray-500"
                  }`}
                >
                  <CheckCircle
                    className={`w-3 h-3 ${
                      hasUpperCase ? "opacity-100" : "opacity-30"
                    }`}
                  />
                  <span>Uppercase</span>
                </div>
                <div
                  className={`flex items-center gap-2 text-xs ${
                    hasLowerCase ? "text-green-400" : "text-gray-500"
                  }`}
                >
                  <CheckCircle
                    className={`w-3 h-3 ${
                      hasLowerCase ? "opacity-100" : "opacity-30"
                    }`}
                  />
                  <span>Lowercase</span>
                </div>
                <div
                  className={`flex items-center gap-2 text-xs ${
                    hasNumber ? "text-green-400" : "text-gray-500"
                  }`}
                >
                  <CheckCircle
                    className={`w-3 h-3 ${
                      hasNumber ? "opacity-100" : "opacity-30"
                    }`}
                  />
                  <span>Number</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 pt-2">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 w-5 h-5 rounded border-gray-600 bg-gray-900/60 text-primary-purple focus:ring-primary-purple focus:ring-offset-0 focus:ring-2 checked:bg-primary-purple checked:border-primary-purple"
            {...register("terms")}
          />
          <label
            htmlFor="terms"
            className="text-sm text-gray-400 leading-relaxed"
          >
            I agree to the{" "}
            <Link
              to="/terms"
              className="text-primary-purple hover:text-primary-gold transition-colors duration-200 font-medium"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="text-primary-purple hover:text-primary-gold transition-colors duration-200 font-medium"
            >
              Privacy Policy
            </Link>
          </label>
        </div>
        {errors.terms && (
          <p className="text-sm text-red-400 flex items-center gap-1 -mt-3">
            <span className="w-1 h-1 bg-red-400 rounded-full"></span>
            {errors.terms.message}
          </p>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isLoading}
          className="w-full group relative overflow-hidden mt-2"
        >
          <span className="flex items-center justify-center gap-2 relative z-10">
            Create Account
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-purple to-primary-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Button>
      </form>

      {/* Login Link */}
      <div className="mt-8 text-center">
        <p className="text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary-purple hover:text-primary-gold font-semibold inline-flex items-center gap-2 transition-colors duration-200 group"
          >
            Sign in
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
