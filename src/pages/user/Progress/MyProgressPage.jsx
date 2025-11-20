import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { enrollmentAPI } from "../../../services/api/enrollmentAPI";
import { fetchCourseProgress } from "../../../store/slices/progressSlice";
import CourseProgress from "../../../components/courses/CourseProgress";
import Loader from "../../../components/ui/Loader";
import { BookOpen, TrendingUp, Award, AlertCircle } from "lucide-react";

const MyProgressPage = () => {
  const dispatch = useDispatch();
  const { courseProgress } = useSelector((state) => state.progress);
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await enrollmentAPI.getUserEnrollments();
        setEnrollments(response.data.data || []);
      } catch (err) {
        setError("Failed to load your enrollments");
        console.error("Error fetching enrollments:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  useEffect(() => {
    // Fetch progress for each enrolled course
    enrollments.forEach((enrollment) => {
      if (enrollment.courseId && !courseProgress[enrollment.courseId]) {
        dispatch(fetchCourseProgress(enrollment.courseId));
      }
    });
  }, [dispatch, enrollments, courseProgress]);

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

  const totalCourses = enrollments.length;
  const completedCourses = enrollments.filter((enrollment) => {
    const progress = courseProgress[enrollment.courseId];
    return progress && progress.progressPercentage >= 100;
  }).length;

  const overallProgress =
    totalCourses > 0
      ? enrollments.reduce((acc, enrollment) => {
          const progress = courseProgress[enrollment.courseId];
          return acc + (progress ? progress.progressPercentage : 0);
        }, 0) / totalCourses
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-gray-900 rounded-xl p-6 border border-purple-700">
        <h1 className="text-3xl font-bold text-white mb-2">
          My Learning Progress
        </h1>
        <p className="text-gray-300">
          Track your progress across all enrolled courses
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Courses</p>
              <p className="text-2xl font-bold text-white mt-1">
                {totalCourses}
              </p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-white mt-1">
                {completedCourses}
              </p>
            </div>
            <Award className="h-8 w-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">
                Overall Progress
              </p>
              <p className="text-2xl font-bold text-white mt-1">
                {Math.round(overallProgress)}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Course Progress List */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white">Course Progress</h2>

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {enrollments.map((enrollment) => {
              const course = enrollment.course || {};
              const progress = courseProgress[enrollment.courseId];

              return (
                <div
                  key={enrollment.id}
                  className="bg-gray-800 rounded-xl p-6 border border-gray-700"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {course.title || "Course Title"}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {course.description || "Course description"}
                      </p>
                    </div>
                    <Link
                      to={`/progress/${enrollment.courseId}`}
                      className="text-primary-purple hover:text-purple-400 text-sm font-medium"
                    >
                      View Details →
                    </Link>
                  </div>

                  {progress ? (
                    <CourseProgress progress={progress} course={course} />
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-400 text-sm">
                        Loading progress...
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProgressPage;
