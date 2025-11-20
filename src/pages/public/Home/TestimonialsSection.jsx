import React from "react";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Beginner Trader",
      image: "/api/placeholder/100/100",
      content:
        "BIFX transformed my understanding of forex trading. The structured courses and live sessions helped me go from complete beginner to making consistent profits in just 3 months!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Advanced Trader",
      image: "/api/placeholder/100/100",
      content:
        "The technical analysis course is exceptional. The instructors break down complex concepts in a way that's easy to understand and apply in real trading scenarios.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Part-time Trader",
      image: "/api/placeholder/100/100",
      content:
        "As someone with a full-time job, the self-paced learning and mobile access made all the difference. I can learn during my commute and practice on weekends.",
      rating: 5,
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < rating ? "text-yellow-400 fill-current" : "text-gray-600"
        }
      />
    ));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          What Our Students Say
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Join thousands of successful traders who transformed their skills with
          BIFX
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 relative"
          >
            <Quote className="absolute top-4 right-4 h-8 w-8 text-primary-purple opacity-20" />

            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-purple rounded-full flex items-center justify-center text-white font-bold mr-4">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-white font-semibold">{testimonial.name}</h4>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </div>
            </div>

            <div className="flex mb-4">{renderStars(testimonial.rating)}</div>

            <p className="text-gray-300 leading-relaxed">
              "{testimonial.content}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
