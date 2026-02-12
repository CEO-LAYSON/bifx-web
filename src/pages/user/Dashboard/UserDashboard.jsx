import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/constants/routes";
import {
  BookOpen,
  BarChart3,
  Video,
  Award,
  TrendingUp,
  Clock,
  ArrowRight,
  Sparkles,
  Target,
} from "lucide-react";
import AnimatedCounter from "../../../components/ui/AnimatedCounter";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const stats = [
    {
      name: "Enrolled Courses",
      value: "0",
      icon: BookOpen,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/5",
      glow: "shadow-blue-500/20",
    },
    {
      name: "Completed Lessons",
      value: "0",
      icon: Award,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-500/10 to-teal-500/5",
      glow: "shadow-emerald-500/20",
    },
    {
      name: "Learning Progress",
      value: "0%",
      icon: TrendingUp,
      gradient: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-500/10 to-violet-500/5",
      glow: "shadow-purple-500/20",
    },
    {
      name: "Live Sessions",
      value: "0",
      icon: Video,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/5",
      glow: "shadow-orange-500/20",
    },
  ];

  const quickLinks = [
    {
      title: "Continue Learning",
      description: "Pick up where you left off",
      icon: Play,
      href: ROUTES.MY_COURSES,
      gradient: "from-purple-600 to-violet-600",
      hoverGradient: "from-purple-500 to-violet-500",
    },
    {
      title: "Browse Courses",
      description: "Discover new trading strategies",
      icon: BookOpen,
      href: ROUTES.COURSES,
      gradient: "from-amber-500 to-orange-500",
      hoverGradient: "from-amber-400 to-orange-400",
    },
  ];

  // Demo course for visual preview
  const demoCourse = {
    id: 1,
    title: "Forex Trading Fundamentals",
    progress: 35,
    thumbnail:
      "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=400&h=225&fit=crop",
    lastLesson: "Understanding Candlestick Patterns",
    nextLesson: "Support & Resistance Levels",
    totalLessons: 24,
    completedLessons: 8,
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section with Premium Design */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/80 via-gray-900 to-gray-900 border border-purple-500/20 p-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-32 -left-32 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-500/20 rounded-xl">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-purple-400 text-sm font-medium tracking-wide uppercase">
                Welcome Back
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Good {getTimeOfDay()},{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                {user?.fullName?.split(" ")[0] || "Trader"}!
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl">
              Continue your forex trading journey. Your next lesson awaits!
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to={ROUTES.MY_COURSES}
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-violet-500 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105"
            >
              <BookOpen className="w-5 h-5" />
              My Courses
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to={ROUTES.COURSES}
              className="flex items-center gap-2 px-6 py-3 bg-gray-800/80 backdrop-blur-sm text-white font-semibold rounded-xl border border-gray-700 hover:bg-gray-700 hover:border-gray-600 transition-all duration-300"
            >
              <Target className="w-5 h-5 text-amber-400" />
              Explore
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid with Premium Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${
                stat.bgGradient
              } border border-gray-700/50 p-6 hover:border-${
                stat.gradient.split("-")[1]
              }-500/50 transition-all duration-500 hover:shadow-xl ${
                stat.glow
              } hover:-translate-y-1`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Glow Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    +12%
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl font-bold text-white">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <p className="text-gray-400 text-sm font-medium">
                    {stat.name}
                  </p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div
                className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${stat.gradient}/10 rounded-full blur-2xl group-hover:bg-gradient-to-br ${stat.gradient}/20 transition-all duration-500`}
              />
            </div>
          );
        })}
      </div>

      {/* Continue Learning Section with Premium Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Continue Learning Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900 to-gray-900 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-xl">
                  <Play className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Continue Learning
                </h2>
              </div>
              <Link
                to={ROUTES.MY_COURSES}
                className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1 transition-colors"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Demo Course Card */}
            <div className="relative overflow-hidden rounded-xl bg-gray-900/50 border border-gray-700/50 p-4 group/card hover:border-gray-600/50 transition-all duration-300">
              <div className="flex gap-4">
                <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={demoCourse.thumbnail}
                    alt={demoCourse.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 bg-purple-500/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate mb-2">
                    {demoCourse.title}
                  </h3>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-purple-400 font-medium">
                        {demoCourse.progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full transition-all duration-1000"
                        style={{ width: `${demoCourse.progress}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-gray-500 text-xs truncate">
                    <span className="text-gray-400">Up next:</span>{" "}
                    {demoCourse.nextLesson}
                  </p>
                </div>
              </div>
            </div>

            <Link
              to={`/learn/${demoCourse.id}/lesson/${
                demoCourse.completedLessons + 1
              }`}
              className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-violet-500 transition-all duration-300"
            >
              <Play className="w-5 h-5" />
              Continue Learning
            </Link>
          </div>
        </div>

        {/* Recent Activity / Quick Stats */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900 to-gray-900 border border-gray-700/50 hover:border-amber-500/30 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-500/20 rounded-xl">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <h2 className="text-xl font-bold text-white">
                Learning Activity
              </h2>
            </div>

            {/* Activity Stats */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                <div className="p-3 bg-emerald-500/10 rounded-xl">
                  <Award className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">Weekly Goal</span>
                    <span className="text-amber-400 font-semibold">3/5</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                      style={{ width: "60%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700/50 text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    2h 15m
                  </div>
                  <div className="text-gray-400 text-sm">
                    Study Time This Week
                  </div>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700/50 text-center">
                  <div className="text-2xl font-bold text-white mb-1">8</div>
                  <div className="text-gray-400 text-sm">Lessons Completed</div>
                </div>
              </div>

              <Link
                to={ROUTES.PROGRESS}
                className="flex items-center justify-center gap-2 w-full py-3 bg-gray-800/80 text-white font-semibold rounded-xl border border-gray-700 hover:bg-gray-700 hover:border-gray-600 transition-all duration-300"
              >
                <BarChart3 className="w-5 h-5" />
                View Detailed Progress
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Live Sessions */}
      <div className="rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900 to-gray-900 border border-gray-700/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/20 rounded-xl">
              <Video className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Upcoming Live Sessions
            </h2>
          </div>
          <Link
            to={ROUTES.LIVE_SESSIONS}
            className="text-gray-400 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
            <Video className="w-8 h-8 text-gray-500" />
          </div>
          <p className="text-gray-400 mb-4">No live sessions scheduled</p>
          <p className="text-gray-500 text-sm">
            Check back later for upcoming trading sessions
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper function to get time of day greeting
function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

// Play icon component for inline use
function Play({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export default UserDashboard;
