import React from "react";
import {
  TrendingUp,
  Award,
  Clock,
  BookOpen,
  Target,
  Sparkles,
  Zap,
  Trophy,
  Flame,
} from "lucide-react";

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

  const getStatGradient = (index) => {
    const gradients = [
      "from-blue-500 to-cyan-500",
      "from-green-500 to-emerald-500",
      "from-yellow-500 to-orange-500",
      "from-purple-500 to-pink-500",
      "from-red-500 to-rose-500",
    ];
    return gradients[index % gradients.length];
  };

  const stats = [
    {
      icon: BookOpen,
      label: "Lessons Completed",
      value: `${completedLessons}/${totalLessons}`,
      gradient: "from-blue-500 to-cyan-500",
      description: `${Math.round(
        (completedLessons / totalLessons) * 100,
      )}% of course`,
    },
    {
      icon: TrendingUp,
      label: "Overall Progress",
      value: `${Math.round(progressPercentage)}%`,
      gradient: "from-green-500 to-emerald-500",
      description: "Course completion",
    },
    {
      icon: Clock,
      label: "Time Invested",
      value: `${Math.round(timeSpent / 60)}h`,
      gradient: "from-yellow-500 to-orange-500",
      description: `${Math.round((timeSpent / totalDuration) * 100)}% of total`,
    },
    {
      icon: Award,
      label: "Average Score",
      value: `${averageScore}%`,
      gradient: "from-purple-500 to-pink-500",
      description: "Assignment performance",
    },
    {
      icon: Flame,
      label: "Learning Streak",
      value: `${streak} days`,
      gradient: "from-red-500 to-rose-500",
      description: "Consistent learning",
    },
  ];

  const getMotivationMessage = () => {
    if (progressPercentage >= 100) {
      return {
        text: "🎉 Course completed! You're amazing!",
        gradient: "from-primary-gold to-yellow-400",
      };
    } else if (progressPercentage >= 75) {
      return {
        text: "Almost there! You're doing great!",
        gradient: "from-primary-purple to-pink-500",
      };
    } else if (progressPercentage >= 50) {
      return {
        text: "Halfway through! Keep up the momentum!",
        gradient: "from-blue-500 to-cyan-500",
      };
    } else if (progressPercentage >= 25) {
      return {
        text: "Good progress! You're getting there.",
        gradient: "from-green-500 to-emerald-500",
      };
    } else {
      return {
        text: "Getting started! Every expert was once a beginner.",
        gradient: "from-gray-500 to-gray-400",
      };
    }
  };

  const motivation = getMotivationMessage();

  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-purple to-primary-gold rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />

      <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-purple to-primary-gold rounded-lg blur-md opacity-50" />
              <div className="relative p-2 bg-gray-800/50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Learning Progress
              </h3>
              <p className="text-sm text-gray-400">Track your journey</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-full border border-gray-700/50">
            <Sparkles className="h-3.5 w-3.5 text-primary-gold animate-pulse" />
            <span className="text-xs text-gray-400">Updated just now</span>
          </div>
        </div>

        {/* Main Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-3">
            <div>
              <span className="text-gray-400 text-sm">Course Completion</span>
              <div className="text-3xl font-bold text-white mt-1">
                {Math.round(progressPercentage)}%
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-gray-500 text-xs">Goal</span>
              <div className="text-white font-semibold">100%</div>
            </div>
          </div>
          <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-purple/20 to-primary-gold/20" />
            {/* Progress bar with glow */}
            <div
              className="relative h-full bg-gradient-to-r from-primary-purple via-purple-400 to-primary-gold rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              {/* Pulsing indicator */}
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg animate-pulse"
                style={{ marginRight: progressPercentage >= 95 ? "-8px" : "0" }}
              >
                <div className="absolute inset-0 bg-primary-gold rounded-full animate-ping opacity-50" />
              </div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-600" />
              Start
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-primary-gold" />
              Complete
            </span>
          </div>
        </div>

        {/* Motivation Message */}
        <div className="relative mb-8 overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-r ${motivation.gradient} opacity-10 rounded-xl`}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${motivation.gradient} opacity-20 rounded-xl blur-xl`}
          />
          <div className="relative p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg bg-gradient-to-r ${motivation.gradient}`}
              >
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <p className="text-white font-medium">{motivation.text}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="relative group/stat">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl opacity-0 group-hover/stat:opacity-100 transition-opacity" />
                <div className="relative p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30 text-center hover-lift">
                  <div className="relative inline-flex mb-3">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-lg blur-md opacity-50`}
                    />
                    <div className={`relative p-2.5 bg-gray-800/50 rounded-lg`}>
                      <Icon className={`h-5 w-5 text-white`} />
                    </div>
                  </div>
                  <div className="text-white font-bold text-xl mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-xs mb-1 font-medium">
                    {stat.label}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Course Completion Rewards */}
        {progressPercentage >= 100 && (
          <div className="relative mt-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-gold via-yellow-400 to-primary-gold opacity-20 rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-gold to-yellow-500 opacity-30 rounded-xl blur-xl" />
            <div className="relative p-6 bg-gradient-to-r from-primary-gold/20 to-yellow-500/20 backdrop-blur-sm rounded-xl border border-primary-gold/30">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary-gold rounded-full blur-lg opacity-50 animate-pulse" />
                    <div className="relative p-3 bg-primary-gold rounded-full">
                      <Trophy className="h-8 w-8 text-black" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-black font-bold text-lg">
                      Course Completed! 🎉
                    </h4>
                    <p className="text-black/70">
                      You've earned a certificate of completion
                    </p>
                  </div>
                </div>
                <button className="group/btn relative px-6 py-3 bg-black rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-purple to-pink-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  <div className="relative flex items-center gap-2 text-white font-semibold">
                    <Award className="h-4 w-4" />
                    Download Certificate
                  </div>
                </button>
              </div>
              {/* Animated sparkles */}
              <div className="absolute top-2 right-2 animate-pulse">
                <Sparkles className="h-5 w-5 text-primary-gold" />
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        {progressPercentage > 0 && progressPercentage < 100 && (
          <div className="relative mt-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-purple/10 to-primary-gold/10 rounded-xl" />
            <div className="relative p-5 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-primary-gold" />
                <h4 className="text-white font-semibold">Next Steps</h4>
              </div>
              <ul className="space-y-2">
                {progressPercentage < 25 && (
                  <>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2" />
                      Complete the next 2-3 lessons this week
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2" />
                      Practice the basic concepts
                    </li>
                  </>
                )}
                {progressPercentage >= 25 && progressPercentage < 50 && (
                  <>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2" />
                      Review previous lessons if needed
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2" />
                      Start working on assignments
                    </li>
                  </>
                )}
                {progressPercentage >= 50 && progressPercentage < 75 && (
                  <>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2" />
                      Focus on completing all assignments
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-2" />
                      Join live sessions for practical insights
                    </li>
                  </>
                )}
                {progressPercentage >= 75 && (
                  <>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-gold mt-2" />
                      Review the entire course material
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2" />
                      Prepare for the final assessment
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressSummary;
