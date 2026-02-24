import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  ArrowRight,
  TrendingUp,
  Shield,
  Clock,
  Award,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    product: [
      { label: "Courses", href: "/courses" },
      { label: "Live Sessions", href: "/live-sessions" },
      { label: "Trading Tools", href: "/tools" },
      { label: "Pricing", href: "/pricing" },
      { label: "What's New", href: "/changelog" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
    resources: [
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/api" },
      { label: "Community", href: "/community" },
      { label: "Help Center", href: "/help" },
      { label: "Status", href: "/status" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Security", href: "/security" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];

  const trustBadges = [
    { icon: Shield, label: "SSL Secured" },
    { icon: Award, label: "Award Winning" },
    { icon: Clock, label: "24/7 Support" },
  ];

  return (
    <footer className="relative bg-dark-950 border-t border-white/10 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-accent-purple/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tl from-accent-gold/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/5 to-accent-gold/5 pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Stay Ahead of the Markets
              </h3>
              <p className="text-gray-400">
                Get trading tips, market insights, and exclusive offers
                delivered to your inbox.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex w-full md:w-auto gap-3"
            >
              <div className="relative flex-1 md:w-80 group">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 to-accent-gold/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-hover:text-accent-purple transition-colors duration-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="relative w-full pl-12 pr-4 py-3.5 bg-dark-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple/50 focus:ring-2 focus:ring-accent-purple/20 transition-all duration-300 hover:bg-dark-900/70"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 bg-gradient-to-r from-accent-purple via-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-purple-600 transition-all duration-300 flex items-center gap-2 shadow-premium-glow hover:shadow-accent-purple/30 group"
              >
                <span className="relative z-10">Subscribe</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl"></div>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-gold flex items-center justify-center shadow-premium-glow group-hover:scale-105 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white group-hover:text-accent-gold transition-colors duration-300">
                BIFX
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 group-hover:text-gray-300 transition-colors duration-300">
              Empowering traders worldwide with world-class forex trading
              education and tools.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-dark-900/50 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-800 hover:border-accent-purple/50 hover:shadow-premium-glow hover:shadow-accent-purple/20 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-accent-purple to-accent-cyan rounded-full"></div>
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-accent-purple text-sm transition-all duration-200 hover:translate-x-1 inline-flex items-center"
                  >
                    <span className="opacity-0 group-hover:opacity-100 mr-1 text-xs">
                      →
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-accent-gold to-yellow-400 rounded-full"></div>
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-accent-purple text-sm transition-all duration-200 hover:translate-x-1 inline-flex items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-accent-emerald to-teal-400 rounded-full"></div>
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-accent-purple text-sm transition-all duration-200 hover:translate-x-1 inline-flex items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-rose-500 to-red-400 rounded-full"></div>
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-accent-purple text-sm transition-all duration-200 hover:translate-x-1 inline-flex items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="text-accent-gold font-semibold">BIFX</span>. All
              rights reserved. Trading involves risk. Past performance does not
              guarantee future results.
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors duration-300"
                >
                  <badge.icon className="w-4 h-4 text-accent-purple" />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {isSubscribed && (
        <div className="fixed bottom-8 right-8 z-50 animate-bounce">
          <div className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg flex items-center gap-2 shadow-emerald-500/30">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            Thanks for subscribing!
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
