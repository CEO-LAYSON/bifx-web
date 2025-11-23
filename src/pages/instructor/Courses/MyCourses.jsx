import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMyCourses } from "../../../store/slices/instructorSlice";
import { Plus, Users, Star, Clock, Edit, Eye } from "lucide-react";
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
      <div className="flex justify-center items-center py-12">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">My Courses</h1>
          <p className="text-gray-400">
            Manage and track your published courses
          </p>
        </div>
        <Link to="/instructor/courses/create">
          <Button variant="primary">
            <Plus size={16} className="mr-2" />
            Create Course
          </Button>
        </Link>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-primary-purple transition-colors"
          >
            {/* Course Thumbnail */}
            <div className="relative">
              <img
                src={course.thumbnailUrl || "/placeholder-course.jpg"}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-3 right-3">
                <div
                  className={`px-2 py-1 rounded-full text-xs font-bold ${
                    course.isFree
                      ? "bg-primary-gold text-black"
                      : "bg-primary-purple text-white"
                  }`}
                >
                  {course.isFree ? "FREE" : `$${course.priceCents / 100}`}
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                {course.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {course.description}
              </p>

              {/* Course Stats */}
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Users size={14} className="mr-1" />
                    <span>{course.totalStudents || 0}</span>
                  </div>
                  <div className="flex items-center">
                    <Star size={14} className="mr-1 text-yellow-400" />
                    <span>{course.rating || "4.8"}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>{course.lessonCount || 0}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Link
                  to={`/instructor/courses/${course.id}`}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-primary-purple text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
                >
                  <Edit size={14} className="mr-1" />
                  Manage
                </Link>
                <Link
                  to={`/courses/${course.id}`}
                  className="flex items-center justify-center px-3 py-2 bg-gray-700 text-white rounded-lg text-sm font-semibold hover:bg-gray-600 transition-colors"
                >
                  <Eye size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {courses.length === 0 && (
        <div className="text-center py-12">
          <Plus className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            No courses yet
          </h3>
          <p className="text-gray-400 mb-6">
            Start by creating your first course
          </p>
          <Link to="/instructor/courses/create">
            <Button variant="primary" size="lg">
              <Plus size={16} className="mr-2" />
              Create Your First Course
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
