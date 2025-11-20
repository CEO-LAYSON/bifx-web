import React from "react";
import { TrendingUp, Award, Clock, BookOpen, Target } from "lucide-react";

const ProgressSummary = ({ progress, course }) => {
  const {
    completedLessons = 0,
    totalLessons = 0,
    progressPercentage = 0,
    totalDuration = 0,
    timeSpent = 0,
    averageScore = 0,
    streak = 0,
  } = progress;

  const stats = [
    {
      icon: BookOpen,
      label: "Lessons Completed",
      value: `${completedLessons}/${totalLessons}`,
      color: "text-blue-400",
      description: `${Math.round(
        (completedLessons / totalLessons) * 100
      )}% of course`,
    },
    {
      icon: TrendingUp,
      label: "Overall Progress",
      value: `${Math.round(progressPercentage)}%`,
      color: "text-green-400",
      description: "Course completion",
    },
    {
      icon: Clock,
      label: "Time Invested",
      value: `${Math.round(timeSpent / 60)}h`,
      color: "text-yellow-400",
      description: `${Math.round((timeSpent / totalDuration) * 100)}% of total`,
    },
    {
      icon: Award,
      label: "Average Score",
      value: `${averageScore}%`,
      color: "text-purple-400",
      description: "Assignment performance",
    },
    {
      icon: Target,
      label: "Learning Streak",
      value: `${streak} days`,
      color: "text-red-400",
      description: "Consistent learning",
    },
  ];

  const getMotivationMessage = () => {
    if (progressPercentage >= 100) {
      return "🎉 Course completed! You're amazing!";
    } else if (progressPercentage >= 75) {
      return "Almost there! You're doing great!";
    } else if (progressPercentage >= 50) {
      return "Halfway through! Keep up the momentum!";
    } else if (progressPercentage >= 25) {
      return "Good progress! You're getting there.";
    } else {
      return "Getting started! Every expert was once a beginner.";
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Learning Progress</h3>
        <div className="text-sm text-gray-400">Updated just now</div>
      </div>

      {/* Main Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-400">Course Completion</span>
          <span className="text-white font-semibold">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-primary-purple to-primary-gold h-4 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Start</span>
          <span>Complete</span>
        </div>
      </div>

      {/* Motivation Message */}
      <div className="mb-6 p-4 bg-gradient-to-r from-primary-purple/20 to-primary-gold/20 rounded-lg border border-primary-purple/30">
        <p className="text-white text-center font-medium">
          {getMotivationMessage()}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="text-center group">
              <div className="relative">
                <Icon
                  className={`h-8 w-8 ${stat.color} mx-auto mb-2 group-hover:scale-110 transition-transform`}
                />
              </div>
              <div className="text-white font-bold text-lg mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400 text-xs mb-1">{stat.label}</div>
              <div className="text-gray-500 text-xs">{stat.description}</div>
            </div>
          );
        })}
      </div>

      {/* Course Completion Rewards */}
      {progressPercentage >= 100 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-primary-gold to-yellow-500 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-black font-bold text-lg">
                Course Completed! 🎉
              </h4>
              <p className="text-black/80">
                You've earned a certificate of completion
              </p>
            </div>
            <Award className="h-10 w-10 text-black" />
          </div>
          <button className="w-full mt-3 bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            Download Certificate
          </button>
        </div>
      )}

      {/* Next Steps */}
      {progressPercentage > 0 && progressPercentage < 100 && (
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h4 className="text-white font-semibold mb-2">Next Steps</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            {progressPercentage < 25 && (
              <>
                <li>• Complete the next 2-3 lessons this week</li>
                <li>• Practice the basic concepts</li>
              </>
            )}
            {progressPercentage >= 25 && progressPercentage < 50 && (
              <>
                <li>• Review previous lessons if needed</li>
                <li>• Start working on assignments</li>
              </>
            )}
            {progressPercentage >= 50 && progressPercentage < 75 && (
              <>
                <li>• Focus on completing all assignments</li>
                <li>• Join live sessions for practical insights</li>
              </>
            )}
            {progressPercentage >= 75 && (
              <>
                <li>• Review the entire course material</li>
                <li>• Prepare for the final assessment</li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProgressSummary;
