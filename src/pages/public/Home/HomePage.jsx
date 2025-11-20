import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchFreeCourses } from "../../../store/slices/courseSlice";
import { ROUTES } from "../../../utils/constants/routes";
import CourseGrid from "../../../components/courses/CourseGrid";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import TestimonialsSection from "./TestimonialsSection";

const HomePage = () => {
  const dispatch = useDispatch();
  const { freeCourses, isLoading } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchFreeCourses());
  }, [dispatch]);

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Free Courses Section */}
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Start Learning for Free
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Begin your forex trading journey with our free introductory courses
          </p>
        </div>

        <CourseGrid
          courses={freeCourses}
          loading={isLoading}
          emptyMessage="No free courses available at the moment"
        />

        <div className="text-center mt-8">
          <Link
            to={ROUTES.COURSES}
            className="inline-flex items-center px-6 py-3 border border-primary-purple text-primary-purple rounded-lg font-semibold hover:bg-purple-900 transition-colors"
          >
            View All Courses
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
