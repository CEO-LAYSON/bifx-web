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
import AnimatedSection from "../ui/AnimatedSection";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 50,
        y: (e.clientY / window.innerHeight) * 50,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const stats = [
    { icon: Users, value: "50K+", label: "Active Traders" },
    { icon: Award, value: "98%", label: "Success Rate" },
    { icon: TrendingUp, value: "$2B+", label: "Trading Volume" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      {/* Animated Background Gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(139, 92, 246, 0.4) 0%, 
            rgba(255, 215, 0, 0.1) 50%, 
            transparent 100%)`,
          transition: "background 0.3s ease",
        }}
      />

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <AnimatedSection animation="fadeInUp" delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-sm text-purple-300 font-medium">
                #1 Forex Trading Education Platform
              </span>
            </div>
          </AnimatedSection>

          {/* Main Heading */}
          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Master the Art of</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-amber-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                Forex Trading
              </span>
            </h1>
          </AnimatedSection>

          {/* Subheading */}
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Join over 50,000 traders who have transformed their financial
              future with our comprehensive, expert-led trading courses. Start
              your journey to financial independence today.
            </p>
          </AnimatedSection>

          {/* CTA Buttons */}
          <AnimatedSection animation="fadeInUp" delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to="/register"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-1"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Learning Free
                  <ArrowRight
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isHovered ? "translate-x-1" : ""
                    }`}
                  />
                </span>
                {/* Ripple Effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <Link
                to="/courses"
                className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:border-amber-400 hover:text-amber-400"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </Link>
            </div>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection animation="fadeInUp" delay={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 hover:bg-gray-900/80 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                      <stat.icon className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Scroll Indicator */}
          <AnimatedSection animation="fadeIn" delay={0.8}>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <span className="text-sm">Scroll to explore</span>
                <ChevronRight className="w-5 h-5 rotate-[-90deg]" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
