import React from "react";
import LandingHeader from "../../../components/layout/LandingHeader";
import FeaturesSection from "../../../components/sections/FeaturesSection";
import Footer from "../../../components/sections/Footer";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      <LandingHeader />
      <div className="pt-20">
        <FeaturesSection />
      </div>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
