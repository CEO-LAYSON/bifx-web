import React, { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  BookOpen,
  Award,
  Clock,
  Sparkles,
  TrendingUp as TrendingUpIcon,
  DollarSign,
  Target,
  Activity,
  Zap,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { instructorAPI } from "../../../services/api/instructorAPI";

const AnalyticsPage = () => {
  const [stats, setStats] = useState([]);
  const [courseAnalytics, setCourseAnalytics] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await instructorAPI.getInstructorStats();
        const analyticsData = response.data;

        const transformedStats = [
          {
            title: "Total Students",
            value: analyticsData.totalStudents?.toString() || "0",
            change: "+0%",
            changeType: "positive",
            icon: Users,
            color: "from-blue-500 to-cyan-500",
            shadowColor: "shadow-blue-500/30",
          },
          {
            title: "Active Students",
            value: analyticsData.activeStudents?.toString() || "0",
            change: "+0%",
            changeType: "positive",
            icon: TrendingUpIcon,
            color: "from-green-500 to-emerald-500",
            shadowColor: "shadow-green-500/30",
          },
          {
            title: "Total Enrollments",
            value: analyticsData.totalEnrollments?.toString() || "0",
            change: "+0%",
            changeType: "positive",
            icon: BookOpen,
            color: "from-purple-500 to-violet-500",
            shadowColor: "shadow-purple-500/30",
          },
          {
            title: "Completion Rate",
            value: "0%",
            change: "+0%",
            changeType: "positive",
            icon: Award,
            color: "from-gold-500 to-yellow-500",
            shadowColor: "shadow-gold-500/30",
          },
        ];

        setStats(transformedStats);

        setCourseAnalytics([
          {
            name: "Sample Course",
            students: analyticsData.activeStudents || 0,
            completion: 0,
            revenue: 0,
          },
        ]);

        setMonthlyData([
          { month: "Jan", students: 0, revenue: 0 },
          { month: "Feb", students: 0, revenue: 0 },
          { month: "Mar", students: 0, revenue: 0 },
          { month: "Apr", students: 0, revenue: 0 },
          { month: "May", students: 0, revenue: 0 },
          {
            month: "Jun",
            students: analyticsData.activeStudents || 0,
            revenue: 0,
          },
        ]);
      } catch (err) {
        setError("Failed to load analytics");
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const maxValue = Math.max(...monthlyData.map((d) => d.students), 1);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-950/20 to-gray-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2260%22%20height%3D%2260%22%20fill%3D%22none%22%20stroke%3D%22rgba%28139%2C92%2C246%2C0.05%29%22%20stroke-width%3D%220.5%22%2F%3E%3C%2Fsvg%3E')] opacity-50"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-600/5 to-blue-600/5 rounded-full blur-3xl animate-spin"
          style={{ animationDuration: "60s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-blue-600/5"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl blur-lg opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl p-3">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                  Analytics Dashboard
                  <Sparkles className="w-6 h-6 text-gold-400 animate-pulse" />
                </h1>
                <p className="text-gray-400 mt-1">
                  Comprehensive insights into platform performance and user
                  engagement
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-300 text-sm flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span>Live Data</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 animate-pulse"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 bg-gray-700/50 rounded-xl"></div>
                  <div className="h-5 w-14 bg-gray-700/50 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-9 bg-gray-700/50 rounded w-16"></div>
                  <div className="h-4 bg-gray-700/50 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="relative bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="relative group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500"></div>

                  <div className="relative flex items-center justify-between mb-4">
                    <div className="relative">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-xl blur-lg opacity-75`}
                      ></div>
                      <div
                        className={`relative bg-gradient-to-br ${stat.color} rounded-xl p-2.5`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div
                      className={`flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${
                        stat.changeType === "positive"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}
                    >
                      {stat.changeType === "positive" ? (
                        <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5 mr-1" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <div className="relative">
                    <p className="text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">{stat.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Growth Chart */}
          <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-blue-600/5 opacity-50"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-600/10 rounded-full blur-2xl"></div>

            <div className="relative flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white flex items-center">
                <TrendingUp className="mr-3 w-6 h-6 text-purple-400" />
                Monthly Growth
              </h2>
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center text-gray-400">
                  <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
                  Students
                </span>
                <span className="flex items-center text-gray-400">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                  Revenue
                </span>
              </div>
            </div>

            <div className="relative space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="relative group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 font-medium">
                      {data.month}
                    </span>
                    <div className="flex items-center space-x-6">
                      <span className="text-sm text-gray-400">
                        <Users className="w-4 h-4 inline mr-1.5 text-purple-400" />
                        {data.students}
                      </span>
                      <span className="text-sm text-green-400">
                        <DollarSign className="w-4 h-4 inline mr-1" />
                        {data.revenue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="relative h-3 bg-gray-900/60 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full"></div>
                    <div
                      className="absolute h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000 shadow-lg shadow-purple-500/30"
                      style={{ width: `${(data.students / maxValue) * 100}%` }}
                    >
                      <div
                        className="absolute inset-0 bg-white/20 animate-shimmer"
                        style={{ backgroundPosition: "200% 0" }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Performance */}
          <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-cyan-600/5 opacity-50"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600/10 rounded-full blur-2xl"></div>

            <div className="relative flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Target className="mr-3 w-6 h-6 text-blue-400" />
                Course Performance
              </h2>
              <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center transition-colors">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="relative space-y-5">
              {courseAnalytics.map((course, index) => (
                <div key={index} className="relative group">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-purple-400" />
                      </div>
                      <span className="text-gray-200 font-medium">
                        {course.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400 flex items-center">
                      <Users className="w-4 h-4 mr-1.5 text-blue-400" />
                      {course.students} students
                    </span>
                  </div>
                  <div className="relative h-3 bg-gray-900/60 rounded-full overflow-hidden mb-3">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full"></div>
                    <div
                      className="absolute h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000 shadow-lg shadow-purple-500/30"
                      style={{ width: `${course.completion}%` }}
                    >
                      <div
                        className="absolute inset-0 bg-white/20 animate-shimmer"
                        style={{ backgroundPosition: "200% 0" }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400 flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      {course.completion}% completion
                    </span>
                    <span className="text-gray-400 flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />$
                      {course.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/3 via-transparent to-blue-600/3"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600/50 to-blue-500/50 rounded-t-2xl"></div>

          <div className="relative">
            <h2 className="text-xl font-bold text-white mb-8 flex items-center">
              <Sparkles className="mr-3 w-6 h-6 text-gold-400" />
              Platform Insights
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* User Engagement */}
              <div className="relative group bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="relative">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-blue-500/10 rounded-xl">
                      <Activity className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      User Engagement
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-900/40 rounded-xl border border-gray-700/30 hover:border-blue-500/30 transition-colors">
                      <span className="text-gray-300">Daily Active Users</span>
                      <span className="text-white font-semibold flex items-center">
                        1,247
                        <ArrowUpRight className="w-4 h-4 ml-1 text-green-400" />
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-900/40 rounded-xl border border-gray-700/30 hover:border-blue-500/30 transition-colors">
                      <span className="text-gray-300">Session Duration</span>
                      <span className="text-white font-semibold">42m avg</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-900/40 rounded-xl border border-gray-700/30 hover:border-blue-500/30 transition-colors">
                      <span className="text-gray-300">Bounce Rate</span>
                      <span className="text-white font-semibold">23.4%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Performance */}
              <div className="relative group bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="relative">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-purple-500/10 rounded-xl">
                      <BookOpen className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      Content Performance
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-900/40 rounded-xl border border-gray-700/30 hover:border-purple-500/30 transition-colors">
                      <span className="text-gray-300">Total Videos</span>
                      <span className="text-white font-semibold flex items-center">
                        487
                        <Zap className="w-4 h-4 ml-1 text-purple-400" />
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-900/40 rounded-xl border border-gray-700/30 hover:border-purple-500/30 transition-colors">
                      <span className="text-gray-300">Avg. Watch Time</span>
                      <span className="text-white font-semibold">38m</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-900/40 rounded-xl border border-gray-700/30 hover:border-purple-500/30 transition-colors">
                      <span className="text-gray-300">Completion Rate</span>
                      <span className="text-white font-semibold">78.3%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue Metrics */}
              <div className="relative group bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-2xl p-6 border border-gray-700/50 hover:border-green-500/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="relative">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-green-500/10 rounded-xl">
                      <DollarSign className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      Revenue Metrics
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-900/40 rounded-xl border border-gray-700/30 hover:border-green-500/30 transition-colors">
                      <span className="text-gray-300">Monthly Revenue</span>
                      <span className="text-white font-semibold flex items-center">
                        $24,780
                        <ArrowUpRight className="w-4 h-4 ml-1 text-green-400" />
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-900/40 rounded-xl border border-gray-700/30 hover:border-green-500/30 transition-colors">
                      <span className="text-gray-300">Avg. Revenue/User</span>
                      <span className="text-white font-semibold">$8.72</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-900/40 rounded-xl border border-gray-700/30 hover:border-green-500/30 transition-colors">
                      <span className="text-gray-300">Conversion Rate</span>
                      <span className="text-white font-semibold">12.8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
