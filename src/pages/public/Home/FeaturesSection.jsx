import React from "react";
import { Video, BookOpen, Users, Award, Clock, Smartphone } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Video,
      title: "Expert Video Lessons",
      description:
        "Learn from professional traders with years of market experience through high-quality video content.",
      color: "text-purple-400",
    },
    {
      icon: BookOpen,
      title: "Structured Curriculum",
      description:
        "Follow a carefully designed learning path from beginner to advanced trading strategies.",
      color: "text-blue-400",
    },
    {
      icon: Users,
      title: "Live Trading Sessions",
      description:
        "Join real-time trading sessions and interact with instructors and fellow students.",
      color: "text-green-400",
    },
    {
      icon: Award,
      title: "Certification",
      description:
        "Earn recognized certificates upon course completion to showcase your expertise.",
      color: "text-yellow-400",
    },
    {
      icon: Clock,
      title: "Self-Paced Learning",
      description:
        "Learn at your own convenience with 24/7 access to all course materials.",
      color: "text-red-400",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description:
        "Access courses on any device with our responsive web and mobile applications.",
      color: "text-indigo-400",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          Why Learn with BIFX?
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          We provide everything you need to become a successful forex trader,
          from foundational knowledge to advanced trading strategies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-primary-purple transition-all duration-300 group"
            >
              <div
                className={`p-3 rounded-lg bg-gray-700 w-fit mb-4 group-hover:bg-primary-purple transition-colors`}
              >
                <Icon className={`h-6 w-6 ${feature.color}`} />
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;
