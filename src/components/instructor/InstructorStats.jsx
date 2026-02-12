import React from "react";
import {
  BookOpen,
  Users,
  TrendingUp,
  Star,
  Clock,
  DollarSign,
  Sparkles,
} from "lucide-react";

const InstructorStats = ({ stats }) => {
  const statCards = [
    {
      title: "Total Courses",
      value: stats?.totalCourses || 0,
      change: "+2 this month",
      icon: BookOpen,
      color: "from-blue-400 to-blue-600",
      glowColor: "shadow-blue-500/25",
      borderColor: "border-blue-500/20",
      hoverBorder: "hover:border-blue-400",
      gradient: "from-blue-500/20 via-blue-600/10 to-cyan-500/10",
      textColor: "text-blue-400",
    },
    {
      title: "Total Students",
      value: stats?.totalStudents || 0,
      change: "+15 this week",
      icon: Users,
      color: "from-green-400 to-emerald-600",
      glowColor: "shadow-green-500/25",
      borderColor: "border-green-500/20",
      hoverBorder: "hover:border-green-400",
      gradient: "from-green-500/20 via-emerald-600/10 to-teal-500/10",
      textColor: "text-green-400",
    },
    {
      title: "Course Rating",
      value: stats?.averageRating || "4.8",
      change: "+0.2 this month",
      icon: Star,
      color: "from-yellow-400 to-orange-500",
      glowColor: "shadow-yellow-500/25",
      borderColor: "border-yellow-500/20",
      hoverBorder: "hover:border-yellow-400",
      gradient: "from-yellow-500/20 via-orange-500/10 to-amber-500/10",
      textColor: "text-yellow-400",
    },
    {
      title: "Completion Rate",
      value: `${stats?.completionRate || 0}%`,
      change: "+5% this month",
      icon: TrendingUp,
      color: "from-purple-400 to-pink-600",
      glowColor: "shadow-purple-500/25",
      borderColor: "border-purple-500/20",
      hoverBorder: "hover:border-purple-400",
      gradient: "from-purple-500/20 via-pink-600/10 to-rose-500/10",
      textColor: "text-purple-400",
    },
    {
      title: "Total Revenue",
      value: `$${stats?.totalRevenue || 0}`,
      change: "+$120 this week",
      icon: DollarSign,
      color: "from-emerald-400 to-cyan-500",
      glowColor: "shadow-emerald-500/25",
      borderColor: "border-emerald-500/20",
      hoverBorder: "hover:border-emerald-400",
      gradient: "from-emerald-500/20 via-cyan-600/10 to-teal-500/10",
      textColor: "text-emerald-400",
    },
    {
      title: "Avg. Watch Time",
      value: `${stats?.avgWatchTime || 0}h`,
      change: "+30min this month",
      icon: Clock,
      color: "from-orange-400 to-red-500",
      glowColor: "shadow-orange-500/25",
      borderColor: "border-orange-500/20",
      hoverBorder: "hover:border-orange-400",
      gradient: "from-orange-500/20 via-red-600/10 to-rose-500/10",
      textColor: "text-orange-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.gradient} border ${stat.borderColor} ${stat.hoverBorder} transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:-translate-y-1`}
          >
            {/* Animated Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Glow Effect */}
            <div
              className={`absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl bg-gradient-to-r ${stat.color} blur-sm ${stat.glowColor}`}
              style={{ margin: "-1px" }}
            />

            <div className="relative p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`relative p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg ${stat.glowColor} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-5 w-5 text-white" />
                  <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-medium">
                    {stat.change.split(" ")[0]}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {typeof stat.value === "number" && stat.value >= 1000
                      ? stat.value.toLocaleString()
                      : stat.value}
                  </h3>
                  {stat.title === "Course Rating" && (
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  )}
                </div>
                <p className={`${stat.textColor} text-sm font-semibold`}>
                  {stat.title}
                </p>
                <p className="text-gray-500 text-xs">{stat.description}</p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-16 h-16">
                <div
                  className={`absolute top-[-20px] right-[-20px] w-24 h-24 rounded-full bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                />
              </div>

              {/* Animated underline on hover */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100`}
              />
            </div>

            {/* Sparkle effect on hover */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
              <Sparkles className={`w-4 h-4 ${stat.textColor}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InstructorStats;
