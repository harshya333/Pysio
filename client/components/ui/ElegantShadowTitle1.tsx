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
      y: 40, // Increased initial offset for smoother entrance
      filter: 'blur(15px)', // Increased initial blur for more dramatic effect
      scale: 0.95 // Added slight scale for depth
    });

    // Enhanced blur-to-view animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 85%', // Slightly adjusted for better timing
        end: 'bottom 15%',
        toggleActions: 'play none none reverse',
        markers: false, // Ensure markers are disabled in production
      },
      delay: delay * 0.001, // Convert to seconds if needed
    });

    // Smoother animation with multiple properties
    tl.to(text, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.5, // Slightly longer for smoother transition
      ease: 'power3.out',
      stagger: 0.1 // If you have multiple elements, this adds sequencing
    });

    // Cleanup function
    return () => {
      if (ScrollTrigger.getAll) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === container) {
            trigger.kill();
          }
        });
      }
    };
  }, [delay]);

  // Dynamic gradient based on background
  const gradientClass = darkBackground 
    ? 'bg-gradient-to-r from-green-300 to-green-500 hover:from-green-400 hover:to-green-600'
    : 'bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700';

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${fullWidth ? 'w-full' : ''} ${className}`}
      style={{
        willChange: 'transform', // Performance optimization
      }}
    >
      <h1
        ref={textRef}
        className={`elegant-shadow-text ${gradientClass} transition-all duration-500 ease-out`}
        style={{
          position: 'relative',
          fontFamily: '"Poppins", "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: 'clamp(2rem, 5vw, 5.25rem)',
          fontWeight: 700, // Slightly bolder for better readability
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
          // White outline for each character
          WebkitTextStroke: '1px white',
          textStroke: '1.5px white',
          paintOrder: 'stroke fill',
          textShadow: 'none',
          willChange: 'transform, opacity, filter',
          // Ensure background is transparent
          backgroundColor: 'transparent',
          // Improved transition
          transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          // Better cursor for interactive feel
          cursor: 'default',
          // Prevent selection
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        }}
        onMouseEnter={(e) => {
          // Optional: Add hover scale effect
          gsap.to(e.currentTarget, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
          });
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out'
          });
        }}
      >
        {children}
      </h1>
    </div>
  );
};

export default ElegantShadowTitle;