import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import { ROUTES } from "../../utils/constants/routes";
import { hasRole, ROLES } from "../../utils/constants/roles";
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
    <header className="bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 border-b border-gray-700/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={onMenuClick}
              className="text-gray-400 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-white/5 transition-all duration-200"
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 ml-4">
            {/* Show Dashboard and Courses only for regular users */}
            {!isAdmin && !isInstructor && (
              <>
                <Link
                  to={ROUTES.DASHBOARD}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  to={ROUTES.COURSES}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  Courses
                </Link>
              </>
            )}

            {/* Admin/Instructor Links */}
            {isAdmin && (
              <Link
                to={ROUTES.ADMIN.DASHBOARD}
                className="px-4 py-2 rounded-lg text-sm font-medium text-primary-gold hover:text-yellow-300 hover:bg-yellow-500/10 transition-all duration-200"
              >
                Admin
              </Link>
            )}
            {isInstructor && (
              <Link
                to={ROUTES.INSTRUCTOR.DASHBOARD}
                className="px-4 py-2 rounded-lg text-sm font-medium text-primary-purple hover:text-purple-300 hover:bg-purple-500/10 transition-all duration-200"
              >
                Instructor
              </Link>
            )}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-3 ml-auto">
            {isAuthenticated ? (
              <UserMenu user={user} onLogout={handleLogout} />
            ) : (
              <div className="flex items-center space-x-3">
                <Link to={ROUTES.LOGIN}>
                  <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200">
                    Sign In
                  </button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <button className="px-5 py-2 rounded-lg text-sm font-semibold text-gray-900 bg-gradient-to-r from-primary-gold to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-200 transform hover:scale-105">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800/80 backdrop-blur-xl rounded-xl mt-2 border border-gray-700/50">
              {/* Show Dashboard and Courses only for regular users */}
              {!isAdmin && !isInstructor && (
                <>
                  <Link
                    to={ROUTES.DASHBOARD}
                    className="text-gray-300 hover:text-white block px-3 py-2.5 rounded-lg text-base font-medium transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to={ROUTES.COURSES}
                    className="text-gray-300 hover:text-white block px-3 py-2.5 rounded-lg text-base font-medium transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Courses
                  </Link>
                </>
              )}
              {isAdmin && (
                <Link
                  to={ROUTES.ADMIN.DASHBOARD}
                  className="text-primary-gold hover:text-yellow-300 block px-3 py-2.5 rounded-lg text-base font-medium transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              {isInstructor && (
                <Link
                  to={ROUTES.INSTRUCTOR.DASHBOARD}
                  className="text-primary-purple hover:text-purple-300 block px-3 py-2.5 rounded-lg text-base font-medium transition-all duration-200"
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
