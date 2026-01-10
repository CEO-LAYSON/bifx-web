import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import Button from "../ui/Button";
import Loader from "../ui/Loader";

const CourseManagementTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, isLoading } = useSelector((state) => state.admin);

  // Fetch courses on mount if not already loaded
  useEffect(() => {
    if (courses.length === 0 && !isLoading) {
      dispatch(fetchAllCourses());
    }
  }, [dispatch, courses.length, isLoading]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [activeActions, setActiveActions] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState("below");
  const tableRef = React.useRef(null);

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
    const dropdownHeight = 160; // Approximate height of dropdown

    // Check if there's enough space above
    const spaceAbove = buttonRect.top - tableRect.top;
    const spaceBelow = tableRect.bottom - buttonRect.bottom;

    return spaceAbove > dropdownHeight ? "above" : "below";
  };

  const handleUpdateCourse = async (courseId, updateData) => {
    try {
      await dispatch(
        updateCourse({ id: courseId, courseData: updateData })
      ).unwrap();
      setActiveActions(null);

      dispatch(
        addNotification({
          type: "success",
          title: "Course Updated Successfully!",
          message: "Course has been updated successfully!",
          duration: 4000,
        })
      );
    } catch (error) {
      console.error("Failed to update course:", error);
      dispatch(
        addNotification({
          type: "error",
          title: "Update Failed",
          message: error || "Failed to update course. Please try again.",
          duration: 5000,
        })
      );
    }
  };

  const handleDeleteCourse = async (
    courseId,
    courseTitle,
    hardDelete = false
  ) => {
    const action = hardDelete ? "permanently delete" : "soft delete";
    const confirmed = window.confirm(
      `Are you sure you want to ${action} the course "${courseTitle}"? ${
        hardDelete
          ? "This action cannot be undone."
          : "The course can be restored later."
      }`
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
        })
      );
    } catch (error) {
      console.error("Failed to delete course:", error);
      dispatch(
        addNotification({
          type: "error",
          title: "Delete Failed",
          message: error || "Failed to delete course. Please try again.",
          duration: 5000,
        })
      );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "PUBLISHED":
        return {
          label: "Published",
          color: "bg-green-500/20 text-green-400 border border-green-500/30",
        };
      case "DRAFT":
        return {
          label: "Draft",
          color: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
        };
      case "ARCHIVED":
        return {
          label: "Archived",
          color: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
        };
      default:
        return {
          label: "Unknown",
          color: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
        };
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">Course Management</h2>
            <p className="text-gray-400">
              Manage courses, content, and publishing status
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              />
            </div>

            {/* Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-gold"
            >
              <option value="ALL">All Status</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto" ref={tableRef}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-4 text-gray-400 font-semibold">
                Course
              </th>
              <th className="text-left p-4 text-gray-400 font-semibold">
                Instructor
              </th>
              <th className="text-left p-4 text-gray-400 font-semibold">
                Status
              </th>
              <th className="text-left p-4 text-gray-400 font-semibold">
                Price
              </th>
              <th className="text-left p-4 text-gray-400 font-semibold">
                Created
              </th>
              <th className="text-left p-4 text-gray-400 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredCourses.map((course) => {
              const courseStatus = course.isActive ? "PUBLISHED" : "DRAFT";
              const statusBadge = getStatusBadge(courseStatus);
              return (
                <tr
                  key={course.id}
                  className="hover:bg-gray-700/50 transition-colors"
                >
                  {/* Course Info */}
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-purple rounded-lg flex items-center justify-center text-white">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <div className="text-white font-medium">
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
                    <div className="text-white">N/A</div>
                    <div className="text-gray-400 text-sm">
                      Instructor info not available
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}
                    >
                      {statusBadge.label}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="p-4">
                    <div className="flex items-center text-white">
                      <DollarSign size={14} className="mr-1" />
                      {course.price || "0.00"}
                    </div>
                  </td>

                  {/* Created Date */}
                  <td className="p-4 text-gray-400 text-sm">
                    {course.createdAt
                      ? new Date(course.createdAt).toLocaleDateString()
                      : "N/A"}
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
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {activeActions === course.id && (
                        <div
                          className={`absolute right-0 bg-gray-700 border border-gray-600 rounded-lg shadow-xl z-50 min-w-48 ${
                            dropdownPosition === "above"
                              ? "-top-2 transform -translate-y-full"
                              : "top-12"
                          }`}
                        >
                          <div className="p-2">
                            <div className="text-xs text-gray-400 px-3 py-2 border-b border-gray-600">
                              Course Actions
                            </div>

                            <button
                              onClick={() => {
                                navigate(`/courses/${course.id}`);
                                setActiveActions(null);
                              }}
                              className="w-full text-left px-3 py-2 text-sm text-white hover:bg-gray-600 rounded transition-colors flex items-center"
                            >
                              <Eye size={14} className="mr-2" />
                              View Details
                            </button>

                            <button
                              onClick={() => {
                                // For now, navigate to instructor courses page
                                // In a full implementation, this would navigate to an admin edit page
                                navigate(ROUTES.INSTRUCTOR.COURSES);
                                setActiveActions(null);
                              }}
                              className="w-full text-left px-3 py-2 text-sm text-white hover:bg-gray-600 rounded transition-colors flex items-center"
                            >
                              <Edit size={14} className="mr-2" />
                              Edit Course
                            </button>

                            {!course.isActive && (
                              <button
                                onClick={() =>
                                  handleUpdateCourse(course.id, {
                                    isActive: true,
                                  })
                                }
                                className="w-full text-left px-3 py-2 text-sm text-green-400 hover:bg-green-500/20 hover:text-green-300 rounded transition-colors flex items-center"
                              >
                                <Eye size={14} className="mr-2" />
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
                                className="w-full text-left px-3 py-2 text-sm text-yellow-400 hover:bg-yellow-500/20 hover:text-yellow-300 rounded transition-colors flex items-center"
                              >
                                Unpublish Course
                              </button>
                            )}

                            <div className="border-t border-gray-600 my-1"></div>

                            <button
                              onClick={() =>
                                handleDeleteCourse(
                                  course.id,
                                  course.title || "Untitled Course",
                                  false
                                )
                              }
                              className="w-full text-left px-3 py-2 text-sm text-orange-400 hover:bg-orange-500/20 hover:text-orange-300 rounded transition-colors flex items-center"
                            >
                              <Trash2 size={14} className="mr-2" />
                              Soft Delete
                            </button>

                            <button
                              onClick={() =>
                                handleDeleteCourse(
                                  course.id,
                                  course.title || "Untitled Course",
                                  true
                                )
                              }
                              className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded transition-colors flex items-center"
                            >
                              <Trash2 size={14} className="mr-2" />
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

      {/* Empty State - Only show when not loading and no courses */}
      {!isLoading && filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            No courses found
          </h3>
          <p className="text-gray-400">
            {searchTerm || statusFilter !== "ALL"
              ? "Try adjusting your search or filters"
              : "No courses created yet"}
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseManagementTable;
