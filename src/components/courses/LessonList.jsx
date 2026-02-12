import React from "react";
import { Link, useParams } from "react-router-dom";
import { Play, CheckCircle, Lock, Clock } from "lucide-react";

const LessonList = ({
  lessons = [],
  courseId,
  userProgress = {},
  currentLessonId,
  isEnrolled = false,
}) => {
  const { id } = useParams();

  const isLessonCompleted = (lessonId) => {
    return userProgress[lessonId] >= 100;
  };

  const isLessonAccessible = (lesson, index) => {
    if (isEnrolled) return true;
    // First lesson is always accessible as preview
    return index === 0 && lesson.isPreview;
  };

  const getLessonStatus = (lesson, index) => {
    if (isLessonCompleted(lesson.id)) {
      return "completed";
    }
    if (!isLessonAccessible(lesson, index)) {
      return "locked";
    }
    return "available";
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "0m";
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-bold text-white">
          Course Content ({lessons.length} lessons)
        </h3>
        <p className="text-gray-400 mt-1">
          {isEnrolled
            ? "Continue your learning journey"
            : "Preview available lessons"}
        </p>
      </div>

      {/* Lessons List */}
      <div className="divide-y divide-gray-700">
        {lessons.map((lesson, index) => {
          const status = getLessonStatus(lesson, index);
          const isCurrent = lesson.id === currentLessonId;

          return (
            <div
              key={lesson.id}
              className={`p-4 transition-colors animate-fade-up ${
                isCurrent
                  ? "bg-primary-purple/20 border-l-4 border-primary-purple"
                  : "hover:bg-gray-700/50"
              }`}
              style={{ "--delay": `${index * 80}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                  {/* Status Icon */}
                  <div className="flex-shrink-0">
                    {status === "completed" ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : status === "locked" ? (
                      <Lock className="h-6 w-6 text-gray-500" />
                    ) : (
                      <div
                        className={`w-6 h-6 rounded-full border-2 ${
                          isCurrent
                            ? "border-primary-purple bg-primary-purple"
                            : "border-gray-400"
                        } flex items-center justify-center`}
                      >
                        {isCurrent && (
                          <Play size={12} className="text-white ml-0.5" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Lesson Info */}
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`font-medium truncate ${
                        status === "locked" ? "text-gray-500" : "text-white"
                      }`}
                    >
                      {index + 1}. {lesson.title}
                      {lesson.isPreview && !isEnrolled && (
                        <span className="ml-2 text-xs bg-primary-gold text-black px-2 py-1 rounded-full">
                          PREVIEW
                        </span>
                      )}
                    </h4>

                    {lesson.description && (
                      <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                        {lesson.description}
                      </p>
                    )}

                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        {formatDuration(lesson.durationSeconds)}
                      </div>
                      {lesson.hasAssignment && (
                        <span className="text-primary-gold">Assignment</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0 ml-4">
                  {status === "locked" ? (
                    <button
                      disabled
                      className="px-4 py-2 bg-gray-600 text-gray-400 rounded-lg text-sm font-medium cursor-not-allowed"
                    >
                      Locked
                    </button>
                  ) : (
                    <Link
                      to={
                        isEnrolled
                          ? `/learn/${courseId}/lesson/${lesson.id}`
                          : `/courses/${id}`
                      }
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors hover-lift ${
                        isCurrent
                          ? "bg-white text-primary-purple hover:bg-gray-100"
                          : "bg-primary-purple text-white hover:bg-purple-700"
                      }`}
                    >
                      {isCurrent ? "Continue" : "Start"}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enrollment CTA */}
      {!isEnrolled && (
        <div className="p-6 bg-gradient-to-r from-primary-purple to-purple-600">
          <div className="text-center">
            <h4 className="text-white font-semibold mb-2">
              Enroll to unlock all lessons
            </h4>
            <p className="text-purple-100 text-sm mb-4">
              Get full access to all {lessons.length} lessons, assignments, and
              certificates
            </p>
            <Link
              to={`/courses/${id}/enroll`}
              className="inline-block bg-white text-primary-purple px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonList;
