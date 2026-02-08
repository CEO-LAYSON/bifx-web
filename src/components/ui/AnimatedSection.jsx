import React from "react";
import useIntersectionObserver, {
  fadeInUp,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "../../hooks/useIntersectionObserver";

const AnimatedSection = ({
  children,
  animation = "fadeInUp",
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
  className = "",
  delay = 0,
}) => {
  const { ref, isVisible } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce,
  });

  const animations = {
    fadeInUp,
    fadeIn,
    scaleIn,
    slideInLeft,
    slideInRight,
  };

  const selectedAnimation = animations[animation] || fadeInUp;

  return (
    <div
      ref={ref}
      className={`${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0) scale(1)"
          : animation === "fadeInUp"
          ? "translateY(60px)"
          : animation === "fadeIn"
          ? "scale(0.8)"
          : animation === "scaleIn"
          ? "scale(0.8)"
          : animation === "slideInLeft"
          ? "translateX(-60px)"
          : animation === "slideInRight"
          ? "translateX(60px)"
          : "translateY(60px)",
        transition: `opacity 0.6s ease-out, transform 0.6s ease-out${
          delay > 0 ? ` ${delay}s` : ""
        }`,
        transitionDelay: delay > 0 ? `${delay}s` : "0s",
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
