import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  Star,
  Zap,
  Shield,
  Globe,
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
    highlight: "98% Success Rate",
  },
  {
    id: 2,
    badge: "Advanced Programming",
    headline: "Code Your Future",
    subheadline:
      "Master software development with hands-on projects. Build real-world applications from day one.",
    ctaPrimary: "Explore Coding Courses",
    ctaSecondary: "View Curriculum",
    highlight: "500+ Projects",
  },
  {
    id: 3,
    badge: "Expert-Led Workshops",
    headline: "Technology Workshops",
    subheadline:
      "Interactive sessions with industry experts. Learn cutting-edge skills in collaborative environments.",
    ctaPrimary: "Join a Workshop",
    ctaSecondary: "Learn More",
    highlight: "Live Sessions",
  },
  {
    id: 4,
    badge: "Modern Learning",
    headline: "Digital Learning Environments",
    subheadline:
      "Immersive education that adapts to your learning style. Study anywhere, anytime.",
    ctaPrimary: "Get Started",
    ctaSecondary: "View Demo",
    highlight: "24/7 Access",
  },
  {
    id: 5,
    badge: "Live Interactive Sessions",
    headline: "Virtual Classrooms",
    subheadline:
      "Real-time learning with expert instructors. Ask questions and get instant answers.",
    ctaPrimary: "Book a Session",
    ctaSecondary: "View Schedule",
    highlight: "Real-time Q&A",
  },
  {
    id: 6,
    badge: "Data-Driven Trading",
    headline: "Financial Analytics",
    subheadline:
      "Master data-driven trading strategies. Make informed decisions with advanced analytics.",
    ctaPrimary: "Start Trading",
    ctaSecondary: "Learn Analysis",
    highlight: "$2B+ Traded",
  },
  {
    id: 7,
    badge: "Full-Stack Development",
    headline: "Software Development",
    subheadline:
      "Build real-world applications from scratch. Go from beginner to professional developer.",
    ctaPrimary: "Start Coding",
    ctaSecondary: "View Projects",
    highlight: "Career Ready",
  },
  {
    id: 8,
    badge: "Hands-On Labs",
    headline: "Tech Practice Labs",
    subheadline:
      "Hands-on experience with cutting-edge tools. Practice makes perfect.",
    ctaPrimary: "Access Labs",
    ctaSecondary: "View Tools",
    highlight: "50+ Tools",
  },
];

const HeroContentOverlay = ({ currentIndex = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeStat, setActiveStat] = useState(null);
  const content = SLIDE_CONTENT[currentIndex];

  // Animate content on slide change
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Active Learners",
      description: "Growing community",
      color: "purple",
    },
    {
      icon: Award,
      value: "98%",
      label: "Success Rate",
      description: "Proven results",
      color: "gold",
    },
    {
      icon: TrendingUp,
      value: "$2B+",
      label: "Trading Volume",
      description: "Market impact",
      color: "emerald",
    },
  ];

  const features = [
    { icon: Zap, text: "Instant Access" },
    { icon: Shield, text: "Secure Learning" },
    { icon: Globe, text: "Global Community" },
  ];

  return (
    <div
      className={`relative z-10 w-full transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-12 md:py-20 lg:py-28">
        <div className="max-w-4xl">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800/80 border border-accent-purple/30 mb-6 backdrop-blur-md shadow-premium-sm animate-fade-in-down">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-purple opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-purple"></span>
            </span>
            <span className="text-sm text-gray-200 font-medium">
              {content.badge}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-accent-gold ml-2">
              <Star className="w-3 h-3 fill-current" />
              {content.highlight}
            </span>
          </div>

          {/* Main Heading - Enhanced Typography */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 lg:mb-6 leading-tight">
            <span className="text-white">{content.headline}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-primary-purple to-accent-purpleLight mt-2">
              Like a Pro
            </span>
          </h1>

          {/* Subheading - Enhanced */}
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl lg:max-w-2xl mb-8 leading-relaxed">
            {content.subheadline}
            <span className="hidden sm:inline">
              {" "}
              Join our community of successful traders and developers who have
              transformed their careers with BIFX.
            </span>
          </p>

          {/* CTA Buttons - Premium Style */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link
              to="/register"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-purple via-primary-purple to-accent-purpleLight text-white font-bold rounded-premium-lg overflow-hidden transition-all duration-300 hover:shadow-premium-glow hover:-translate-y-1 text-base"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Shimmer effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />

              <span className="relative z-10 flex items-center gap-2">
                {content.ctaPrimary}
                <ArrowRight
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isHovered ? "translate-x-1" : ""
                  }`}
                />
              </span>
            </Link>

            <Link
              to="/courses"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-dark-600 text-white font-semibold rounded-premium-lg overflow-hidden transition-all duration-300 hover:border-accent-gold/50 hover:text-accent-gold hover:bg-accent-gold/5 text-base backdrop-blur-sm"
            >
              <Play className="w-5 h-5" />
              {content.ctaSecondary}
            </Link>
          </div>

          {/* Trust indicators - Premium style */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-gray-400"
              >
                <div className="p-1.5 rounded-lg bg-dark-800 border border-dark-700">
                  <feature.icon className="w-4 h-4 text-accent-purple" />
                </div>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Stats - Premium Card Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveStat(index)}
                onMouseLeave={() => setActiveStat(null)}
                className="group p-6 rounded-premium-lg bg-gradient-to-br from-dark-800/80 to-dark-900/80 backdrop-blur-md border border-dark-700 hover:border-accent-purple/50 transition-all duration-500 cursor-default relative overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                  transform:
                    activeStat === index ? "translateY(-4px)" : "translateY(0)",
                }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-accent-purple/10 to-transparent rounded-bl-full" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`p-2.5 rounded-xl bg-gradient-to-br ${
                        stat.color === "purple"
                          ? "from-accent-purple/20 to-accent-purple/5"
                          : stat.color === "gold"
                          ? "from-accent-gold/20 to-accent-gold/5"
                          : "from-accent-emerald/20 to-accent-emerald/5"
                      } border border-white/5`}
                    >
                      <stat.icon
                        className={`w-5 h-5 ${
                          stat.color === "purple"
                            ? "text-accent-purple"
                            : stat.color === "gold"
                            ? "text-accent-gold"
                            : "text-accent-emerald"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {stat.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator - Premium Style */}
        <div className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center gap-3">
          <span className="text-sm text-gray-500 font-medium">
            Scroll to explore
          </span>
          <div className="group flex flex-col items-center gap-1 cursor-pointer">
            <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-1 group-hover:border-accent-purple/50 transition-colors">
              <div className="w-1.5 h-2.5 bg-gray-500 rounded-full animate-float group-hover:bg-accent-purple transition-colors" />
            </div>
            <ChevronRight className="w-4 h-4 text-gray-500 -rotate-90 group-hover:text-accent-purple transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContentOverlay;
