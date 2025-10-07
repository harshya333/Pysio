"use client"

import { useRef, useEffect, useState } from "react"
import { useScroll } from "framer-motion"
import { SafeVideo } from "./SafeVideo"

export default function VideoSection() {
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const [videoScrollProgress, setVideoScrollProgress] = useState(0)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const { scrollYProgress: videoYProgress } = useScroll({
    target: videoContainerRef,
    offset: ["start end", "end start"],
  })

  useEffect(() => {
    const unsub = videoYProgress.on("change", (latest) => {
      setVideoScrollProgress(latest)
    })
    return () => unsub()
  }, [videoYProgress])

  const handleVideoLoad = () => {
    setVideoLoaded(true)
  }

  const handleVideoError = () => {
    console.warn("Video failed to load; showing fallback poster")
    setVideoLoaded(true)
  }

  const getVideoStyles = () => {
    if (!videoLoaded) {
      return {
        width: "70vw",
        height: "70vh",
        opacity: 0,
        borderRadius: "20px",
        transform: "scale(0.9)",
        objectFit: "cover" as const,
      }
    }

    const expandProgress = Math.max(0, Math.min(videoScrollProgress, 1))
    const size = 70 + 30 * expandProgress

    return {
      width: `${size}vw`,
      height: `${size}vh`,
      opacity: 0.9 + 0.1 * expandProgress,
      borderRadius: `${20 - 20 * expandProgress}px`,
      transform: `scale(${0.9 + 0.1 * expandProgress})`,
      objectFit: "cover" as const,
    }
  }

  const videoStyles = getVideoStyles()

  return (
    <div 
      ref={videoContainerRef}
      className="video-section"
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: "2rem 0",
      }}
    >
      <style jsx>{`
        .video-section {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: transparent;
        }

        .video-container {
          position: relative;
          z-index: 20;
          transition: all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.1),
            0 0 60px rgba(255, 255, 255, 0.1),
            0 0 100px rgba(255, 255, 255, 0.05);
          filter: brightness(1.1) contrast(1.1);
          object-fit: cover;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .scroll-text {
          color: rgba(0, 0, 0, 0.7);
          font-size: 0.875rem;
          font-weight: 400;
          opacity: 0.8;
          letter-spacing: 0.1em;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }

        .scroll-line {
          width: 1px;
          height: 2rem;
          background: rgba(0, 0, 0, 0.6);
          opacity: 0.6;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .video-loading {
          position: absolute;
          inset: 0;
          z-index: 30;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(0, 0, 0, 0.7);
          font-size: 1.125rem;
          font-weight: 400;
          opacity: 0.8;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }

        @media (max-width: 768px) {
          .video-section {
            min-height: 80vh;
            padding: 1rem 0;
          }

          .video-container {
            box-shadow: 
              0 15px 30px -8px rgba(0, 0, 0, 0.05),
              0 0 40px rgba(255, 255, 255, 0.05);
          }
        }

        @media (max-width: 480px) {
          .video-section {
            min-height: 70vh;
            padding: 0.5rem 0;
          }

          .video-container {
            box-shadow: 
              0 10px 20px -6px rgba(0, 0, 0, 0.03),
              0 0 30px rgba(255, 255, 255, 0.03);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-line {
            animation: none !important;
          }
        }
      `}</style>

      {/* Main Video - No background elements, completely transparent */}
      <SafeVideo
        sources={[
          { src: "/videos/hero.webm", type: "video/webm" },
          { src: "/videos/hero.mp4", type: "video/mp4" },
          { src: "/Flexrite.mp4", type: "video/mp4" },
        ]}
        poster="/hero-video-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        className="video-container h-auto relative z-20"
        style={videoStyles}
      />

      {/* Loading State */}
      {!videoLoaded && (
        <div className="video-loading">
          Loading Flexrite World...
        </div>
      )}

      {/* Scroll Indicator */}
      
    </div>
  )
}