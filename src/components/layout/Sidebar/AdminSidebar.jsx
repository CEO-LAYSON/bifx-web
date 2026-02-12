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
  Shield,
} from "lucide-react";
import { ROUTES } from "../../../utils/constants/routes";
import NavItem from "./NavItem";

const AdminSidebar = ({ onClose, isMobile = false }) => {
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
          <div className="w-10 h-10 bg-primary-gold rounded-lg flex items-center justify-center mr-3">
            <Shield size={20} className="text-gray-900" />
          </div>
          <div>
            <span className="text-white font-bold block">Admin Portal</span>
            <span className="text-gray-500 text-xs">Management Console</span>
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

      {/* Admin Info */}
      {!isMobile && (
        <div className="p-4 border-t border-gray-700">
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <Shield size={16} className="text-primary-gold mr-2" />
              <p className="text-white text-sm font-medium">Admin Access</p>
            </div>
            <p className="text-gray-500 text-xs">
              Full system privileges enabled
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
