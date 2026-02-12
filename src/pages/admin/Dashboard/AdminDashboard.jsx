import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboardStats,
  fetchPendingEnrollments,
  fetchAllUsers,
} from "../../../store/slices/adminSlice";
import AdminStatsCards from "../../../components/admin/AdminStatsCards";
import {
  TrendingUp,
  Users,
  BookOpen,
  DollarSign,
  Activity,
  Clock,
  Shield,
} from "lucide-react";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { dashboardStats, pendingEnrollments, users, isLoading } = useSelector(
    (state) => state.admin,
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
      borderColor: "border-blue-500/30",
      glowColor: "group-hover:shadow-blue-500/25",
    },
    {
      title: "Create Course",
      description: "Add new course to platform",
      icon: BookOpen,
      href: "/admin/courses/create",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      glowColor: "group-hover:shadow-green-500/25",
    },
    {
      title: "Verify Enrollments",
      description: `${pendingEnrollments.length} pending requests`,
      icon: TrendingUp,
      href: "/admin/enrollments",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      glowColor: "group-hover:shadow-orange-500/25",
    },
    {
      title: "View Revenue",
      description: "Track earnings and payments",
      icon: DollarSign,
      href: "/admin/revenue",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
      glowColor: "group-hover:shadow-yellow-500/25",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "John Doe",
      action: "enrolled in Technical Course",
      time: "2 minutes ago",
      type: "enrollment",
      icon: BookOpen,
      iconColor: "text-green-400",
      iconBg: "bg-green-500/10",
    },
    {
      id: 2,
      user: "Sarah Smith",
      action: "completed Foundation Course",
      time: "1 hour ago",
      type: "completion",
      icon: Activity,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/10",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "submitted a review",
      time: "3 hours ago",
      type: "review",
      icon: TrendingUp,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/10",
    },
    {
      id: 4,
      user: "Emily Davis",
      action: "upgraded to premium",
      time: "5 hours ago",
      type: "upgrade",
      icon: Shield,
      iconColor: "text-yellow-400",
      iconBg: "bg-yellow-500/10",
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        {/* Floating Orbs */}
        <div className="absolute top-0 -left-40 w-96 h-96 bg-primary-purple/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute top-1/3 -right-40 w-80 h-80 bg-primary-gold/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative space-y-8 pt-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-purple/20 to-primary-gold/20 rounded-xl blur-lg opacity-50" />
            <div className="relative">
              <h1 className="text-3xl font-bold text-white relative">
                Admin Dashboard
                <span className="absolute -bottom-1 left-0 w-20 h-1 bg-gradient-to-r from-primary-purple to-primary-gold rounded-full" />
              </h1>
              <p className="text-gray-400 mt-2">
                Welcome to your administration panel
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
            <Clock size={16} className="text-primary-purple animate-pulse" />
            <span className="text-sm text-gray-400">Last updated:</span>
            <span className="text-sm text-white font-medium">Just now</span>
          </div>
        </div>

        {/* Stats Cards */}
        <AdminStatsCards stats={dashboardStats} />

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-purple/20 to-primary-gold/20 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <div className="relative bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary-purple/20 rounded-lg">
                    <Activity size={20} className="text-primary-purple" />
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    Quick Actions
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <a
                        key={index}
                        href={action.href}
                        className={`flex items-center p-4 ${action.bgColor} ${action.borderColor} rounded-xl border hover:shadow-xl ${action.glowColor} transition-all duration-300 group hover:-translate-y-1`}
                      >
                        <div
                          className={`p-3 rounded-xl ${action.bgColor} mr-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                        >
                          <Icon className={`h-6 w-6 ${action.color}`} />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold mb-1 group-hover:text-primary-gold transition-colors">
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
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="relative group h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-gold/20 to-primary-purple/20 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <div className="relative bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary-gold/20 rounded-lg">
                    <TrendingUp size={20} className="text-primary-gold" />
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    Recent Activity
                  </h2>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-700/30 transition-colors group/activity"
                      >
                        <div
                          className={`p-2 rounded-lg ${activity.iconBg} group-hover/activity:scale-110 transition-transform`}
                        >
                          <Icon size={14} className={activity.iconColor} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm">
                            <span className="font-semibold group-hover/activity:text-primary-gold transition-colors">
                              {activity.user}
                            </span>{" "}
                            {activity.action}
                          </p>
                          <p className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                            <Clock size={10} />
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Distribution */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            <div className="relative bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Users size={20} className="text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  User Distribution
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  {
                    label: "Students",
                    count: users.filter((u) => u.roles?.includes("ROLE_USER"))
                      .length,
                    color: "bg-blue-500",
                    glow: "shadow-blue-500/30",
                  },
                  {
                    label: "Instructors",
                    count: users.filter((u) =>
                      u.roles?.includes("ROLE_INSTRUCTOR"),
                    ).length,
                    color: "bg-purple-500",
                    glow: "shadow-purple-500/30",
                  },
                  {
                    label: "Admins",
                    count: users.filter((u) => u.roles?.includes("ROLE_ADMIN"))
                      .length,
                    color: "bg-primary-gold",
                    glow: "shadow-primary-gold/30",
                  },
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="text-white font-semibold">
                        {item.count}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full shadow-lg ${item.glow} transition-all duration-1000`}
                        style={{
                          width: `${Math.min(
                            (item.count / Math.max(users.length, 1)) * 100,
                            100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 to-primary-gold/20 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            <div className="relative bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Activity size={20} className="text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  System Status
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  {
                    label: "API Status",
                    value: "Operational",
                    status: "online",
                    icon: Activity,
                  },
                  {
                    label: "Database",
                    value: "Connected",
                    status: "online",
                    icon: Shield,
                  },
                  {
                    label: "Storage",
                    value: "65% Used",
                    status: "warning",
                    icon: BookOpen,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-700/30 hover:bg-gray-700/50 transition-colors group/item"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          item.status === "online"
                            ? "bg-green-500/10"
                            : item.status === "warning"
                            ? "bg-yellow-500/10"
                            : "bg-red-500/10"
                        }`}
                      >
                        <item.icon
                          size={16}
                          className={
                            item.status === "online"
                              ? "text-green-400"
                              : item.status === "warning"
                              ? "text-yellow-400"
                              : "text-red-400"
                          }
                        />
                      </div>
                      <span className="text-gray-400">{item.label}</span>
                    </div>
                    <span
                      className={`font-semibold flex items-center gap-2 ${
                        item.status === "online"
                          ? "text-green-400"
                          : item.status === "warning"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          item.status === "online"
                            ? "bg-green-400 animate-pulse"
                            : item.status === "warning"
                            ? "bg-yellow-400"
                            : "bg-red-400"
                        }`}
                      />
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
