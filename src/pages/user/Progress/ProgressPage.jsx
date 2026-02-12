import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseProgressSummary } from "../../../store/slices/progressSlice";
import { fetchCourseWithLessons } from "../../../store/slices/courseSlice";
import ProgressSummary from "../../../components/courses/ProgressSummary";
import Loader from "../../../components/ui/Loader";
import { ArrowLeft, AlertCircle, GraduationCap, Sparkles } from "lucide-react";
import Button from "../../../components/ui/Button";

const ProgressPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { courseProgress, isLoading: progressLoading } = useSelector(
    (state) => state.progress,
  );
  const { currentCourse, isLoading: courseLoading } = useSelector(
    (state) => state.courses,
  );

  const progress = courseProgress[courseId];
  const isLoading = progressLoading || courseLoading;

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseProgressSummary(courseId));
      dispatch(fetchCourseWithLessons(courseId));
    }
  }, [dispatch, courseId]);

  if (isLoading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-950/20 to-gray-900" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-purple to-primary-gold rounded-full blur-lg animate-pulse" />
            <GraduationCap className="h-16 w-16 text-white relative z-10 animate-bounce" />
          </div>
          <p className="mt-6 text-white/70 text-lg animate-fade-up">
            Loading your progress...
          </p>
        </div>
      </div>
    );
  }

  if (!currentCourse) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-950/20 to-gray-900" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-md mx-auto px-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-full mb-6">
                <AlertCircle className="h-10 w-10 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Course Not Found
              </h2>
              <p className="text-gray-400 mb-8">
                The course you're looking for doesn't exist or you don't have
                access.
              </p>
              <Button
                onClick={() => navigate("/dashboard")}
                variant="primary"
                className="w-full"
              >
                <div className="flex items-center justify-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-950/20 to-gray-900" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-purple/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-gold/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-purple/5 to-primary-gold/5 rounded-full blur-3xl animate-spin"
          style={{ animationDuration: "60s" }}
        />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="group flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-gray-400 hover:text-white hover:border-primary-purple/50 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </button>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-purple/10 backdrop-blur-sm border border-primary-purple/20 rounded-full">
            <Sparkles className="h-4 w-4 text-primary-gold animate-pulse" />
            <span className="text-sm text-white/70">Course Progress</span>
          </div>
        </div>

        {/* Course Title Card */}
        <div className="relative group mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-purple to-primary-gold rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
          <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-gold/10 border border-primary-gold/20 rounded-full text-primary-gold text-sm font-medium mb-4">
                  <GraduationCap className="h-4 w-4" />
                  Course
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                  {currentCourse.title}
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
                  {currentCourse.description}
                </p>
              </div>
              {currentCourse.thumbnail && (
                <div className="lg:w-48 lg:flex-shrink-0">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-purple to-primary-gold rounded-xl blur-md opacity-50" />
                    <img
                      src={currentCourse.thumbnail}
                      alt={currentCourse.title}
                      className="relative w-full h-32 lg:h-40 object-cover rounded-xl border border-gray-700/50"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        {progress ? (
          <ProgressSummary progress={progress} course={currentCourse} />
        ) : (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-purple to-primary-gold rounded-2xl blur-lg opacity-20" />
            <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 sm:p-12 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-800/50 rounded-full mb-6">
                <AlertCircle className="h-12 w-12 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                No Progress Data
              </h3>
              <p className="text-gray-400 max-w-md mx-auto mb-8">
                You haven't started this course yet. Begin learning to see your
                progress here.
              </p>
              <Button
                onClick={() => navigate(`/learn/${courseId}`)}
                variant="primary"
                className="px-8"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Start Learning
                </div>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;
