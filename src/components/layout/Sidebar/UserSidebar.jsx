import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  BarChart3,
  User,
  Video,
  Settings,
  FileText,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { ROUTES } from "../../../utils/constants/routes";
import NavItem from "./NavItem";

const UserSidebar = ({ onClose, isMobile = false }) => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: ROUTES.DASHBOARD, icon: Home },
    { name: "My Courses", href: "my-courses", icon: BookOpen },
    { name: "Browse Courses", href: ROUTES.COURSES, icon: BookOpen },
    { name: "Progress", href: "my-progress", icon: BarChart3 },
    { name: "Live Sessions", href: ROUTES.LIVE_SESSIONS, icon: Video },
    { name: "Assignments", href: ROUTES.ASSIGNMENTS, icon: FileText },
    { name: "Profile", href: ROUTES.PROFILE, icon: User },
    { name: "Settings", href: ROUTES.SETTINGS, icon: Settings },
  ];

  // Exact path matching only - no substring matching
  const isActive = (path) => {
    const normalizedPath = path.startsWith("/") ? path : "/" + path;
    return location.pathname === normalizedPath;
  };

  return (
    <div
      className={`flex flex-col w-64 ${
        isMobile ? "h-full" : "h-screen"
      } bg-gray-900 border-r border-gray-700`}
    >
      {/* Sidebar Header */}
      {!isMobile && (
        <div className="flex items-center justify-center h-20 px-4 border-b border-gray-700">
          <div className="w-10 h-10 bg-primary-purple rounded-lg flex items-center justify-center mr-3">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <span className="text-white font-bold block">Student Portal</span>
            <span className="text-gray-500 text-xs">Learning Center</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <NavItem
            key={item.name}
            item={item}
            isActive={isActive(item.href)}
            onClose={onClose}
          />
        ))}
      </nav>

      {/* Upgrade Section */}
      {!isMobile && (
        <div className="p-4 border-t border-gray-700">
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <TrendingUp size={16} className="text-primary-gold mr-2" />
              <h3 className="text-white text-sm font-medium">Upgrade Now</h3>
            </div>
            <p className="text-gray-500 text-xs mb-3">Unlock premium courses</p>
            <Link
              to="/upgrade"
              onClick={onClose}
              className="flex items-center justify-center px-4 py-2 bg-primary-purple text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Sparkles size={14} className="mr-2" />
              Upgrade
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSidebar;
