import React from "react";
import { Link } from "react-router-dom";
import { Play, Star, Users, Award } from "lucide-react";
import { ROUTES } from "../../../utils/constants/routes";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-black to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Master Forex Trading with{" "}
              <span className="text-primary-gold">BIFX</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Comprehensive forex education platform with expert-led courses,
              live trading sessions, and personalized learning paths. Start your
              journey to financial freedom today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link
                to={ROUTES.COURSES}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-purple text-white rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors"
              >
                <Play size={20} className="mr-2" />
                Start Learning Free
              </Link>

              <Link
                to={ROUTES.REGISTER}
                className="inline-flex items-center justify-center px-8 py-4 border border-primary-gold text-primary-gold rounded-lg font-semibold text-lg hover:bg-yellow-500 hover:text-black transition-colors"
              >
                Join Premium
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-gray-300">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-primary-gold mr-2" />
                <span>500+ Students</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-primary-gold mr-2" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 text-primary-gold mr-2" />
                <span>Expert Instructors</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Video Placeholder */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-purple to-primary-gold p-1 rounded-2xl">
              <div className="bg-black rounded-2xl p-8">
                <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary-purple rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play size={32} className="text-white ml-1" />
                    </div>
                    <p className="text-gray-400">Course Preview</p>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 bg-primary-gold text-black px-4 py-2 rounded-lg font-bold">
                  Foundation Course
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary-purple text-white px-4 py-2 rounded-lg font-bold">
                  $70
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
