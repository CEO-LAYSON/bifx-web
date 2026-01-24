import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react";
import Button from "../../components/ui/Button";
import { instructorAPI } from "../../services/api/instructorAPI";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const InstructorStudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await instructorAPI.getAllStudents();
        setEnrollments(response.data);
      } catch (err) {
        setError("Failed to load students");
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Aggregate enrollments by user
  const students = enrollments.reduce((acc, enrollment) => {
    const existingStudent = acc.find((s) => s.userId === enrollment.userId);

    if (existingStudent) {
      existingStudent.enrolledCourses += 1;
      existingStudent.courses.push({
        id: enrollment.courseId,
        title: enrollment.courseTitle,
        enrolledAt: enrollment.createdAt,
      });
      // Update join date to earliest
      if (new Date(enrollment.createdAt) < new Date(existingStudent.joinDate)) {
        existingStudent.joinDate = enrollment.createdAt;
      }
    } else {
      acc.push({
        id: enrollment.userId,
        userId: enrollment.userId,
        name: enrollment.userFullName,
        email: enrollment.userEmail,
        enrolledCourses: 1,
        completedCourses: 0, // TODO: Calculate from progress data
        totalProgress: 0, // TODO: Calculate from progress data
        lastActive: enrollment.updatedAt || enrollment.createdAt,
        status: "active", // TODO: Determine based on activity
        joinDate: enrollment.createdAt,
        courses: [
          {
            id: enrollment.courseId,
            title: enrollment.courseTitle,
            enrolledAt: enrollment.createdAt,
          },
        ],
      });
    }

    return acc;
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || student.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    return status === "active"
      ? "text-green-400 bg-green-400/10 border-green-400/20"
      : "text-gray-400 bg-gray-400/10 border-gray-400/20";
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-yellow-500";
    if (progress >= 30) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-6 border border-indigo-700">
        <h1 className="text-3xl font-bold text-white mb-2">My Students</h1>
        <p className="text-gray-300">
          Track and manage your enrolled students' progress and performance
        </p>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-600 rounded w-24"></div>
                  <div className="h-8 bg-gray-600 rounded w-16"></div>
                </div>
                <div className="h-8 w-8 bg-gray-600 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-500 rounded-xl p-6">
          <p className="text-red-400">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Students</p>
                <p className="text-2xl font-bold text-white">
                  {students.length}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Students</p>
                <p className="text-2xl font-bold text-green-400">
                  {students.filter((s) => s.status === "active").length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg. Progress</p>
                <p className="text-2xl font-bold text-purple-400">
                  {students.length > 0
                    ? Math.round(
                        students.reduce((acc, s) => acc + s.totalProgress, 0) /
                          students.length,
                      )
                    : 0}
                  %
                </p>
              </div>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Courses Completed</p>
                <p className="text-2xl font-bold text-orange-400">
                  {students.reduce((acc, s) => acc + s.completedCourses, 0)}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search students by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            {[
              { key: "all", label: "All Students" },
              { key: "active", label: "Active" },
              { key: "inactive", label: "Inactive" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === key
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Students List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-700 rounded-lg p-6 border border-gray-600 animate-pulse">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-5 bg-gray-600 rounded w-32"></div>
                      <div className="h-4 bg-gray-600 rounded w-48"></div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-8 bg-gray-600 rounded w-24"></div>
                    <div className="h-8 bg-gray-600 rounded w-20"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-4 bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-600 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="bg-gray-700 rounded-lg p-6 border border-gray-600 hover:border-gray-500 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {student.name}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <Mail size={14} className="mr-1" />
                            {student.email}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        Joined: {format(new Date(student.joinDate), "MMM dd, yyyy")}
                      </span>
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        Last active: {format(new Date(student.lastActive), "MMM dd, yyyy")}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border w-fit ${getStatusColor(
                        student.status,
                      )}`}
                    >
                      {student.status}
                    </span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Progress
                      </Button>
                      <Button variant="primary" size="sm">
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-600">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Enrolled Courses</p>
                    <p className="text-lg font-semibold text-white">
                      {student.enrolledCourses}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">
                      Completed Courses
                    </p>
                    <p className="text-lg font-semibold text-green-400">
                      {student.completedCourses}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Overall Progress</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-600 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(
                            student.totalProgress,
                          )}`}
                          style={{ width: `${student.totalProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-white">
                        {student.totalProgress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              No students found
            </h3>
            <p className="text-gray-400">
              {searchTerm || filter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "You don't have any students enrolled in your courses yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorStudentsPage;
