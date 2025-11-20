import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLessonProgress,
  fetchCourseProgress,
} from "../store/slices/progressSlice";

export const useProgress = (courseId, lessonId) => {
  const dispatch = useDispatch();
  const { courseProgress, lessonProgress } = useSelector(
    (state) => state.progress
  );
  const [localProgress, setLocalProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Initialize progress from Redux store
  useEffect(() => {
    if (lessonId && lessonProgress[lessonId]) {
      setLocalProgress(lessonProgress[lessonId]);
      setIsCompleted(lessonProgress[lessonId] === 100);
    }
  }, [lessonId, lessonProgress]);

  // Update progress with debouncing
  const updateProgress = useCallback(
    (newProgress, markCompleted = false) => {
      setLocalProgress(newProgress);

      if (markCompleted || newProgress === 100) {
        setIsCompleted(true);
      }

      // Only update backend if progress increased significantly
      if (newProgress - localProgress >= 5 || markCompleted) {
        dispatch(
          updateLessonProgress({
            lessonId,
            progressPercentage: Math.round(newProgress),
            videoPositionSeconds: 0, // You might want to track this too
            markCompleted: markCompleted || newProgress === 100,
          })
        );
      }
    },
    [dispatch, lessonId, localProgress]
  );

  // Mark lesson as completed
  const markAsCompleted = useCallback(() => {
    updateProgress(100, true);
  }, [updateProgress]);

  // Get course progress summary
  const getCourseProgress = useCallback(() => {
    if (courseId) {
      dispatch(fetchCourseProgress(courseId));
    }
  }, [dispatch, courseId]);

  return {
    progress: localProgress,
    isCompleted,
    updateProgress,
    markAsCompleted,
    courseProgress: courseProgress[courseId] || {},
    getCourseProgress,
  };
};
