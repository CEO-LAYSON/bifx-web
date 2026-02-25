import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourses,
  fetchStatistics,
} from "../../../store/slices/courseSlice";
import CourseGrid from "../../../components/courses/CourseGrid";
import CourseFilter from "../../../components/courses/CourseFilter";
import LandingHeader from "../../../components/layout/LandingHeader";
import AnimatedCounter from "../../../components/ui/AnimatedCounter";
import { BookOpen, Users, Award, TrendingUp } from "lucide-react";

const CourseListPage = () => {
  const dispatch = useDispatch();
  const { courses, isLoading, statistics } = useSelector(
    (state) => state.courses,
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchStatistics());
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
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-black relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-purple/20 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary-gold/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[150px]"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <LandingHeader />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-purple/20 to-accent-purple/10 border border-primary-purple/30 rounded-full mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 bg-primary-gold rounded-full mr-3 animate-pulse"></div>
              <BookOpen size={16} className="text-primary-gold mr-2" />
              <span className="text-primary-gold text-sm font-semibold tracking-wide">
                Forex Trading Education
              </span>
              <div className="w-2 h-2 bg-primary-gold rounded-full ml-3 animate-pulse"></div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Explore Our Courses
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
              Master forex trading with our comprehensive curriculum designed
              for all skill levels. Learn from industry experts and start your
              trading journey today.
            </p>

            {/* Jump to Courses Button */}
            <button
              onClick={() =>
                document
                  .getElementById("courses-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-primary-purple via-purple-600 to-primary-purple bg-size-200 animate-gradient text-white font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-premium-glow hover:scale-105"
            >
              <span className="relative z-10 flex items-center">
                <BookOpen size={22} className="mr-3" />
                Browse Courses
                <svg
                  className="w-5 h-5 ml-3 group-hover:translate-y-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-gold to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <div className="group flex items-center space-x-4 bg-dark-800/60 backdrop-blur-xl px-8 py-5 rounded-2xl border border-dark-700/50 hover:border-primary-purple/50 hover:shadow-premium-glow transition-all duration-500">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-purple to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BookOpen size={26} className="text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">
                  <AnimatedCounter
                    value={statistics.totalCourses || 0}
                    suffix="+"
                    duration={1500}
                  />
                </p>
                <p className="text-gray-400 text-sm font-medium">Courses</p>
              </div>
            </div>

            <div className="group flex items-center space-x-4 bg-dark-800/60 backdrop-blur-xl px-8 py-5 rounded-2xl border border-dark-700/50 hover:border-primary-gold/50 hover:shadow-[0_0_30px_rgba(255,215,0,0.15)] transition-all duration-500">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-gold to-yellow-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users size={26} className="text-black" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">
                  <AnimatedCounter
                    value={statistics.totalStudents || 0}
                    suffix="+"
                    duration={2000}
                  />
                </p>
                <p className="text-gray-400 text-sm font-medium">Students</p>
              </div>
            </div>

            <div className="group flex items-center space-x-4 bg-dark-800/60 backdrop-blur-xl px-8 py-5 rounded-2xl border border-dark-700/50 hover:border-accent-emerald/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-emerald to-green-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Award size={26} className="text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">
                  <AnimatedCounter
                    value={statistics.totalInstructors || 0}
                    suffix="+"
                    duration={1500}
                  />
                </p>
                <p className="text-gray-400 text-sm font-medium">Instructors</p>
              </div>
            </div>

            <div className="group flex items-center space-x-4 bg-dark-800/60 backdrop-blur-xl px-8 py-5 rounded-2xl border border-dark-700/50 hover:border-accent-cyan/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-cyan to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp size={26} className="text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">
                  <AnimatedCounter
                    value={statistics.successRate || 0}
                    suffix="%"
                    duration={1500}
                  />
                </p>
                <p className="text-gray-400 text-sm font-medium">
                  Success Rate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Content */}
      <div
        id="courses-section"
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"
      >
        {/* Decorative Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary-purple to-transparent rounded-full"></div>

        {/* Filters */}
        <div className="sticky top-4 z-50 mb-10">
          <CourseFilter
            onSearchChange={setSearchQuery}
            onFilterChange={setFilters}
            searchQuery={searchQuery}
            filters={filters}
          />
        </div>

        {/* Results Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-3 h-3 bg-primary-gold rounded-full animate-ping"></div>
              <div className="absolute top-0 left-0 w-3 h-3 bg-primary-gold rounded-full"></div>
            </div>
            <p className="text-gray-400">
              Showing{" "}
              <span className="text-white font-bold">
                {filteredCourses.length}
              </span>{" "}
              of <span className="text-white font-bold">{courses.length}</span>{" "}
              courses
            </p>
          </div>

          {searchQuery && (
            <div className="flex items-center space-x-3 bg-gradient-to-r from-primary-purple/20 to-accent-purple/10 px-5 py-2.5 rounded-full border border-primary-purple/30 backdrop-blur-sm">
              <span className="text-gray-400">Search results for:</span>
              <span className="text-primary-gold font-semibold">
                "{searchQuery}"
              </span>
              <button
                onClick={() => setSearchQuery("")}
                className="ml-1 text-gray-400 hover:text-white transition-colors bg-dark-800/50 hover:bg-dark-700/50 rounded-full w-6 h-6 flex items-center justify-center"
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
