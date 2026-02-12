import React, { useEffect, useRef, useState } from "react";

const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.3 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const startTimestamp = performance.now();
    const startValue = 0;
    const valueStr = value.toString();
    const endValue = parseInt(valueStr.replace(/[^0-9]/g, ""));
    const suffix = valueStr.replace(/[0-9]/g, "");
    const isPercentage = valueStr.includes("%");

    const animate = (timestamp) => {
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation (ease-out quart)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(
        startValue + (endValue - startValue) * easeOutQuart,
      );

      if (isPercentage) {
        setDisplayValue(currentValue + "%");
      } else if (suffix) {
        // Handle K suffix for thousands (e.g., 10K+)
        if (suffix.toLowerCase().includes("k")) {
          if (currentValue >= 1000) {
            const formattedValue = (currentValue / 1000).toFixed(
              currentValue % 1000 === 0 ? 0 : 1,
            );
            setDisplayValue(formattedValue + "K" + suffix.replace(/k/gi, ""));
          } else {
            setDisplayValue(currentValue + suffix);
          }
        } else {
          setDisplayValue(currentValue + suffix);
        }
      } else {
        setDisplayValue(currentValue);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(valueStr);
      }
    };

    requestAnimationFrame(animate);
  }, [hasAnimated, value, duration]);

  return <span ref={elementRef}>{displayValue}</span>;
};

export default AnimatedCounter;
