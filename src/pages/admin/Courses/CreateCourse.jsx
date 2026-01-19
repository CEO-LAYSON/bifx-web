import React from "react";
import { useNavigate } from "react-router-dom";
import CourseCreationForm from "../../../components/instructor/CourseCreationForm";
import { ROUTES } from "../../../utils/constants/routes";

const AdminCreateCourse = () => {
  const navigate = useNavigate();

  const handleSuccess = (courseData) => {
    // Navigate back to course list after successful creation
    navigate(ROUTES.ADMIN.COURSES);
  };

  const handleCancel = () => {
    navigate(ROUTES.ADMIN.COURSES);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Create New Course</h1>
        <p className="text-gray-400">
          Add a new course to the platform. Fill in all the details below.
        </p>
      </div>

      <CourseCreationForm
        onSuccess={handleSuccess}
        onCancel={handleCancel}
        isAdmin={true}
      />
    </div>
  );
};

export default AdminCreateCourse;
