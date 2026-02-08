import React from "react";
import { Check, Star, Zap, Crown } from "lucide-react";
import Button from "../../../components/ui/Button";
import LandingHeader from "../../../components/layout/LandingHeader";

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
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <LandingHeader />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Upgrade Your Learning
            <span className="block text-primary-purple">Experience</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Unlock premium courses, live sessions, and expert mentorship to
            accelerate your forex trading journey.
          </p>
          <div className="flex items-center justify-center space-x-8 text-gray-400">
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-400 mr-2" />
              <span>30-day money back</span>
            </div>
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-400 mr-2" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-400 mr-2" />
              <span>Secure payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative bg-gray-800 rounded-2xl border border-gray-700 p-8 hover:border-primary-purple transition-all duration-300 ${
                  plan.popular ? "border-primary-purple" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary-purple text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary-purple rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-400 ml-2">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "primary" : "outline"}
                  className="w-full"
                  size="lg"
                >
                  {plan.popular ? "Start Pro Trial" : `Choose ${plan.name}`}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400">
            Everything you need to know about our plans
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">
              Can I cancel anytime?
            </h3>
            <p className="text-gray-400">
              Yes, you can cancel your subscription at any time. You'll continue
              to have access until the end of your billing period.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">
              Do you offer refunds?
            </h3>
            <p className="text-gray-400">
              We offer a 30-day money-back guarantee. If you're not satisfied,
              contact our support team for a full refund.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">
              Can I change plans?
            </h3>
            <p className="text-gray-400">
              Absolutely! You can upgrade or downgrade your plan at any time.
              Changes take effect immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
