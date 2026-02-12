import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Mail,
  Calendar,
  BookOpen,
  TrendingUp,
  Award,
  Clock,
  Sparkles,
  UserPlus,
  ChevronRight,
  TrendingUp as TrendingUpIcon,
  Star,
  Zap,
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
        const data = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.data)
          ? response.data.data
          : [];
        setEnrollments(data);
      } catch (err) {
        setError("Failed to load students");
        console.error("Error fetching students:", err);
        setEnrollments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const students = enrollments.reduce((acc, enrollment) => {
    const existingStudent = acc.find((s) => s.userId === enrollment.userId);

    if (existingStudent) {
      existingStudent.enrolledCourses += 1;
      existingStudent.courses.push({
        id: enrollment.courseId,
        title: enrollment.courseTitle,
        enrolledAt: enrollment.createdAt,
      });
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
        completedCourses: 0,
        totalProgress: 0,
        lastActive: enrollment.updatedAt || enrollment.createdAt,
        status: "active",
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
      ? "text-green-400 bg-green-500/10 border-green-500/30"
      : "text-gray-400 bg-gray-500/10 border-gray-500/30";
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "from-green-500 to-emerald-500";
    if (progress >= 60) return "from-yellow-500 to-orange-500";
    if (progress >= 30) return "from-orange-500 to-red-500";
    return "from-red-500 to-pink-500";
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-950/20 to-gray-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2260%22%20height%3D%2260%22%20fill%3D%22none%22%20stroke%3D%22rgba%28139%2C92%2C246%2C0.05%29%22%20stroke-width%3D%220.5%22%2F%3E%3C%2Fsvg%3E')] opacity-50"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-600/5 to-blue-600/5 rounded-full blur-3xl animate-spin" style={{ animationDuration: '60s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-blue-600/5"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl blur-lg opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl p-3">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                  My Students
                  <Sparkles className="w-6 h-6 text-gold-400 animate-pulse" />
                </h1>
                <p className="text-gray-400 mt-1">
                  Track and manage your enrolled students' progress and performance
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-300 text-sm">
                <span className="font-semibold">{students.length}</span> Total Students
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 animate-pulse"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-600/50 rounded w-24"></div>
                    <div className="h-8 bg-gray-600/50 rounded w-16"></div>
                  </div>
                  <div className="h-12 w-12 bg-gray-600/50 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="relative bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Students */}
            <div className="relative group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 shadow-xl hover:border-purple-500/40 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total Students</p>
                  <p className="text-3xl font-bold text-white">{students.length}</p>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl blur-lg opacity-75"></div>
                  <div className="relative bg-gradient-to-br from-purple-600 to-purple-500 rounded-xl p-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center text-purple-400 text-sm">
                <Zap className="w-4 h-4 mr-1" />
                <span>Active learners</span>
              </div>
            </div>

            {/* Active Students */}
            <div className="relative group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl hover:border-green-500/40 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-600/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all duration-500"></div>
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Active Students</p>
                  <p className="text-3xl font-bold text-green-400">
                    {students.filter((s) => s.status === "active").length}
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 rounded-xl blur-lg opacity-75"></div>
                  <div className="relative bg-gradient-to-br from-green-600 to-green-500 rounded-xl p-3">
                    <TrendingUpIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-400 text-sm">
                <Star className="w-4 h-4 mr-1" />
                <span>Engaged this week</span>
              </div>
            </div>

            {/* Avg Progress */}
            <div className="relative group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gold-500/20 shadow-xl hover:border-gold-500/40 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gold-600/10 rounded-full blur-2xl group-hover:bg-gold-500/20 transition-all duration-500"></div>
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Avg. Progress</p>
                  <p className="text-3xl font-bold text-gold-400">
                    {students.length > 0
                      ? Math.round(
                          students.reduce((acc, s) => acc + s.totalProgress, 0) /
                            students.length,
                        )
                      : 0}%
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-600 to-yellow-400 rounded-xl blur-lg opacity-75"></div>
                  <div className="relative bg-gradient-to-br from-gold-500 to-yellow-500 rounded-xl p-3">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center text-gold-400 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>Completion rate</span>
              </div>
            </div>

            {/* Courses Completed */}
            <div className="relative group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20 shadow-xl hover:border-blue-500/40 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Completed</p>
                  <p className="text-3xl font-bold text-blue-400">
                    {students.reduce((acc, s) => acc + s.completedCourses, 0)}
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-xl blur-lg opacity-75"></div>
                  <div className="relative bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl p-3">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center text-blue-400 text-sm">
                <Sparkles className="w-4 h-4 mr-1" />
                <span>Achievements</span>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-blue-600/5"></div>
          
          <div className="relative flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-1">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl blur-lg opacity-0 group-focus-within:opacity-50 transition-opacity duration-300"></div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search students by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-900/60 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              {[
                { key: "all", label: "All Students", icon: Users },
                { key: "active", label: "Active", icon: TrendingUpIcon },
                { key: "inactive", label: "Inactive", icon: Clock },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`relative px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    filter === key
                      ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/30"
                      : "bg-gray-900/60 text-gray-400 hover:text-white hover:bg-gray-900/80 border border-gray-700/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Students List */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 animate-pulse"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-14 h-14 bg-gray-700/50 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-5 bg-gray-700/50 rounded w-32"></div>
                        <div className="h-4 bg-gray-700/50 rounded w-48"></div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="h-10 bg-gray-700/50 rounded-lg w-28"></div>
                      <div className="h-10 bg-gray-700/50 rounded-lg w-24"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-4 bg-gray-700/50 rounded"></div>
                    <div className="h-4 bg-gray-700/50 rounded"></div>
                    <div className="h-4 bg-gray-700/50 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredStudents.map((student, index) => (
                <div
                  key={student.id}
                  className="relative group bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-500 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600/50 to-blue-500/50 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full blur-lg opacity-75"></div>
                          <div className="relative bg-gradient-to-br from-purple-600 to-blue-500 rounded-full p-1">
                            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            {student.name}
                            {student.totalProgress >= 80 && (
                              <span className="text-gold-400">
                                <Star className="w-4 h-4 fill-current" />
                              </span>
                            )}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                            <span className="flex items-center">
                              <Mail size={14} className="mr-1.5 text-purple-400" />
                              {student.email}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center px-3 py-1 bg-gray-900/60 rounded-lg">
                          <Calendar size={14} className="mr-1.5 text-blue-400" />
                          Joined: {format(new Date(student.joinDate), "MMM dd, yyyy")}
                        </span>
                        <span className="flex items-center px-3 py-1 bg-gray-900/60 rounded-lg">
                          <Clock size={14} className="mr-1.5 text-green-400" />
                          Last active: {format(new Date(student.lastActive), "MMM dd, yyyy")}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-4">
                      <span
                        className={`px-4 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 ${getStatusColor(
                          student.status,
                        )}`}
                      >
                        <span className={`w-2 h-2 rounded-full ${student.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></span>
                        {student.status}
                      </span>
                      <div className="flex space-x-3">
                        <Button variant="ghost" size="sm" className="hover:bg-purple-500/10">
                          View Progress
                        </Button>
                        <Button variant="primary" size="sm" className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400">
                          Contact
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 mt-6 border-t border-gray-700/50">
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400 flex items-center">
                          <BookOpen size={14} className="mr-1.5 text-purple-400" />
                          Enrolled Courses
                        </span>
                        <span className="text-lg font-semibold text-white">{student.enrolledCourses}</span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400 flex items-center">
                          <Award size={14} className="mr-1.5 text-gold-400" />
                          Completed
                        </span>
                        <span className="text-lg font-semibold text-green-400">{student.completedCourses}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400 flex items-center">
                          <TrendingUp size={14} className="mr-1.5 text-blue-400" />
                          Overall Progress
                        </span>
                        <span className="text-sm font-medium text-white">{student.totalProgress}%</span>
                      </div>
                      <div className="relative h-3 bg-gray-900/60 rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full"></div>
                        <div
                          className={`relative h-full bg-gradient-to-r ${getProgressColor(
                            student.totalProgress,
                          )} rounded-full shadow-lg transition-all duration-1000`}
                          style={{ width: `${student.totalProgress}%` }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-shimmer" style={{ backgroundPosition: '200% 0' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredStudents.length === 0 && (
            <div className="relative text-center py-16">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5 rounded-2xl"></div>
              <div className="relative">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-600/20 to-blue-500/20 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No students found</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  {searchTerm || filter !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "You don't have any students enrolled in your courses yet."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorStudentsPage;
