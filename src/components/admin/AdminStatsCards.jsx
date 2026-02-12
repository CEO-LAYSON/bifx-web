import React from "react";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  Activity,
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
      borderColor: "border-blue-500/30",
      glowColor: "shadow-blue-500/20",
      gradient: "from-blue-500/20 to-blue-600/10",
    },
    {
      title: "Total Courses",
      value: stats?.totalCourses || 0,
      change: "+5%",
      icon: BookOpen,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      glowColor: "shadow-green-500/20",
      gradient: "from-green-500/20 to-green-600/10",
    },
    {
      title: "Total Revenue",
      value: `${stats?.totalRevenue || 0}`,
      change: "+23%",
      icon: DollarSign,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
      glowColor: "shadow-yellow-500/20",
      gradient: "from-yellow-500/20 to-yellow-600/10",
    },
    {
      title: "Pending Enrollments",
      value: stats?.pendingEnrollments || 0,
      change: "+3",
      icon: Clock,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      glowColor: "shadow-orange-500/20",
      gradient: "from-orange-500/20 to-orange-600/10",
    },
    {
      title: "Active Students",
      value: stats?.activeStudents || 0,
      change: "+8%",
      icon: TrendingUp,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      glowColor: "shadow-purple-500/20",
      gradient: "from-purple-500/20 to-purple-600/10",
    },
    {
      title: "Completed Courses",
      value: stats?.completedCourses || 0,
      change: "+15%",
      icon: CheckCircle,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
      glowColor: "shadow-emerald-500/20",
      gradient: "from-emerald-500/20 to-emerald-600/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="relative group overflow-hidden rounded-2xl"
          >
            {/* Gradient Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-50 group-hover:opacity-75 transition-opacity duration-500`}
            />

            {/* Glow Effect */}
            <div
              className={`absolute inset-0 ${stat.glowColor} opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl`}
            />

            {/* Card Content */}
            <div className="relative bg-gray-800/70 backdrop-blur-xl rounded-2xl p-5 border border-gray-700/50 group-hover:border-${stat.borderColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${stat.glowColor}">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-2.5 rounded-xl ${stat.bgColor} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                >
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                  <TrendingUp size={12} className="text-green-400" />
                  <span className="text-green-400 text-xs font-semibold">
                    {stat.change}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-white">
                    {stat.value}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm font-medium group-hover:text-white transition-colors">
                  {stat.title}
                </p>
              </div>

              {/* Animated Shine Effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -inset-full top-0 skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-shine" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminStatsCards;
