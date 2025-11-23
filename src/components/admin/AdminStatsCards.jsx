import React from "react";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";

const AdminStatsCards = ({ stats }) => {
  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      change: "+12%",
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      description: "Registered users",
    },
    {
      title: "Total Courses",
      value: stats?.totalCourses || 0,
      change: "+5%",
      icon: BookOpen,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      description: "Active courses",
    },
    {
      title: "Total Revenue",
      value: `$${stats?.totalRevenue || 0}`,
      change: "+23%",
      icon: DollarSign,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      description: "This month",
    },
    {
      title: "Pending Enrollments",
      value: stats?.pendingEnrollments || 0,
      change: "+3",
      icon: Clock,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      description: "Need verification",
    },
    {
      title: "Active Students",
      value: stats?.activeStudents || 0,
      change: "+8%",
      icon: TrendingUp,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      description: "Learning this week",
    },
    {
      title: "Completed Courses",
      value: stats?.completedCourses || 0,
      change: "+15%",
      icon: CheckCircle,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      description: "This month",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-primary-gold transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <span className="text-green-400 text-sm font-semibold">
                {stat.change}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
              <p className="text-gray-500 text-xs">{stat.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminStatsCards;
