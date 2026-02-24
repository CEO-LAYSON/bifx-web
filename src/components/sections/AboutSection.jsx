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
import AnimatedCounter from "../ui/AnimatedCounter";

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
    { value: "50000", suffix: "+", label: "Students Trained" },
    { value: "150", suffix: "+", label: "Expert Courses" },
    { value: "98", suffix: "%", label: "Satisfaction Rate" },
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
    <section className="py-24 bg-dark-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-br from-accent-purple/20 to-transparent rounded-full blur-3xl"></div>
        <div
          className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-tl from-accent-gold/10 to-transparent rounded-full blur-3xl"
          style={{ animationDelay: "1s" }}
        />
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div>
            <AnimatedSection animation="fadeInUp">
              <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-accent-gold/20 to-yellow-500/10 border border-accent-gold/30 text-accent-gold text-sm font-medium mb-6 hover:shadow-premium-glow hover:shadow-accent-gold/20 transition-all duration-300">
                About BIFX
              </span>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Empowering Traders Worldwide Since
                <span className="bg-gradient-to-r from-accent-gold to-yellow-300 bg-clip-text text-transparent">
                  {" "}
                  2019
                </span>
              </h2>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed group">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-medium">
                  BIFX
                </span>{" "}
                (Business Intelligence Forex) is a leading forex trading
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
                  <div className="flex gap-4 group p-3 rounded-xl hover:bg-white/5 transition-all duration-300">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 flex items-center justify-center border border-accent-gold/20 group-hover:border-accent-gold/40 group-hover:shadow-premium-glow group-hover:shadow-accent-gold/20 transition-all duration-300">
                      <item.icon className="w-6 h-6 text-accent-gold group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 group-hover:text-accent-gold transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
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
                    className="flex items-center gap-2 text-gray-300 text-sm hover:text-accent-gold transition-colors duration-300 group"
                  >
                    <CheckCircle className="w-4 h-4 text-accent-gold flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-gold to-yellow-400 text-gray-900 font-semibold rounded-xl hover:from-yellow-400 hover:to-accent-gold transition-all duration-300 shadow-premium-glow hover:shadow-accent-gold/40 group"
                >
                  <span className="relative z-10">Start Learning</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl"></div>
                </Link>
                <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/10 text-white font-semibold rounded-xl hover:border-accent-gold/50 hover:text-accent-gold hover:bg-accent-gold/5 transition-all duration-300 group">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Watch Our Story
                </button>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Side - Image/Stats */}
          <div className="relative">
            <AnimatedSection animation="slideInRight" delay={0.3}>
              {/* Main Card */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-dark-800 to-dark-900 border border-white/10 shadow-premium-xl">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 to-accent-gold/5 pointer-events-none"></div>

                {/* Image Placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.15),transparent_50%)]"></div>
                  <div className="text-center p-8 relative z-10">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent-gold/30 to-accent-gold/10 flex items-center justify-center border border-accent-gold/30 shadow-premium-glow shadow-accent-gold/20 group-hover:scale-105 transition-transform duration-500">
                      <TrendingUp className="w-12 h-12 text-accent-gold" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Trading Excellence
                    </h3>
                    <p className="text-gray-400">
                      Learn from the best in the industry
                    </p>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-dark-900 via-dark-900/95 to-transparent">
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.map((stat, index) => (
                      <div
                        key={index}
                        className="text-center p-4 rounded-xl bg-dark-800/80 backdrop-blur-sm border border-white/5 hover:border-accent-gold/30 hover:shadow-premium-glow hover:shadow-accent-gold/10 transition-all duration-300 group"
                      >
                        <div className="text-2xl font-bold bg-gradient-to-r from-accent-gold to-yellow-300 bg-clip-text text-transparent">
                          <AnimatedCounter
                            value={stat.value + (stat.suffix || "")}
                            duration={1500}
                          />
                        </div>
                        <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 p-4 rounded-2xl bg-gradient-to-br from-accent-purple to-purple-700 shadow-premium-glow shadow-accent-purple/30 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
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
              <div className="absolute -bottom-4 -left-4 p-4 rounded-2xl bg-dark-800/90 backdrop-blur-sm border border-white/10 shadow-premium-xl hover:border-accent-gold/30 hover:shadow-premium-glow hover:shadow-accent-gold/20 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm group-hover:text-accent-gold transition-colors duration-300">
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
