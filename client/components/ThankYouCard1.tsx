"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"

interface Doctor {
  name: string
  title: string
  description: string
  image: string
}

interface ThankYouCardProps {
  doctor: Doctor
}

const ThankYouCard: React.FC<ThankYouCardProps> = ({ doctor }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const getVideoSource = () => {
    if (doctor.name.includes("Our Story") || doctor.title.includes("INTRO")) {
      return "/medical-team.mp4"
    } else if (doctor.name.includes("Patient Journey") || doctor.title.includes("VIDEO 1")) {
      return "/healthcare-facility.mp4"
    } else if (doctor.name.includes("Move Better") || doctor.title.includes("VIDEO 2")) {
      return "/patient-care.mp4"
    }
    return "/medical-team.mp4" // default fallback
  }

  return (
    <div className="thank-you-wrapper">
      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .thank-you-wrapper {
          position: relative;
          margin: 0 auto;
          width: 100%;
          max-width: 1100px;
          height: auto;
          aspect-ratio: 16 / 9;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .thank-you-card {
          width: 100%;
          height: 100%;
          border-radius: 24px;
          position: relative;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          z-index: 4;
          transition: all 0.3s ease;
        }

        .thank-you-card:hover {
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }

        .card__backgroundGlassmorphism {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 24px;
          z-index: 0;
          overflow: hidden;
        }

        .card__videoContainer {
          position: absolute;
          top: 20px;
          left: 20px;
          width: calc(100% - 40px);
          height: calc(100% - 40px);
          z-index: 10;
          border-radius: 16px;
          overflow: hidden;
          background: #000;
        }

        .card__video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .thank-you-wrapper {
            padding: 15px;
            aspect-ratio: 16 / 9;
          }

          .thank-you-card {
            border-radius: 20px;
          }

          .card__backgroundGlassmorphism {
            border-radius: 20px;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }

          .card__videoContainer {
            top: 15px;
            left: 15px;
            width: calc(100% - 30px);
            height: calc(100% - 30px);
            border-radius: 12px;
          }

          .card__video {
            border-radius: 12px;
          }
        }

        /* Small Mobile Styles */
        @media (max-width: 480px) {
          .thank-you-wrapper {
            padding: 12px;
            aspect-ratio: 4 / 3;
          }

          .thank-you-card {
            border-radius: 16px;
          }

          .card__backgroundGlassmorphism {
            border-radius: 16px;
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            border-width: 1px;
          }

          .card__videoContainer {
            top: 12px;
            left: 12px;
            width: calc(100% - 24px);
            height: calc(100% - 24px);
            border-radius: 10px;
          }

          .card__video {
            border-radius: 10px;
          }
        }

        /* Extra Small Devices */
        @media (max-width: 320px) {
          .thank-you-wrapper {
            padding: 10px;
            aspect-ratio: 4 / 3;
          }

          .thank-you-card {
            border-radius: 14px;
          }

          .card__backgroundGlassmorphism {
            border-radius: 14px;
          }

          .card__videoContainer {
            top: 10px;
            left: 10px;
            width: calc(100% - 20px);
            height: calc(100% - 20px);
            border-radius: 8px;
          }

          .card__video {
            border-radius: 8px;
          }
        }

        /* Tablet Styles */
        @media (min-width: 769px) and (max-width: 1024px) {
          .thank-you-wrapper {
            max-width: 95%;
            padding: 25px;
            aspect-ratio: 16 / 9;
          }
        }

        /* Large Desktop Styles */
        @media (min-width: 1440px) {
          .thank-you-wrapper {
            max-width: 1200px;
          }
        }

        /* Landscape Mobile Optimization */
        @media (max-height: 500px) and (orientation: landscape) {
          .thank-you-wrapper {
            aspect-ratio: 16 / 9;
            max-height: 80vh;
            padding: 10px;
          }
          
          .thank-you-card {
            border-radius: 16px;
          }
          
          .card__videoContainer {
            top: 10px;
            left: 10px;
            width: calc(100% - 20px);
            height: calc(100% - 20px);
            border-radius: 10px;
          }
        }

        /* Ultra-wide screens */
        @media (min-width: 2000px) {
          .thank-you-wrapper {
            max-width: 1400px;
          }
        }

        /* High DPI screens */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .card__backgroundGlassmorphism {
            border-width: 0.5px;
          }
        }

        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .thank-you-card {
            transition: none;
          }
          
          .thank-you-card:hover {
            transform: none;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .thank-you-card {
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          }
          
          .thank-you-card:hover {
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
          }
        }
      `}</style>

      <div ref={cardRef} className="thank-you-card">
        <div className="card__backgroundGlassmorphism"></div>
        <div className="card__videoContainer">
          <video 
            className="card__video" 
            controls 
            muted 
            loop 
            poster={doctor.image}
            playsInline
            preload="metadata"
          >
            <source src={getVideoSource()} type="video/mp4" />
            <source src="/Flexrite.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  )
}

export default ThankYouCard