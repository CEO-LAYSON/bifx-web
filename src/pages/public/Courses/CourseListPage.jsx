import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCoursesStart } from "../../../store/slices/courseSlice";

const CourseListPage = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCoursesStart());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Courses</h1>
        {courses.length === 0 ? (
          <p className="text-gray-600">No courses available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {course.title}
                </h2>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Enroll
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseListPage;
