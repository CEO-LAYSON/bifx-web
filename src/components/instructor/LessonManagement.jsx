import React, { useState } from "react";
import { Plus, Video, FileText, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import Button from "../ui/Button";

const LessonManagement = ({
  lessons = [],
  courseId,
  onAddLesson,
  onEditLesson,
  onDeleteLesson,
}) => {
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);

  const handleAddLesson = (lessonData) => {
    onAddLesson?.(courseId, lessonData);
    setShowLessonForm(false);
  };

  const handleEditLessonClick = (lesson) => {
    setEditingLesson(lesson);
    setShowLessonForm(true);
  };

  const handleUpdateLesson = (lessonData) => {
    onEditLesson?.({ ...editingLesson, ...lessonData });
    setShowLessonForm(false);
    setEditingLesson(null);
  };

  const toggleLessonPreview = (lessonId) => {
    // Implement preview toggle
    console.log("Toggle preview for lesson:", lessonId);
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Course Lessons</h2>
            <p className="text-gray-400">
              Manage lessons and content for this course
            </p>
          </div>
          <Button
            onClick={() => setShowLessonForm(true)}
            variant="primary"
            size="sm"
          >
            <Plus size={16} className="mr-2" />
            Add Lesson
          </Button>
        </div>
      </div>

      {/* Lessons List */}
      <div className="divide-y divide-gray-700">
        {lessons.map((lesson, index) => (
          <div
            key={lesson.id}
            className="p-6 hover:bg-gray-700/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                {/* Lesson Number */}
                <div className="w-8 h-8 bg-primary-purple rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {index + 1}
                </div>

                {/* Lesson Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-white font-semibold truncate">
                      {lesson.title}
                    </h3>
                    {lesson.isPreview && (
                      <span className="bg-primary-gold text-black px-2 py-1 rounded-full text-xs font-bold">
                        PREVIEW
                      </span>
                    )}
                  </div>

                  {lesson.description && (
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {lesson.description}
                    </p>
                  )}

                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Video size={12} className="mr-1" />
                      {lesson.durationMinutes || 0}min
                    </div>
                    {lesson.hasAssignment && (
                      <div className="flex items-center text-primary-gold">
                        <FileText size={12} className="mr-1" />
                        Assignment
                      </div>
                    )}
                    <div className="flex items-center">
                      Order: {lesson.orderIndex}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleLessonPreview(lesson.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    lesson.isPreview
                      ? "bg-primary-gold text-black hover:bg-yellow-500"
                      : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                  }`}
                  title={
                    lesson.isPreview ? "Disable preview" : "Enable preview"
                  }
                >
                  {lesson.isPreview ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>

                <button
                  onClick={() => onEditLesson?.(lesson)}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  title="Edit lesson"
                >
                  <Edit size={16} />
                </button>

                <button
                  onClick={() => onDeleteLesson?.(lesson.id)}
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  title="Delete lesson"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Video Status */}
            {!lesson.videoUrl && (
              <div className="mt-3 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                <div className="flex items-center text-yellow-400 text-sm">
                  <Video size={16} className="mr-2" />
                  No video uploaded. Add video content to publish this lesson.
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {lessons.length === 0 && (
        <div className="text-center py-12">
          <Video className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            No lessons yet
          </h3>
          <p className="text-gray-400 mb-4">
            Start by adding your first lesson
          </p>
          <Button onClick={() => setShowLessonForm(true)} variant="primary">
            <Plus size={16} className="mr-2" />
            Add First Lesson
          </Button>
        </div>
      )}

      {/* Lesson Form Modal */}
      {showLessonForm && (
        <LessonFormModal
          courseId={courseId}
          lesson={editingLesson}
          onSave={editingLesson ? handleUpdateLesson : handleAddLesson}
          onCancel={() => {
            setShowLessonForm(false);
            setEditingLesson(null);
          }}
        />
      )}
    </div>
  );
};

// Comprehensive Lesson Form Modal Component
const LessonFormModal = ({ courseId, lesson, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: lesson?.title || "",
    description: lesson?.description || "",
    orderIndex: lesson?.orderIndex || 0,
    isPreview: lesson?.isPreview || false,
    hasAssignment: lesson?.hasAssignment || false,
    durationMinutes: lesson?.durationMinutes || 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!formData.title.trim()) {
      alert("Lesson title is required");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error("Error saving lesson:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white">
            {lesson ? "Edit Lesson" : "Add New Lesson"}
          </h3>
        </div>

        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Lesson Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., Introduction to Forex Trading"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-purple"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe what students will learn in this lesson..."
              rows={3}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-purple resize-none"
            />
          </div>

          {/* Duration and Order */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                min="0"
                value={formData.durationMinutes}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    durationMinutes: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-purple"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Order Index
              </label>
              <input
                type="number"
                min="0"
                value={formData.orderIndex}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    orderIndex: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-purple"
              />
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isPreview}
                onChange={(e) =>
                  setFormData({ ...formData, isPreview: e.target.checked })
                }
                className="mr-3 w-4 h-4 text-primary-purple bg-gray-700 border-gray-600 rounded focus:ring-primary-purple"
              />
              <div>
                <span className="text-white text-sm font-medium">
                  Available as preview
                </span>
                <p className="text-gray-400 text-xs">
                  Students can watch this lesson before enrolling
                </p>
              </div>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.hasAssignment}
                onChange={(e) =>
                  setFormData({ ...formData, hasAssignment: e.target.checked })
                }
                className="mr-3 w-4 h-4 text-primary-purple bg-gray-700 border-gray-600 rounded focus:ring-primary-purple"
              />
              <div>
                <span className="text-white text-sm font-medium">
                  Includes assignment
                </span>
                <p className="text-gray-400 text-xs">
                  This lesson has an assignment for students
                </p>
              </div>
            </label>
          </div>
        </div>

        <div className="p-6 border-t border-gray-700 flex space-x-3">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            loading={isSubmitting}
            className="flex-1"
          >
            {lesson ? "Update Lesson" : "Add Lesson"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonManagement;
