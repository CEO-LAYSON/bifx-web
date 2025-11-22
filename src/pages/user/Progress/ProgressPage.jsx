import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseProgressSummary } from "../../../store/slices/progressSlice";
import { fetchCourseWithLessons } from "../../../store/slices/courseSlice";
import ProgressSummary from "../../../components/courses/ProgressSummary";
import Loader from "../../../components/ui/Loader";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Button from "../../../components/ui/Button";

const ProgressPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { courseProgress, isLoading: progressLoading } = useSelector(
    (state) => state.progress
  );
  const { currentCourse, isLoading: courseLoading } = useSelector(
    (state) => state.courses
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
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!currentCourse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Course Not Found
          </h2>
          <p className="text-gray-400 mb-4">
            The course you're looking for doesn't exist or you don't have
            access.
          </p>
          <Button onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </button>
        </div>
        <div className="text-sm text-gray-400">Course Progress</div>
      </div>

      {/* Course Title */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h1 className="text-2xl font-bold text-white mb-2">
          {currentCourse.title}
        </h1>
        <p className="text-gray-400">{currentCourse.description}</p>
      </div>

      {/* Progress Summary */}
      {progress ? (
        <ProgressSummary progress={progress} course={currentCourse} />
      ) : (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
          <AlertCircle className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            No Progress Data
          </h3>
          <p className="text-gray-400">
            You haven't started this course yet. Begin learning to see your
            progress here.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProgressPage;
