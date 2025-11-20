import React from "react";
import { TrendingUp, Award, Clock, BookOpen } from "lucide-react";

const CourseProgress = ({ progress, course }) => {
  const {
    completedLessons = 0,
    totalLessons = 0,
    progressPercentage = 0,
    totalDuration = 0,
    timeSpent = 0,
  } = progress;

  const stats = [
    {
      icon: BookOpen,
      label: "Lessons Completed",
      value: `${completedLessons}/${totalLessons}`,
      color: "text-blue-400",
    },
    {
      icon: TrendingUp,
      label: "Overall Progress",
      value: `${Math.round(progressPercentage)}%`,
      color: "text-green-400",
    },
    {
      icon: Clock,
      label: "Time Spent",
      value: `${Math.round(timeSpent / 60)}h`,
      color: "text-yellow-400",
    },
    {
      icon: Award,
      label: "Course Level",
      value: course?.level || "Beginner",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-6">Your Progress</h3>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400 text-sm">Course Completion</span>
          <span className="text-white font-semibold">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary-purple to-primary-gold h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="text-center">
              <Icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
              <div className="text-white font-bold text-lg">{stat.value}</div>
              <div className="text-gray-400 text-xs">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Certificate Progress */}
      {progressPercentage >= 100 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-primary-gold to-yellow-500 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-black font-bold">Course Completed! 🎉</h4>
              <p className="text-black/80 text-sm">
                You've earned a certificate
              </p>
            </div>
            <Award className="h-8 w-8 text-black" />
          </div>
        </div>
      )}

      {/* Motivation Message */}
      {progressPercentage > 0 && progressPercentage < 100 && (
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            {progressPercentage < 25 &&
              "Keep going! You just started your journey."}
            {progressPercentage >= 25 &&
              progressPercentage < 50 &&
              "Great progress! You're getting there."}
            {progressPercentage >= 50 &&
              progressPercentage < 75 &&
              "Halfway there! Keep up the good work."}
            {progressPercentage >= 75 && "Almost there! Finish strong."}
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseProgress;
