import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
} from "lucide-react";

// Slide data for content
const SLIDE_CONTENT = [
  {
    id: 1,
    badge: "#1 Forex Trading Platform",
    headline: "Master Forex Trading",
    subheadline:
      "Learn to analyze markets and execute profitable trades with precision. Join thousands of successful traders.",
    ctaPrimary: "Start Learning Free",
    ctaSecondary: "View Courses",
  },
  {
    id: 2,
    badge: "Advanced Programming",
    headline: "Code Your Future",
    subheadline:
      "Master software development with hands-on projects. Build real-world applications from day one.",
    ctaPrimary: "Explore Coding Courses",
    ctaSecondary: "View Curriculum",
  },
  {
    id: 3,
    badge: "Expert-Led Workshops",
    headline: "Technology Workshops",
    subheadline:
      "Interactive sessions with industry experts. Learn cutting-edge skills in collaborative environments.",
    ctaPrimary: "Join a Workshop",
    ctaSecondary: "Learn More",
  },
  {
    id: 4,
    badge: "Modern Learning",
    headline: "Digital Learning Environments",
    subheadline:
      "Immersive education that adapts to your learning style. Study anywhere, anytime.",
    ctaPrimary: "Get Started",
    ctaSecondary: "View Demo",
  },
  {
    id: 5,
    badge: "Live Interactive Sessions",
    headline: "Virtual Classrooms",
    subheadline:
      "Real-time learning with expert instructors. Ask questions and get instant answers.",
    ctaPrimary: "Book a Session",
    ctaSecondary: "View Schedule",
  },
  {
    id: 6,
    badge: "Data-Driven Trading",
    headline: "Financial Analytics",
    subheadline:
      "Master data-driven trading strategies. Make informed decisions with advanced analytics.",
    ctaPrimary: "Start Trading",
    ctaSecondary: "Learn Analysis",
  },
  {
    id: 7,
    badge: "Full-Stack Development",
    headline: "Software Development",
    subheadline:
      "Build real-world applications from scratch. Go from beginner to professional developer.",
    ctaPrimary: "Start Coding",
    ctaSecondary: "View Projects",
  },
  {
    id: 8,
    badge: "Hands-On Labs",
    headline: "Tech Practice Labs",
    subheadline:
      "Hands-on experience with cutting-edge tools. Practice makes perfect.",
    ctaPrimary: "Access Labs",
    ctaSecondary: "View Tools",
  },
];

const HeroContentOverlay = ({ currentIndex = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const content = SLIDE_CONTENT[currentIndex];

  // Animate content on slide change
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const stats = [
    { icon: Users, value: "50K+", label: "Active Learners" },
    { icon: Award, value: "98%", label: "Success Rate" },
    { icon: TrendingUp, value: "$2B+", label: "Trading Volume" },
  ];

  return (
    <div
      className={`relative z-10 w-full transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-12 md:py-20 lg:py-28">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4 sm:mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-xs sm:text-sm text-purple-300 font-medium">
              {content.badge}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 lg:mb-6 leading-tight">
            <span className="text-white">{content.headline}</span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-xl lg:max-w-2xl mb-6 sm:mb-8 leading-relaxed">
            {content.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 lg:mb-12">
            <Link
              to="/register"
              className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-7 lg:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 text-sm sm:text-base"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="relative z-10 flex items-center gap-2">
                {content.ctaPrimary}
                <ArrowRight
                  className={`w-4 h-4 sm:w-5 h-5 transition-transform duration-300 ${
                    isHovered ? "translate-x-1" : ""
                  }`}
                />
              </span>
              {/* Gradient shimmer effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-purple-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <Link
              to="/courses"
              className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 lg:px-8 py-3 sm:py-4 border-2 border-white/20 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:border-amber-400/50 hover:text-amber-400 hover:bg-amber-400/5 text-sm sm:text-base"
            >
              <Play className="w-4 h-4 sm:w-5 h-5" />
              {content.ctaSecondary}
            </Link>
          </div>

          {/* Stats - Hidden on xs, visible on sm and above */}
          <div className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group p-3 sm:p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                    <stat.icon className="w-4 h-4 sm:w-5 h-5 text-purple-400" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator - Hidden on small screens */}
        <div className="hidden md:block absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-sm">Scroll to explore</span>
            <ChevronRight className="w-5 h-5 rotate-[-90deg]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContentOverlay;
