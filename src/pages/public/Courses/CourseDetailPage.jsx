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
    console.log("Enrollment button clicked, isAuthenticated:", isAuthenticated);
    if (!isAuthenticated) {
      // Redirect to login with return URL
      console.log("User not authenticated, redirecting to login...");
      navigate(ROUTES.LOGIN, {
        state: { from: location.pathname },
      });
      return;
    }
    console.log("Opening enrollment modal...");
    setIsEnrollmentModalOpen(true);
  };

  const previewLesson =
    lessons.find((lesson) => lesson.isPreview) || lessons[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-black pt-20 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary-purple/15 rounded-full blur-[100px] animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary-gold/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[150px]"></div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <LandingHeader />
      {/* Header */}
      <div className="relative overflow-hidden py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/courses")}
            className="group flex items-center text-gray-400 hover:text-white mb-8 transition-all duration-300 hover:translate-x-1"
          >
            <ArrowLeft
              size={20}
              className="mr-2 group-hover:-translate-x-1 transition-transform duration-300"
            />
            Back to Courses
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              {/* Level & Badges */}
              <div
                className="flex flex-wrap items-center gap-3 mb-6 animate-fade-up"
                style={{ "--delay": "0.05s" }}
              >
                <div
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                    level === "BEGINNER"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/20"
                      : level === "INTERMEDIATE"
                      ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-black shadow-lg shadow-yellow-500/20"
                      : "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/20"
                  }`}
                >
                  {level}
                </div>
                {isFree && (
                  <div className="bg-gradient-to-r from-primary-gold to-yellow-400 text-black px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-primary-gold/30">
                    FREE
                  </div>
                )}
                {isPremium && (
                  <div className="bg-gradient-to-r from-primary-purple to-purple-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-primary-purple/30">
                    PREMIUM
                  </div>
                )}
              </div>

              <h1
                className="text-4xl lg:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent animate-fade-up"
                style={{ "--delay": "0.12s" }}
              >
                {title}
              </h1>

              <p
                className="text-xl text-gray-300 mb-8 leading-relaxed animate-fade-up max-w-3xl"
                style={{ "--delay": "0.18s" }}
              >
                {description}
              </p>

              {/* Course Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div
                  className="flex items-center space-x-3 bg-dark-800/60 backdrop-blur-sm px-5 py-3 rounded-xl border border-dark-700/50 animate-fade-up"
                  style={{ "--delay": "0.22s" }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-purple to-purple-600 rounded-lg flex items-center justify-center">
                    <BookOpen size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold">{lessonCount}</p>
                    <p className="text-gray-400 text-xs">lessons</p>
                  </div>
                </div>
                <div
                  className="flex items-center space-x-3 bg-dark-800/60 backdrop-blur-sm px-5 py-3 rounded-xl border border-dark-700/50 animate-fade-up"
                  style={{ "--delay": "0.28s" }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-gold to-yellow-500 rounded-lg flex items-center justify-center">
                    <Clock size={20} className="text-black" />
                  </div>
                  <div>
                    <p className="text-white font-bold">
                      {formatDuration(totalDuration)}
                    </p>
                    <p className="text-gray-400 text-xs">duration</p>
                  </div>
                </div>
                <div
                  className="flex items-center space-x-3 bg-dark-800/60 backdrop-blur-sm px-5 py-3 rounded-xl border border-dark-700/50 animate-fade-up"
                  style={{ "--delay": "0.34s" }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-emerald to-green-500 rounded-lg flex items-center justify-center">
                    <Users size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold">500+</p>
                    <p className="text-gray-400 text-xs">students</p>
                  </div>
                </div>
                <div
                  className="flex items-center space-x-3 bg-dark-800/60 backdrop-blur-sm px-5 py-3 rounded-xl border border-dark-700/50 animate-fade-up"
                  style={{ "--delay": "0.40s" }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-400 rounded-lg flex items-center justify-center">
                    <Star size={20} className="text-black fill-black" />
                  </div>
                  <div>
                    <p className="text-white font-bold">4.9/5</p>
                    <p className="text-gray-400 text-xs">rating</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {isEnrolled ? (
                  <>
                    {previewLesson && (
                      <Link
                        to={`/learn/${id}/lesson/${previewLesson.id}`}
                        className="group flex items-center justify-center px-10 py-5 bg-gradient-to-r from-primary-purple to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105"
                        style={{ "--delay": "0.5s" }}
                      >
                        <Play size={22} className="mr-2" />
                        Continue Learning
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    {previewLesson && (
                      <Link
                        to={`/courses/${id}/preview/${previewLesson.id}`}
                        className="group flex items-center justify-center px-10 py-5 border-2 border-primary-purple text-primary-purple rounded-2xl font-bold text-lg hover:bg-primary-purple hover:text-white transition-all duration-300 hover:shadow-premium-glow"
                        style={{ "--delay": "0.46s" }}
                      >
                        <Play
                          size={22}
                          className="mr-2 group-hover:scale-110 transition-transform"
                        />
                        Preview Course
                      </Link>
                    )}

                    {!isFree && (
                      <button
                        onClick={() => {
                          console.log("Direct button click!");
                          const isAuth = localStorage.getItem("token") !== null;
                          console.log("Auth check:", isAuth);
                          if (!isAuth) {
                            navigate(ROUTES.LOGIN, {
                              state: { from: location.pathname },
                            });
                          } else {
                            setIsEnrollmentModalOpen(true);
                          }
                        }}
                        className="group px-10 py-5 bg-gradient-to-r from-primary-purple to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 cursor-pointer"
                      >
                        <span className="flex items-center justify-center">
                          <Shield size={22} className="mr-2" />
                          Enroll for ${priceCents / 100}
                        </span>
                      </button>
                    )}

                    {isFree && (
                      <Button
                        onClick={handleEnrollmentClick}
                        variant="gold"
                        size="lg"
                        className="hover-lift"
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
              <div className="bg-dark-800/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-dark-700/50 hover:border-primary-purple/50 transition-all duration-500 hover:shadow-premium-glow animate-float">
                <div className="relative overflow-hidden">
                  <img
                    src={thumbnailUrl || "/placeholder-course.jpg"}
                    alt={title}
                    className="w-full h-52 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary-gold to-yellow-400 bg-clip-text text-transparent mb-2 animate-pulse-glow">
                      {isFree ? "FREE" : `${priceCents / 100}`}
                    </div>
                    <p className="text-gray-400 text-sm">
                      {isFree ? "Lifetime access" : "One-time payment"}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mt-6 space-y-4">
                    <div
                      className="flex items-center text-sm text-gray-300 animate-fade-up"
                      style={{ "--delay": "0.45s" }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-purple/30 to-accent-purple/10 rounded-lg flex items-center justify-center mr-3">
                        <div className="w-2 h-2 bg-primary-purple rounded-full" />
                      </div>
                      {lessonCount} video lessons
                    </div>
                    <div
                      className="flex items-center text-sm text-gray-300 animate-fade-up"
                      style={{ "--delay": "0.48s" }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-purple/30 to-accent-purple/10 rounded-lg flex items-center justify-center mr-3">
                        <div className="w-2 h-2 bg-primary-purple rounded-full" />
                      </div>
                      Downloadable resources
                    </div>
                    <div
                      className="flex items-center text-sm text-gray-300 animate-fade-up"
                      style={{ "--delay": "0.51s" }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-purple/30 to-accent-purple/10 rounded-lg flex items-center justify-center mr-3">
                        <div className="w-2 h-2 bg-primary-purple rounded-full" />
                      </div>
                      Certificate of completion
                    </div>
                    <div
                      className="flex items-center text-sm text-gray-300 animate-fade-up"
                      style={{ "--delay": "0.54s" }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-purple/30 to-accent-purple/10 rounded-lg flex items-center justify-center mr-3">
                        <div className="w-2 h-2 bg-primary-purple rounded-full" />
                      </div>
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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Decorative Line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-700 to-transparent"></div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
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
              <div className="bg-dark-800/80 backdrop-blur-xl rounded-2xl p-8 border border-dark-700/50 hover:border-primary-purple/30 transition-all duration-500">
                <h3 className="text-2xl font-bold text-white mb-6">
                  What You'll Learn
                </h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-purple/30 to-accent-purple/10 rounded-lg flex items-center justify-center mr-4 shrink-0">
                      <div className="w-2 h-2 bg-primary-purple rounded-full" />
                    </div>
                    Forex market fundamentals
                  </li>
                  <li className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-purple/30 to-accent-purple/10 rounded-lg flex items-center justify-center mr-4 shrink-0">
                      <div className="w-2 h-2 bg-primary-purple rounded-full" />
                    </div>
                    Technical analysis techniques
                  </li>
                  <li className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-purple/30 to-accent-purple/10 rounded-lg flex items-center justify-center mr-4 shrink-0">
                      <div className="w-2 h-2 bg-primary-purple rounded-full" />
                    </div>
                    Risk management strategies
                  </li>
                  <li className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-purple/30 to-accent-purple/10 rounded-lg flex items-center justify-center mr-4 shrink-0">
                      <div className="w-2 h-2 bg-primary-purple rounded-full" />
                    </div>
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
