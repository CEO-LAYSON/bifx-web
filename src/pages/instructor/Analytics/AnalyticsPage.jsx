import React, { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  BookOpen,
  Award,
  Clock,
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

        // Transform API data to match the expected format
        const transformedStats = [
          {
            title: "Total Students",
            value: analyticsData.totalStudents?.toString() || "0",
            change: "+0%", // TODO: Calculate from historical data
            changeType: "positive",
            icon: Users,
            color: "text-blue-500",
          },
          {
            title: "Active Students",
            value: analyticsData.activeStudents?.toString() || "0",
            change: "+0%",
            changeType: "positive",
            icon: TrendingUp,
            color: "text-green-500",
          },
          {
            title: "Total Enrollments",
            value: analyticsData.totalEnrollments?.toString() || "0",
            change: "+0%",
            changeType: "positive",
            icon: BookOpen,
            color: "text-purple-500",
          },
          {
            title: "Completion Rate",
            value: "0%", // TODO: Calculate from progress data
            change: "+0%",
            changeType: "positive",
            icon: Award,
            color: "text-orange-500",
          },
        ];

        setStats(transformedStats);

        // Mock course analytics for now - would need course-specific data
        setCourseAnalytics([
          {
            name: "Sample Course",
            students: analyticsData.activeStudents || 0,
            completion: 0,
            revenue: 0,
          },
        ]);

        // Mock monthly data for now
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-6 border border-blue-700">
        <h1 className="text-3xl font-bold text-white mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-300">
          Comprehensive insights into platform performance and user engagement
        </p>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 animate-pulse"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="h-8 w-8 bg-gray-600 rounded"></div>
                <div className="h-4 w-12 bg-gray-600 rounded"></div>
              </div>
              <div className="space-y-1">
                <div className="h-8 bg-gray-600 rounded w-16"></div>
                <div className="h-4 bg-gray-600 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-500 rounded-xl p-6">
          <p className="text-red-400">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Growth Chart */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="mr-2" size={24} />
            Monthly Growth
          </h2>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-300">{data.month}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-400">
                    {data.students} students
                  </span>
                  <span className="text-sm text-green-400">
                    ${data.revenue.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Performance */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <BarChart3 className="mr-2" size={24} />
            Course Performance
          </h2>
          <div className="space-y-4">
            {courseAnalytics.map((course, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-medium">
                    {course.name}
                  </span>
                  <span className="text-sm text-gray-400">
                    {course.students} students
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${course.completion}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">
                    {course.completion}% completion
                  </span>
                  <span className="text-gray-400">
                    ${course.revenue.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6">Platform Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              User Engagement
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Daily Active Users</span>
                <span className="text-white font-medium">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Session Duration</span>
                <span className="text-white font-medium">42m avg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Bounce Rate</span>
                <span className="text-white font-medium">23.4%</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Content Performance
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Total Videos</span>
                <span className="text-white font-medium">487</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Avg. Watch Time</span>
                <span className="text-white font-medium">38m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Completion Rate</span>
                <span className="text-white font-medium">78.3%</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Revenue Metrics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Monthly Revenue</span>
                <span className="text-white font-medium">$24,780</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Avg. Revenue/User</span>
                <span className="text-white font-medium">$8.72</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Conversion Rate</span>
                <span className="text-white font-medium">12.8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
