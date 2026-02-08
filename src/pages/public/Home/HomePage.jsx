import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchFreeCourses } from "../../../store/slices/courseSlice";
import { ROUTES } from "../../../utils/constants/routes";
import CourseGrid from "../../../components/courses/CourseGrid";
import LandingHeader from "../../../components/layout/LandingHeader";
import HeroSection from "../../../components/sections/HeroSection";
import FeaturesSection from "../../../components/sections/FeaturesSection";
import AboutSection from "../../../components/sections/AboutSection";
import TestimonialsSection from "../../../components/sections/TestimonialsSection";
import Footer from "../../../components/sections/Footer";
import { Play } from "lucide-react";

const HomePage = () => {
  const dispatch = useDispatch();
  const { freeCourses, isLoading } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchFreeCourses());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Landing Header */}
      <LandingHeader />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Video Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-medium mb-6">
            <Play className="w-4 h-4" />
            Watch Our Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            See How We <span className="text-amber-400">Trade</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Watch our exclusive forex trading session and see how our expert
            instructors analyze markets and execute profitable trades in
            real-time.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-amber-600 rounded-2xl blur opacity-30" />
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="BIFX Trading Session"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a
            href="https://www.youtube.com/@BIFXTrading"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/25"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Subscribe on YouTube
          </a>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            View Full Video
          </a>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Free Courses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-medium mb-6">
            Free Courses
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Start Learning for <span className="text-amber-400">Free</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Begin your forex trading journey with our free introductory courses.
            No experience required!
          </p>
        </div>

        <CourseGrid
          courses={freeCourses}
          loading={isLoading}
          emptyMessage="No free courses available at the moment"
        />

        <div className="text-center mt-12">
          <Link
            to={ROUTES.COURSES}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            View All Courses
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
