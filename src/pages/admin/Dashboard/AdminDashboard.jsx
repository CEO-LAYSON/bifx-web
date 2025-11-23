import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboardStats,
  fetchPendingEnrollments,
  fetchAllUsers,
} from "../../../store/slices/adminSlice";
import AdminStatsCards from "../../../components/admin/AdminStatsCards";
import { TrendingUp, Users, BookOpen, DollarSign } from "lucide-react";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { dashboardStats, pendingEnrollments, users, isLoading } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchPendingEnrollments());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const quickActions = [
    {
      title: "Manage Users",
      description: "View and manage user accounts",
      icon: Users,
      href: "/admin/users",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Create Course",
      description: "Add new course to platform",
      icon: BookOpen,
      href: "/admin/courses/create",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Verify Enrollments",
      description: `${pendingEnrollments.length} pending requests`,
      icon: TrendingUp,
      href: "/admin/enrollments",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "View Revenue",
      description: "Track earnings and payments",
      icon: DollarSign,
      href: "/admin/revenue",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "John Doe",
      action: "enrolled in Technical Course",
      time: "2 minutes ago",
      type: "enrollment",
    },
    {
      id: 2,
      user: "Sarah Smith",
      action: "completed Foundation Course",
      time: "1 hour ago",
      type: "completion",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "submitted a review",
      time: "3 hours ago",
      type: "review",
    },
    {
      id: 4,
      user: "Emily Davis",
      action: "upgraded to premium",
      time: "5 hours ago",
      type: "upgrade",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400">Welcome to your administration panel</p>
        </div>
        <div className="text-sm text-gray-400">Last updated: Just now</div>
      </div>

      {/* Stats Cards */}
      <AdminStatsCards stats={dashboardStats} />

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <a
                    key={index}
                    href={action.href}
                    className="flex items-center p-4 bg-gray-700 rounded-lg border border-gray-600 hover:border-primary-gold transition-colors group"
                  >
                    <div
                      className={`p-3 rounded-lg ${action.bgColor} mr-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`h-6 w-6 ${action.color}`} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        {action.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {action.description}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 h-full">
            <h2 className="text-xl font-bold text-white mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-purple rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm">
                      <span className="font-semibold">{activity.user}</span>{" "}
                      {activity.action}
                    </p>
                    <p className="text-gray-400 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Platform Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            User Distribution
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Students</span>
              <span className="text-white font-semibold">
                {users.filter((u) => u.roles?.includes("ROLE_USER")).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Instructors</span>
              <span className="text-white font-semibold">
                {
                  users.filter((u) => u.roles?.includes("ROLE_INSTRUCTOR"))
                    .length
                }
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Admins</span>
              <span className="text-white font-semibold">
                {users.filter((u) => u.roles?.includes("ROLE_ADMIN")).length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            System Status
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">API Status</span>
              <span className="text-green-400 font-semibold">Operational</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Database</span>
              <span className="text-green-400 font-semibold">Connected</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Storage</span>
              <span className="text-green-400 font-semibold">65% Used</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
