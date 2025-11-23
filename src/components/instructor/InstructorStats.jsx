import React from "react";
import {
  BookOpen,
  Users,
  TrendingUp,
  Star,
  Clock,
  DollarSign,
} from "lucide-react";

const InstructorStats = ({ stats }) => {
  const statCards = [
    {
      title: "Total Courses",
      value: stats?.totalCourses || 0,
      change: "+2 this month",
      icon: BookOpen,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      description: "Published courses",
    },
    {
      title: "Total Students",
      value: stats?.totalStudents || 0,
      change: "+15 this week",
      icon: Users,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      description: "Enrolled students",
    },
    {
      title: "Course Rating",
      value: stats?.averageRating || "4.8",
      change: "+0.2 this month",
      icon: Star,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      description: "Average rating",
    },
    {
      title: "Completion Rate",
      value: `${stats?.completionRate || 0}%`,
      change: "+5% this month",
      icon: TrendingUp,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      description: "Student completion",
    },
    {
      title: "Total Revenue",
      value: `$${stats?.totalRevenue || 0}`,
      change: "+$120 this week",
      icon: DollarSign,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      description: "Earnings",
    },
    {
      title: "Avg. Watch Time",
      value: `${stats?.avgWatchTime || 0}h`,
      change: "+30min this month",
      icon: Clock,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      description: "Per student",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-primary-purple transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <span className="text-green-400 text-xs font-semibold">
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

export default InstructorStats;
