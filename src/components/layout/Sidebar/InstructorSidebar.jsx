import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  Upload,
  Users,
  BarChart3,
  FileText,
  Video,
  Settings,
  GraduationCap,
  PlusCircle,
} from "lucide-react";
import { ROUTES } from "../../../utils/constants/routes";
import NavItem from "./NavItem";

const InstructorSidebar = ({ onClose, isMobile = false }) => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: ROUTES.INSTRUCTOR.DASHBOARD, icon: Home },
    { name: "My Courses", href: ROUTES.INSTRUCTOR.COURSES, icon: BookOpen },
    { name: "Upload Content", href: ROUTES.INSTRUCTOR.UPLOAD, icon: Upload },
    { name: "Students", href: ROUTES.INSTRUCTOR.STUDENTS, icon: Users },
    { name: "Analytics", href: ROUTES.INSTRUCTOR.ANALYTICS, icon: BarChart3 },
    { name: "Assignments", href: "assignments", icon: FileText },
    { name: "Live Sessions", href: "live-sessions", icon: Video },
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
          <div className="w-10 h-10 bg-primary-purple rounded-lg flex items-center justify-center mr-3">
            <GraduationCap size={20} className="text-white" />
          </div>
          <div>
            <span className="text-white font-bold block">
              Instructor Portal
            </span>
            <span className="text-gray-500 text-xs">Teaching Center</span>
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

      {/* Quick Actions */}
      {!isMobile && (
        <div className="p-4 border-t border-gray-700 space-y-3">
          <Link
            to="instructor/courses/create"
            onClick={onClose}
            className="flex items-center justify-center px-4 py-2 bg-primary-purple text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
          >
            <PlusCircle size={16} className="mr-2" />
            Create Course
          </Link>
          <Link
            to="instructor/upload"
            onClick={onClose}
            className="flex items-center justify-center px-4 py-2 bg-gray-800 text-primary-purple text-sm rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
          >
            <Upload size={16} className="mr-2" />
            Upload Video
          </Link>
        </div>
      )}
    </div>
  );
};

export default InstructorSidebar;
