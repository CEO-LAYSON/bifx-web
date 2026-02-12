import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMyCourses } from "../../../store/slices/instructorSlice";
import {
  Plus,
  Users,
  Star,
  Clock,
  Edit,
  Eye,
  Sparkles,
  BookOpen,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Button from "../../../components/ui/Button";
import Loader from "../../../components/ui/Loader";

const MyCourses = () => {
  const dispatch = useDispatch();
  const { courses, isLoading } = useSelector((state) => state.instructor);

  useEffect(() => {
    dispatch(fetchMyCourses());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-500/20 rounded-full animate-spin border-t-purple-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalStudents = courses.reduce(
    (acc, course) => acc + (course.totalStudents || 0),
    0,
  );
  const totalRevenue = courses.reduce(
    (acc, course) => acc + (course.revenue || 0),
    0,
  );

  return (
    <div className="space-y-6">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-[120px] animate-spin"
          style={{ animationDuration: "40s" }}
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
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white">My Courses</h1>
              </div>
              <p className="text-gray-300 ml-15">
                Manage and track your published courses
              </p>
            </div>
            <Link
              to="/instructor/courses/create"
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl text-white font-semibold shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Create Course
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: "Total Courses",
            value: courses.length,
            icon: BookOpen,
            color: "from-blue-400 to-blue-600",
            bgColor: "bg-blue-500/20",
            textColor: "text-blue-400",
          },
          {
            label: "Total Students",
            value: totalStudents.toLocaleString(),
            icon: Users,
            color: "from-green-400 to-emerald-600",
            bgColor: "bg-green-500/20",
            textColor: "text-green-400",
          },
          {
            label: "Total Revenue",
            value: `$${totalRevenue.toLocaleString()}`,
            icon: TrendingUp,
            color: "from-purple-400 to-pink-600",
            bgColor: "bg-purple-500/20",
            textColor: "text-purple-400",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 p-4 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} ${stat.bgColor}`}
              >
                <stat.icon className={`w-5 h-5 text-white`} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-white text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div
            key={course.id}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 border border-white/10 backdrop-blur-xl hover:border-purple-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:-translate-y-1"
          >
            {/* Animated Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Glow Effect */}
            <div
              className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-sm"
              style={{ margin: "-1px" }}
            />

            {/* Course Thumbnail */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={course.thumbnailUrl || "/placeholder-course.jpg"}
                alt={course.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
                    course.isFree
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  } shadow-lg`}
                >
                  {course.isFree ? "FREE" : `$${course.priceCents / 100}`}
                </div>
              </div>

              {/* Rating Badge */}
              <div className="absolute top-3 left-3">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-medium">
                    {course.rating || "4.8"}
                  </span>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
                <Link
                  to={`/instructor/courses/${course.id}`}
                  className="relative group/btn overflow-hidden rounded-lg px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-medium hover:bg-white/30 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Manage
                  </span>
                </Link>
                <Link
                  to={`/courses/${course.id}`}
                  className="relative group/btn overflow-hidden rounded-lg px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-medium hover:bg-white/30 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View
                  </span>
                </Link>
              </div>
            </div>

            {/* Course Content */}
            <div className="relative p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-purple-300 transition-colors">
                  {course.title}
                </h3>
              </div>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {course.description}
              </p>

              {/* Course Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <div className="p-1.5 rounded-lg bg-white/5">
                      <Users className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <span className="text-sm font-medium">
                      {course.totalStudents || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <div className="p-1.5 rounded-lg bg-white/5">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <span className="text-sm font-medium">
                      {course.lessonCount || 0}
                    </span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    course.status === "published"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : course.status === "draft"
                      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      course.status === "published"
                        ? "bg-green-400"
                        : course.status === "draft"
                        ? "bg-yellow-400"
                        : "bg-gray-400"
                    }`}
                  />
                  {course.status || "Draft"}
                </div>
              </div>

              {/* Decorative Line */}
              <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Sparkle Effect */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {courses.length === 0 && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 p-12 border border-white/10 backdrop-blur-xl text-center">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] animate-pulse" />
            <div
              className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
          </div>

          <div className="relative z-10">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-700/50 to-gray-800/50 border border-white/10 flex items-center justify-center animate-float">
              <BookOpen className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No courses yet
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Start your journey by creating your first course and share your
              knowledge with students worldwide
            </p>
            <Link
              to="/instructor/courses/create"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl text-white font-semibold shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_50px_rgba(139,92,246,0.6)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Create Your First Course
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
