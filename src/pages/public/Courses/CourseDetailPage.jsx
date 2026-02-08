import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourseWithLessons,
  clearCurrentCourse,
} from "../../../store/slices/courseSlice";
import {
  Clock,
  BookOpen,
  Star,
  Users,
  Play,
  ArrowLeft,
  Shield,
} from "lucide-react";
import CourseProgress from "../../../components/courses/CourseProgress";
import LessonList from "../../../components/courses/LessonList";
import CourseEnrollmentModal from "../../../components/courses/CourseEnrollmentModal";
import Button from "../../../components/ui/Button";
import Loader from "../../../components/ui/Loader";
import LandingHeader from "../../../components/layout/LandingHeader";
import { ROUTES } from "../../../utils/constants/routes";

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentCourse, isLoading } = useSelector((state) => state.courses);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);
  const [userProgress, setUserProgress] = useState({});

  useEffect(() => {
    dispatch(fetchCourseWithLessons(id));

    return () => {
      dispatch(clearCurrentCourse());
    };
  }, [dispatch, id]);

  // Mock user progress (replace with actual API call)
  useEffect(() => {
    if (currentCourse?.lessons) {
      const progress = {};
      currentCourse.lessons.forEach((lesson, index) => {
        // Simulate progress - first 2 lessons completed
        progress[lesson.id] = index < 2 ? 100 : 0;
      });
      setUserProgress(progress);
    }
  }, [currentCourse]);

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
          <Shield className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Course Not Found
          </h2>
          <p className="text-gray-400 mb-4">
            The course you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/courses")}>Back to Courses</Button>
        </div>
      </div>
    );
  }

  const {
    title,
    description,
    thumbnailUrl,
    level,
    lessonCount,
    totalDuration,
    isFree,
    isPremium,
    priceCents,
    lessons = [],
  } = currentCourse;

  const isEnrolled = false; // Replace with actual enrollment check

  const formatDuration = (minutes) => {
    if (!minutes) return "0h 0m";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleEnrollmentSuccess = () => {
    // Refresh page or update enrollment status
    window.location.reload();
  };

  const handleEnrollmentClick = () => {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      navigate(ROUTES.LOGIN, {
        state: { from: location.pathname },
      });
      return;
    }
    setIsEnrollmentModalOpen(true);
  };

  const previewLesson =
    lessons.find((lesson) => lesson.isPreview) || lessons[0];

  return (
    <div className="min-h-screen bg-black">
      <LandingHeader />
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-900 to-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/courses")}
            className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Courses
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    level === "BEGINNER"
                      ? "bg-green-500 text-white"
                      : level === "INTERMEDIATE"
                      ? "bg-yellow-500 text-black"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {level}
                </div>
                {isFree && (
                  <div className="bg-primary-gold text-black px-3 py-1 rounded-full text-sm font-bold">
                    FREE
                  </div>
                )}
                {isPremium && (
                  <div className="bg-primary-purple text-white px-3 py-1 rounded-full text-sm font-bold">
                    PREMIUM
                  </div>
                )}
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                {title}
              </h1>

              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                {description}
              </p>

              {/* Course Stats */}
              <div className="flex flex-wrap gap-6 text-gray-400 mb-6">
                <div className="flex items-center">
                  <BookOpen size={20} className="mr-2" />
                  <span>{lessonCount} lessons</span>
                </div>
                <div className="flex items-center">
                  <Clock size={20} className="mr-2" />
                  <span>{formatDuration(totalDuration)}</span>
                </div>
                <div className="flex items-center">
                  <Users size={20} className="mr-2" />
                  <span>500+ students</span>
                </div>
                <div className="flex items-center">
                  <Star size={20} className="mr-2 text-yellow-400" />
                  <span>4.9/5 rating</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {isEnrolled ? (
                  <>
                    {previewLesson && (
                      <Link
                        to={`/learn/${id}/lesson/${previewLesson.id}`}
                        className="flex items-center justify-center px-8 py-4 bg-primary-purple text-white rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors"
                      >
                        <Play size={20} className="mr-2" />
                        Continue Learning
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    {previewLesson && (
                      <Link
                        to={`/courses/${id}/preview/${previewLesson.id}`}
                        className="flex items-center justify-center px-8 py-4 border border-primary-purple text-primary-purple rounded-lg font-semibold text-lg hover:bg-purple-900 transition-colors"
                      >
                        <Play size={20} className="mr-2" />
                        Preview Course
                      </Link>
                    )}

                    {!isFree && (
                      <Button
                        onClick={handleEnrollmentClick}
                        variant="primary"
                        size="lg"
                      >
                        Enroll for ${priceCents / 100}
                      </Button>
                    )}

                    {isFree && (
                      <Button
                        onClick={handleEnrollmentClick}
                        variant="gold"
                        size="lg"
                      >
                        Enroll for Free
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Course Thumbnail */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
                <img
                  src={thumbnailUrl || "/placeholder-course.jpg"}
                  alt={title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-gold mb-2">
                      {isFree ? "FREE" : `$${priceCents / 100}`}
                    </div>
                    <p className="text-gray-400 text-sm">
                      {isFree ? "Lifetime access" : "One-time payment"}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center text-sm text-gray-300">
                      <div className="w-2 h-2 bg-primary-purple rounded-full mr-3" />
                      {lessonCount} video lessons
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <div className="w-2 h-2 bg-primary-purple rounded-full mr-3" />
                      Downloadable resources
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <div className="w-2 h-2 bg-primary-purple rounded-full mr-3" />
                      Certificate of completion
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <div className="w-2 h-2 bg-primary-purple rounded-full mr-3" />
                      Lifetime access
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Lessons List */}
          <div className="lg:col-span-3">
            <LessonList
              lessons={lessons}
              courseId={id}
              userProgress={userProgress}
              isEnrolled={isEnrolled}
            />
          </div>

          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            {isEnrolled ? (
              <CourseProgress
                progress={{
                  completedLessons: Object.values(userProgress).filter(
                    (p) => p === 100,
                  ).length,
                  totalLessons: lessons.length,
                  progressPercentage:
                    (Object.values(userProgress).filter((p) => p === 100)
                      .length /
                      lessons.length) *
                    100,
                  totalDuration: totalDuration,
                  timeSpent: totalDuration * 0.3, // Mock data
                }}
                course={currentCourse}
              />
            ) : (
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">
                  What You'll Learn
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary-purple rounded-full mr-3" />
                    Forex market fundamentals
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary-purple rounded-full mr-3" />
                    Technical analysis techniques
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary-purple rounded-full mr-3" />
                    Risk management strategies
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary-purple rounded-full mr-3" />
                    Live trading practice
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enrollment Modal */}
      <CourseEnrollmentModal
        course={currentCourse}
        isOpen={isEnrollmentModalOpen}
        onClose={() => setIsEnrollmentModalOpen(false)}
        onEnrollmentSuccess={handleEnrollmentSuccess}
      />
    </div>
  );
};

export default CourseDetailPage;
