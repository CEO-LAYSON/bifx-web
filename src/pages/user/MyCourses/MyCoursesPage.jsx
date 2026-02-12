import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { enrollmentAPI } from "../../../services/api/enrollmentAPI";
import CourseCard from "../../../components/courses/CourseCard";
import Loader from "../../../components/ui/Loader";
import {
  BookOpen,
  AlertCircle,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Clock,
  ChevronRight,
} from "lucide-react";

const MyCoursesPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all, in-progress, completed

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await enrollmentAPI.getUserEnrollments();
        setEnrollments(response.data.data || []);
      } catch (err) {
        setError("Failed to load your courses");
        console.error("Error fetching enrollments:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  // Filter enrollments based on search and filter
  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesSearch =
      (enrollment.courseTitle || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (enrollment.courseDescription || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    if (filter === "all") return matchesSearch;
    if (filter === "in-progress") return enrollment.status === "IN_PROGRESS";
    if (filter === "completed") return enrollment.status === "COMPLETED";

    return matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
            <div
              className="absolute inset-0 w-20 h-20 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            ></div>
          </div>
          <p className="text-gray-400">Loading your courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-red-500/30 p-8 max-w-md w-full text-center">
          <div className="absolute inset-0 bg-red-500/5"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-violet-500 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section with Premium Design */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/80 via-gray-900 to-gray-900 border border-purple-500/20 p-8">
        {/* Animated Background */}
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
                <GraduationCap className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-purple-400 text-sm font-medium tracking-wide uppercase">
                Your Learning Journey
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              My{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Courses
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Access and manage all your enrolled courses
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/courses"
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
            >
              <Sparkles className="w-5 h-5" />
              Browse More
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search your courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400 mr-2" />
          {["all", "in-progress", "completed"].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                filter === filterOption
                  ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/25"
                  : "bg-gray-800/80 text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              {filterOption === "all"
                ? "All Courses"
                : filterOption === "in-progress"
                ? "In Progress"
                : "Completed"}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid or Empty State */}
      {enrollments.length === 0 ? (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900 to-gray-900 border border-gray-700/50 p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-full mb-6">
              <BookOpen className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No Enrolled Courses Yet
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              You haven't enrolled in any courses yet. Start your forex trading
              journey today!
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-violet-500 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              Explore Courses
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      ) : filteredEnrollments.length === 0 ? (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900 to-gray-900 border border-gray-700/50 p-12 text-center">
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
              <Search className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No Courses Found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-gray-400">
              Showing{" "}
              <span className="text-white font-medium">
                {filteredEnrollments.length}
              </span>{" "}
              {filteredEnrollments.length === 1 ? "course" : "courses"}
            </p>
          </div>

          {/* Premium Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEnrollments.map((enrollment, index) => (
              <PremiumEnrollmentCard
                key={enrollment.id}
                enrollment={enrollment}
                index={index}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Premium Enrollment Card Component
const PremiumEnrollmentCard = ({ enrollment, index }) => {
  const progress = enrollment.progress || 0;
  const status = enrollment.status || "ACTIVE";

  const statusConfig = {
    ACTIVE: {
      label: "In Progress",
      gradient: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-500/10 to-violet-500/5",
      icon: Clock,
    },
    COMPLETED: {
      label: "Completed",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-500/10 to-teal-500/5",
      icon: BookOpen,
    },
    PAUSED: {
      label: "Paused",
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-500/10 to-orange-500/5",
      icon: Clock,
    },
  };

  const statusStyle = statusConfig[status] || statusConfig.ACTIVE;
  const StatusIcon = statusStyle.icon;

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900 to-gray-900 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Card Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Thumbnail Section */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={
            enrollment.thumbnailUrl ||
            "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=400&h=225&fit=crop"
          }
          alt={enrollment.courseTitle || "Course"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-${statusStyle.gradient
              .split(" ")[0]
              .replace("from-", "")}/20 border border-${statusStyle.gradient
              .split(" ")[0]
              .replace("from-", "")}/30 backdrop-blur-sm`}
          >
            <StatusIcon
              className={`w-3.5 h-3.5 text-${statusStyle.gradient
                .split(" ")[0]
                .replace("from-", "")}`}
            />
            <span
              className={`text-xs font-medium text-${statusStyle.gradient
                .split(" ")[0]
                .replace("from-", "")}`}
            >
              {statusStyle.label}
            </span>
          </div>
        </div>

        {/* Progress Badge */}
        {status === "ACTIVE" && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-700/50">
            <span className="text-xs font-medium text-white">{progress}%</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors duration-300">
          {enrollment.courseTitle || "Course Title"}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {enrollment.courseDescription ||
            "Start your forex trading journey with this comprehensive course"}
        </p>

        {/* Progress Bar (for active courses) */}
        {status === "ACTIVE" && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-400">Progress</span>
              <span className="text-purple-400 font-medium">{progress}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Course Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>{enrollment.totalLessons || 0} lessons</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{enrollment.totalDuration || "0h"}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/courses/${enrollment.courseId}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-800/80 text-white font-medium rounded-xl border border-gray-700 hover:bg-gray-700 hover:border-gray-600 transition-all duration-300 text-sm"
          >
            <BookOpen className="w-4 h-4" />
            View
          </Link>
          <Link
            to={`/learn/${enrollment.courseId}/lesson/${
              enrollment.lastLessonId || 1
            }`}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-black font-semibold rounded-xl transition-all duration-300 text-sm ${
              status === "COMPLETED"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400"
                : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400"
            }`}
          >
            {status === "COMPLETED" ? (
              <>
                <BookOpen className="w-4 h-4" />
                Review
              </>
            ) : (
              <>
                <PlayIcon className="w-4 h-4" />
                Continue
              </>
            )}
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div
        className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${statusStyle.bgGradient} rounded-full blur-2xl opacity-50`}
      />
    </div>
  );
};

// Play Icon Component
function PlayIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export default MyCoursesPage;
