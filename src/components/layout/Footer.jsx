import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants/routes";
import {
  BookOpen,
  Users,
  Award,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black border-t border-gray-700/50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-purple/20 to-primary-gold/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-purple to-primary-gold rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <span className="text-white font-bold text-sm">BIFX</span>
              </div>
              <span className="text-white font-bold text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                BIFX
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Master forex trading with comprehensive courses, live sessions,
              and expert mentorship from industry professionals.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-purple rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <Facebook
                  size={18}
                  className="text-gray-400 hover:text-white"
                />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-purple rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <Twitter size={18} className="text-gray-400 hover:text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-purple rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <Instagram
                  size={18}
                  className="text-gray-400 hover:text-white"
                />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-purple rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <Youtube size={18} className="text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              <BookOpen className="mr-2 text-primary-gold" size={20} />
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to={ROUTES.COURSES}
                  className="text-gray-400 hover:text-primary-gold text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  All Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/my-courses"
                  className="text-gray-400 hover:text-primary-gold text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  My Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/live-sessions"
                  className="text-gray-400 hover:text-primary-gold text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Live Sessions
                </Link>
              </li>
              <li>
                <Link
                  to="/upgrade"
                  className="text-gray-400 hover:text-primary-gold text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Resources */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              <Users className="mr-2 text-primary-gold" size={20} />
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary-gold text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary-gold text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Contact Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary-gold text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Community Forum
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary-gold text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  System Status
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              <Mail className="mr-2 text-primary-gold" size={20} />
              Contact Us
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm mb-6">
              <li className="flex items-center">
                <Mail size={16} className="mr-3 text-primary-gold" />
                support@bifx.com
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-3 text-primary-gold" />
                +255 XXX XXX XXX
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-3 text-primary-gold mt-0.5" />
                <span>Dar es Salaam, Tanzania</span>
              </li>
            </ul>

            {/* Newsletter Signup */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
              <h4 className="text-white font-semibold text-sm mb-2">
                Stay Updated
              </h4>
              <p className="text-gray-400 text-xs mb-3">
                Get the latest news and updates
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg sm:rounded-r-none sm:rounded-l-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-purple"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-primary-purple to-primary-gold text-white text-sm font-semibold rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:shadow-lg transition-all duration-200 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-gray-400 text-sm">
                © 2025 BIFX. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary-gold text-sm transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary-gold text-sm transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary-gold text-sm transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Award className="text-primary-gold" size={16} />
                <span>Trusted by 10,000+ traders</span>
              </div>
              <div className="w-px h-4 bg-gray-600"></div>
              <div className="text-gray-400 text-sm">
                Made with ❤️ in Tanzania
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
