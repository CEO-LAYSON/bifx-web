import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import { ROUTES } from "../../utils/constants/routes";
import { hasRole } from "../../utils/constants/roles";
import Button from "../ui/Button";
import UserMenu from "../shared/UserMenu";

const Header = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  const isAdmin = hasRole(user?.roles, "ROLE_ADMIN");
  const isInstructor = hasRole(user?.roles, "ROLE_INSTRUCTOR");

  return (
    <header className="bg-gray-900 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={ROUTES.DASHBOARD} className="flex items-center">
              <div className="w-8 h-8 bg-primary-purple rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">BIFX</span>
              </div>
              <span className="text-white font-bold text-xl">BIFX</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to={ROUTES.DASHBOARD}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to={ROUTES.COURSES}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Courses
            </Link>

            {/* Admin/Instructor Links */}
            {isAdmin && (
              <Link
                to={ROUTES.ADMIN.DASHBOARD}
                className="text-primary-gold hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Admin
              </Link>
            )}
            {isInstructor && (
              <Link
                to={ROUTES.INSTRUCTOR.DASHBOARD}
                className="text-primary-gold hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Instructor
              </Link>
            )}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <UserMenu user={user} onLogout={handleLogout} />
            ) : (
              <div className="flex items-center space-x-3">
                <Link to={ROUTES.LOGIN}>
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={onMenuClick}
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 rounded-lg mt-2">
              <Link
                to={ROUTES.DASHBOARD}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to={ROUTES.COURSES}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Courses
              </Link>
              {isAdmin && (
                <Link
                  to={ROUTES.ADMIN.DASHBOARD}
                  className="text-primary-gold hover:text-yellow-300 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              {isInstructor && (
                <Link
                  to={ROUTES.INSTRUCTOR.DASHBOARD}
                  className="text-primary-gold hover:text-yellow-300 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Instructor
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
