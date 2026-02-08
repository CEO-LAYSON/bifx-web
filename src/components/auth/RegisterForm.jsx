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

  return (
    <div className="w-full max-w-md">
      {/* Mobile Logo - Only visible on small screens */}
      <div className="lg:hidden text-center mb-8">
        <div className="w-16 h-16 bg-primary-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-primary-purple">B</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-gray-400">Join BIFX to start learning</p>
      </div>

      {/* Desktop Welcome - Only visible on large screens */}
      <div className="hidden lg:block text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-gray-400">Join BIFX to start learning</p>
      </div>

      {error && error.includes("TOO_MANY_REQUESTS") && (
        <Alert
          type="warning"
          message="Too many registration attempts. Please try again in 30 minutes."
          className="mb-6"
        />
      )}

      {error && !error.includes("TOO_MANY_REQUESTS") && (
        <Alert type="error" message={error} className="mb-6" />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name Input */}
        <div className="relative">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              className={`w-full pl-10 pr-4 py-3 bg-gray-900/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-purple/50 focus:border-primary-purple transition-all duration-200 ${
                errors.fullName
                  ? "border-red-500"
                  : "border-gray-700 hover:border-gray-600"
              }`}
              {...register("fullName")}
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div className="relative">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="username"
              className={`w-full pl-10 pr-4 py-3 bg-gray-900/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-purple/50 focus:border-primary-purple transition-all duration-200 ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-700 hover:border-gray-600"
              }`}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Input */}
        <div className="relative">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              autoComplete="tel"
              className={`w-full pl-10 pr-4 py-3 bg-gray-900/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-purple/50 focus:border-primary-purple transition-all duration-200 ${
                errors.phone
                  ? "border-red-500"
                  : "border-gray-700 hover:border-gray-600"
              }`}
              {...register("phone")}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              autoComplete="new-password"
              className={`w-full pl-10 pr-12 py-3 bg-gray-900/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-purple/50 focus:border-primary-purple transition-all duration-200 ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-700 hover:border-gray-600"
              }`}
              {...register("password")}
              onChange={(e) => setPasswordValue(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-300 transition-colors" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500 hover:text-gray-300 transition-colors" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}

          {/* Password Strength Indicators */}
          {passwordValue && (
            <div className="mt-3 space-y-2">
              <p className="text-xs text-gray-500 mb-2">
                Password requirements:
              </p>
              <div
                className={`flex items-center gap-2 text-sm ${
                  hasMinLength ? "text-green-400" : "text-gray-500"
                }`}
              >
                <CheckCircle
                  className={`w-4 h-4 ${
                    hasMinLength ? "opacity-100" : "opacity-50"
                  }`}
                />
                <span>At least 8 characters</span>
              </div>
              <div
                className={`flex items-center gap-2 text-sm ${
                  hasUpperCase ? "text-green-400" : "text-gray-500"
                }`}
              >
                <CheckCircle
                  className={`w-4 h-4 ${
                    hasUpperCase ? "opacity-100" : "opacity-50"
                  }`}
                />
                <span>One uppercase letter</span>
              </div>
              <div
                className={`flex items-center gap-2 text-sm ${
                  hasNumber ? "text-green-400" : "text-gray-500"
                }`}
              >
                <CheckCircle
                  className={`w-4 h-4 ${
                    hasNumber ? "opacity-100" : "opacity-50"
                  }`}
                />
                <span>One number</span>
              </div>
            </div>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 w-4 h-4 rounded border-gray-600 bg-gray-800 text-primary-purple focus:ring-primary-purple focus:ring-offset-0"
            {...register("terms")}
          />
          <label htmlFor="terms" className="text-sm text-gray-400">
            I agree to the{" "}
            <Link
              to="/terms"
              className="text-primary-purple hover:text-purple-400"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="text-primary-purple hover:text-purple-400"
            >
              Privacy Policy
            </Link>
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isLoading}
          className="w-full group"
        >
          <span className="flex items-center justify-center gap-2">
            Create Account
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </Button>
      </form>

      {/* Login Link */}
      <div className="mt-8 text-center">
        <p className="text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary-purple hover:text-purple-400 font-semibold inline-flex items-center gap-1 transition-colors"
          >
            Sign in
            <ArrowRight className="w-4 h-4" />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
