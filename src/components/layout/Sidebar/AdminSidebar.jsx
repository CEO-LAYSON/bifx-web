import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  BookOpen,
  FileCheck,
  MessageSquare,
  Upload,
  Settings,
} from "lucide-react";
import { ROUTES } from "../../../utils/constants/routes";

const AdminSidebar = ({ onClose }) => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: ROUTES.ADMIN.DASHBOARD, icon: Home },
    { name: "Users", href: ROUTES.ADMIN.USERS, icon: Users },
    { name: "Courses", href: ROUTES.ADMIN.COURSES, icon: BookOpen },
    { name: "Enrollments", href: ROUTES.ADMIN.ENROLLMENTS, icon: FileCheck },
    { name: "Reviews", href: "reviews", icon: MessageSquare },
    { name: "Uploads", href: "uploads", icon: Upload },
    { name: "Settings", href: "settings", icon: Settings },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="flex flex-col w-64 bg-gray-900 border-r border-gray-700 h-screen">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary-gold rounded-lg flex items-center justify-center mr-3">
            <span className="text-black font-bold text-sm">AD</span>
          </div>
          <span className="text-white font-bold text-lg">Admin Portal</span>
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

      {/* Admin Info */}
      <div className="p-4 border-t border-gray-700">
        <div className="bg-gray-800 rounded-lg p-3">
          <p className="text-gray-300 text-xs">Admin privileges enabled</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
