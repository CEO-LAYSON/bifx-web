import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

// High-quality Unsplash images for e-learning scenarios
const SLIDESHOW_IMAGES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80",
    alt: "Professional forex trading setup with multiple monitors",
    overlay: "rgba(0, 0, 0, 0.4)",
    headline: "Master Forex Trading",
    subheadline:
      "Learn to analyze markets and execute profitable trades with precision",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80",
    alt: "Developer coding on laptop with multiple monitors",
    overlay: "rgba(0, 0, 0, 0.45)",
    headline: "Advanced Programming",
    subheadline: "Master software development with hands-on coding projects",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80",
    alt: "Modern technology workshop with team collaboration",
    overlay: "rgba(0, 0, 0, 0.5)",
    headline: "Technology Workshops",
    subheadline: "Interactive sessions led by industry experts",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80",
    alt: "Students engaged in digital learning with tablets",
    overlay: "rgba(0, 0, 0, 0.5)",
    headline: "Digital Learning Environments",
    subheadline: "Immersive education that adapts to your learning style",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1609234656388-0ff363383899?w=1920&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1609234656388-0ff363383899?w=400&q=80",
    alt: "Virtual classroom with modern video conferencing",
    overlay: "rgba(0, 0, 0, 0.5)",
    headline: "Virtual Classrooms",
    subheadline: "Live interactive sessions with real-time Q&A",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
    alt: "Financial data analysis with multiple screens",
    overlay: "rgba(0, 0, 0, 0.55)",
    headline: "Financial Analytics",
    subheadline: "Master data-driven trading strategies",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80",
    alt: "Programmer working on code with coffee",
    overlay: "rgba(0, 0, 0, 0.5)",
    headline: "Software Development",
    subheadline: "Build real-world applications from scratch",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80",
    alt: "Modern tech office with collaborative workspace",
    overlay: "rgba(0, 0, 0, 0.5)",
    headline: "Tech Practice Labs",
    subheadline: "Hands-on experience with cutting-edge tools",
  },
];

const TRANSITION_DURATION = 1200; // ms - smooth fade transition
const SLIDE_DURATION = 6000; // ms - time between auto-advances
const KEN_BURNS_DURATION = 20000; // ms - full Ken Burns cycle

const BackgroundSlideshow = ({ onSlideChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Auto-advance slides - runs continuously when isPlaying is true
  useEffect(() => {
    if (!isPlaying) return;

    const advanceSlide = () => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % SLIDESHOW_IMAGES.length;
        return nextIndex;
      });
    };

    // Set up interval for auto-advance
    const intervalId = setInterval(advanceSlide, SLIDE_DURATION);

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  // Notify parent when currentIndex changes (outside of render)
  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentIndex);
    }
  }, [currentIndex, onSlideChange]);

  // Handle slide transitions
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, TRANSITION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isTransitioning]);

  const goToSlide = useCallback(
    (index) => {
      if (index === currentIndex) return;

      setIsTransitioning(true);
      setCurrentIndex(index);

      // Notify parent component of slide change
      if (onSlideChange) {
        onSlideChange(index);
      }
    },
    [currentIndex, onSlideChange],
  );

  const goToNextSlide = useCallback(() => {
    const nextIndex = (currentIndex + 1) % SLIDESHOW_IMAGES.length;
    goToSlide(nextIndex);
  }, [currentIndex, goToSlide]);

  const goToPrevSlide = useCallback(() => {
    const prevIndex =
      (currentIndex - 1 + SLIDESHOW_IMAGES.length) % SLIDESHOW_IMAGES.length;
    goToSlide(prevIndex);
  }, [currentIndex, goToSlide]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Get current and next slide for crossfade effect
  const getVisibleSlides = () => {
    const current = SLIDESHOW_IMAGES[currentIndex];
    const next = SLIDESHOW_IMAGES[(currentIndex + 1) % SLIDESHOW_IMAGES.length];
    return { current, next };
  };

  const { current, next } = getVisibleSlides();

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Slides Container */}
      <div className="absolute inset-0">
        {/* Current Slide */}
        <div
          className={`absolute inset-0 transition-all duration-[${TRANSITION_DURATION}] ease-in-out ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
          style={{
            transitionDuration: `${TRANSITION_DURATION}ms`,
          }}
        >
          {/* Image with Ken Burns Effect */}
          <div
            className="absolute inset-0 w-full h-full scale-100"
            style={{
              backgroundImage: `url(${current.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `scale(1.1) translate(${50 - mousePosition.x}px, ${
                50 - mousePosition.y
              }px)`,
              transition: "transform 0.5s ease-out",
              animation: `kenBurns ${KEN_BURNS_DURATION}ms ease-in-out infinite alternate`,
            }}
          >
            {/* Gradient Overlay */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: current.overlay }}
            />
          </div>
        </div>

        {/* Next Slide (for crossfade) */}
        {isTransitioning && (
          <div
            className="absolute inset-0 opacity-0"
            style={{
              transitionDuration: `${TRANSITION_DURATION}ms`,
              animation: "fadeIn 0ms forwards",
              animationDelay: `${TRANSITION_DURATION}ms`,
            }}
          >
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${next.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="absolute inset-0"
                style={{ backgroundColor: next.overlay }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Animated Grid Pattern Overlay */}
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

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]"
          style={{
            transform: `translate(${mousePosition.x - 50}px, ${
              mousePosition.y - 50
            }px)`,
            transition: "transform 0.8s ease-out",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px]"
          style={{
            transform: `translate(${50 - mousePosition.x}px, ${
              50 - mousePosition.y
            }px)`,
            transition: "transform 0.8s ease-out",
          }}
        />
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-x-0 bottom-4 sm:bottom-6 md:bottom-8 z-20">
        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          {SLIDESHOW_IMAGES.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`group relative p-0.5 sm:p-1 transition-all duration-300 ${
                currentIndex === index ? "w-6 sm:w-8" : "w-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={`h-0.5 sm:h-1 rounded-full overflow-hidden transition-all duration-500 ${
                  currentIndex === index
                    ? "bg-gradient-to-r from-purple-400 to-amber-400"
                    : "bg-white/30 group-hover:bg-white/50"
                }`}
              >
                {currentIndex === index && (
                  <div
                    className="h-full bg-gradient-to-r from-purple-400 to-amber-400"
                    style={{
                      animation: `progressBar ${SLIDE_DURATION}ms linear forwards`,
                    }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Arrow Controls - Hidden on very small screens */}
        <div className="hidden sm:flex justify-center items-center gap-4 sm:gap-6">
          <button
            onClick={goToPrevSlide}
            className="group p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={togglePlayPause}
            className="p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 sm:w-5 h-5" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 h-5 ml-0.5" />
            )}
          </button>

          <button
            onClick={goToNextSlide}
            className="group p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes kenBurns {
          0% {
            transform: scale(1.1) translate(0, 0);
          }
          100% {
            transform: scale(1.25) translate(-10px, -10px);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }

        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }

        /* Hardware acceleration for smooth 60fps animations */
        .will-change-transform {
          will-change: transform;
        }
        
        /* Ensure images are optimized */
        img {
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default BackgroundSlideshow;
