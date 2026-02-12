import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants/routes";
import {
  fetchAllCourses,
  updateCourse,
  deleteCourse,
  hardDeleteCourse,
} from "../../store/slices/adminSlice";
import { addNotification } from "../../store/slices/uiSlice";
import {
  Search,
  Filter,
  MoreVertical,
  BookOpen,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  Archive,
  ExternalLink,
} from "lucide-react";
import Button from "../ui/Button";
import Loader from "../ui/Loader";

const CourseManagementTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, isLoading } = useSelector((state) => state.admin);
  const tableRef = useRef(null);

  useEffect(() => {
    if (courses.length === 0 && !isLoading) {
      dispatch(fetchAllCourses());
    }
  }, [dispatch, courses.length, isLoading]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [activeActions, setActiveActions] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState("below");

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.slug?.toLowerCase().includes(searchTerm.toLowerCase());
    const courseStatus = course.isActive ? "PUBLISHED" : "DRAFT";
    const matchesStatus =
      statusFilter === "ALL" || courseStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const calculateDropdownPosition = (buttonElement) => {
    if (!buttonElement || !tableRef.current) return "below";
    const buttonRect = buttonElement.getBoundingClientRect();
    const tableRect = tableRef.current.getBoundingClientRect();
    const dropdownHeight = 200;
    const spaceAbove = buttonRect.top - tableRect.top;
    const spaceBelow = tableRect.bottom - buttonRect.bottom;
    return spaceAbove > dropdownHeight ? "above" : "below";
  };

  const handleUpdateCourse = async (courseId, updateData) => {
    try {
      await dispatch(
        updateCourse({ id: courseId, courseData: updateData }),
      ).unwrap();
      setActiveActions(null);
      dispatch(
        addNotification({
          type: "success",
          title: "Course Updated Successfully!",
          message: "Course has been updated successfully!",
          duration: 4000,
        }),
      );
    } catch (error) {
      console.error("Failed to update course:", error);
      dispatch(
        addNotification({
          type: "error",
          title: "Update Failed",
          message: error || "Failed to update course. Please try again.",
          duration: 5000,
        }),
      );
    }
  };

  const handleDeleteCourse = async (
    courseId,
    courseTitle,
    hardDelete = false,
  ) => {
    const action = hardDelete ? "permanently delete" : "soft delete";
    const confirmed = window.confirm(
      `Are you sure you want to ${action} the course "${courseTitle}"? ${
        hardDelete
          ? "This action cannot be undone."
          : "The course can be restored later."
      }`,
    );

    if (!confirmed) return;

    try {
      if (hardDelete) {
        await dispatch(hardDeleteCourse(courseId)).unwrap();
      } else {
        await dispatch(deleteCourse(courseId)).unwrap();
      }
      setActiveActions(null);
      dispatch(
        addNotification({
          type: "success",
          title: "Course Deleted Successfully!",
          message: `Course "${courseTitle}" has been ${
            hardDelete ? "permanently" : "soft"
          } deleted.`,
          duration: 4000,
        }),
      );
    } catch (error) {
      console.error("Failed to delete course:", error);
      dispatch(
        addNotification({
          type: "error",
          title: "Delete Failed",
          message: error || "Failed to delete course. Please try again.",
          duration: 5000,
        }),
      );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "PUBLISHED":
        return {
          label: "Published",
          color: "bg-green-500/20 text-green-400 border-green-500/30",
          icon: CheckCircle,
          gradient: "from-green-500/20 to-green-600/10",
        };
      case "DRAFT":
        return {
          label: "Draft",
          color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
          icon: Clock,
          gradient: "from-yellow-500/20 to-yellow-600/10",
        };
      case "ARCHIVED":
        return {
          label: "Archived",
          color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
          icon: Archive,
          gradient: "from-gray-500/20 to-gray-600/10",
        };
      default:
        return {
          label: "Unknown",
          color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
          icon: XCircle,
          gradient: "from-gray-500/20 to-gray-600/10",
        };
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="relative">
          <div className="absolute inset-0 bg-primary-gold/30 rounded-full blur-lg animate-pulse" />
          <Loader size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-gold/30 via-primary-purple/20 to-primary-gold/30 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

      <div className="relative bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/80 to-gray-800/40">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/5 via-transparent to-primary-purple/5" />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-gold/20 rounded-lg">
                <BookOpen size={20} className="text-primary-gold" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Course Management
                </h2>
                <p className="text-gray-400 text-sm">
                  {filteredCourses.length} courses found
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Create Course Button */}
              <div className="relative group/btn">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-gold to-primary-purple rounded-lg blur opacity-50 group-hover/btn:opacity-75 transition-opacity" />
                <Button
                  onClick={() => navigate(ROUTES.ADMIN.CREATE_COURSE)}
                  variant="primary"
                  className="relative flex items-center gap-2"
                >
                  <Plus size={16} />
                  <span className="text-sm">Create Course</span>
                </Button>
              </div>

              {/* Search */}
              <div className="relative group/search">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-purple/20 to-primary-gold/20 rounded-lg blur opacity-0 group-hover/search:opacity-100 transition-opacity" />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover/search:text-primary-gold transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="relative pl-10 pr-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-gold/50 focus:border-primary-gold/50 transition-all w-full sm:w-64 group-hover/search:border-primary-gold/30"
                />
              </div>

              {/* Filter */}
              <div className="relative group/filter">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-purple/20 to-primary-gold/20 rounded-lg blur opacity-0 group-hover/filter:opacity-100 transition-opacity" />
                <Filter
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover/filter:text-primary-purple transition-colors"
                  size={18}
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="relative pl-10 pr-8 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-purple/50 focus:border-primary-purple/50 transition-all appearance-none cursor-pointer group-hover/filter:border-primary-purple/30"
                >
                  <option value="ALL">All Status</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="DRAFT">Draft</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="w-2 h-2 bg-primary-purple rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto" ref={tableRef}>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50 bg-gray-800/50">
                <th className="text-left p-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <BookOpen size={14} />
                    Course
                  </div>
                </th>
                <th className="text-left p-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Eye size={14} />
                    Instructor
                  </div>
                </th>
                <th className="text-left p-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} />
                    Status
                  </div>
                </th>
                <th className="text-left p-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <DollarSign size={14} />
                    Price
                  </div>
                </th>
                <th className="text-left p-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    Created
                  </div>
                </th>
                <th className="text-left p-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <MoreVertical size={14} />
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              {filteredCourses.map((course) => {
                const courseStatus = course.isActive ? "PUBLISHED" : "DRAFT";
                const statusBadge = getStatusBadge(courseStatus);
                const StatusIcon = statusBadge.icon;

                return (
                  <tr
                    key={course.id}
                    className="hover:bg-gray-700/30 transition-all duration-300 group/row"
                  >
                    {/* Course Info */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${statusBadge.gradient} rounded-lg blur-md opacity-50`}
                          />
                          <div className="relative w-10 h-10 bg-gradient-to-br from-primary-purple to-primary-gold rounded-lg flex items-center justify-center text-white shadow-lg group-hover/row:scale-110 group-hover/row:rotate-3 transition-transform">
                            <BookOpen size={20} />
                          </div>
                        </div>
                        <div>
                          <div className="text-white font-medium group-hover/row:text-primary-gold transition-colors">
                            {course.title || "Untitled Course"}
                          </div>
                          <div className="text-gray-400 text-sm line-clamp-1">
                            {course.description || "No description"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Instructor */}
                    <td className="p-4">
                      <div className="text-white group-hover/row:text-primary-gold transition-colors">
                        N/A
                      </div>
                      <div className="text-gray-500 text-sm">
                        Instructor info not available
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${statusBadge.color} shadow-lg`}
                      >
                        <StatusIcon size={12} />
                        {statusBadge.label}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="p-4">
                      <div className="flex items-center text-white font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-gold mr-2 animate-pulse" />
                        <DollarSign
                          size={14}
                          className="mr-1 text-primary-gold"
                        />
                        {course.price || "0.00"}
                      </div>
                    </td>

                    {/* Created Date */}
                    <td className="p-4 text-gray-400 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-purple animate-pulse" />
                        {course.createdAt
                          ? new Date(course.createdAt).toLocaleDateString()
                          : "N/A"}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="relative">
                        <button
                          ref={(el) => {
                            if (activeActions === course.id && el) {
                              const position = calculateDropdownPosition(el);
                              setDropdownPosition(position);
                            }
                          }}
                          onClick={() => {
                            const newActiveId =
                              activeActions === course.id ? null : course.id;
                            setActiveActions(newActiveId);
                          }}
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-600/50 rounded-lg transition-all group-hover/row:bg-gray-600/50"
                        >
                          <MoreVertical
                            size={16}
                            className={
                              activeActions === course.id
                                ? "text-primary-gold"
                                : ""
                            }
                          />
                        </button>

                        {activeActions === course.id && (
                          <div
                            className={`absolute right-0 z-50 min-w-52 bg-gray-800/95 backdrop-blur-xl border border-gray-600/50 rounded-xl shadow-2xl overflow-hidden ${
                              dropdownPosition === "above"
                                ? "bottom-full mb-2"
                                : "top-full mt-2"
                            }`}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/10 to-primary-gold/10" />
                            <div className="relative p-2">
                              <div className="text-xs text-gray-400 px-3 py-2 border-b border-gray-700/50 font-medium">
                                Course Actions
                              </div>

                              <button
                                onClick={() => {
                                  navigate(`/courses/${course.id}`);
                                  setActiveActions(null);
                                }}
                                className="w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-blue-500/20 rounded-lg transition-all flex items-center group"
                              >
                                <div className="p-1 bg-blue-500/20 rounded mr-2 group-hover:bg-blue-500/30 transition-colors">
                                  <Eye size={14} className="text-blue-400" />
                                </div>
                                View Details
                                <ExternalLink
                                  size={12}
                                  className="ml-auto text-gray-500"
                                />
                              </button>

                              <button
                                onClick={() => {
                                  navigate(ROUTES.INSTRUCTOR.COURSES);
                                  setActiveActions(null);
                                }}
                                className="w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-purple-500/20 rounded-lg transition-all flex items-center group"
                              >
                                <div className="p-1 bg-purple-500/20 rounded mr-2 group-hover:bg-purple-500/30 transition-colors">
                                  <Edit size={14} className="text-purple-400" />
                                </div>
                                Edit Course
                              </button>

                              {!course.isActive && (
                                <button
                                  onClick={() =>
                                    handleUpdateCourse(course.id, {
                                      isActive: true,
                                    })
                                  }
                                  className="w-full text-left px-3 py-2.5 text-sm text-green-400 hover:text-green-300 hover:bg-green-500/20 rounded-lg transition-all flex items-center group"
                                >
                                  <div className="p-1 bg-green-500/20 rounded mr-2 group-hover:bg-green-500/30 transition-colors">
                                    <CheckCircle size={14} />
                                  </div>
                                  Restore Course
                                </button>
                              )}

                              {course.isActive && (
                                <button
                                  onClick={() =>
                                    handleUpdateCourse(course.id, {
                                      isActive: false,
                                    })
                                  }
                                  className="w-full text-left px-3 py-2.5 text-sm text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/20 rounded-lg transition-all flex items-center group"
                                >
                                  <div className="p-1 bg-yellow-500/20 rounded mr-2 group-hover:bg-yellow-500/30 transition-colors">
                                    <Clock size={14} />
                                  </div>
                                  Unpublish Course
                                </button>
                              )}

                              <div className="border-t border-gray-700/50 my-1" />

                              <button
                                onClick={() =>
                                  handleDeleteCourse(
                                    course.id,
                                    course.title || "Untitled Course",
                                    false,
                                  )
                                }
                                className="w-full text-left px-3 py-2.5 text-sm text-orange-400 hover:text-orange-300 hover:bg-orange-500/20 rounded-lg transition-all flex items-center group"
                              >
                                <div className="p-1 bg-orange-500/20 rounded mr-2 group-hover:bg-orange-500/30 transition-colors">
                                  <Archive size={14} />
                                </div>
                                Soft Delete
                              </button>

                              <button
                                onClick={() =>
                                  handleDeleteCourse(
                                    course.id,
                                    course.title || "Untitled Course",
                                    true,
                                  )
                                }
                                className="w-full text-left px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all flex items-center group"
                              >
                                <div className="p-1 bg-red-500/20 rounded mr-2 group-hover:bg-red-500/30 transition-colors">
                                  <Trash2 size={14} />
                                </div>
                                Hard Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {!isLoading && filteredCourses.length === 0 && (
          <div className="text-center py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/5 to-primary-gold/5" />
            <div className="relative">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-700/50 rounded-full flex items-center justify-center">
                <BookOpen size={40} className="text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No courses found
              </h3>
              <p className="text-gray-400">
                {searchTerm || statusFilter !== "ALL"
                  ? "Try adjusting your search or filters"
                  : "No courses created yet"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseManagementTable;
