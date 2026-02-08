import React from "react";
import LandingHeader from "../../../components/layout/LandingHeader";
import AboutSection from "../../../components/sections/AboutSection";
import Footer from "../../../components/sections/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      <LandingHeader />
      <div className="pt-20">
        <AboutSection />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
