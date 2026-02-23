import React, { useState, useCallback } from "react";
import BackgroundSlideshow from "./BackgroundSlideshow";
import HeroContentOverlay from "./HeroContentOverlay";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      {/* Background Slideshow with Navigation Controls */}
      <BackgroundSlideshow onSlideChange={handleSlideChange} />

      {/* Content Overlay - synced with slideshow */}
      <HeroContentOverlay currentIndex={currentSlide} />
    </section>
  );
};

export default HeroSection;
