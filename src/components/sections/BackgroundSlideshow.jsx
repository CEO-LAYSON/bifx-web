import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

// High-quality professional images for premium e-learning platform
const SLIDESHOW_IMAGES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=2560&q=90",
    thumbnail:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80",
    alt: "Professional forex trading platform with multiple monitors",
    overlay: "rgba(0, 0, 0, 0.35)",
    headline: "Master Forex Trading",
    subheadline:
      "Learn to analyze markets and execute profitable trades with precision",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=2560&q=90",
    thumbnail:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80",
    alt: "Modern software development workspace",
    overlay: "rgba(0, 0, 0, 0.4)",
    headline: "Advanced Programming",
    subheadline: "Master software development with hands-on coding projects",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=2560&q=90",
    thumbnail:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80",
    alt: "Expert-led technology workshop",
    overlay: "rgba(0, 0, 0, 0.45)",
    headline: "Technology Workshops",
    subheadline: "Interactive sessions led by industry experts",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=2560&q=90",
    thumbnail:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80",
    alt: "Modern digital learning environment",
    overlay: "rgba(0, 0, 0, 0.4)",
    headline: "Digital Learning Environments",
    subheadline: "Immersive education that adapts to your learning style",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1609234656388-0ff363383899?w=2560&q=90",
    thumbnail:
      "https://images.unsplash.com/photo-1609234656388-0ff363383899?w=400&q=80",
    alt: "Virtual classroom with video conferencing",
    overlay: "rgba(0, 0, 0, 0.45)",
    headline: "Virtual Classrooms",
    subheadline: "Live interactive sessions with real-time Q&A",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=2560&q=90",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
    alt: "Professional financial data analytics",
    overlay: "rgba(0, 0, 0, 0.5)",
    headline: "Financial Analytics",
    subheadline: "Master data-driven trading strategies",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=2560&q=90",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80",
    alt: "Professional software development workspace",
    overlay: "rgba(0, 0, 0, 0.4)",
    headline: "Software Development",
    subheadline: "Build real-world applications from scratch",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=2560&q=90",
    thumbnail:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80",
    alt: "Modern collaborative tech workspace",
    overlay: "rgba(0, 0, 0, 0.45)",
    headline: "Tech Practice Labs",
    subheadline: "Hands-on experience with cutting-edge tools",
  },
];

const SLIDE_DURATION = 6000;
const TRANSITION_DURATION = 1500;

const BackgroundSlideshow = ({ onSlideChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  // Get current slide data
  const currentSlide = SLIDESHOW_IMAGES[currentIndex];

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const advanceSlide = () => {
      setIsTransitioning(true);

      // After transition completes, change slide
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
        setIsTransitioning(false);
      }, TRANSITION_DURATION);
    };

    // Initial delay before first transition
    const initialDelay = setTimeout(advanceSlide, SLIDE_DURATION);

    // Set up interval for subsequent slides
    intervalRef.current = setInterval(
      advanceSlide,
      SLIDE_DURATION + TRANSITION_DURATION,
    );

    return () => {
      clearTimeout(initialDelay);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  // Notify parent of slide changes (only when not transitioning)
  useEffect(() => {
    if (!isTransitioning && onSlideChange) {
      onSlideChange(currentIndex);
    }
  }, [currentIndex, onSlideChange, isTransitioning]);

  // Navigation functions
  const goToSlide = useCallback(
    (index) => {
      if (index === currentIndex) return;

      // Clear existing timers
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);

      setIsTransitioning(true);

      timeoutRef.current = setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
      }, TRANSITION_DURATION);
    },
    [currentIndex],
  );

  const goToNextSlide = useCallback(() => {
    const next = (currentIndex + 1) % SLIDESHOW_IMAGES.length;
    goToSlide(next);
  }, [currentIndex, goToSlide]);

  const goToPrevSlide = useCallback(() => {
    const prev =
      (currentIndex - 1 + SLIDESHOW_IMAGES.length) % SLIDESHOW_IMAGES.length;
    goToSlide(prev);
  }, [currentIndex, goToSlide]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Single background layer with smooth opacity transition */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
        style={{
          transitionDuration: `${TRANSITION_DURATION}ms`,
          backgroundImage: `url(${currentSlide.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#000",
        }}
      >
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: currentSlide.overlay }}
        />
      </div>

      {/* Animated grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          animation: "gridMove 20s linear infinite",
        }}
      />

      {/* Gradient orbs for visual depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-black/30" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-x-0 bottom-4 sm:bottom-6 md:bottom-8 z-20">
        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          {SLIDESHOW_IMAGES.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`relative p-0.5 sm:p-1 transition-all duration-300 ${
                currentIndex === index ? "w-8 sm:w-10" : "w-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={`h-0.5 sm:h-1 rounded-full overflow-hidden transition-all duration-700 ${
                  currentIndex === index
                    ? "bg-white shadow-lg"
                    : "bg-white/30 group-hover:bg-white/60"
                }`}
              >
                {/* Progress indicator for active slide */}
                {currentIndex === index && !isTransitioning && (
                  <div
                    className="h-full bg-white"
                    style={{
                      animation: `progressBar ${SLIDE_DURATION}ms linear forwards`,
                    }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Arrow Controls */}
        <div className="hidden sm:flex justify-center items-center gap-4 sm:gap-6">
          <button
            onClick={goToPrevSlide}
            className="group p-3 sm:p-4 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-500 hover:scale-110 hover:shadow-xl"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>

          <button
            onClick={togglePlayPause}
            className="p-3 sm:p-4 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-500 hover:scale-110 hover:shadow-xl"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 sm:w-6 h-6" />
            ) : (
              <Play className="w-5 h-5 sm:w-6 h-6 ml-0.5" />
            )}
          </button>

          <button
            onClick={goToNextSlide}
            className="group p-3 sm:p-4 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-500 hover:scale-110 hover:shadow-xl"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }

        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default BackgroundSlideshow;
