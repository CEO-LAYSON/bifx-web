import React from "react";
import {
  Video,
  BarChart3,
  Users,
  Award,
  Clock,
  Shield,
  Globe,
  Zap,
  BookOpen,
  MessageCircle,
  Target,
  TrendingUp,
} from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";

const features = [
  {
    icon: Video,
    title: "HD Video Courses",
    description:
      "Crystal clear video lessons with advanced charting and real market examples.",
    color: "purple",
  },
  {
    icon: BarChart3,
    title: "Live Trading Sessions",
    description:
      "Watch expert traders in action with real-time market analysis and strategies.",
    color: "amber",
  },
  {
    icon: Users,
    title: "Community Support",
    description:
      "Join thousands of traders in our exclusive community forums and Discord.",
    color: "blue",
  },
  {
    icon: Award,
    title: "Certified Certificates",
    description:
      "Earn industry-recognized certificates upon course completion.",
    color: "green",
  },
  {
    icon: Clock,
    title: "24/7 Access",
    description:
      "Learn at your own pace with lifetime access to all course materials.",
    color: "red",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description:
      "Master proper risk techniques to protect your capital and grow consistently.",
    color: "cyan",
  },
  {
    icon: Globe,
    title: "Global Markets",
    description:
      "Learn to trade Forex, Crypto, Indices, and Commodities all in one place.",
    color: "indigo",
  },
  {
    icon: Zap,
    title: "Quick Start Guides",
    description:
      "Get up and running fast with our beginner-friendly quick start modules.",
    color: "yellow",
  },
  {
    icon: BookOpen,
    title: "E-Books & Resources",
    description:
      "Download comprehensive e-books and reference materials for offline study.",
    color: "pink",
  },
  {
    icon: MessageCircle,
    title: "1-on-1 Mentorship",
    description:
      "Personal guidance from certified trading mentors for accelerated learning.",
    color: "orange",
  },
  {
    icon: Target,
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed progress analytics.",
    color: "teal",
  },
  {
    icon: TrendingUp,
    title: "Advanced Strategies",
    description:
      "Master price action, swing trading, and algorithmic trading concepts.",
    color: "violet",
  },
];

const colorClasses = {
  purple:
    "from-purple-500 to-purple-700 group-hover:from-purple-400 group-hover:to-purple-600",
  amber:
    "from-amber-500 to-amber-700 group-hover:from-amber-400 group-hover:to-amber-600",
  blue: "from-blue-500 to-blue-700 group-hover:from-blue-400 group-hover:to-blue-600",
  green:
    "from-green-500 to-green-700 group-hover:from-green-400 group-hover:to-green-600",
  red: "from-red-500 to-red-700 group-hover:from-red-400 group-hover:to-red-600",
  cyan: "from-cyan-500 to-cyan-700 group-hover:from-cyan-400 group-hover:to-cyan-600",
  indigo:
    "from-indigo-500 to-indigo-700 group-hover:from-indigo-400 group-hover:to-indigo-600",
  yellow:
    "from-yellow-500 to-yellow-700 group-hover:from-yellow-400 group-hover:to-yellow-600",
  pink: "from-pink-500 to-pink-700 group-hover:from-pink-400 group-hover:to-pink-600",
  orange:
    "from-orange-500 to-orange-700 group-hover:from-orange-400 group-hover:to-orange-600",
  teal: "from-teal-500 to-teal-700 group-hover:from-teal-400 group-hover:to-teal-600",
  violet:
    "from-violet-500 to-violet-700 group-hover:from-violet-400 group-hover:to-violet-600",
};

const iconBgClasses = {
  purple: "bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20",
  amber: "bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20",
  blue: "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20",
  green: "bg-green-500/10 text-green-400 group-hover:bg-green-500/20",
  red: "bg-red-500/10 text-red-400 group-hover:bg-red-500/20",
  cyan: "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20",
  indigo: "bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20",
  yellow: "bg-yellow-500/10 text-yellow-400 group-hover:bg-yellow-500/20",
  pink: "bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20",
  orange: "bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20",
  teal: "bg-teal-500/10 text-teal-400 group-hover:bg-teal-500/20",
  violet: "bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20",
};

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <AnimatedSection animation="fadeInUp">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-medium mb-6">
              Why Choose BIFX
            </span>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Everything You Need to Become a
              <span className="text-purple-400"> Profitable Trader</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools, resources, and
              support you need to master forex trading and achieve financial
              independence.
            </p>
          </AnimatedSection>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <AnimatedSection
              key={index}
              animation="fadeInUp"
              delay={0.1 * (index + 1)}
            >
              <div className="group p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${
                    iconBgClasses[feature.color]
                  }`}
                >
                  <feature.icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed text-sm">
                  {feature.description}
                </p>

                {/* Hover Arrow */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-purple-400 text-sm font-medium flex items-center gap-1">
                    Learn more
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection animation="fadeInUp" delay={0.5}>
          <div className="text-center mt-16">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800 text-white font-semibold rounded-xl border border-gray-700 hover:border-purple-500 hover:bg-gray-900 transition-all duration-300">
              View All Features
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
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FeaturesSection;
