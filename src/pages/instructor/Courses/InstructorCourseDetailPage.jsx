import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchCourseDetails,
  fetchCourseLessons,
  fetchCourseStudents,
  fetchCoursePerformance,
  createNewLesson,
  updateExistingLesson,
  deleteExistingLesson,
} from "../../../store/slices/instructorSlice";
import LessonManagement from "../../../components/instructor/LessonManagement";
import StudentProgressTable from "../../../components/instructor/StudentProgressTable";
import { ArrowLeft, Settings, BarChart3, Users, Video } from "lucide-react";
import Button from "../../../components/ui/Button";
import Loader from "../../../components/ui/Loader";

const InstructorCourseDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    currentCourse,
    courseLessons,
    courseStudents,
    coursePerformance,
    isLoading,
  } = useSelector((state) => state.instructor);

  const [activeTab, setActiveTab] = useState("lessons");

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseDetails(id));
      dispatch(fetchCourseLessons(id));
      dispatch(fetchCourseStudents(id));
      dispatch(fetchCoursePerformance(id));
    }
  }, [dispatch, id]);

  const handleAddLesson = (lessonData) => {
    dispatch(createNewLesson({ courseId: id, lessonData }));
  };

  const handleEditLesson = (lessonData) => {
    dispatch(updateExistingLesson({ lessonId: lessonData.id, lessonData }));
  };

  const handleDeleteLesson = (lessonId) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      dispatch(deleteExistingLesson(lessonId));
    }
  };

  if (isLoading || !currentCourse) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader size="lg" />
      </div>
    );
  }

  const tabs = [
    {
      id: "lessons",
      label: "Lessons",
      icon: Video,
      count: courseLessons[id]?.length || 0,
    },
    {
      id: "students",
      label: "Students",
      icon: Users,
      count: courseStudents[id]?.length || 0,
    },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/instructor/courses"
            className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft size={20} className="text-white" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {currentCourse.title}
            </h1>
            <p className="text-gray-400">{currentCourse.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm text-gray-400">Enrolled Students</div>
            <div className="text-xl font-bold text-white">
              {currentCourse.totalStudents || 0}
            </div>
          </div>
          <Link to={`/courses/${id}`}>
            <Button variant="outline" size="sm">
              <Settings size={16} className="mr-2" />
              View Public Page
            </Button>
          </Link>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-white">
            {courseLessons[id]?.length || 0}
          </div>
          <div className="text-sm text-gray-400">Total Lessons</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-white">
            {courseStudents[id]?.length || 0}
          </div>
          <div className="text-sm text-gray-400">Enrolled Students</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-white">
            {currentCourse.rating || "4.8"}
          </div>
          <div className="text-sm text-gray-400">Average Rating</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-white">
            {coursePerformance[id]?.completionRate || 0}%
          </div>
          <div className="text-sm text-gray-400">Completion Rate</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="border-b border-gray-700">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-primary-purple text-primary-purple"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon size={18} className="mr-2" />
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className="ml-2 bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "lessons" && (
            <LessonManagement
              lessons={courseLessons[id] || []}
              courseId={id}
              onAddLesson={handleAddLesson}
              onEditLesson={handleEditLesson}
              onDeleteLesson={handleDeleteLesson}
            />
          )}

          {activeTab === "students" && (
            <StudentProgressTable
              students={courseStudents[id] || []}
              course={currentCourse}
            />
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Course Performance
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Completion Rate</span>
                      <span className="text-white font-semibold">
                        {coursePerformance[id]?.completionRate || 0}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Average Progress</span>
                      <span className="text-white font-semibold">
                        {coursePerformance[id]?.averageProgress || 0}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Watch Time</span>
                      <span className="text-white font-semibold">
                        {coursePerformance[id]?.totalWatchTime || 0}h
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Student Engagement
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Active Students</span>
                      <span className="text-white font-semibold">
                        {coursePerformance[id]?.activeStudents || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Drop-off Rate</span>
                      <span className="text-white font-semibold">
                        {coursePerformance[id]?.dropOffRate || 0}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Average Rating</span>
                      <span className="text-white font-semibold">
                        {coursePerformance[id]?.averageRating || 0}/5
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorCourseDetailPage;
