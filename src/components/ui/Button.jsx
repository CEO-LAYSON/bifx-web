import React from "react";
import { clsx } from "clsx";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-semibold rounded-premium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none inline-flex items-center justify-center gap-2 relative overflow-hidden group";

  const variants = {
    // Primary gradient button with glow effect
    primary:
      "bg-gradient-to-r from-accent-purple via-primary-purple to-accent-purpleLight text-white shadow-premium hover:shadow-premium-glow hover:-translate-y-0.5 focus:ring-accent-purple active:translate-y-0 bg-[length:200%_100%] hover:bg-[100%_0]",

    // Secondary dark button
    secondary:
      "bg-dark-700 text-white hover:bg-dark-600 shadow-premium-sm hover:shadow-premium focus:ring-dark-500 border border-dark-600",

    // Gold accent button
    gold: "bg-gradient-to-r from-accent-gold via-accent-goldLight to-accent-gold text-dark-900 shadow-premium-gold hover:shadow-premium-glow-gold hover:-translate-y-0.5 focus:ring-accent-gold font-bold bg-[length:200%_100%] hover:bg-[100%_0]",

    // Outline with gradient border effect
    outline:
      "border-2 border-accent-purple text-accent-purple hover:bg-accent-purple/10 hover:border-accent-purpleLight hover:shadow-premium-glow focus:ring-accent-purple",

    // Ghost button for subtle interactions
    ghost:
      "text-gray-300 hover:text-white hover:bg-white/5 focus:ring-gray-500",

    // Dark solid button
    dark: "bg-dark-800 text-white hover:bg-dark-700 shadow-premium-sm hover:shadow-premium focus:ring-dark-500 border border-dark-700",

    // Success/Green variant
    success:
      "bg-gradient-to-r from-accent-emerald to-emerald-500 text-white shadow-premium hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 focus:ring-emerald-500",

    // Danger/Red variant
    danger:
      "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-premium hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:-translate-y-0.5 focus:ring-red-500",
  };

  const sizes = {
    xs: "px-3 py-1.5 text-xs",
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  };

  // Size adjustments for icon-only buttons
  const iconSizes = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-14 h-14",
  };

  return (
    <button
      className={clsx(baseClasses, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {/* Shimmer effect overlay for gradient buttons */}
      {(variant === "primary" ||
        variant === "gold" ||
        variant === "success" ||
        variant === "danger") && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}

      {/* Glow effect on hover */}
      <span className="absolute inset-0 rounded-premium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="absolute inset-0 rounded-premium bg-gradient-to-r from-accent-purple/20 to-accent-purpleLight/20 blur-xl" />
      </span>

      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </span>
    </button>
  );
};

export default Button;
