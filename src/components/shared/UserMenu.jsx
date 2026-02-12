import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants/routes";
import { hasRole, ROLES } from "../../utils/constants/roles";
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  Crown,
  Shield,
  GraduationCap,
} from "lucide-react";

const UserMenu = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  const getRoleDisplay = (roles) => {
    if (hasRole(roles, "ROLE_ADMIN")) return "Admin";
    if (hasRole(roles, "ROLE_INSTRUCTOR")) return "Instructor";
    return "Student";
  };

  const getRoleIcon = (roles) => {
    if (hasRole(roles, "ROLE_ADMIN")) return Shield;
    if (hasRole(roles, "ROLE_INSTRUCTOR")) return GraduationCap;
    return Crown;
  };

  const getRoleColor = (roles) => {
    if (hasRole(roles, "ROLE_ADMIN")) return "from-yellow-500 to-amber-500";
    if (hasRole(roles, "ROLE_INSTRUCTOR"))
      return "from-purple-500 to-violet-500";
    return "from-purple-500 to-indigo-500";
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const RoleIcon = getRoleIcon(user?.roles);
  const roleGradient = getRoleColor(user?.roles);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-3 text-gray-300 hover:text-white focus:outline-none transition-all duration-200 rounded-xl hover:bg-white/5 p-2"
      >
        <div className="relative">
          <div
            className={`w-10 h-10 bg-gradient-to-br ${roleGradient} rounded-xl flex items-center justify-center shadow-lg`}
          >
            <User size={18} className="text-white" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
            <RoleIcon size={10} className="text-primary-gold" />
          </div>
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-white">
            {user?.fullName || "User"}
          </div>
          <div className="text-xs text-gray-400 flex items-center">
            <RoleIcon size={10} className="mr-1" />
            {getRoleDisplay(user?.roles)}
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl py-2 z-50 border border-gray-700/50 overflow-hidden transform transition-all duration-200 origin-top-right">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${roleGradient} rounded-xl flex items-center justify-center shadow-lg`}
              >
                <User size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white truncate">
                  {user?.fullName || "User"}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {user?.email}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              to={ROUTES.PROFILE}
              className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 group"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center mr-3 group-hover:bg-purple-500/20 transition-colors">
                <User
                  size={16}
                  className="text-gray-400 group-hover:text-primary-purple"
                />
              </div>
              Profile
            </Link>

            <Link
              to="/settings"
              className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 group"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center mr-3 group-hover:bg-purple-500/20 transition-colors">
                <Settings
                  size={16}
                  className="text-gray-400 group-hover:text-primary-purple"
                />
              </div>
              Settings
            </Link>
          </div>

          {/* Footer */}
          <div className="py-2 border-t border-gray-700/50">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all duration-200 group"
            >
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center mr-3 group-hover:bg-red-500/20 transition-colors">
                <LogOut size={16} className="text-red-400" />
              </div>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
