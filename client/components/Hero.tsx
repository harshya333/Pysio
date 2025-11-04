"use client"
import { type FC, useRef, useEffect, useState } from "react"
import { useScroll } from "framer-motion"
import VideoSection from "./VideoSection"
import { MeshGradient } from "@paper-design/shaders-react" // Import MeshGradient

const Hero: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const aboutUsRef = useRef<HTMLDivElement>(null)
  const heroTextRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [linesAnimated, setLinesAnimated] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest)
    })

    return () => {
      unsubscribe()
    }
  }, [scrollYProgress])

  useEffect(() => {
    setLinesAnimated(true)
  }, [])

  const getLineAnimationStyles = () => {
    if (!linesAnimated) {
      return {
        topLine: {
          transform: "translateX(-100%)",
          opacity: 0,
        },
        bottomLine: {
          transform: "translateX(100%)",
          opacity: 0,
        },
        scrollLine: {
          transform: "translateX(-100%)",
          opacity: 0,
        }
      }
    } else {
      // Remove scroll-based animation for stability - line stays fixed
      return {
        topLine: {
          transform: `translateX(${-100 * scrollProgress}%)`,
          opacity: Math.max(1 - scrollProgress, 0),
        },
        bottomLine: {
          transform: `translateX(${100 * scrollProgress}%)`,
          opacity: Math.max(1 - scrollProgress, 0),
        },
        scrollLine: {
          transform: `translateX(0%)`, // Fixed position - no movement
          opacity: 1, // Always fully visible
        }
      }
    }
  }

  const lineStyles = getLineAnimationStyles()

  return (
    <div
      ref={containerRef}
      className="relative bg-transparent overflow-hidden"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          overflow-x: hidden;
          margin: 0;
          padding: 0;
          background: transparent;
        }

        .pixel-text {
          position: relative;
          overflow: hidden;
        }

        .pixel-text::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background:
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.03) 1px, transparent 1px),
            radial-gradient(circle at 40% 70%, rgba(255,255,255,0.02) 1px, transparent 1px),
            radial-gradient(circle at 60% 20%, rgba(255,255,255,0.04) 1px, transparent 1px),
            radial-gradient(circle at 80% 60%, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 15px 15px, 20px 20px, 18px 18px, 22px 22px;
          animation: pixelShimmer 8s ease-in-out infinite;
          pointer-events: none;
          z-index: 1;
          mix-blend-mode: screen;
        }

        @keyframes pixelShimmer {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.6;
          }
          50% {
            transform: translate(-1px, 2px);
            opacity: 0.4;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroEnter {
          from {
            opacity: 0;
            transform: translateY(100px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes layerFade {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 0.1;
            transform: scale(1);
          }
        }

        @keyframes imageEnter {
          from {
            opacity: 0;
            transform: translateX(100px) translateY(-100px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(0) scale(1);
          }
        }

        .hero-heading-1 {
          animation: heroEnter 1.5s ease-out forwards;
          position: relative;
          z-index: 30;
        }

        .hero-heading-2 {
          animation: layerFade 1s ease-out 0.5s forwards;
        }

        .hero-heading-3 {
          animation: layerFade 1s ease-out 0.7s forwards;
        }

        .hero-image {
          animation: imageEnter 1.5s ease-out 0.8s forwards;
          opacity: 0;
        }

        .tagline-1 {
          opacity: 0;
          animation: fadeInUp 1s ease-out 1.8s forwards;
        }

        .tagline-2 {
          opacity: 0;
          animation: fadeInUp 1s ease-out 2.2s forwards;
        }

        .scroll-indicator-hero {
          opacity: 0;
          animation: fadeInUp 1s ease-out 2.6s forwards;
        }

        .animated-line {
          position: absolute;
          z-index: 25;
          display: flex;
          align-items: center;
          white-space: nowrap;
          transition: transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                      opacity 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .line-part {
          height: 2px;
          background: rgba(255,255,255,1);
          transition: all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Scroll indicator line styles - Positioned at bottom of hero image */
        .scroll-line-container {
          position: absolute;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: flex-start;
          bottom: 20px; /* Position at bottom of container */
          z-index: 35; /* Higher z-index to appear above image */
        }

        .scroll-animated-line {
          display: flex;
          align-items: center;
          white-space: nowrap;
          width: 100%;
          justify-content: flex-end;
          /* Remove transitions for stability */
          transition: none;
        }

        .scroll-line-part {
          height: 16px; /* INCREASED TO 16px (from 12px) */
          background: rgba(255,255,255,1);
          width: 100%;
          /* Remove transitions for stability */
          transition: none;
          transform-origin: bottom center;
          /* Ensure line is always visible and stable */
          opacity: 1 !important;
          transform: translateX(0%) !important;
        }

        /* Hero content positioning */
        .hero-content {
          position: relative;
          z-index: 20;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding-left: 70px;
        }

        .hero-text-container {
          position: relative;
          z-index: 30;
          text-align: left;
          width: 100%; /* Full width of the container */
        }

        /* Text Background Container - UPDATED: Full width and plain black */
        .text-background-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%; /* Full width of parent container */
          height: 100%;
          border-radius: 12px;
          overflow: hidden;
          z-index: -1;
          background: #000000; /* Plain black background */
        }

        .text-wave-effect {
          position: absolute;
          inset: 0;
          opacity: 0.2;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(52, 73, 94, 0.4) 20%,
            rgba(74, 101, 114, 0.6) 50%,
            rgba(52, 73, 94, 0.4) 80%,
            transparent 100%
          );
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%23000'/%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%23000'/%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23000'/%3E%3C/svg%3E");
          -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%23000'/%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%23000'/%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23000'/%3E%3C/svg%3E");
          mask-size: cover;
          -webkit-mask-size: cover;
        }

        .text-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to-br from-gray-800/15 via-gray-700/10 to-gray-900/20);
          mix-blend-mode: overlay;
        }

        /* Hero Image positioned at right side with updated dimensions - transparent and no border */
        .hero-image-full {
          position: absolute;
          right: -10px; /* Moved left by 70px (from 60px to -10px) */
          top: calc(50% - 260px); /* MOVED UP BY 100PX (from -160px to -260px) */
          width: 40%;
          height: 80%;
          object-fit: cover;
          object-position: center;
          z-index: 15; /* Increased z-index to bring image to front */
          border-radius: 0;
          background: transparent;
          transform: translateY(-50%);
        }

        /* Equal gaps for both lines - responsive */
        .top-line-container {
          top: calc(50% - 100px);
          left: 0;
          width: 50%;
          z-index: 10; /* Lower z-index so image appears above lines */
        }

        .bottom-line-container {
          top: calc(50% + 100px);
          right: 0;
          width: 50%;
          z-index: 10; /* Lower z-index so image appears above lines */
        }

        /* Subtitle container positioned below bottom line - moved down by 80px */
        .subtitle-container {
          position: absolute;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center; /* Changed from flex-start to center */
          justify-content: center;
          z-index: 30;
          gap: 1rem;
          left: 0; /* Changed from 70px to 0 for center alignment */
          bottom: 20px; /* Moved down by 80px (from 100px to 20px) */
          text-align: center; /* Added center text alignment */
        }

        /* Scroll Indicator Styles */
        .scroll-indicator-container {
          display: flex;
          flex-direction: column;
          align-items: center; /* Changed from flex-start to center */
          gap: 0.75rem;
          margin-top: 2rem;
          position: relative;
          width: 100%;
        }

        .scroll-indicator-text {
          color: white;
          font-size: 0.875rem;
          font-weight: 300;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          opacity: 0.8;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        .mouse-icon {
          width: 24px;
          height: 40px;
          border: 2px solid rgba(255, 255, 255, 0.8);
          border-radius: 15px;
          position: relative;
          margin-bottom: 0.5rem;
        }

        .mouse-icon::before {
          content: '';
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 8px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 2px;
          animation: mouseScroll 2s infinite;
        }

        @keyframes mouseScroll {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateX(-50%) translateY(10px);
            opacity: 0.5;
          }
        }

        /* Mobile adjustments */
        @media (max-width: 1024px) {
          .hero-content {
            padding-left: 50px;
          }

          .hero-image-full {
            right: -20px; /* Adjusted for tablet */
            top: calc(50% - 240px); /* MOVED UP BY 100PX (from -140px to -240px) */
            width: 45%;
            height: 75%;
          }

          .subtitle-container {
            bottom: 0; /* Adjusted for tablet */
          }

          .top-line-container {
            top: calc(50% - 90px);
            width: 45%;
          }

          .bottom-line-container {
            top: calc(50% + 90px);
            width: 45%;
          }

          .scroll-line-container {
            bottom: 18px; /* Slightly adjusted for tablet */
          }
        }

        @media (max-width: 768px) {
          .hero-content {
            padding-left: 0;
            align-items: center;
            text-align: center;
          }

          .hero-text-container {
            text-align: center;
          }

          .hero-image-full {
            position: relative;
            width: 80%;
            height: 350px;
            margin-top: 1rem; /* MOVED UP BY 16PX (from 2rem to 1rem) */
            border-radius: 0;
            background: transparent;
            right: auto;
            top: auto;
            transform: none;
            z-index: 15; /* Maintain higher z-index on mobile */
          }

          .subtitle-container {
            position: relative;
            left: 0;
            bottom: 0;
            align-items: center;
            margin-top: 2rem;
          }

          .scroll-indicator-container {
            align-items: center;
          }

          .scroll-line-container {
            width: 100%;
            bottom: 16px; /* Adjusted for mobile */
            position: relative; /* Change to relative on mobile since image is in flow */
            margin-top: 1rem;
          }

          .scroll-animated-line {
            width: 100%;
          }

          .top-line-container {
            top: calc(50% - 80px);
            width: 60%;
          }

          .bottom-line-container {
            top: calc(50% + 80px);
            width: 60%;
          }
          
          .subtitle-container {
            gap: 0.75rem;
          }

          .scroll-indicator-container {
            margin-top: 1.5rem;
            gap: 0.5rem;
          }

          .scroll-indicator-text {
            font-size: 0.75rem;
          }

          /* Mobile adjustment for scroll line height */
          .scroll-line-part {
            height: 14px; /* Slightly smaller on mobile but still tall */
          }
        }

        @media (max-width: 480px) {
          .hero-image-full {
            width: 90%;
            height: 280px;
            margin-top: 0.5rem; /* MOVED UP BY 16PX (from 1.5rem to 0.5rem) */
          }

          .scroll-line-container {
            width: 100%;
            bottom: 14px; /* Smallest adjustment for very small screens */
            margin-top: 0.5rem;
          }

          .scroll-animated-line {
            width: 100%;
          }

          .top-line-container {
            top: calc(50% - 70px);
            width: 70%;
          }

          .bottom-line-container {
            top: calc(50% + 70px);
            width: 70%;
          }
          
          .line-part {
            height: 1.5px;
          }

          .scroll-line-part {
            height: 12px; /* Even smaller on very small screens but still tall */
          }
          
          .subtitle-container {
            gap: 0.5rem;
          }

          .scroll-indicator-container {
            margin-top: 1rem;
          }

          .mouse-icon {
            width: 20px;
            height: 35px;
          }
        }

        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          .hero-heading-1,
          .mouse-icon::before,
          .hero-image {
            animation: none !important;
          }
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Fixed Hero Section */}
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">
        {/* Hero Image - Moved to front with higher z-index */}
        <img 
          src="/images/hero.png" 
          alt="Flexrite World"
          className="hero-image-full hero-image"
          onError={(e) => {
            console.log('Image failed to load, check the path');
          }}
        />

        {/* Animated Lines - Behind the image */}
        <div className="animated-line top-line-container" style={lineStyles.topLine}>
          <div className="line-part" style={{ width: "100%" }}></div>
        </div>

        <div
          className="animated-line bottom-line-container"
          style={{
            ...lineStyles.bottomLine,
            justifyContent: "flex-end",
          }}
        >
          <div className="line-part" style={{ width: "100%" }}></div>
        </div>

        {/* Scroll Line Container - Positioned at bottom of hero section */}
        <div className="scroll-line-container">
          <div 
            className="scroll-animated-line" 
            style={lineStyles.scrollLine}
          >
            <div className="scroll-line-part"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="hero-content w-full h-full px-4 sm:px-6 lg:px-8">
          {/* Text Container - Moved 70px left */}
          <div className="hero-text-container">
            <div
              ref={heroTextRef}
              className="w-full relative" // Added relative positioning
              style={{ transform: "translateY(0)" }}
            >
              {/* Text Background - UPDATED: Plain black and full width */}
              <div className="text-background-container">
                {/* Removed MeshGradient and replaced with plain black background */}
              </div>

              {/* Main Heading with Layers - STABLE POSITION */}
              <div className="relative inline-block">
                <h1
                  className="hero-heading hero-heading-1 pixel-text"
                  style={{
                    fontSize: "clamp(2rem, 8vw, 10rem)",
                    lineHeight: "1.1",
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: "400",
                    color: "white",
                    margin: 0,
                    padding: "0 1rem 0 0",
                    position: "relative",
                    letterSpacing: "clamp(0.05em, 0.5vw, 0.1em)",
                    textShadow: `
                      0 0 20px rgba(255, 255, 255, 0.3),
                      0 0 40px rgba(255, 255, 255, 0.2),
                      0 0 60px rgba(255, 255, 255, 0.1)
                    `,
                    whiteSpace: "nowrap",
                    opacity: 0,
                    willChange: "auto", // Prevent layout shifts
                    transform: "translateZ(0)", // Hardware acceleration
                  }}
                >
                  FLEXRITE WORLD
                </h1>
                <h1
                  className="hero-heading hero-heading-2"
                  aria-hidden="true"
                  style={{
                    fontSize: "clamp(2rem, 8vw, 10rem)",
                    lineHeight: "1.1",
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: "400",
                    color: "rgba(255, 255, 255, 0.1)",
                    WebkitTextStroke: "2px rgba(255, 255, 255, 0.3)",
                    margin: 0,
                    padding: "0 1rem 0 0",
                    position: "absolute",
                    top: "4px",
                    left: 0,
                    width: "100%",
                    letterSpacing: "clamp(0.05em, 0.5vw, 0.1em)",
                    opacity: 0, 
                    whiteSpace: "nowrap",
                    textShadow: "0 0 30px rgba(255, 255, 255, 0.2)",
                    willChange: "auto",
                    transform: "translateZ(0)",
                  }}
                >
                  FLEXRITE WORLD
                </h1>
                <h1
                  className="hero-heading hero-heading-3"
                  aria-hidden="true"
                  style={{
                    fontSize: "clamp(2rem, 8vw, 10rem)",
                    lineHeight: "1.1",
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: "400",
                    color: "rgba(255, 255, 255, 0.05)",
                    WebkitTextStroke: "2px rgba(255, 255, 255, 0.2)",
                    margin: 0,
                    padding: "0 1rem 0 0",
                    position: "absolute",
                    top: "8px",
                    left: 0,
                    width: "100%",
                    letterSpacing: "clamp(0.05em, 0.5vw, 0.1em)",
                    opacity: 0.05,
                    whiteSpace: "nowrap",
                    textShadow: "0 0 40px rgba(255, 255, 255, 0.1)",
                    willChange: "auto",
                    transform: "translateZ(0)",
                  }}
                >
                  FLEXRITE WORLD
                </h1>
              </div>
            </div>
          </div>

          {/* Taglines positioned at bottom - moved down by 80px and center aligned */}
          <div className="subtitle-container">
            <p
              className="tagline-2"
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                lineHeight: "1.6",
                fontFamily: "'Playfair Display', serif",
                fontWeight: "500",
                color: "rgba(255, 255, 255, 0.85)",
                letterSpacing: "clamp(0.02em, 0.15vw, 0.05em)",
                textShadow: `
                  0 0 10px rgba(255, 255, 255, 0.2),
                  0 0 20px rgba(255, 255, 255, 0.1)
                `,
                maxWidth: "90%",
                margin: 0,
                padding: 0,
                textAlign: "center", /* Changed from left to center */
              }}
            >
              FLEXRITE IS FASTER
            </p>
            <p
              className="tagline-2"
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                lineHeight: "1.6",
                fontFamily: "'Playfair Display', serif",
                fontWeight: "400",
                color: "rgba(255, 255, 255, 0.85)",
                letterSpacing: "clamp(0.02em, 0.15vw, 0.05em)",
                textShadow: `
                  0 0 10px rgba(255, 255, 255, 0.2),
                  0 0 20px rgba(255, 255, 255, 0.1)
                `,
                maxWidth: "90%",
                margin: 0,
                padding: 0,
                textAlign: "center", /* Changed from left to center */
              }}
            >
              Say Goodbye to Pain, Hello to Flexrite World
            </p>

            {/* Scroll Indicator with White Line after Mouse Icon */}
            <div className="scroll-indicator-hero scroll-indicator-container">
              <div className="mouse-icon"></div>
              a
            </div>
          </div>
          
        </div>
      </div>

      {/* Video Section */}
      <VideoSection />
    </div>
  )
}

export default Hero