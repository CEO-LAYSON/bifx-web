import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { enrollmentAPI } from "../../../services/api/enrollmentAPI";
import CourseCard from "../../../components/courses/CourseCard";
import Loader from "../../../components/ui/Loader";
import { BookOpen, AlertCircle } from "lucide-react";

const MyCoursesPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-gray-900 rounded-xl p-6 border border-purple-700">
        <h1 className="text-3xl font-bold text-white mb-2">My Courses</h1>
        <p className="text-gray-300">
          Access all the courses you've enrolled in
        </p>
      </div>

      {/* Courses Grid */}
      {enrollments.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
          <BookOpen className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            No Enrolled Courses
          </h3>
          <p className="text-gray-400 mb-4">
            You haven't enrolled in any courses yet. Start your learning
            journey!
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center px-4 py-2 bg-primary-purple text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((enrollment) => (
            <div
              key={enrollment.id}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {enrollment.courseTitle || "Course Title"}
                </h3>
                <p className="text-gray-400 text-sm">
                  Status: {enrollment.status || "Active"}
                </p>
              </div>
              <div className="flex space-x-2">
                <Link
                  to={`/courses/${enrollment.courseId}`}
                  className="flex-1 bg-primary-purple text-white text-center py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  View Course
                </Link>
                <Link
                  to={`/learn/${enrollment.courseId}/lesson/1`}
                  className="flex-1 bg-primary-gold text-black text-center py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                >
                  Start Learning
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;
