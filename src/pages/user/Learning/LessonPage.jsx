import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Download,
  MessageCircle,
  CheckCircle,
  Clock,
  Award,
  Play,
  Sparkles,
  Zap,
  Target,
  GraduationCap,
  AlertCircle,
} from "lucide-react";
import { lessonAPI } from "../../../services/api/lessonAPI";
import { streamAPI } from "../../../services/api/streamAPI";
import {
  updateLessonProgress,
  fetchLessonProgress,
} from "../../../store/slices/progressSlice";
import VideoPlayer from "../../../components/ui/VideoPlayer";
import Button from "../../../components/ui/Button";
import Loader from "../../../components/ui/Loader";
import Alert from "../../../components/ui/Alert";

const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [streamingUrl, setStreamingUrl] = useState("");
  const [nextLesson, setNextLesson] = useState(null);
  const [previousLesson, setPreviousLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    loadLessonData();
  }, [lessonId, courseId]);

  const loadLessonData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch lesson details
      const lessonResponse = await lessonAPI.getLessonById(lessonId);
      const lessonData = lessonResponse.data.data;
      setLesson(lessonData);
      setCourse({ id: courseId, title: lessonData.courseTitle });

      // Fetch streaming URL
      const streamResponse = await streamAPI.getStreamingUrl(lessonId);
      setStreamingUrl(streamResponse.data.data);

      // Fetch navigation lessons
      if (lessonData.orderIndex !== undefined) {
        try {
          const [nextResponse, previousResponse] = await Promise.all([
            lessonAPI.getNextLesson(courseId, lessonData.orderIndex),
            lessonAPI.getPreviousLesson(courseId, lessonData.orderIndex),
          ]);

          setNextLesson(nextResponse.data.data);
          setPreviousLesson(previousResponse.data.data);
        } catch (navError) {
          console.log("Navigation lessons not available");
        }
      }

      // Fetch progress
      dispatch(fetchLessonProgress(lessonId))
        .unwrap()
        .then((progressData) => {
          setProgress(progressData.progressPercentage || 0);
          setIsCompleted(progressData.progressPercentage === 100);
        })
        .catch(() => {
          // Progress might not exist yet
          setProgress(0);
          setIsCompleted(false);
        });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load lesson");
      console.error("Error loading lesson:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeUpdate = useCallback(
    (currentTime) => {
      // Update progress every 10 seconds or when significant progress is made
      if (lesson && lesson.durationSeconds) {
        const newProgress = (currentTime / lesson.durationSeconds) * 100;

        // Only update if progress increased by at least 5%
        if (newProgress - progress >= 5) {
          setProgress(newProgress);

          // Auto-save progress to backend
          dispatch(
            updateLessonProgress({
              lessonId: lesson.id,
              progressPercentage: Math.round(newProgress),
              videoPositionSeconds: Math.round(currentTime),
              markCompleted: newProgress >= 90, // Mark as completed when near the end
            }),
          );
        }
      }
    },
    [lesson, progress, dispatch],
  );

  const handleVideoEnd = useCallback(() => {
    // Mark as completed when video ends
    if (lesson && !isCompleted) {
      setProgress(100);
      setIsCompleted(true);

      dispatch(
        updateLessonProgress({
          lessonId: lesson.id,
          progressPercentage: 100,
          videoPositionSeconds: lesson.durationSeconds,
          markCompleted: true,
        }),
      );
    }
  }, [lesson, isCompleted, dispatch]);

  const markAsCompleted = () => {
    if (lesson && !isCompleted) {
      setProgress(100);
      setIsCompleted(true);

      dispatch(
        updateLessonProgress({
          lessonId: lesson.id,
          progressPercentage: 100,
          videoPositionSeconds: lesson.durationSeconds,
          markCompleted: true,
        }),
      );
    }
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      navigate(`/learn/${courseId}/lesson/${nextLesson.id}`);
    }
  };

  const handlePreviousLesson = () => {
    if (previousLesson) {
      navigate(`/learn/${courseId}/lesson/${previousLesson.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-purple to-primary-gold rounded-full blur-xl opacity-20 animate-pulse" />
          <Loader size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-gold-900/10" />
        <div className="relative text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center border border-red-500/30">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <Alert
            type="error"
            message={error}
            className="mb-6 backdrop-blur-xl"
          />
          <Button
            onClick={() => navigate(`/courses/${courseId}`)}
            variant="outline"
            className="border-gray-600 hover:border-primary-purple"
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            Back to Course
          </Button>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-gold-900/10" />
        <div className="relative text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-700/50 to-gray-800/50 flex items-center justify-center border border-gray-600/50">
            <BookOpen className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Lesson Not Found
          </h2>
          <Button
            onClick={() => navigate("/courses")}
            variant="primary"
            className="bg-gradient-to-r from-primary-purple to-purple-600"
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-gold-900/10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M54.627%200l.83.828-1.415%201.415L51.8%200h2.827zM5.373%200l-.83.828L5.96%202.243%208.2%200H5.374zM48.97%200l3.657%203.657-1.414%201.414L46.143%200h2.828zM11.03%200L7.372%203.657%208.787%205.07%2013.857%200H11.03zm32.284%200L49.8%206.485%2048.384%207.9l-7.9-7.9h2.83zM16.686%200L10.2%206.485%2011.616%207.9l7.9-7.9h-2.83zM22.344%200L13.858%208.485%2015.272%209.9l9.9-9.9h-2.83zM32%200l-6.485%206.485L27.515%209.9l6.485-6.485h-2zM42.4%200l-9.9%209.9L35.515%2012.3l6.485-6.485h2.83zM48.8%200l-6.485%206.485L45.515%209.9l6.485-6.485h-2.83zM22.4%2064l3.657-3.657L23.643%2058l-6.485%206.485h2.828zm19.2%200l9.9-9.9L38.286%2058l-6.485%206.485h2.83zm6.4%200l-6.485-6.485L45.143%2058l6.485%206.485h-2.83zm-38.4%200l6.485-6.485L13.143%2058l-6.485%206.485h2.83zm12.8%200l6.485-6.485L28.343%2058l-6.485%206.485h2.83z%22%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-purple/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-gold/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Header */}
      <div className="relative bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Course Info */}
            <div className="flex items-center space-x-4">
              <Link
                to={`/courses/${courseId}`}
                className="group flex items-center text-gray-400 hover:text-white transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-primary-purple/50 transition-all duration-300">
                  <ChevronLeft
                    size={20}
                    className="group-hover:-translate-x-0.5 transition-transform"
                  />
                </div>
                <span className="ml-2 hidden sm:block">Back to Course</span>
              </Link>

              <div className="hidden md:block pl-4 border-l border-white/10">
                <h1 className="text-white font-semibold truncate max-w-xs">
                  {course?.title}
                </h1>
                <p className="text-gray-400 text-sm truncate max-w-xs flex items-center">
                  <Play size={12} className="mr-1.5 text-primary-purple" />
                  {lesson.title}
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                <Clock size={16} className="text-primary-gold animate-pulse" />
                <span className="text-gray-300">
                  {Math.floor(lesson.durationSeconds / 60)}:
                  {(lesson.durationSeconds % 60).toString().padStart(2, "0")}
                </span>
              </div>

              {isCompleted ? (
                <div className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                  <div className="relative mr-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                    <div className="w-2 h-2 bg-green-400 rounded-full absolute inset-0" />
                  </div>
                  <span className="text-green-400 font-medium">Completed</span>
                </div>
              ) : (
                <div className="flex items-center px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                  <Target size={16} className="text-primary-purple mr-2" />
                  <span className="text-gray-300">{Math.round(progress)}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Video Player */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video Player Container */}
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-purple via-primary-gold to-primary-purple rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-purple/10 to-primary-gold/10 rounded-2xl" />

              {/* Video Player */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <VideoPlayer
                  src={streamingUrl}
                  poster={lesson.thumbnailUrl}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleVideoEnd}
                  onProgress={(progress) => setProgress(progress)}
                  autoPlay={true}
                />
              </div>
            </div>

            {/* Lesson Info Card */}
            <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-purple/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-gold/5 rounded-full blur-3xl" />

              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-primary-purple/20 to-purple-500/20 text-purple-300 border border-purple-500/30">
                        <Sparkles size={12} className="inline mr-1" />
                        Lesson {lesson.orderIndex}
                      </span>
                      {isCompleted && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30">
                          <CheckCircle size={12} className="inline mr-1" />
                          Completed
                        </span>
                      )}
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {lesson.title}
                    </h1>

                    {lesson.description && (
                      <p className="text-gray-400 leading-relaxed max-w-3xl">
                        {lesson.description}
                      </p>
                    )}
                  </div>

                  {/* Completion Button */}
                  {!isCompleted && (
                    <Button
                      onClick={markAsCompleted}
                      variant="gold"
                      className="shrink-0 shadow-lg shadow-primary-gold/20"
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Mark Complete
                    </Button>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-400 flex items-center">
                      <Zap size={14} className="mr-1.5 text-primary-gold" />
                      Your Progress
                    </span>
                    <span className="text-white font-bold bg-gradient-to-r from-primary-purple to-primary-gold bg-clip-text text-transparent">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-purple/20 to-primary-gold/20" />
                    <div
                      className="absolute h-full bg-gradient-to-r from-primary-purple via-purple-400 to-primary-gold rounded-full transition-all duration-700 shadow-lg shadow-purple-500/30"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Lesson Content */}
                {lesson.content && (
                  <div className="prose prose-invert max-w-none">
                    <div
                      className="text-gray-300 leading-relaxed p-6 rounded-xl bg-white/5 border border-white/10"
                      dangerouslySetInnerHTML={{ __html: lesson.content }}
                    />
                  </div>
                )}

                {/* Assignment Section */}
                {lesson.hasAssignment && (
                  <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Award size={20} className="mr-2 text-amber-400" />
                      Assignment
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Complete the practical assignment to reinforce your
                      learning. Submit your work via WhatsApp for instructor
                      feedback.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="outline"
                        className="border-amber-500/30 hover:border-amber-500/50"
                      >
                        <Download size={16} className="mr-2" />
                        Download Instructions
                      </Button>
                      <Button
                        variant="primary"
                        className="bg-gradient-to-r from-amber-500 to-orange-500"
                      >
                        <MessageCircle size={16} className="mr-2" />
                        Submit via WhatsApp
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              {/* Previous Lesson */}
              <div className="flex-1">
                {previousLesson ? (
                  <Link
                    to={`/learn/${courseId}/lesson/${previousLesson.id}`}
                    className="group flex items-center p-4 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:bg-purple-500/10"
                  >
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-purple-500/20 transition-colors">
                      <ChevronLeft
                        size={20}
                        className="text-gray-400 group-hover:text-purple-400 transition-colors"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-xs text-gray-500 uppercase tracking-wider">
                        Previous
                      </div>
                      <div className="text-white font-medium truncate max-w-[200px] sm:max-w-xs group-hover:text-purple-300 transition-colors">
                        {previousLesson.title}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-center p-4 rounded-xl bg-black/20 border border-white/5 opacity-50">
                    <div className="p-2 rounded-lg bg-white/5">
                      <ChevronLeft size={20} className="text-gray-600" />
                    </div>
                    <div className="ml-3">
                      <div className="text-xs text-gray-600 uppercase tracking-wider">
                        Previous
                      </div>
                      <div className="text-gray-500">No previous lesson</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Next Lesson */}
              <div className="flex-1 sm:flex-none sm:w-64">
                {nextLesson ? (
                  <Link
                    to={`/learn/${courseId}/lesson/${nextLesson.id}`}
                    className="group flex items-center justify-end p-4 rounded-xl bg-gradient-to-r from-primary-purple/20 to-purple-500/10 backdrop-blur-xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:from-primary-purple/30 hover:to-purple-500/20"
                  >
                    <div className="mr-3 text-right">
                      <div className="text-xs text-purple-300/70 uppercase tracking-wider">
                        Next
                      </div>
                      <div className="text-white font-medium truncate max-w-[200px] sm:max-w-xs group-hover:text-purple-200 transition-colors">
                        {nextLesson.title}
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                      <ChevronRight
                        size={20}
                        className="text-purple-400 group-hover:translate-x-0.5 transition-transform"
                      />
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-center justify-end p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                    <div className="mr-3 text-right">
                      <div className="text-xs text-green-400/70 uppercase tracking-wider">
                        Status
                      </div>
                      <div className="text-green-400 font-medium">
                        Course Complete! 🎉
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <CheckCircle size={20} className="text-green-400" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/5 to-primary-gold/5 rounded-2xl" />
              <h3 className="relative text-lg font-semibold text-white mb-4 flex items-center">
                <Sparkles size={18} className="mr-2 text-primary-gold" />
                Quick Actions
              </h3>

              <div className="relative space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-white/10 hover:border-primary-purple/50 hover:bg-purple-500/10"
                >
                  <Download size={16} className="mr-2" />
                  Download Resources
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start border-white/10 hover:border-primary-purple/50 hover:bg-purple-500/10"
                >
                  <MessageCircle size={16} className="mr-2" />
                  Ask Instructor
                </Button>

                <Link
                  to={`/courses/${courseId}`}
                  className="block w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-primary-purple/20 to-purple-500/10 border border-purple-500/30 text-white font-semibold hover:from-primary-purple/30 hover:to-purple-500/20 transition-all duration-300"
                >
                  <GraduationCap size={16} className="inline mr-2" />
                  Course Overview
                </Link>
              </div>
            </div>

            {/* Lesson Progress Card */}
            <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl" />
              <h3 className="relative text-lg font-semibold text-white mb-4 flex items-center">
                <Target size={18} className="mr-2 text-primary-purple" />
                Your Progress
              </h3>

              <div className="relative space-y-4">
                {/* Circular Progress */}
                <div className="flex justify-center">
                  <div className="relative">
                    <svg className="w-28 h-28 transform -rotate-90">
                      <circle
                        cx="56"
                        cy="56"
                        r="48"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-white/10"
                      />
                      <circle
                        cx="56"
                        cy="56"
                        r="48"
                        stroke="url(#progressGradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${(progress / 100) * 301.59} 301.59`}
                        className="transition-all duration-700"
                      />
                      <defs>
                        <linearGradient
                          id="progressGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#8B5CF6" />
                          <stop offset="100%" stopColor="#FFD700" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold bg-gradient-to-r from-primary-purple to-primary-gold bg-clip-text text-transparent">
                          {Math.round(progress)}%
                        </div>
                        <div className="text-xs text-gray-500">Complete</div>
                      </div>
                    </div>
                  </div>
                </div>

                {isCompleted ? (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                    <div className="flex items-center text-green-400">
                      <CheckCircle size={20} className="mr-2" />
                      <span className="font-medium">Lesson Completed!</span>
                    </div>
                    <p className="text-green-400/70 text-sm mt-1">
                      Great job! Keep up the momentum.
                    </p>
                  </div>
                ) : progress >= 50 ? (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30">
                    <div className="flex items-center text-purple-400">
                      <Zap size={20} className="mr-2 animate-pulse" />
                      <span className="font-medium">Great Progress!</span>
                    </div>
                    <p className="text-purple-400/70 text-sm mt-1">
                      You're doing amazing. Keep going!
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                    <div className="flex items-center text-amber-400">
                      <Target size={20} className="mr-2" />
                      <span className="font-medium">Getting Started</span>
                    </div>
                    <p className="text-amber-400/70 text-sm mt-1">
                      Watch the video to track your progress.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
