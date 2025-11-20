import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/constants/routes";
import { BookOpen, BarChart3, Video, Award } from "lucide-react";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const stats = [
    {
      name: "Enrolled Courses",
      value: "0",
      icon: BookOpen,
      color: "text-blue-400",
    },
    {
      name: "Completed Lessons",
      value: "0",
      icon: Award,
      color: "text-green-400",
    },
    {
      name: "Learning Progress",
      value: "0%",
      icon: BarChart3,
      color: "text-purple-400",
    },
    { name: "Live Sessions", value: "0", icon: Video, color: "text-red-400" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-900 to-gray-900 rounded-xl p-6 border border-purple-700">
        <h1 className="text-2xl font-bold text-white mb-2">
          Welcome back, {user?.fullName}!
        </h1>
        <p className="text-gray-300">
          Continue your forex trading journey. Pick up where you left off or
          explore new courses.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Continue Learning */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">
            Continue Learning
          </h2>
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">
              You haven't started any courses yet
            </p>
            <Link
              to={ROUTES.COURSES}
              className="inline-flex items-center px-4 py-2 bg-primary-purple text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">
            Recent Activity
          </h2>
          <div className="text-center py-8">
            <BarChart3 className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No recent activity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
