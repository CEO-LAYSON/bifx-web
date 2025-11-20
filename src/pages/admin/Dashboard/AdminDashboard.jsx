import React from "react";
import { Users, BookOpen, FileCheck, DollarSign } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      name: "Total Users",
      value: "0",
      icon: Users,
      change: "+0%",
      color: "text-blue-400",
    },
    {
      name: "Total Courses",
      value: "0",
      icon: BookOpen,
      change: "+0%",
      color: "text-green-400",
    },
    {
      name: "Pending Enrollments",
      value: "0",
      icon: FileCheck,
      change: "+0%",
      color: "text-yellow-400",
    },
    {
      name: "Total Revenue",
      value: "$0",
      icon: DollarSign,
      change: "+0%",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <div className="text-sm text-gray-400">Last updated: Just now</div>
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
                  <p className="text-sm text-green-400 mt-1">{stat.change}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            User Management
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Manage user accounts, roles, and permissions
          </p>
          <button className="w-full bg-primary-gold text-black py-2 px-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
            Manage Users
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Course Management
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Create, edit, and manage courses and content
          </p>
          <button className="w-full bg-primary-purple text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
            Manage Courses
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Enrollment Verification
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Review and verify pending enrollment requests
          </p>
          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            Verify Enrollments
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
