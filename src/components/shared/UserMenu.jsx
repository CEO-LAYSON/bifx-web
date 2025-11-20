import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants/routes";
import { hasRole } from "../../utils/constants/roles";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";

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

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 text-gray-300 hover:text-white focus:outline-none focus:text-white transition-colors"
      >
        <div className="w-8 h-8 bg-primary-purple rounded-full flex items-center justify-center">
          <User size={16} />
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-white">
            {user?.fullName || "User"}
          </div>
          <div className="text-xs text-gray-400">
            {getRoleDisplay(user?.roles)}
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1 z-50 border border-gray-700">
          <div className="px-4 py-2 border-b border-gray-700">
            <div className="text-sm font-medium text-white">
              {user?.fullName}
            </div>
            <div className="text-xs text-gray-400">{user?.email}</div>
          </div>

          <Link
            to={ROUTES.PROFILE}
            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <User size={16} className="mr-3" />
            Profile
          </Link>

          <Link
            to="/settings"
            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Settings size={16} className="mr-3" />
            Settings
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <LogOut size={16} className="mr-3" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
