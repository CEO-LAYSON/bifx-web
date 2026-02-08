import React from "react";
import { Link } from "react-router-dom";
import {
  Target,
  TrendingUp,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  Play,
} from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";

const AboutSection = () => {
  const highlights = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To democratize forex trading education and empower individuals worldwide to achieve financial freedom through proper education and mentoring.",
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description:
        "Award-winning platform recognized by leading financial institutions for excellence in trading education and investor protection.",
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description:
        "Learn from certified traders with combined experience of 50+ years in global financial markets.",
    },
  ];

  const achievements = [
    { value: "50K+", label: "Students Trained" },
    { value: "150+", label: "Expert Courses" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Support Available" },
  ];

  const values = [
    "✓ Comprehensive curriculum for all skill levels",
    "✓ Live trading sessions with real market analysis",
    "✓ 24/7 community support and mentorship",
    "✓ Industry-recognized certification programs",
    "✓ Cutting-edge trading tools and resources",
    "✓ Risk-free demo environment for practice",
  ];

  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
        <div
          className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div>
            <AnimatedSection animation="fadeInUp">
              <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-medium mb-6">
                About BIFX
              </span>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Empowering Traders Worldwide Since
                <span className="text-amber-400"> 2019</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                BIFX (Business Intelligence Forex) is a leading forex trading
                education platform dedicated to transforming aspiring traders
                into confident, profitable market participants. Our mission is
                to provide world-class trading education that combines
                theoretical knowledge with practical application.
              </p>
            </AnimatedSection>

            {/* Highlights */}
            <div className="space-y-6 mb-10">
              {highlights.map((item, index) => (
                <AnimatedSection
                  key={index}
                  animation="fadeInUp"
                  delay={0.2 + index * 0.1}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Values List */}
            <AnimatedSection animation="fadeInUp" delay={0.5}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-300 text-sm"
                  >
                    <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{value.replace("✓", "")}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* CTA */}
            <AnimatedSection animation="fadeInUp" delay={0.6}>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-gray-900 font-semibold rounded-xl hover:bg-amber-400 transition-all duration-300"
                >
                  Start Learning
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-700 text-white font-semibold rounded-xl hover:border-amber-500 hover:text-amber-400 transition-all duration-300">
                  <Play className="w-5 h-5" />
                  Watch Our Story
                </button>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Side - Image/Stats */}
          <div className="relative">
            <AnimatedSection animation="slideInRight" delay={0.3}>
              {/* Main Card */}
              <div className="relative rounded-3xl overflow-hidden bg-gray-900 border border-gray-800">
                {/* Image Placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <TrendingUp className="w-12 h-12 text-amber-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Trading Excellence
                    </h3>
                    <p className="text-gray-400">
                      Learn from the best in the industry
                    </p>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 to-transparent">
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.map((stat, index) => (
                      <div
                        key={index}
                        className="text-center p-4 rounded-xl bg-gray-800/80 backdrop-blur-sm"
                      >
                        <div className="text-2xl font-bold text-amber-400">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-400">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold">Award Winning</div>
                    <div className="text-purple-200 text-sm">
                      Best Education Platform 2023
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-4 -left-4 p-4 rounded-2xl bg-gray-800 border border-gray-700 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">
                      +156% Profit
                    </div>
                    <div className="text-gray-400 text-xs">
                      Average student gain
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
