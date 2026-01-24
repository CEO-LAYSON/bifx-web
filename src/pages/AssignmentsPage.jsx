import React, { useState } from "react";
import {
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  BookOpen,
} from "lucide-react";
import Button from "../components/ui/Button";

const AssignmentsPage = () => {
  const [filter, setFilter] = useState("all");

  // Mock assignments data
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
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "submitted":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "overdue":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-xl p-6 border border-green-700">
        <h1 className="text-3xl font-bold text-white mb-2">Assignments</h1>
        <p className="text-gray-300">
          Manage and track student assignments across all courses
        </p>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: "all", label: "All Assignments", count: assignments.length },
            {
              key: "pending",
              label: "Pending",
              count: assignments.filter((a) => a.status === "pending").length,
            },
            {
              key: "submitted",
              label: "Submitted",
              count: assignments.filter((a) => a.status === "submitted").length,
            },
            {
              key: "overdue",
              label: "Overdue",
              count: assignments.filter((a) => a.status === "overdue").length,
            },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-gray-700 rounded-lg p-6 border border-gray-600 hover:border-gray-500 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {assignment.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(
                        assignment.status,
                      )}`}
                    >
                      {getStatusIcon(assignment.status)}
                      <span className="capitalize">{assignment.status}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center">
                      <BookOpen size={14} className="mr-1" />
                      {assignment.course}
                    </div>
                    <div className="flex items-center">
                      <User size={14} className="mr-1" />
                      {assignment.instructor}
                    </div>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      Due: {assignment.dueDate}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {assignment.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-600">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-400">
                    Submissions: {assignment.submissions}/
                    {assignment.totalStudents}
                  </span>
                  <div className="w-32 bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (assignment.submissions / assignment.totalStudents) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View Submissions
                  </Button>
                  <Button variant="primary" size="sm">
                    Edit Assignment
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAssignments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              No assignments found
            </h3>
            <p className="text-gray-400">
              {filter === "all"
                ? "There are no assignments available at the moment."
                : `No assignments with status "${filter}".`}
            </p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Assignments</p>
              <p className="text-2xl font-bold text-white">
                {assignments.length}
              </p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Pending Review</p>
              <p className="text-2xl font-bold text-yellow-400">
                {assignments.filter((a) => a.status === "submitted").length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-green-400">
                {assignments.filter((a) => a.status === "submitted").length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Overdue</p>
              <p className="text-2xl font-bold text-red-400">
                {assignments.filter((a) => a.status === "overdue").length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentsPage;
