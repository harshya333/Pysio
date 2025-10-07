import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ElegantShadowTitleProps {
  children: string;
  className?: string;
  delay?: number;
  darkBackground?: boolean;
  fullWidth?: boolean;
}

const ElegantShadowTitle: React.FC<ElegantShadowTitleProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  darkBackground = false,
  fullWidth = false 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) return;

    // Initial animation state
    gsap.set(text, { opacity: 0, y: 20 });

    // Fade-in animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      delay: delay,
    });

    tl.to(text, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [delay]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
    >
      <h1
        ref={textRef}
        className="elegant-shadow-text"
        style={{
          position: 'relative',
          fontFamily: '"Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif',
          fontSize: 'clamp(2rem, 5vw, 5.25rem)',
          // Reduced vertical padding to close the gap ↓
          padding: 'clamp(0.2rem, 1vw, 0.8rem) clamp(1rem, 3vw, 2.2rem)',
          textAlign: 'center',
          textTransform: 'uppercase',
          textRendering: 'optimizeLegibility',
          color: 'white',
          letterSpacing: 'clamp(0.05em, 0.1vw, 0.15em)',
          margin: 0,
          lineHeight: 1.1, // Slightly tighter line height
          textShadow:
            '0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(255, 255, 255, 0.2)',
        }}
      >
        {children}
      </h1>
    </div>
  );
};

export default ElegantShadowTitle;
