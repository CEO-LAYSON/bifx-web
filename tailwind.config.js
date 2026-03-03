/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          black: "#000000",
          gold: "#FFD700",
          purple: "#8B5CF6",
          purpleLight: "#A78BFA",
          purpleDark: "#7C3AED",
        },
        // Premium dark palette
        dark: {
          950: "#030712",
          900: "#0F0F12",
          800: "#18181B",
          700: "#27272A",
          600: "#3F3F46",
        },
        // Accent colors for premium feel
        accent: {
          gold: "#FFD700",
          goldLight: "#FACC15",
          goldDark: "#EAB308",
          purple: "#8B5CF6",
          purpleLight: "#A78BFA",
          cyan: "#06B6D4",
          emerald: "#10B981",
        },
        surface: {
          DEFAULT: "#18181B",
          elevated: "#27272A",
          hover: "#3F3F46",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Inter", "sans-serif"],
      },
      fontSize: {
        "display-1": ["4.5rem", { lineHeight: "1.1", fontWeight: "800" }],
        "display-2": ["3.75rem", { lineHeight: "1.1", fontWeight: "700" }],
        "display-3": ["3rem", { lineHeight: "1.2", fontWeight: "700" }],
      },
      // Premium gradients
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "premium-purple":
          "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)",
        "premium-gold":
          "linear-gradient(135deg, #FFD700 0%, #FACC15 50%, #EAB308 100%)",
        "premium-dark": "linear-gradient(180deg, #18181B 0%, #0F0F12 100%)",
        "premium-card":
          "linear-gradient(145deg, rgba(39, 39, 42, 0.8) 0%, rgba(24, 24, 27, 0.9) 100%)",
        "hero-glow":
          "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
      },
      // Enhanced shadows
      boxShadow: {
        "premium-sm":
          "0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 3px 0 rgba(0, 0, 0, 0.2)",
        premium:
          "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2), 0 0 20px rgba(139, 92, 246, 0.1)",
        "premium-lg":
          "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2), 0 0 40px rgba(139, 92, 246, 0.15)",
        "premium-xl":
          "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2), 0 0 60px rgba(139, 92, 246, 0.2)",
        "premium-glow":
          "0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.2), 0 0 60px rgba(139, 92, 246, 0.1)",
        "premium-glow-gold":
          "0 0 20px rgba(255, 215, 0, 0.3), 0 0 40px rgba(255, 215, 0, 0.2)",
        "premium-glow-white":
          "0 0 20px rgba(255, 255, 255, 0.15), 0 0 40px rgba(255, 255, 255, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        "inner-premium": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)",
      },
      // Animation utilities
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in-down": "fadeInDown 0.6s ease-out forwards",
        "slide-in-left": "slideInLeft 0.5s ease-out forwards",
        "slide-in-right": "slideInRight 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.3s ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(139, 92, 246, 0.6)" },
        },
      },
      // Border radius
      borderRadius: {
        premium: "1rem",
        "premium-lg": "1.5rem",
        "premium-xl": "2rem",
      },
      // Backdrop blur
      backdropBlur: {
        xs: "2px",
      },
      // Spacing
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },
      // Transition timing
      transitionTimingFunction: {
        premium: "cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
    },
  },
  plugins: [],
};
