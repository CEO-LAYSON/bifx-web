import React from "react";
import { TrendingUp, Award, Clock, Mail, User } from "lucide-react";

const StudentProgressTable = ({ students = [], course }) => {
  const getProgressColor = (progress) => {
    if (progress >= 80) return "text-green-400";
    if (progress >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  const getProgressBarColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Student Progress</h2>
            <p className="text-gray-400">
              Track student learning and engagement
            </p>
          </div>
          <div className="text-sm text-gray-400">
            {students.length} students enrolled
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-4 text-gray-400 font-semibold">
                Student
              </th>
              <th className="text-left p-4 text-gray-400 font-semibold">
                Progress
              </th>
              <th className="text-left p-4 text-gray-400 font-semibold">
                Last Active
              </th>
              <th className="text-left p-4 text-gray-400 font-semibold">
                Completed
              </th>
              <th className="text-left p-4 text-gray-400 font-semibold">
                Time Spent
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {students.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-gray-700/30 transition-colors"
              >
                {/* Student Info */}
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-purple rounded-full flex items-center justify-center text-white font-semibold">
                      {student.fullName?.charAt(0) || student.email?.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-medium">
                        {student.fullName || "Unknown Student"}
                      </div>
                      <div className="text-gray-400 text-sm flex items-center">
                        <Mail size={12} className="mr-1" />
                        {student.email}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Progress */}
                <td className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Completion</span>
                      <span
                        className={`font-semibold ${getProgressColor(
                          student.progress
                        )}`}
                      >
                        {student.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(
                          student.progress
                        )}`}
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Last Active */}
                <td className="p-4">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock size={14} className="mr-2" />
                    {student.lastActive || "Never"}
                  </div>
                </td>

                {/* Completed Lessons */}
                <td className="p-4">
                  <div className="flex items-center text-sm">
                    <Award size={14} className="mr-2 text-primary-gold" />
                    <span className="text-white">
                      {student.completedLessons}
                    </span>
                    <span className="text-gray-400 mx-1">/</span>
                    <span className="text-gray-400">
                      {course?.lessonCount || 0}
                    </span>
                  </div>
                </td>

                {/* Time Spent */}
                <td className="p-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <TrendingUp size={14} className="mr-2" />
                    {student.timeSpent || "0h"}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {students.length === 0 && (
        <div className="text-center py-12">
          <User className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            No students yet
          </h3>
          <p className="text-gray-400">
            Students will appear here once they enroll in your course
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentProgressTable;
