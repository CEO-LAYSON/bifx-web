import React from "react";
import LandingHeader from "../../../components/layout/LandingHeader";
import TestimonialsSection from "../../../components/sections/TestimonialsSection";
import Footer from "../../../components/sections/Footer";

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      <LandingHeader />
      <div className="pt-20">
        <TestimonialsSection />
      </div>
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
