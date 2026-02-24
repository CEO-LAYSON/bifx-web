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
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "../ui/AnimatedSection";

const features = [
  {
    icon: Video,
    title: "HD Video Courses",
    description:
      "Crystal clear video lessons with advanced charting and real market examples.",
    color: "purple",
    stats: "500+ Videos",
  },
  {
    icon: BarChart3,
    title: "Live Trading Sessions",
    description:
      "Watch expert traders in action with real-time market analysis and strategies.",
    color: "gold",
    stats: "50+ Sessions/Month",
  },
  {
    icon: Users,
    title: "Community Support",
    description:
      "Join thousands of traders in our exclusive community forums and Discord.",
    color: "cyan",
    stats: "50K+ Members",
  },
  {
    icon: Award,
    title: "Certified Certificates",
    description:
      "Earn industry-recognized certificates upon course completion.",
    color: "emerald",
    stats: "Industry Recognized",
  },
  {
    icon: Clock,
    title: "24/7 Access",
    description:
      "Learn at your own pace with lifetime access to all course materials.",
    color: "rose",
    stats: "Lifetime Access",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description:
      "Master proper risk techniques to protect your capital and grow consistently.",
    color: "blue",
    stats: "Proven Strategies",
  },
  {
    icon: Globe,
    title: "Global Markets",
    description:
      "Learn to trade Forex, Crypto, Indices, and Commodities all in one place.",
    color: "indigo",
    stats: "200+ Markets",
  },
  {
    icon: Zap,
    title: "Quick Start Guides",
    description:
      "Get up and running fast with our beginner-friendly quick start modules.",
    color: "yellow",
    stats: "Start in 5 Min",
  },
  {
    icon: BookOpen,
    title: "E-Books & Resources",
    description:
      "Download comprehensive e-books and reference materials for offline study.",
    color: "pink",
    stats: "100+ Resources",
  },
  {
    icon: MessageCircle,
    title: "1-on-1 Mentorship",
    description:
      "Personal guidance from certified trading mentors for accelerated learning.",
    color: "orange",
    stats: "Expert Mentors",
  },
  {
    icon: Target,
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed progress analytics.",
    color: "teal",
    stats: "Real-time Analytics",
  },
  {
    icon: TrendingUp,
    title: "Advanced Strategies",
    description:
      "Master price action, swing trading, and algorithmic trading concepts.",
    color: "violet",
    stats: "25+ Strategies",
  },
];

const colorClasses = {
  purple: "from-accent-purple/20 to-primary-purple/10 border-accent-purple/30",
  gold: "from-accent-gold/20 to-accent-goldDark/10 border-accent-gold/30",
  cyan: "from-accent-cyan/20 to-accent-cyan/10 border-accent-cyan/30",
  emerald:
    "from-accent-emerald/20 to-accent-emerald/10 border-accent-emerald/30",
  rose: "from-rose-500/20 to-rose-500/10 border-rose-500/30",
  blue: "from-blue-500/20 to-blue-500/10 border-blue-500/30",
  indigo: "from-indigo-500/20 to-indigo-500/10 border-indigo-500/30",
  yellow: "from-yellow-500/20 to-yellow-500/10 border-yellow-500/30",
  pink: "from-pink-500/20 to-pink-500/10 border-pink-500/30",
  orange: "from-orange-500/20 to-orange-500/10 border-orange-500/30",
  teal: "from-teal-500/20 to-teal-500/10 border-teal-500/30",
  violet: "from-violet-500/20 to-violet-500/10 border-violet-500/30",
};

const iconColorClasses = {
  purple: "bg-accent-purple/20 text-accent-purple",
  gold: "bg-accent-gold/20 text-accent-gold",
  cyan: "bg-accent-cyan/20 text-accent-cyan",
  emerald: "bg-accent-emerald/20 text-accent-emerald",
  rose: "bg-rose-500/20 text-rose-500",
  blue: "bg-blue-500/20 text-blue-500",
  indigo: "bg-indigo-500/20 text-indigo-500",
  yellow: "bg-yellow-500/20 text-yellow-500",
  pink: "bg-pink-500/20 text-pink-500",
  orange: "bg-orange-500/20 text-orange-500",
  teal: "bg-teal-500/20 text-teal-500",
  violet: "bg-violet-500/20 text-violet-500",
};

const hoverColorClasses = {
  purple: "hover:border-accent-purple/60 hover:shadow-premium-glow",
  gold: "hover:border-accent-gold/60 hover:shadow-premium-glow-gold",
  cyan: "hover:border-accent-cyan/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]",
  emerald:
    "hover:border-accent-emerald/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]",
  rose: "hover:border-rose-500/60 hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]",
  blue: "hover:border-blue-500/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
  indigo:
    "hover:border-indigo-500/60 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]",
  yellow:
    "hover:border-yellow-500/60 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]",
  pink: "hover:border-pink-500/60 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]",
  orange:
    "hover:border-orange-500/60 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]",
  teal: "hover:border-teal-500/60 hover:shadow-[0_0_20px_rgba(20,184,166,0.3)]",
  violet:
    "hover:border-violet-500/60 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]",
};

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-dark-950 relative overflow-hidden">
      {/* Background Elements - Premium */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-gold/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-purple/5 rounded-full blur-[150px]" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Premium */}
        <div className="text-center mb-20">
          <AnimatedSection animation="fadeInUp">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-dark-800/80 border border-accent-purple/30 backdrop-blur-md mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-purple opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-purple"></span>
              </span>
              <span className="text-accent-purpleLight text-sm font-semibold tracking-wide uppercase">
                Why Choose BIFX
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Everything You Need to Become a
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-primary-purple to-accent-purpleLight">
                Profitable Trader
              </span>
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Our comprehensive platform provides all the tools, resources, and
              support you need to master forex trading and achieve financial
              <span className="text-accent-gold"> independence</span>.
            </p>
          </AnimatedSection>
        </div>

        {/* Features Grid - Premium */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <AnimatedSection
              key={index}
              animation="fadeInUp"
              delay={0.05 * (index + 1)}
            >
              <div
                className={`group relative p-6 rounded-premium-lg bg-gradient-to-br ${
                  colorClasses[feature.color]
                } border backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 ${
                  hoverColorClasses[feature.color]
                } cursor-pointer overflow-hidden`}
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      colorClasses[feature.color].split(" ")[0]
                    } opacity-50`}
                  />
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full" />

                <div className="relative z-10">
                  {/* Icon with premium styling */}
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 ${
                      iconColorClasses[feature.color]
                    }`}
                  >
                    <feature.icon className="w-7 h-7" />
                  </div>

                  {/* Stats badge */}
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-dark-900/50 border border-dark-700 mb-4">
                    <Zap className="w-3 h-3 text-accent-gold" />
                    <span className="text-xs font-medium text-gray-300">
                      {feature.stats}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed text-sm mb-4">
                    {feature.description}
                  </p>

                  {/* Hover Arrow - Premium */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-sm font-semibold text-accent-purpleLight flex items-center gap-1">
                      Learn more
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA - Premium */}
        <AnimatedSection animation="fadeInUp" delay={0.5}>
          <div className="text-center mt-20">
            <Link
              to="/features"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-accent-purple via-primary-purple to-accent-purpleLight text-white font-bold rounded-premium-lg transition-all duration-300 hover:shadow-premium-glow hover:-translate-y-1 bg-[length:200%_100%] hover:bg-[100%_0]"
            >
              <span>View All Features</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FeaturesSection;
