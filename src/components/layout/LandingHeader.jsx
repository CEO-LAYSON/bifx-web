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
    // Check auth state
    const authState = localStorage.getItem("auth");
    if (authState) {
      const parsed = JSON.parse(authState);
      setIsAuthenticated(true);
      setUser(parsed.user);
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
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "About", href: "#about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-purple to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-110">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-primary-purple to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-300" />
            </div>
            <span className="text-2xl font-bold text-white">
              BIFX
              <span className="text-primary-gold">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-200 rounded-lg hover:bg-white/5 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-purple to-primary-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
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
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-primary-purple to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-red-400"
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
                    className="text-gray-300 hover:text-white hover:bg-white/5"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button
                    variant="primary"
                    size="sm"
                    className="group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Get Started
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-gray-900/98 backdrop-blur-lg transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-gray-300 hover:text-white font-medium rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 space-y-3 border-t border-gray-800">
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
                  <Button variant="ghost" size="lg" className="w-full">
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
