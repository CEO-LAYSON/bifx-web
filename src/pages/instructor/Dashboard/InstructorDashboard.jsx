import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInstructorStats,
  fetchMyCourses,
} from "../../../store/slices/instructorSlice";
import InstructorStats from "../../../components/instructor/InstructorStats";
import { Plus, TrendingUp, Users, MessageSquare, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const InstructorDashboard = () => {
  const dispatch = useDispatch();
  const { stats, courses, isLoading } = useSelector(
    (state) => state.instructor
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
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Upload Content",
      description: "Add videos to your courses",
      icon: Upload,
      href: "/instructor/upload",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Student Analytics",
      description: "View student progress and engagement",
      icon: TrendingUp,
      href: "/instructor/analytics",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Communicate",
      description: "Message your students",
      icon: MessageSquare,
      href: "/instructor/messages",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
  ];

  const recentCourses = courses.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Instructor Dashboard
          </h1>
          <p className="text-gray-400">
            Manage your courses and track student progress
          </p>
        </div>
        <div className="text-sm text-gray-400">Welcome back, Instructor!</div>
      </div>

      {/* Stats Cards */}
      <InstructorStats stats={stats} />

      {/* Quick Actions & Recent Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.href}
                    className="flex items-center p-4 bg-gray-700 rounded-lg border border-gray-600 hover:border-primary-purple transition-colors group"
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
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Courses */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Courses</h2>
              <Link
                to="/instructor/courses"
                className="text-primary-purple hover:text-purple-400 text-sm font-medium"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {recentCourses.map((course) => (
                <Link
                  key={course.id}
                  to={`/instructor/courses/${course.id}`}
                  className="block p-3 bg-gray-700 rounded-lg border border-gray-600 hover:border-primary-purple transition-colors"
                >
                  <h3 className="text-white font-semibold text-sm mb-1 truncate">
                    {course.title}
                  </h3>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{course.lessonCount} lessons</span>
                    <span>{course.totalStudents || 0} students</span>
                  </div>
                </Link>
              ))}

              {recentCourses.length === 0 && (
                <div className="text-center py-4">
                  <Plus className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">No courses yet</p>
                  <Link
                    to="/instructor/courses/create"
                    className="text-primary-purple hover:text-purple-400 text-sm font-medium"
                  >
                    Create your first course
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Top Performing Courses
          </h3>
          <div className="space-y-3">
            {courses.slice(0, 3).map((course, index) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-purple rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {index + 1}
                  </div>
                  <span className="text-white text-sm truncate max-w-xs">
                    {course.title}
                  </span>
                </div>
                <div className="text-primary-gold text-sm font-semibold">
                  {course.rating || "4.8"}★
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Student Engagement
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Active Students</span>
              <span className="text-white font-semibold">
                {stats?.activeStudents || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Avg. Completion Rate</span>
              <span className="text-white font-semibold">
                {stats?.completionRate || 0}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Avg. Watch Time</span>
              <span className="text-white font-semibold">
                {stats?.avgWatchTime || 0}h
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Student Satisfaction</span>
              <span className="text-white font-semibold">
                {stats?.satisfactionRate || 0}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
