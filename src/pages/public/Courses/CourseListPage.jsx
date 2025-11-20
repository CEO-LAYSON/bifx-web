import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../store/slices/courseSlice";
import CourseGrid from "../../../components/courses/CourseGrid";
import CourseFilter from "../../../components/courses/CourseFilter";

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
          course.description.toLowerCase().includes(query)
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
    <div className="max-w-7xl mx-auto py-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">All Courses</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Explore our comprehensive forex trading curriculum designed for all
          skill levels
        </p>
      </div>

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
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-400">
          Showing {filteredCourses.length} of {courses.length} courses
        </p>

        {searchQuery && (
          <p className="text-gray-400">
            Search results for:{" "}
            <span className="text-white">"{searchQuery}"</span>
          </p>
        )}
      </div>

      {/* Courses Grid */}
      <CourseGrid
        courses={filteredCourses}
        loading={isLoading}
        emptyMessage="No courses match your search criteria"
      />
    </div>
  );
};

export default CourseListPage;
