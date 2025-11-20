import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, BarChart3, User, Video, Users } from "lucide-react";
import { ROUTES } from "../../../utils/constants/routes";

const UserSidebar = () => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: ROUTES.DASHBOARD, icon: Home },
    { name: "My Courses", href: "/my-courses", icon: BookOpen },
    { name: "Progress", href: "/my-progress", icon: BarChart3 },
    { name: "Live Sessions", href: "/live-sessions", icon: Video },
    { name: "Profile", href: ROUTES.PROFILE, icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col w-64 bg-gray-900 border-r border-gray-700">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary-purple rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">BIFX</span>
          </div>
          <span className="text-white font-bold text-lg">Student Portal</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive(item.href)
                  ? "bg-primary-purple text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={20} className="mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade Banner */}
      <div className="p-4 border-t border-gray-700">
        <div className="bg-gradient-to-r from-primary-purple to-purple-600 rounded-lg p-4">
          <h3 className="text-white font-semibold text-sm mb-2">
            Upgrade Your Learning
          </h3>
          <p className="text-purple-100 text-xs mb-3">
            Access premium courses and live sessions
          </p>
          <Link
            to="/upgrade"
            className="block w-full bg-white text-primary-purple text-center py-2 px-3 rounded text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            Upgrade Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
