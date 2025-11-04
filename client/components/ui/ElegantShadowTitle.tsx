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

    // Initial animation state with blur
    gsap.set(text, { 
      opacity: 0, 
      y: 30,
      filter: 'blur(10px)'
    });

    // Blur-to-view animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      delay: delay,
    });

    tl.to(text, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power3.out',
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
      className={`relative inline-block ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <h1
        ref={textRef}
        className="elegant-shadow-text bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 transition-all duration-300"
        style={{
          position: 'relative',
          fontFamily: '"Poppins", sans-serif',
          fontSize: 'clamp(2rem, 5vw, 5.25rem)',
          fontWeight: 600,
          padding: 'clamp(0.2rem, 1vw, 0.8rem) clamp(1rem, 3vw, 2.2rem)',
          textAlign: 'center',
          textTransform: 'uppercase',
          textRendering: 'optimizeLegibility',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          letterSpacing: 'clamp(0.08em, 0.15vw, 0.2em)',
          margin: 0,
          lineHeight: 1.1,
          // Clean white outline for readability
          WebkitTextStroke: '1px rgba(255, 255, 255, 0.9)',
          textStroke: '1px rgba(255, 255, 255, 0.9)',
          paintOrder: 'stroke fill',
          // No glow effect - only subtle shadow for depth
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          willChange: 'transform, opacity, filter',
        }}
      >
        {children}
      </h1>
    </div>
  );
};

export default ElegantShadowTitle;