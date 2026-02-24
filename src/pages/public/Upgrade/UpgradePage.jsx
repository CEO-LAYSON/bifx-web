import React from "react";
import { Check, Star, Zap, Crown } from "lucide-react";
import Button from "../../../components/ui/Button";
import LandingHeader from "../../../components/layout/LandingHeader";
import AnimatedSection from "../../../components/ui/AnimatedSection";

const UpgradePage = () => {
  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      period: "month",
      description: "Perfect for beginners",
      features: [
        "Access to basic courses",
        "Community support",
        "Progress tracking",
        "Mobile app access",
      ],
      icon: Star,
      popular: false,
      gradient: "from-blue-500 to-blue-700",
      borderColor: "border-white/10",
    },
    {
      name: "Pro",
      price: "$19.99",
      period: "month",
      description: "Most popular choice",
      features: [
        "All Basic features",
        "Premium courses access",
        "Live session recordings",
        "Certificate downloads",
        "Priority support",
        "Advanced analytics",
      ],
      icon: Zap,
      popular: true,
      gradient: "from-accent-purple to-purple-700",
      borderColor: "border-accent-purple/50",
    },
    {
      name: "Premium",
      price: "$29.99",
      period: "month",
      description: "For serious traders",
      features: [
        "All Pro features",
        "1-on-1 mentoring",
        "Live trading sessions",
        "Custom strategy development",
        "VIP community access",
        "API access",
      ],
      icon: Crown,
      popular: false,
      gradient: "from-accent-gold to-amber-600",
      borderColor: "border-white/10",
    },
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      <LandingHeader />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 py-16 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-accent-purple/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-accent-gold/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fadeInUp">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Upgrade Your Learning
              <span className="block bg-gradient-to-r from-accent-purple to-purple-400 bg-clip-text text-transparent">
                Experience
              </span>
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 group">
              Unlock premium courses, live sessions, and expert mentorship to
              accelerate your forex trading journey.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <div className="flex items-center justify-center space-x-8 text-gray-400">
              <div className="flex items-center group cursor-default">
                <div className="w-8 h-8 rounded-full bg-accent-emerald/20 border border-accent-emerald/30 flex items-center justify-center mr-2 group-hover:shadow-premium-glow group-hover:shadow-accent-emerald/20 transition-all duration-300">
                  <Check className="w-4 h-4 text-accent-emerald" />
                </div>
                <span className="group-hover:text-white transition-colors duration-300">
                  30-day money back
                </span>
              </div>
              <div className="flex items-center group cursor-default">
                <div className="w-8 h-8 rounded-full bg-accent-emerald/20 border border-accent-emerald/30 flex items-center justify-center mr-2 group-hover:shadow-premium-glow group-hover:shadow-accent-emerald/20 transition-all duration-300">
                  <Check className="w-4 h-4 text-accent-emerald" />
                </div>
                <span className="group-hover:text-white transition-colors duration-300">
                  Cancel anytime
                </span>
              </div>
              <div className="flex items-center group cursor-default">
                <div className="w-8 h-8 rounded-full bg-accent-emerald/20 border border-accent-emerald/30 flex items-center justify-center mr-2 group-hover:shadow-premium-glow group-hover:shadow-accent-emerald/20 transition-all duration-300">
                  <Check className="w-4 h-4 text-accent-emerald" />
                </div>
                <span className="group-hover:text-white transition-colors duration-300">
                  Secure payment
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-accent-purple/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <AnimatedSection
                key={plan.name}
                animation="fadeInUp"
                delay={0.3 + index * 0.1}
              >
                <div
                  className={`relative bg-gradient-to-br from-dark-900/80 to-dark-800/50 rounded-2xl border ${
                    plan.borderColor
                  } p-8 hover:shadow-premium-glow transition-all duration-500 group ${
                    plan.popular
                      ? "shadow-premium-xl shadow-accent-purple/20"
                      : ""
                  }`}
                >
                  {/* Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
                  ></div>

                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="bg-gradient-to-r from-accent-purple to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-premium-glow animate-pulse">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-6 relative z-10">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-premium-glow group-hover:scale-110 transition-transform duration-500`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-gold transition-colors duration-300">
                      {plan.name}
                    </h3>
                    <p className="text-gray-400 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-accent-gold group-hover:to-amber-400 transition-all duration-300">
                        {plan.price}
                      </span>
                      <span className="text-gray-400 ml-2">/{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 relative z-10">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300"
                      >
                        <div className="w-6 h-6 rounded-full bg-accent-emerald/20 border border-accent-emerald/30 flex items-center justify-center mr-3 flex-shrink-0 group-hover:shadow-premium-glow group-hover:shadow-accent-emerald/10 transition-all duration-300">
                          <Check className="w-3 h-3 text-accent-emerald" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? "primary" : "outline"}
                    className="w-full relative z-10"
                    size="lg"
                  >
                    {plan.popular ? "Start Pro Trial" : `Choose ${plan.name}`}
                  </Button>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-accent-purple/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-12">
            <AnimatedSection animation="fadeInUp">
              <h2 className="text-3xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <p className="text-gray-400">
                Everything you need to know about our plans
              </p>
            </AnimatedSection>
          </div>

          <div className="space-y-6">
            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-accent-purple/30 hover:shadow-premium-glow hover:shadow-accent-purple/10 transition-all duration-300 group">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-gold transition-colors duration-300">
                  Can I cancel anytime?
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  Yes, you can cancel your subscription at any time. You'll
                  continue to have access until the end of your billing period.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.3}>
              <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-accent-purple/30 hover:shadow-premium-glow hover:shadow-accent-purple/10 transition-all duration-300 group">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-gold transition-colors duration-300">
                  Do you offer refunds?
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  We offer a 30-day money-back guarantee. If you're not
                  satisfied, contact our support team for a full refund.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.4}>
              <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-accent-purple/30 hover:shadow-premium-glow hover:shadow-accent-purple/10 transition-all duration-300 group">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-gold transition-colors duration-300">
                  Can I change plans?
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  Absolutely! You can upgrade or downgrade your plan at any
                  time. Changes take effect immediately.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
