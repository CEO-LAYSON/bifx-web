import React from "react";
import { BookOpen, Users, BarChart3, Video } from "lucide-react";

const InstructorDashboard = () => {
  const stats = [
    { name: "My Courses", value: "0", icon: BookOpen, color: "text-blue-400" },
    {
      name: "Total Students",
      value: "0",
      icon: Users,
      color: "text-green-400",
    },
    {
      name: "Course Rating",
      value: "0.0",
      icon: BarChart3,
      color: "text-yellow-400",
    },
    {
      name: "Live Sessions",
      value: "0",
      icon: Video,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Instructor Dashboard</h1>
        <div className="text-sm text-gray-400">
          Welcome to your teaching space
        </div>
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
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Create New Course
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Start building your next forex trading course
          </p>
          <button className="w-full bg-primary-purple text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
            Create Course
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Upload Content
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Add videos and materials to your courses
          </p>
          <button className="w-full border border-primary-purple text-primary-purple py-3 px-4 rounded-lg font-semibold hover:bg-purple-900 transition-colors">
            Upload Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
