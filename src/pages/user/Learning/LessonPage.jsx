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
            })
          );
        }
      }
    },
    [lesson, progress, dispatch]
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
        })
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
        })
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
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <Alert type="error" message={error} className="mb-4" />
          <Button onClick={() => navigate(`/courses/${courseId}`)}>
            Back to Course
          </Button>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Lesson Not Found
          </h2>
          <Button onClick={() => navigate("/courses")}>Back to Courses</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Course Info */}
            <div className="flex items-center space-x-4">
              <Link
                to={`/courses/${courseId}`}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ChevronLeft size={20} className="mr-1" />
                Back to Course
              </Link>

              <div className="hidden md:block">
                <h1 className="text-white font-semibold truncate max-w-xs">
                  {course?.title}
                </h1>
                <p className="text-gray-400 text-sm truncate max-w-xs">
                  {lesson.title}
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-400">
                <Clock size={16} />
                <span>
                  {Math.floor(lesson.durationSeconds / 60)}:
                  {(lesson.durationSeconds % 60).toString().padStart(2, "0")}
                </span>
              </div>

              {isCompleted && (
                <div className="flex items-center text-green-400 text-sm">
                  <CheckCircle size={16} className="mr-1" />
                  Completed
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Video Player */}
          <div className="lg:col-span-3">
            <div className="bg-black rounded-xl overflow-hidden border border-gray-700">
              {/* Video Player */}
              <VideoPlayer
                src={streamingUrl}
                poster={lesson.thumbnailUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnd}
                onProgress={(progress) => setProgress(progress)}
                autoPlay={true}
              />

              {/* Lesson Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-2">
                      {lesson.title}
                    </h1>

                    {lesson.description && (
                      <p className="text-gray-300 leading-relaxed">
                        {lesson.description}
                      </p>
                    )}
                  </div>

                  {/* Completion Button */}
                  {!isCompleted && (
                    <Button onClick={markAsCompleted} variant="gold" size="sm">
                      <CheckCircle size={16} className="mr-2" />
                      Mark Complete
                    </Button>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Your Progress</span>
                    <span className="text-white font-semibold">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-purple to-primary-gold h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Lesson Content */}
                {lesson.content && (
                  <div className="prose prose-invert max-w-none">
                    <div
                      className="text-gray-300 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: lesson.content }}
                    />
                  </div>
                )}

                {/* Assignment Section */}
                {lesson.hasAssignment && (
                  <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Award size={20} className="mr-2 text-primary-gold" />
                      Assignment
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Complete the practical assignment to reinforce your
                      learning. Submit your work via WhatsApp for instructor
                      feedback.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-2" />
                        Download Instructions
                      </Button>
                      <Button variant="primary" size="sm">
                        <MessageCircle size={16} className="mr-2" />
                        Submit via WhatsApp
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              {/* Previous Lesson */}
              <div>
                {previousLesson ? (
                  <Link
                    to={`/learn/${courseId}/lesson/${previousLesson.id}`}
                    className="flex items-center px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
                  >
                    <ChevronLeft size={20} className="mr-2" />
                    <div className="text-left">
                      <div className="text-sm text-gray-400">Previous</div>
                      <div className="font-medium truncate max-w-xs">
                        {previousLesson.title}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="px-4 py-3 bg-gray-800 text-gray-500 rounded-lg border border-gray-700 opacity-50">
                    <div className="text-sm">No previous lesson</div>
                  </div>
                )}
              </div>

              {/* Next Lesson */}
              <div>
                {nextLesson ? (
                  <Link
                    to={`/learn/${courseId}/lesson/${nextLesson.id}`}
                    className="flex items-center px-4 py-3 bg-primary-purple text-white rounded-lg hover:bg-purple-700 transition-colors border border-primary-purple"
                  >
                    <div className="text-right">
                      <div className="text-sm text-purple-100">Next</div>
                      <div className="font-medium truncate max-w-xs">
                        {nextLesson.title}
                      </div>
                    </div>
                    <ChevronRight size={20} className="ml-2" />
                  </Link>
                ) : (
                  <div className="px-4 py-3 bg-gray-800 text-gray-500 rounded-lg border border-gray-700 opacity-50">
                    <div className="text-sm">Course Complete!</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Actions
              </h3>

              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download size={16} className="mr-2" />
                  Download Resources
                </Button>

                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle size={16} className="mr-2" />
                  Ask Instructor
                </Button>

                <Link
                  to={`/courses/${courseId}`}
                  className="block w-full text-center px-4 py-2 border border-primary-purple text-primary-purple rounded-lg font-semibold hover:bg-purple-900 transition-colors"
                >
                  Course Overview
                </Link>
              </div>
            </div>

            {/* Lesson Progress */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                Your Progress
              </h3>

              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-gold mb-1">
                    {Math.round(progress)}%
                  </div>
                  <div className="text-gray-400 text-sm">Lesson Complete</div>
                </div>

                {isCompleted && (
                  <div className="p-3 bg-green-900/20 border border-green-800 rounded-lg">
                    <div className="flex items-center text-green-400 text-sm">
                      <CheckCircle size={16} className="mr-2" />
                      Lesson Completed
                    </div>
                  </div>
                )}

                {progress >= 50 && progress < 100 && (
                  <div className="p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                    <div className="text-blue-400 text-sm">
                      Great progress! Keep going.
                    </div>
                  </div>
                )}

                {progress < 50 && (
                  <div className="p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                    <div className="text-yellow-400 text-sm">
                      You're getting started. Don't give up!
                    </div>
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
