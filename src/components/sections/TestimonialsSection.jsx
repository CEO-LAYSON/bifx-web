import React, { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";

const testimonials = [
  {
    id: 1,
    name: "Michael Chen",
    role: "Full-Time Trader",
    avatar: "MC",
    rating: 5,
    course: "Advanced Forex Mastery",
    result: "+245% ROI",
    text: "BIFX transformed my trading completely. The structured curriculum and live sessions helped me understand market dynamics like never before. After 8 months, I've achieved consistent profitability.",
    gradient: "from-purple-500 to-purple-700",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Financial Analyst",
    avatar: "SJ",
    rating: 5,
    course: "Technical Analysis Pro",
    result: "+180% ROI",
    text: "As a finance professional, I was skeptical about online trading courses. BIFX exceeded all my expectations with its depth and quality. The instructors are genuine experts who care about student success.",
    gradient: "from-amber-500 to-amber-700",
  },
  {
    id: 3,
    name: "David Martinez",
    role: "Small Business Owner",
    avatar: "DM",
    rating: 5,
    course: "Beginner's Bootcamp",
    result: "+95% ROI",
    text: "Started with zero knowledge. The beginner-friendly approach made learning forex trading enjoyable and accessible. Now I trade part-time and earn a steady secondary income.",
    gradient: "from-blue-500 to-blue-700",
  },
  {
    id: 4,
    name: "Emma Wilson",
    role: "Software Developer",
    avatar: "EW",
    rating: 5,
    course: "Algorithmic Trading",
    result: "+320% ROI",
    text: "The algorithmic trading module is exceptional. I learned to automate my strategies and now run multiple trading bots. The community support is invaluable.",
    gradient: "from-green-500 to-green-700",
  },
  {
    id: 5,
    name: "James Thompson",
    role: "Retired Army Officer",
    avatar: "JT",
    rating: 5,
    course: "Risk Management Mastery",
    result: "+150% ROI",
    text: "At 55, I thought it was too late to learn trading. BIFX proved me wrong. Their patient, step-by-step approach made everything clear. Best retirement decision I made!",
    gradient: "from-red-500 to-red-700",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("");

  const goToSlide = useCallback(
    (index) => {
      if (index === currentIndex || isAnimating) return;
      setDirection(index > currentIndex ? "right" : "left");
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [currentIndex, isAnimating],
  );

  const goToPrevious = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 6000);

    return () => clearInterval(timer);
  }, [isAnimating, goToNext]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
        <div
          className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <AnimatedSection animation="fadeInUp">
            <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-300 text-sm font-medium mb-6">
              Success Stories
            </span>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              What Our <span className="text-green-400">Students</span> Say
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Join thousands of satisfied traders who have transformed their
              financial future with BIFX.
            </p>
          </AnimatedSection>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-10 w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 hover:border-green-500 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-10 w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 hover:border-green-500 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonial Card */}
          <AnimatedSection
            key={currentTestimonial.id}
            animation="fadeIn"
            className="w-full"
          >
            <div className="relative bg-gray-900/50 border border-gray-800 rounded-3xl p-8 md:p-12">
              {/* Quote Icon */}
              <div className="absolute top-6 right-8">
                <Quote className="w-12 h-12 text-green-500/20" />
              </div>

              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                {/* Avatar */}
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentTestimonial.gradient} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
                >
                  {currentTestimonial.avatar}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white mb-1">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-gray-400 mb-2">
                    {currentTestimonial.role}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-amber-400 fill-amber-400"
                        />
                      ))}
                    </div>
                    <span className="text-green-400 text-sm font-medium">
                      {currentTestimonial.course}
                    </span>
                  </div>
                </div>

                {/* Result Badge */}
                <div className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/30">
                  <span className="text-green-400 font-bold">
                    {currentTestimonial.result}
                  </span>
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                "{currentTestimonial.text}"
              </p>

              {/* Progress Indicators */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-green-400 w-8"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { value: "50K+", label: "Happy Students" },
              { value: "4.9/5", label: "Average Rating" },
              { value: "98%", label: "Would Recommend" },
            ].map((stat, index) => (
              <AnimatedSection
                key={index}
                animation="fadeInUp"
                delay={0.3 + index * 0.1}
              >
                <div className="text-center p-4 rounded-xl bg-gray-900/30 border border-gray-800/50">
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
