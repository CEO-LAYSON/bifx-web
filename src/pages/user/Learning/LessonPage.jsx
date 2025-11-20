import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourseWithLessons } from "../../../store/slices/courseSlice";

const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const dispatch = useDispatch();
  const { currentCourse, isLoading, error } = useSelector(
    (state) => state.courses
  );

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseWithLessons(courseId));
    }
  }, [courseId, dispatch]);

  const currentLesson = currentCourse?.lessons?.find(
    (lesson) => lesson.id === parseInt(lessonId)
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading lesson...</p>
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

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Lesson not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {currentLesson.title}
          </h1>

          {currentLesson.videoUrl && (
            <div className="mb-6">
              <video
                controls
                className="w-full rounded-lg"
                src={currentLesson.videoUrl}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          <div className="prose max-w-none">
            <p className="text-gray-700">{currentLesson.content}</p>
          </div>

          <div className="mt-8 flex justify-between">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Previous Lesson
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Next Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
