import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllCourses } from "../../../store/slices/adminSlice";
import CourseManagementTable from "../../../components/admin/CourseManagementTable";
import { BookOpen } from "lucide-react";

const CourseListPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  return (
    <div className="relative space-y-6">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-20 w-72 h-72 bg-primary-purple/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-0 left-20 w-96 h-96 bg-primary-gold/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Header Section */}
      <div className="relative">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-gradient-to-br from-primary-purple/20 to-primary-gold/10 rounded-xl border border-primary-purple/20">
            <BookOpen size={24} className="text-primary-purple" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Course Management</h1>
            <p className="text-gray-400">
              Manage all courses, content, and publishing status
            </p>
          </div>
        </div>
      </div>

      <CourseManagementTable />
    </div>
  );
};

export default CourseListPage;
