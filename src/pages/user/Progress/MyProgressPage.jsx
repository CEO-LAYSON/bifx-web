import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { enrollmentAPI } from "../../../services/api/enrollmentAPI";
import { fetchCourseProgressSummary } from "../../../store/slices/progressSlice";
import CourseProgress from "../../../components/courses/CourseProgress";
import Loader from "../../../components/ui/Loader";
import {
  BookOpen,
  TrendingUp,
  Award,
  AlertCircle,
  Target,
  Zap,
  Trophy,
  ChevronRight,
} from "lucide-react";

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
    enrollments.forEach((enrollment) => {
      if (enrollment.courseId && !courseProgress[enrollment.courseId]) {
        dispatch(fetchCourseProgressSummary(enrollment.courseId));
      }
    });
  }, [dispatch, enrollments, courseProgress]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-primary-gold/30 rounded-full animate-spin border-t-primary-gold mx-auto mb-4"></div>
            <Zap className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-primary-gold animate-pulse" />
          </div>
          <p className="text-white/60 animate-pulse">
            Loading your progress...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass rounded-2xl p-8 border border-red-500/30 max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-10 w-10 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Oops!</h2>
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
    <div className="space-y-8">
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/20 via-transparent to-primary-gold/10 animate-gradient"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-gold/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-primary-purple/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative glass rounded-2xl p-8 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 animate-fade-up">
                <span className="text-gradient bg-gradient-to-r from-primary-gold via-white to-primary-purple">
                  Learning Progress
                </span>
              </h1>
              <p
                className="text-gray-300 text-lg animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                Track your journey to forex mastery
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <Target
                  className="w-24 h-24 text-primary-gold/20 animate-spin"
                  style={{ animationDuration: "20s" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-gold/20 to-primary-purple/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-primary-gold" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Courses Card */}
        <div className="group relative glass rounded-2xl p-6 border border-white/10 hover-lift card-glow">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-7 w-7 text-blue-400" />
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full flex items-center justify-center">
                <span className="text-blue-400 text-sm font-bold">
                  +{totalCourses}
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Courses</p>
            <p className="text-4xl font-bold text-white">{totalCourses}</p>
            <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full animate-shimmer"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Completed Courses Card */}
        <div className="group relative glass rounded-2xl p-6 border border-white/10 hover-lift card-glow">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Trophy className="h-7 w-7 text-green-400" />
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/10 to-transparent rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Completed</p>
            <p className="text-4xl font-bold text-white">{completedCourses}</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full animate-shimmer"
                  style={{
                    width: `${
                      totalCourses > 0
                        ? (completedCourses / totalCourses) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
              <span className="text-green-400 text-sm font-medium">
                {Math.round(
                  totalCourses > 0
                    ? (completedCourses / totalCourses) * 100
                    : 0,
                )}
                %
              </span>
            </div>
          </div>
        </div>

        {/* Overall Progress Card */}
        <div className="group relative glass rounded-2xl p-6 border border-white/10 hover-lift card-glow">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-gold/20 to-primary-purple/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-7 w-7 text-primary-gold" />
              </div>
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-gray-700"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray="125.6"
                    strokeDashoffset={
                      125.6 - (125.6 * Math.round(overallProgress)) / 100
                    }
                    className="text-primary-gold transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-primary-gold text-sm font-bold">
                    {Math.round(overallProgress)}%
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Overall Progress</p>
            <p className="text-4xl font-bold text-white">
              <span className="text-gradient bg-gradient-to-r from-primary-gold to-primary-purple">
                {Math.round(overallProgress)}%
              </span>
            </p>
            <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-gold via-white to-primary-purple rounded-full animate-shimmer"
                style={{ width: `${Math.round(overallProgress)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Progress Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-primary-gold to-primary-purple rounded-full"></div>
            Course Progress
          </h2>
          <div className="hidden md:flex items-center gap-2 text-gray-400 text-sm">
            <span className="w-2 h-2 bg-primary-gold rounded-full animate-pulse"></span>
            {enrollments.length} courses enrolled
          </div>
        </div>

        {enrollments.length === 0 ? (
          <div className="glass rounded-2xl p-12 border border-white/10 text-center">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-purple/20 to-primary-gold/20 rounded-full flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-primary-gold" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center animate-bounce">
                <Zap className="w-4 h-4 text-black" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Start Your Learning Journey!
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              You haven't enrolled in any courses yet. Discover our expert-led
              forex trading courses and begin your path to mastery.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-gold to-yellow-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-gold/25 transition-all duration-300 hover:-translate-y-1"
            >
              Browse Courses
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {enrollments.map((enrollment, index) => {
              const course = { level: "Beginner" };
              const progress = courseProgress[enrollment.courseId];

              return (
                <div
                  key={enrollment.id}
                  className="group glass rounded-2xl p-6 border border-white/10 hover-lift card-glow"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-primary-purple/20 text-primary-purple text-xs font-medium rounded-lg border border-primary-purple/30">
                          {enrollment.courseTitle || "Course Title"}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-primary-gold transition-colors">
                        {enrollment.courseTitle || "Course Title"}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Enrolled on{" "}
                        {new Date(
                          enrollment.enrolledAt || Date.now(),
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <Link
                      to={`/progress/${enrollment.courseId}`}
                      className="flex items-center gap-1 text-primary-gold hover:text-white transition-colors text-sm font-medium"
                    >
                      Details
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {progress ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white font-medium">
                          {progress.progressPercentage}%
                        </span>
                      </div>
                      <div className="h-3 bg-gray-700/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary-gold via-yellow-400 to-primary-purple rounded-full transition-all duration-1000 ease-out relative"
                          style={{ width: `${progress.progressPercentage}%` }}
                        >
                          <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          {progress.completedLessons || 0} /{" "}
                          {progress.totalLessons || 0} lessons
                        </span>
                        <span>{progress.timeSpent || "0h"} spent</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">
                          Loading progress...
                        </span>
                      </div>
                      <div className="h-3 bg-gray-700/50 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-primary-purple/50 rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-gray-500 text-xs">
                        Calculating your progress...
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
