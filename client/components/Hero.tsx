"use client"
import { type FC, useRef, useEffect, useState } from "react"
import { useScroll } from "framer-motion"
import AboutUs from "./AboutUs"
import VideoSection from "./VideoSection"

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
      }
    } else {
      const reverseProgress = Math.min(scrollProgress * 2, 1)

      return {
        topLine: {
          transform: `translateX(${-100 * reverseProgress}%)`,
          opacity: Math.max(1 - reverseProgress, 0),
        },
        bottomLine: {
          transform: `translateX(${100 * reverseProgress}%)`,
          opacity: Math.max(1 - reverseProgress, 0),
        },
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

        @keyframes heroFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
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

        .hero-heading-1 {
          animation: heroEnter 1.5s ease-out forwards, heroFloat 3s ease-in-out 1.5s infinite;
        }

        .hero-heading-2 {
          animation: layerFade 1s ease-out 0.5s forwards;
        }

        .hero-heading-3 {
          animation: layerFade 1s ease-out 0.7s forwards;
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

        /* Hero content positioning */
        .hero-content {
          position: relative;
          z-index: 20;
        }

        /* Equal gaps for both lines - responsive */
        .top-line-container {
          top: calc(50% - 100px);
          left: 0;
          width: 50%;
        }

        .bottom-line-container {
          top: calc(50% + 100px);
          right: 0;
          width: 50%;
        }

        /* Subtitle container positioned below bottom line */
        .subtitle-container {
          position: absolute;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 30;
          gap: 1rem;
        }

        /* Scroll Indicator Styles */
        .scroll-indicator-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          margin-top: 2rem;
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
          .top-line-container {
            top: calc(50% - 90px);
            width: 45%;
          }

          .bottom-line-container {
            top: calc(50% + 90px);
            width: 45%;
          }
        }

        @media (max-width: 768px) {
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
        }

        @media (max-width: 480px) {
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
          .hero-float,
          .mouse-icon::before {
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
        {/* Animated Lines */}
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

        {/* Hero Content */}
        <div className="hero-content w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div
            ref={heroTextRef}
            className="text-center w-full max-w-7xl mx-auto"
            style={{ transform: "translateY(0)" }}
          >
            {/* Main Heading with Layers */}
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
                  padding: "0 1rem",
                  position: "relative",
                  letterSpacing: "clamp(0.05em, 0.5vw, 0.1em)",
                  textShadow: `
                    0 0 20px rgba(255, 255, 255, 0.3),
                    0 0 40px rgba(255, 255, 255, 0.2),
                    0 0 60px rgba(255, 255, 255, 0.1)
                  `,
                  whiteSpace: "nowrap",
                  opacity: 0,
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
                  padding: "0 1rem",
                  position: "absolute",
                  top: "4px",
                  left: 0,
                  width: "100%",
                  letterSpacing: "clamp(0.05em, 0.5vw, 0.1em)",
                  opacity: 0,
                  whiteSpace: "nowrap",
                  textShadow: "0 0 30px rgba(255, 255, 255, 0.2)",
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
                  padding: "0 1rem",
                  position: "absolute",
                  top: "8px",
                  left: 0,
                  width: "100%",
                  letterSpacing: "clamp(0.05em, 0.5vw, 0.1em)",
                  opacity: 0.05,
                  whiteSpace: "nowrap",
                  textShadow: "0 0 40px rgba(255, 255, 255, 0.1)",
                }}
              >
                FLEXRITE WORLD
              </h1>
            </div>
          </div>
        </div>

        {/* Taglines positioned below bottom line */}
        <div className="subtitle-container" style={{ top: 'calc(50% + 140px)' }}>
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
              padding: "0 20px",
              textAlign: "center",
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
              padding: "0 20px",
              textAlign: "center",
            }}
          >
            Say Goodbye to Pain, Hello to Flexrite World
          </p>

          {/* Scroll Indicator */}
          <div className="scroll-indicator-hero scroll-indicator-container">
            <div className="mouse-icon"></div>
            <span className="scroll-indicator-text">Scroll to Explore</span>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <VideoSection />

      {/* About Us Section */}
      <div ref={aboutUsRef} className="relative z-30">
        <AboutUs />
      </div>
    </div>
  )
}

export default Hero