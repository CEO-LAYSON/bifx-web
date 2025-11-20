import React from "react";
import CourseCard from "./CourseCard";
import EmptyState from "../shared/EmptyState";
import Loader from "../ui/Loader";

const CourseGrid = ({
  courses,
  loading,
  emptyMessage = "No courses found",
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader size="lg" />
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <EmptyState
        title="No courses available"
        message={emptyMessage}
        icon="book"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseGrid;
