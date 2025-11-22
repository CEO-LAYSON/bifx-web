import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, BarChart3, User, Video, Users, X } from "lucide-react";
import { ROUTES } from "../../../utils/constants/routes";

const UserSidebar = ({ onClose }) => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: `/${ROUTES.DASHBOARD}`, icon: Home },
    { name: "My Courses", href: "/my-courses", icon: BookOpen },
    { name: "Courses", href: ROUTES.COURSES, icon: BookOpen },
    { name: "Progress", href: "/my-progress", icon: BarChart3 },
    { name: "Live Sessions", href: "/live-sessions", icon: Video },
    { name: "Profile", href: `/${ROUTES.PROFILE}`, icon: User },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-r border-gray-700 shadow-2xl z-40">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-purple to-primary-gold rounded-lg flex items-center justify-center mr-3 shadow-lg">
            <span className="text-white font-bold text-sm">BIFX</span>
          </div>
          <span className="text-white font-bold text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Student Portal
          </span>
        </div>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden text-gray-400 hover:text-white p-2 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-gradient-to-r from-primary-purple to-primary-gold text-white shadow-lg transform scale-105"
                  : "text-gray-300 hover:bg-gray-800/50 hover:text-white hover:shadow-md hover:transform hover:scale-102"
              }`}
            >
              <Icon
                size={20}
                className={`mr-3 transition-colors ${
                  isActive(item.href)
                    ? "text-white"
                    : "text-gray-400 group-hover:text-primary-gold"
                }`}
              />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Upgrade Banner */}
      <div className="p-4 border-t border-gray-700/50 bg-gray-900/30">
        <div className="bg-gradient-to-r from-primary-purple via-purple-600 to-primary-gold rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-white font-semibold text-sm mb-2 flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Upgrade Your Learning
          </h3>
          <p className="text-purple-100 text-xs mb-3 leading-relaxed">
            Access premium courses and live sessions with expert instructors
          </p>
          <Link
            to="/upgrade"
            className="block w-full bg-white text-primary-purple text-center py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-gray-50 hover:text-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            🚀 Upgrade Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
