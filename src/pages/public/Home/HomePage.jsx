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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-accent-purple/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent-gold/20 to-amber-500/10 border border-accent-gold/30 text-accent-gold text-sm font-medium mb-6 hover:shadow-premium-glow hover:shadow-accent-gold/20 transition-all duration-300">
              <Play className="w-4 h-4" />
              Watch Our Journey
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              See How We{" "}
              <span className="bg-gradient-to-r from-accent-gold to-amber-400 bg-clip-text text-transparent">
                Trade
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto group">
              Watch our exclusive forex trading session and see how our expert
              instructors analyze markets and execute profitable trades in
              real-time.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-purple via-purple-600 to-accent-gold rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-dark-900 shadow-premium-xl border border-white/10">
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/25 hover:scale-105"
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-dark-800/80 border border-white/10 hover:bg-dark-700 hover:border-accent-purple/30 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-premium-glow hover:shadow-accent-purple/20"
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
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Free Courses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-accent-purple/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-accent-gold/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-accent-emerald/20 to-teal-500/10 border border-accent-emerald/30 text-accent-emerald text-sm font-medium mb-6 hover:shadow-premium-glow hover:shadow-accent-emerald/20 transition-all duration-300">
              Free Courses
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Start Learning for{" "}
              <span className="bg-gradient-to-r from-accent-gold to-amber-400 bg-clip-text text-transparent">
                Free
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto group">
              Begin your forex trading journey with our free introductory
              courses. No experience required!
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
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-purple to-purple-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-purple-500 transition-all duration-300 shadow-premium-xl hover:shadow-premium-glow hover:shadow-accent-purple/25 hover:scale-105 group"
            >
              View All Courses
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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
