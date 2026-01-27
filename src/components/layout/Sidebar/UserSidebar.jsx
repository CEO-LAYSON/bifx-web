import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  BarChart3,
  User,
  Video,
  Users,
  X,
  Settings,
  FileText,
  TrendingUp,
} from "lucide-react";
import { ROUTES } from "../../../utils/constants/routes";

const UserSidebar = ({ onClose }) => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: ROUTES.DASHBOARD, icon: Home },
    { name: "My Courses", href: "my-courses", icon: BookOpen },
    { name: "Courses", href: ROUTES.COURSES, icon: BookOpen },
    { name: "Progress", href: "my-progress", icon: BarChart3 },
    { name: "Live Sessions", href: ROUTES.LIVE_SESSIONS, icon: Video },
    { name: "Assignments", href: ROUTES.ASSIGNMENTS, icon: FileText },
    { name: "Settings", href: ROUTES.SETTINGS, icon: Settings },
    { name: "Profile", href: ROUTES.PROFILE, icon: User },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="flex flex-col w-64 bg-gray-900 border-r border-gray-700 h-screen">
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
              onClick={onClose}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive(item.href)
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={20} className="mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade Section */}
      <div className="p-4 border-t border-gray-700">
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-white font-semibold text-sm mb-2">
            Upgrade Your Learning
          </h3>
          <p className="text-gray-300 text-xs mb-3">
            Access premium courses and live sessions
          </p>
          <Link
            to="/upgrade"
            onClick={onClose}
            className="block w-full bg-primary-purple text-white text-center py-2 px-3 rounded text-sm font-semibold hover:bg-purple-700 transition-colors"
          >
            Upgrade Now
          </Link>
        </div>
      </div>
    </div>
  );
};
export default UserSidebar;
