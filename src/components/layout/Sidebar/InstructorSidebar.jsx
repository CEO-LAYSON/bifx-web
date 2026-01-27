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
} from "lucide-react";
import { ROUTES } from "../../../utils/constants/routes";

const InstructorSidebar = ({ onClose }) => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: ROUTES.INSTRUCTOR.DASHBOARD, icon: Home },
    { name: "My Courses", href: ROUTES.INSTRUCTOR.COURSES, icon: BookOpen },
    { name: "Upload Content", href: ROUTES.INSTRUCTOR.UPLOAD, icon: Upload },
    { name: "Students", href: ROUTES.INSTRUCTOR.STUDENTS, icon: Users },
    { name: "Analytics", href: "analytics", icon: BarChart3 },
    { name: "Assignments", href: "assignments", icon: FileText },
    { name: "Live Sessions", href: "live-sessions", icon: Video },
    { name: "Settings", href: "settings", icon: Settings },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="flex flex-col w-64 bg-gray-900 border-r border-gray-700 h-screen">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary-purple rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">IN</span>
          </div>
          <span className="text-white font-bold text-lg">
            Instructor Portal
          </span>
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

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-700">
        <div className="space-y-2">
          <Link
            to="courses/create"
            onClick={onClose}
            className="block w-full bg-primary-purple text-white text-center py-2 px-3 rounded text-sm font-semibold hover:bg-purple-700 transition-colors"
          >
            Create Course
          </Link>
          <Link
            to="upload"
            onClick={onClose}
            className="block w-full border border-primary-purple text-primary-purple text-center py-2 px-3 rounded text-sm font-semibold hover:bg-purple-900 transition-colors"
          >
            Upload Video
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstructorSidebar;
