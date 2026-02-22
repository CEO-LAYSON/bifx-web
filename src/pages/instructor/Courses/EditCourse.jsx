import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById } from "../../../store/slices/courseSlice";
import CourseCreationForm from "../../../components/instructor/CourseCreationForm";
import Alert from "../../../components/ui/Alert";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    currentCourse,
    isLoading: loading,
    error,
  } = useSelector((state) => state.courses);
  const [initialData, setInitialData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setFetchError(null);
        const result = await dispatch(fetchCourseById(id)).unwrap();
        // API returns { data: { ... } } format
        const courseResponse = result.data || result;
        // Transform the course data for the form
        const courseData = {
          title: courseResponse.title,
          description: courseResponse.description,
          level: courseResponse.level,
          slug: courseResponse.slug,
          price: courseResponse.price,
          thumbnailUrl: courseResponse.thumbnailUrl,
          objectives: courseResponse.objectives,
          requirements: courseResponse.requirements,
        };
        setInitialData(courseData);
      } catch (err) {
        console.error("Failed to fetch course:", err);
        setFetchError(err?.message || "Failed to load course data");
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id, dispatch]);

  const handleSuccess = () => {
    setSuccessMessage("Course updated successfully!");
    // Show success message for 2 seconds then navigate
    setTimeout(() => {
      navigate("/instructor/courses");
    }, 2000);
  };

  const handleCancel = () => {
    navigate("/instructor/courses");
  };

  if (loading && !initialData) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Course</h1>
          <p className="text-gray-400">Loading course data...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-purple"></div>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Course</h1>
          <p className="text-gray-400">Update your course details</p>
        </div>
        <Alert type="error" message={fetchError} />
        <button
          onClick={() => navigate("/instructor/courses")}
          className="px-4 py-2 bg-primary-purple text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Course</h1>
          <p className="text-gray-400">Update your course details</p>
        </div>
        <Alert type="error" message="Course not found" />
        <button
          onClick={() => navigate("/instructor/courses")}
          className="px-4 py-2 bg-primary-purple text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Course</h1>
        <p className="text-gray-400">Update your course details</p>
      </div>

      {successMessage && (
        <Alert type="success" message={successMessage} className="mb-4" />
      )}

      <CourseCreationForm
        onSuccess={handleSuccess}
        onCancel={handleCancel}
        initialData={initialData}
        courseId={id}
      />
    </div>
  );
};

export default EditCourse;
