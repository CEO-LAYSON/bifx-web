import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInstructorStats,
  fetchMyCourses,
} from "../../../store/slices/instructorSlice";
import InstructorStats from "../../../components/instructor/InstructorStats";
import {
  Plus,
  TrendingUp,
  Users,
  MessageSquare,
  Upload,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const InstructorDashboard = () => {
  const dispatch = useDispatch();
  const { stats, courses, isLoading } = useSelector(
    (state) => state.instructor,
  );

  useEffect(() => {
    dispatch(fetchInstructorStats());
    dispatch(fetchMyCourses());
  }, [dispatch]);

  const quickActions = [
    {
      title: "Create Course",
      description: "Build a new course from scratch",
      icon: Plus,
      href: "/instructor/courses/create",
      color: "from-blue-400 to-blue-600",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      hoverBorder: "hover:border-blue-400",
      shadowColor: "shadow-blue-500/20",
    },
    {
      title: "Upload Content",
      description: "Add videos to your courses",
      icon: Upload,
      href: "/instructor/upload",
      color: "from-green-400 to-green-600",
      bgGradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      hoverBorder: "hover:border-green-400",
      shadowColor: "shadow-green-500/20",
    },
    {
      title: "Student Analytics",
      description: "View student progress and engagement",
      icon: TrendingUp,
      href: "/instructor/analytics",
      color: "from-purple-400 to-purple-600",
      bgGradient: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      hoverBorder: "hover:border-purple-400",
      shadowColor: "shadow-purple-500/20",
    },
    {
      title: "Communicate",
      description: "Message your students",
      icon: MessageSquare,
      href: "/instructor/messages",
      color: "from-yellow-400 to-orange-500",
      bgGradient: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
      hoverBorder: "hover:border-yellow-400",
      shadowColor: "shadow-yellow-500/20",
    },
  ];

  const recentCourses = courses.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />
        <div className="absolute top-0 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
        <div
          className="absolute bottom-0 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-[120px] animate-spin"
          style={{ animationDuration: "30s" }}
        />
      </div>

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-8 border border-white/10 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.4)]">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white">
                  Instructor Dashboard
                </h1>
              </div>
              <p className="text-gray-300 ml-15">
                Manage your courses and track student progress
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <span className="text-gray-300">Welcome back,</span>
                <span className="text-yellow-400 font-semibold ml-2">
                  Instructor!
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      </div>

      {/* Stats Cards */}
      <InstructorStats stats={stats} />

      {/* Quick Actions & Recent Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 p-6 border border-white/10 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-600 rounded-full" />
                <h2 className="text-xl font-bold text-white">Quick Actions</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={index}
                      to={action.href}
                      className={`relative group overflow-hidden rounded-xl p-4 bg-gradient-to-br ${action.bgGradient} border ${action.borderColor} ${action.hoverBorder} transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="flex items-center gap-4 relative z-10">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-br ${action.color} shadow-lg ${action.shadowColor}`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                            {action.title}
                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {action.description}
                          </p>
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Courses */}
        <div className="lg:col-span-1">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 p-6 border border-white/10 backdrop-blur-xl h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-yellow-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-pink-600 rounded-full" />
                  <h2 className="text-xl font-bold text-white">
                    Recent Courses
                  </h2>
                </div>
                <Link
                  to="/instructor/courses"
                  className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1 group/link"
                >
                  View All
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <Link
                    key={course.id}
                    to={`/instructor/courses/${course.id}`}
                    className="relative group overflow-hidden rounded-xl p-4 bg-black/20 border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center overflow-hidden">
                        {course.thumbnail ? (
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-sm mb-1 truncate group-hover:text-purple-300 transition-colors">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full" />
                            {course.lessonCount} lessons
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {course.totalStudents || 0}
                          </span>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-5 h-5 text-purple-400" />
                      </div>
                    </div>
                  </Link>
                ))}

                {recentCourses.length === 0 && (
                  <div className="relative overflow-hidden rounded-xl p-8 text-center bg-gradient-to-br from-gray-800/50 to-black/50 border border-white/5">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                      <Plus className="w-8 h-8 text-gray-500" />
                    </div>
                    <p className="text-gray-400 mb-4">No courses yet</p>
                    <Link
                      to="/instructor/courses/create"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300"
                    >
                      <Plus className="w-4 h-4" />
                      Create your first course
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Performing Courses */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 p-6 border border-white/10 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-orange-500/5 to-red-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-600 rounded-full" />
              <h3 className="text-lg font-semibold text-white">
                Top Performing Courses
              </h3>
            </div>
            <div className="space-y-3">
              {courses.slice(0, 3).map((course, index) => (
                <div
                  key={course.id}
                  className="relative group overflow-hidden rounded-xl p-3 bg-black/20 border border-white/5 hover:border-yellow-500/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                        index === 0
                          ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-black"
                          : index === 1
                          ? "bg-gradient-to-br from-gray-300 to-gray-500 text-black"
                          : "bg-gradient-to-br from-orange-400 to-orange-600 text-white"
                      } shadow-lg`}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-white text-sm truncate block group-hover:text-yellow-300 transition-colors">
                        {course.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-semibold">
                        {course.rating || "4.8"}★
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Student Engagement */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 p-6 border border-white/10 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-teal-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-teal-600 rounded-full" />
              <h3 className="text-lg font-semibold text-white">
                Student Engagement
              </h3>
            </div>
            <div className="space-y-4">
              {[
                {
                  label: "Active Students",
                  value: stats?.activeStudents || 0,
                  icon: Users,
                  color: "text-blue-400",
                  bgColor: "bg-blue-500/20",
                },
                {
                  label: "Avg. Completion Rate",
                  value: `${stats?.completionRate || 0}%`,
                  icon: TrendingUp,
                  color: "text-green-400",
                  bgColor: "bg-green-500/20",
                },
                {
                  label: "Avg. Watch Time",
                  value: `${stats?.avgWatchTime || 0}h`,
                  icon: TrendingUp,
                  color: "text-purple-400",
                  bgColor: "bg-purple-500/20",
                },
                {
                  label: "Student Satisfaction",
                  value: `${stats?.satisfactionRate || 0}%`,
                  icon: Sparkles,
                  color: "text-yellow-400",
                  bgColor: "bg-yellow-500/20",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5 hover:border-green-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${item.bgColor}`}>
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <span className="text-gray-300">{item.label}</span>
                  </div>
                  <span className="text-white font-semibold text-lg">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
