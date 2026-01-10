import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllCourses } from "../../../store/slices/adminSlice";
import CourseManagementTable from "../../../components/admin/CourseManagementTable";

const CourseListPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Course Management</h1>
        <p className="text-gray-400">
          Manage all courses, content, and publishing status
        </p>
      </div>

      <CourseManagementTable />
    </div>
  );
};

export default CourseListPage;
