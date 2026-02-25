import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ROUTES } from "../../utils/constants/routes";
import { logout } from "../../store/slices/authSlice";
import {
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  BookOpen,
  Users,
  Award,
} from "lucide-react";
import Button from "../ui/Button";

const LandingHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Check auth state - check both "auth" (for LandingHeader) and "token" (for Redux) compatibility
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token) {
      setIsAuthenticated(true);
      if (user) {
        try {
          setUser(JSON.parse(user));
        } catch (e) {
          console.error("Error parsing user from localStorage:", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.HOME);
    window.location.reload();
  };

  const navLinks = [
    { name: "Home", href: ROUTES.HOME },
    { name: "Courses", href: ROUTES.COURSES },
    { name: "Features", href: ROUTES.FEATURES },
    { name: "Testimonials", href: ROUTES.TESTIMONIALS },
    { name: "About", href: ROUTES.ABOUT },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
        isScrolled
          ? "bg-dark-900/95 backdrop-blur-xl shadow-premium border-b border-dark-700/50"
          : "bg-transparent"
      }`}
    >
      {/* Gradient line at top */}
      <div
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple to-transparent transition-opacity duration-500 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo - Premium */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-3 group">
            <div className="relative">
              <img
                src="/bifx-black-logo.jpeg"
                alt="BIFX Logo"
                className="h-20 w-auto object-contain rounded-2xl shadow-premium-lg transition-all duration-300 group-hover:shadow-premium-glow"
              />
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-accent-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            </div>
          </Link>

          {/* Desktop Navigation - Premium */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="relative px-5 py-2.5 text-gray-300 hover:text-white font-semibold text-sm tracking-wide transition-all duration-300 rounded-xl hover:bg-dark-800/50 group"
              >
                {link.name}
                {/* Animated underline */}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-accent-purple to-accent-gold transition-all duration-300 group-hover:w-[80%]" />
              </Link>
            ))}
          </nav>

          {/* Auth Buttons - Premium */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to={ROUTES.DASHBOARD}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-300 hover:text-white"
                  >
                    Dashboard
                  </Button>
                </Link>
                <div className="flex items-center space-x-3 pl-4 border-l border-dark-700">
                  {/* Avatar with glow */}
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent-purple via-primary-purple to-accent-purpleLight rounded-full flex items-center justify-center text-white font-bold text-sm shadow-premium">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-accent-purple/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-red-400"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-300 hover:text-white hover:bg-dark-800"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button
                    variant="primary"
                    size="md"
                    className="group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Get Started
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button - Premium */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-dark-800/50 text-gray-300 hover:text-white hover:bg-dark-700 transition-all duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Premium */}
      <div
        className={`lg:hidden fixed inset-0 top-0 pt-20 bg-dark-950/98 backdrop-blur-xl transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />

        <div className="relative z-10 px-4 py-8 space-y-4">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-6 py-4 text-gray-300 hover:text-white font-semibold rounded-xl hover:bg-dark-800/80 transition-all duration-200 border border-transparent hover:border-dark-700"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-6 space-y-4 border-t border-dark-800">
            {isAuthenticated ? (
              <>
                <Link
                  to={ROUTES.DASHBOARD}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="primary" size="lg" className="w-full">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handleLogout}
                  className="w-full text-red-400 hover:text-red-300"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to={ROUTES.LOGIN}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="dark" size="lg" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link
                  to={ROUTES.REGISTER}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="primary" size="lg" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
