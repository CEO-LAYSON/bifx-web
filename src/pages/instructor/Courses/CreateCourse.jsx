import React from "react";
import { useNavigate } from "react-router-dom";
import CourseCreationForm from "../../../components/instructor/CourseCreationForm";

const CreateCourse = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/instructor/courses");
  };

  const handleCancel = () => {
    navigate("/instructor/courses");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Create New Course</h1>
        <p className="text-gray-400">Build your course step by step</p>
      </div>

      <CourseCreationForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  );
};

export default CreateCourse;
