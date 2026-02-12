import React, { useState } from "react";
import {
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  BookOpen,
  ChevronRight,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import Button from "../components/ui/Button";

const AssignmentsPage = () => {
  const [filter, setFilter] = useState("all");

  const assignments = [
    {
      id: 1,
      title: "Forex Market Analysis Report",
      course: "Technical Analysis Fundamentals",
      instructor: "John Doe",
      dueDate: "2025-12-01",
      status: "pending",
      description:
        "Analyze the current EUR/USD market conditions and provide a comprehensive report on potential trading opportunities.",
      submissions: 0,
      totalStudents: 25,
    },
    {
      id: 2,
      title: "Risk Management Strategy",
      course: "Risk Management in Forex",
      instructor: "Jane Smith",
      dueDate: "2025-11-28",
      status: "submitted",
      description:
        "Develop a personal risk management strategy including position sizing, stop-loss orders, and portfolio allocation.",
      submissions: 18,
      totalStudents: 20,
    },
    {
      id: 3,
      title: "Trading Journal Review",
      course: "Advanced Trading Strategies",
      instructor: "Mike Johnson",
      dueDate: "2025-11-25",
      status: "overdue",
      description:
        "Review your trading journal for the past month and identify patterns, mistakes, and areas for improvement.",
      submissions: 12,
      totalStudents: 15,
    },
    {
      id: 4,
      title: "Economic Indicators Analysis",
      course: "Fundamental Analysis",
      instructor: "Sarah Wilson",
      dueDate: "2025-12-05",
      status: "pending",
      description:
        "Analyze how major economic indicators affect currency movements and create a trading strategy based on them.",
      submissions: 0,
      totalStudents: 30,
    },
  ];

  const filteredAssignments = assignments.filter((assignment) => {
    if (filter === "all") return true;
    return assignment.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30";
      case "submitted":
        return "from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30";
      case "overdue":
        return "from-red-500/20 to-pink-500/20 text-red-400 border-red-500/30";
      default:
        return "from-gray-500/20 to-gray-600/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock size={16} />;
      case "submitted":
        return <CheckCircle size={16} />;
      case "overdue":
        return <AlertCircle size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const stats = {
    total: assignments.length,
    pending: assignments.filter((a) => a.status === "pending").length,
    submitted: assignments.filter((a) => a.status === "submitted").length,
    overdue: assignments.filter((a) => a.status === "overdue").length,
  };

  return (
    <div className="space-y-8">
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/20 via-blue-500/10 to-cyan-500/10 animate-gradient"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-purple/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative glass rounded-2xl p-8 border border-white/10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 animate-fade-up">
                <span className="text-gradient bg-gradient-to-r from-primary-purple via-blue-400 to-cyan-400">
                  Assignments
                </span>
              </h1>
              <p
                className="text-gray-300 text-lg animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                Complete your coursework and track your progress
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-purple/20 rounded-full border border-primary-purple/30">
                <Target className="w-4 h-4 text-primary-purple" />
                <span className="text-primary-purple text-sm font-medium">
                  Complete all to earn certificate
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="group glass rounded-xl p-4 border border-white/10 hover-lift card-glow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Total</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="group glass rounded-xl p-4 border border-white/10 hover-lift card-glow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">
                {stats.pending}
              </p>
            </div>
          </div>
        </div>

        <div className="group glass rounded-xl p-4 border border-white/10 hover-lift card-glow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Submitted</p>
              <p className="text-2xl font-bold text-green-400">
                {stats.submitted}
              </p>
            </div>
          </div>
        </div>

        <div className="group glass rounded-xl p-4 border border-white/10 hover-lift card-glow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Overdue</p>
              <p className="text-2xl font-bold text-red-400">{stats.overdue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-2 border border-white/10 w-fit">
        <div className="flex flex-wrap gap-2">
          {[
            {
              key: "all",
              label: "All",
              count: stats.total,
              color: "from-blue-500 to-cyan-500",
            },
            {
              key: "pending",
              label: "Pending",
              count: stats.pending,
              color: "from-yellow-500 to-orange-500",
            },
            {
              key: "submitted",
              label: "Submitted",
              count: stats.submitted,
              color: "from-green-500 to-emerald-500",
            },
            {
              key: "overdue",
              label: "Overdue",
              count: stats.overdue,
              color: "from-red-500 to-pink-500",
            },
          ].map(({ key, label, count, color }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                filter === key ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {filter === key && (
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${color} rounded-lg opacity-100`}
                ></div>
              )}
              <span className="relative z-10 flex items-center gap-2">
                {label}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    filter === key ? "bg-white/20" : "bg-gray-700"
                  }`}
                >
                  {count}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment, index) => (
          <div
            key={assignment.id}
            className="group glass rounded-2xl p-6 border border-white/10 hover-lift card-glow"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-2 bg-gradient-to-r ${getStatusColor(
                      assignment.status,
                    )}`}
                  >
                    {getStatusIcon(assignment.status)}
                    <span className="capitalize">{assignment.status}</span>
                  </div>
                  {assignment.status === "overdue" && (
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-medium rounded-lg border border-red-500/30 animate-pulse">
                      Action Required
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-gold transition-colors">
                  {assignment.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg">
                    <BookOpen size={14} className="text-primary-purple" />
                    <span>{assignment.course}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg">
                    <User size={14} className="text-primary-purple" />
                    <span>{assignment.instructor}</span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${
                      assignment.status === "overdue"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-white/5 text-gray-400"
                    }`}
                  >
                    <Calendar size={14} />
                    <span>Due: {assignment.dueDate}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="group-hover:scale-105 transition-transform"
                >
                  <FileText size={16} className="mr-2" />
                  View Details
                </Button>
                {assignment.status === "pending" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                  >
                    <Zap size={16} className="mr-2" />
                    Submit Now
                  </Button>
                )}
                {assignment.status === "submitted" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                  >
                    <CheckCircle size={16} className="mr-2" />
                    View Submission
                  </Button>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>Submission Progress</span>
                  <span className="text-gray-500">
                    ({assignment.submissions}/{assignment.totalStudents})
                  </span>
                </div>
                <span className="text-sm font-medium text-white">
                  {Math.round(
                    (assignment.submissions / assignment.totalStudents) * 100,
                  )}
                  %
                </span>
              </div>
              <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-purple via-blue-400 to-cyan-400 rounded-full transition-all duration-500 relative"
                  style={{
                    width: `${
                      (assignment.submissions / assignment.totalStudents) * 100
                    }%`,
                  }}
                >
                  <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAssignments.length === 0 && (
        <div className="glass rounded-2xl p-12 border border-white/10 text-center">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-full flex items-center justify-center">
              <FileText className="h-12 w-12 text-gray-500" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            No Assignments Found
          </h3>
          <p className="text-gray-400 max-w-md mx-auto">
            {filter === "all"
              ? "There are no assignments available at the moment. Check back later for new coursework."
              : `No assignments with status "${filter}". Try a different filter.`}
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass rounded-xl p-6 border border-white/10 hover-lift transition-all duration-300 group cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-purple/20 to-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-primary-purple" />
            </div>
            <div>
              <h4 className="text-white font-semibold">Track Progress</h4>
              <p className="text-gray-400 text-sm">
                View all submission history
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 ml-auto group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-white/10 hover-lift transition-all duration-300 group cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-gold/20 to-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-primary-gold" />
            </div>
            <div>
              <h4 className="text-white font-semibold">My Submissions</h4>
              <p className="text-gray-400 text-sm">Review your work</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 ml-auto group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-white/10 hover-lift transition-all duration-300 group cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h4 className="text-white font-semibold">Grades</h4>
              <p className="text-gray-400 text-sm">
                View your grades & feedback
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 ml-auto group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentsPage;
