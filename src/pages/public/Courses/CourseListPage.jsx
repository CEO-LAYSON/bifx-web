import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../store/slices/courseSlice";
import CourseGrid from "../../../components/courses/CourseGrid";
import CourseFilter from "../../../components/courses/CourseFilter";
import LandingHeader from "../../../components/layout/LandingHeader";
import { BookOpen, Users, Award, TrendingUp } from "lucide-react";

const CourseListPage = () => {
  const dispatch = useDispatch();
  const { courses, isLoading } = useSelector((state) => state.courses);

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    let result = courses;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query),
      );
    }

    // Apply level filter
    if (filters.level) {
      result = result.filter((course) => course.level === filters.level);
    }

    // Apply price filter
    if (filters.price === "free") {
      result = result.filter((course) => course.isFree);
    } else if (filters.price === "paid") {
      result = result.filter((course) => !course.isFree);
    }

    // Apply duration filter (simplified)
    if (filters.duration) {
      result = result.filter((course) => {
        const duration = course.totalDuration || 0;
        switch (filters.duration) {
          case "short":
            return duration <= 120; // 2 hours
          case "medium":
            return duration > 120 && duration <= 600; // 2-10 hours
          case "long":
            return duration > 600; // 10+ hours
          default:
            return true;
        }
      });
    }

    setFilteredCourses(result);
  }, [courses, searchQuery, filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <LandingHeader />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-purple/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-gold/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-primary-purple/20 border border-primary-purple/30 rounded-full mb-6">
              <BookOpen size={16} className="text-primary-gold mr-2" />
              <span className="text-primary-gold text-sm font-medium">
                Forex Trading Education
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Explore Our Courses
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Master forex trading with our comprehensive curriculum designed
              for all skill levels. Learn from industry experts and start your
              trading journey today.
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center space-x-3 bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-2xl border border-gray-700/50">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-purple to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen size={24} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {courses.length}+
                </p>
                <p className="text-gray-400 text-sm">Courses</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-2xl border border-gray-700/50">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-gold to-yellow-500 rounded-xl flex items-center justify-center">
                <Users size={24} className="text-black" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">10K+</p>
                <p className="text-gray-400 text-sm">Students</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-2xl border border-gray-700/50">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Award size={24} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">50+</p>
                <p className="text-gray-400 text-sm">Instructors</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-2xl border border-gray-700/50">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <TrendingUp size={24} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">95%</p>
                <p className="text-gray-400 text-sm">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Filters */}
        <div className="mb-8">
          <CourseFilter
            onSearchChange={setSearchQuery}
            onFilterChange={setFilters}
            searchQuery={searchQuery}
            filters={filters}
          />
        </div>

        {/* Results Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary-gold rounded-full animate-pulse"></div>
            <p className="text-gray-400">
              Showing{" "}
              <span className="text-white font-semibold">
                {filteredCourses.length}
              </span>{" "}
              of{" "}
              <span className="text-white font-semibold">{courses.length}</span>{" "}
              courses
            </p>
          </div>

          {searchQuery && (
            <div className="flex items-center space-x-2 bg-primary-purple/10 px-4 py-2 rounded-full border border-primary-purple/20">
              <span className="text-gray-400">Search results for:</span>
              <span className="text-primary-gold font-medium">
                "{searchQuery}"
              </span>
              <button
                onClick={() => setSearchQuery("")}
                className="ml-2 text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Courses Grid */}
        <CourseGrid
          courses={filteredCourses}
          loading={isLoading}
          emptyMessage="No courses match your search criteria"
        />
      </div>
    </div>
  );
};

export default CourseListPage;
