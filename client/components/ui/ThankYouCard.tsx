"use client"
import type React from "react"
import { useEffect, useRef } from "react"

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
  const yearRef = useRef<HTMLDivElement>(null)
  const orangeShineRef = useRef<HTMLDivElement>(null)
  const cometRef = useRef<HTMLDivElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)
  const doctorImageRef = useRef<HTMLImageElement>(null)

  const doctorData = doctor || {
    name: "Dr. Sample Name",
    title: "Medical Specialist",
    description: "Experienced healthcare professional\nDedicated to patient care",
    image: "/placeholder.svg"
  }

  useEffect(() => {
    const generateTranslate = (el: HTMLElement | null, e: MouseEvent, value: number) => {
      if (el) {
        el.style.transform = `translate(${e.clientX * value}px, ${e.clientY * value}px)`
      }
    }

    const cumulativeOffset = (element: HTMLElement) => {
      let top = 0, left = 0
      let el: HTMLElement | null = element
      do {
        top += el.offsetTop || 0
        left += el.offsetLeft || 0
        el = el.offsetParent as HTMLElement
      } while (el)
      return { top, left }
    }

    const handleMouseMove = (event: MouseEvent) => {
      const e = event
      if (!cardRef.current) return

      const cardOffset = cumulativeOffset(cardRef.current)
      const cardTop = cardOffset.top
      const cardBottom = cardOffset.top + 369
      const cardLeft = cardOffset.left
      const cardRight = cardOffset.left + 765

      // Reduced reaction zone
      const reactZoneTop = cardTop - 30
      const reactZoneBottom = cardBottom + 30
      const reactZoneLeft = cardLeft - 40
      const reactZoneRight = cardRight + 40

      if (e.pageY < reactZoneTop || e.pageY > reactZoneBottom || e.pageX < reactZoneLeft || e.pageX > reactZoneRight) {
        resetCardPosition()
        return
      }

      if (cardRef.current) cardRef.current.style.transition = ""
      if (orangeShineRef.current) orangeShineRef.current.style.transition = ""
      if (yearRef.current) yearRef.current.style.transition = ""
      if (cometRef.current) cometRef.current.style.transition = ""
      if (shineRef.current) shineRef.current.style.transition = ""
      if (doctorImageRef.current) doctorImageRef.current.style.transition = ""

      // Reduced movement sensitivity
      const x = ((e.pageX - cardOffset.left - 382.5 / 2) * -1) / 150
      const y = ((e.pageY - cardOffset.top - 369 / 2) * -1) / 150

      const matrix = [
        [1, 0, 0, -x * 0.00002], // Reduced sensitivity
        [0, 1, 0, -y * 0.00002], // Reduced sensitivity
        [0, 0, 1, 1],
        [0, 0, 0, 1],
      ]

      // Reduced movement values
      generateTranslate(orangeShineRef.current, e, 0.045)
      generateTranslate(yearRef.current, e, 0.015)
      generateTranslate(cometRef.current, e, 0.025)

      if (shineRef.current) {
        const shineX = (e.clientX - cardOffset.left - 382.5) * 0.15
        const shineY = (e.clientY - cardOffset.top - 184.5) * 0.15
        shineRef.current.style.transform = `translateX(${shineX}px) translateY(${shineY}px) rotate(45deg)`
      }

      if (cardRef.current) {
        cardRef.current.style.transform = `matrix3d(${matrix.toString()})`
      }
    }

    const resetCardPosition = () => {
      if (cardRef.current) {
        cardRef.current.style.transition = "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)"
        cardRef.current.style.transform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)"
      }
      if (orangeShineRef.current) {
        orangeShineRef.current.style.transition = "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)"
        orangeShineRef.current.style.transform = "translate(0px, 0px)"
      }
      if (yearRef.current) {
        yearRef.current.style.transition = "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)"
        yearRef.current.style.transform = "translate(0px, 0px)"
      }
      if (cometRef.current) {
        cometRef.current.style.transition = "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)"
        cometRef.current.style.transform = "translate(0px, 0px)"
      }
      if (shineRef.current) {
        shineRef.current.style.transition = "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)"
        shineRef.current.style.transform = "translateX(-50%) translateY(-50%) rotate(45deg)"
      }
      if (doctorImageRef.current) {
        doctorImageRef.current.style.transition = "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)"
        doctorImageRef.current.style.transform = "translateY(-50%) scale(1.2)" // Reset to 20% zoom
      }
    }

    // Add hover effect for image
    const card = cardRef.current
    const doctorImage = doctorImageRef.current

    const handleMouseEnter = () => {
      if (doctorImage) {
        doctorImage.style.transition = "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)"
        doctorImage.style.transform = "translateY(-50%) scale(1.2)" // 20% zoom
      }
    }

    const handleMouseLeave = () => {
      if (doctorImage) {
        doctorImage.style.transition = "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)"
        doctorImage.style.transform = "translateY(-50%) scale(1.2)" // Keep zoomed even when not hovering
      }
    }

    if (card && doctorImage) {
      card.addEventListener('mouseenter', handleMouseEnter)
      card.addEventListener('mouseleave', handleMouseLeave)
      
      // Set initial zoom
      doctorImage.style.transform = "translateY(-50%) scale(1.2)"
    }

    document.addEventListener("mousemove", handleMouseMove)
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      if (card && doctorImage) {
        card.removeEventListener('mouseenter', handleMouseEnter)
        card.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

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
          max-width: 765px;
          aspect-ratio: 765 / 369;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 20px;
        }

        .thank-you-card {
          width: 100%;
          height: 100%;
          border-radius: 24px;
          position: absolute;
          box-shadow: -10px 15px 80px 0 rgba(255, 255, 255, 0.08);
          overflow: hidden;
          z-index: 4;
          transition: box-shadow 0.4s ease;
        }

        .thank-you-card:hover {
          box-shadow: 
            -10px 15px 80px 0 rgba(255, 255, 255, 0.08),
            0 0 25px rgba(255, 255, 255, 0.1);
        }

        .card__backgroundGlassmorphism {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          z-index: 0;
          overflow: hidden;
        }

        .card__circularGlassmorphism {
          position: absolute;
          right: 3%;
          top: 50%;
          transform: translateY(-50%);
          width: calc(49.5% - 10px);
          aspect-ratio: 1;
          background: transparent;
          backdrop-filter: blur(8px) saturate(1.2);
          -webkit-backdrop-filter: blur(8px) saturate(1.2);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 50%;
          z-index: 2;
          pointer-events: none;
          transition: all 0.4s ease;
          overflow: hidden;
        }

        .card__circularGlassmorphism::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(255, 255, 255, 0.08) 60deg,
            rgba(255, 255, 255, 0.15) 120deg,
            rgba(255, 255, 255, 0.1) 180deg,
            transparent 240deg,
            rgba(255, 255, 255, 0.05) 300deg,
            transparent 360deg
          );
          border-radius: 50%;
          transform: rotate(0deg);
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          opacity: 0;
        }

        .thank-you-card:hover .card__circularGlassmorphism::before {
          transform: rotate(180deg);
          opacity: 0.7;
        }

        .thank-you-card:hover .card__circularGlassmorphism {
          backdrop-filter: blur(12px) saturate(1.4);
          -webkit-backdrop-filter: blur(12px) saturate(1.4);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.08);
        }

        .card__orangeShine,
        .card__greenShine {
          position: absolute;
          background-repeat: no-repeat;
          background-size: cover;
        }

        .card__orangeShine {
          background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.015) 40%, transparent 70%);
          right: -30%;
          top: -26.3%;
          bottom: 14.6%;
          z-index: 2;
          width: 114%;
          height: 146.3%;
        }

        .card__greenShine {
          background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.008) 30%, transparent 60%);
          left: 20%;
          top: 0;
          bottom: 0;
          z-index: 1;
          width: 80%;
        }

        .card__doctorInfo {
          position: absolute;
          left: 5%;
          top: 6%;
          width: 48%;
          z-index: 10;
          color: #fff;
          font-family: 'Oswald', sans-serif;
          display: flex;
          flex-direction: column;
          gap: 3%;
        }

        .card__doctorName {
          font-size: clamp(32px, 8vw, 52px);
          font-weight: 600;
          line-height: 1.05;
          color: #fff !important;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3) !important;
          margin-bottom: 2%;
        }

        .card__doctorTitle {
          font-size: clamp(16px, 4vw, 22px);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: rgba(255, 255, 255, 0.95) !important;
          margin-bottom: 3%;
          line-height: 1.25;
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3) !important;
        }

        .card__doctorDescription {
          font-size: clamp(14px, 3.5vw, 18px);
          font-weight: 300;
          color: rgba(255, 255, 255, 0.9) !important;
          line-height: 1.5;
          white-space: pre-line;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25) !important;
          flex: 1;
        }

        .card__doctorImage {
          position: absolute;
          right: 5%;
          top: 50%;
          transform: translateY(-50%) scale(0.8) !important; /* 20% zoom applied */
          width: calc(45% - 10px);
          aspect-ratio: 1;
          border-radius: 50%;
          object-fit: cover; /* Changed to cover for better zoom effect */
          object-position: center center; /* Center the zoomed image */
          z-index: 3;
          border: 2px solid rgba(255, 255, 255, 0.2);
          box-shadow:
            0 0 20px rgba(255, 255, 255, 0.15),
            0 0 40px rgba(255, 255, 255, 0.08);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          background: rgba(255, 255, 255, 0.05);
          padding: 0; /* Removed padding since we're zooming */
          transform-origin: center center; /* Ensure zoom centers properly */
          will-change: transform;
        }

        .thank-you-card:hover .card__doctorImage {
          box-shadow: 
            0 0 25px rgba(255, 255, 255, 0.2),
            0 0 50px rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-50%) scale(0.8) !important; /* Maintain 20% zoom on hover */
        }

        .card__cometOuter {
          position: absolute;
          top: 25%;
          left: 20%;
        }

        .card__comet {
          position: relative;
          width: 6px;
          height: 6px;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 100%;
          transition: all 0.3s ease;
        }

        .thank-you-card:hover .card__comet {
          background-color: rgba(255, 255, 255, 0.9);
          box-shadow: 
            0 0 8px rgba(255, 255, 255, 0.6),
            0 0 15px rgba(255, 255, 255, 0.4);
        }

        .card__comet--second {
          right: -27px;
          top: -13.5px;
          transform: scale(0.8);
        }

        .card__comet:before,
        .card__comet:after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.15) 27%, rgba(255, 255, 255, 0) 100%);
          border-radius: 20px;
          transform: rotate(-45deg);
        }

        .card__comet:before {
          width: 14px;
          height: 55px;
          transform-origin: -2px 13px;
        }

        .card__comet:after {
          width: 10px;
          height: 65px;
          transform-origin: 0px 8px;
        }

        /* Adjust circular glassmorphism to accommodate larger image */
        @media (max-width: 1024px) {
          .card__doctorInfo {
            width: 48%;
            top: 8%;
          }
          
          .card__doctorImage {
            width: calc(43.2% - 10px);
            right: 6%;
            transform: translateY(-50%) scale(0.8) !important;
          }
          
          .card__circularGlassmorphism {
            width: calc(46.8% - 10px);
            right: 4%;
          }

          .thank-you-card:hover .card__doctorImage {
            transform: translateY(-50%) scale(0.8) !important;
          }
        }

        @media (max-width: 768px) {
          .thank-you-wrapper {
            padding: 0 15px;
          }

          .card__doctorInfo {
            left: 5%;
            top: 7%;
            width: 50%;
          }

          .card__doctorName {
            font-size: clamp(28px, 7vw, 38px);
          }

          .card__doctorTitle {
            font-size: clamp(14px, 4vw, 18px);
          }

          .card__doctorDescription {
            font-size: clamp(12px, 3.5vw, 16px);
            line-height: 1.4;
          }

          .card__doctorImage {
            width: calc(41.4% - 10px);
            right: 5%;
            transform: translateY(-50%) scale(0.8) !important;
          }

          .card__circularGlassmorphism {
            width: calc(45% - 10px);
            right: 3%;
          }

          .thank-you-card:hover .card__doctorImage {
            transform: translateY(-50%) scale(0.8) !important;
          }
        }

        @media (max-width: 480px) {
          .card__doctorInfo {
            width: 52%;
            top: 5%;
          }

          .card__doctorImage {
            width: calc(43.2% - 10px);
            right: 4%;
            transform: translateY(-50%) scale(0.8) !important;
          }

          .card__circularGlassmorphism {
            width: calc(46.8% - 10px);
            right: 2%;
          }

          .thank-you-card:hover .card__doctorImage {
            transform: translateY(-50%) scale(0.8) !important;
          }
        }
      `}</style>

      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@100;300;400;500;600&family=Orbitron:wght@400;700;900&display=swap"
        rel="stylesheet"
      />

      <div ref={cardRef} className="thank-you-card">
        <div className="card__backgroundGlassmorphism">
          <div
            ref={shineRef}
            style={{
              content: '""',
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background:
                "linear-gradient(45deg, transparent 20%, rgba(255, 255, 255, 0.02) 35%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.12) 52%, rgba(255, 255, 255, 0.05) 65%, transparent 80%)",
              transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
              transition: "transform 0.1s ease-out",
              opacity: 0,
              willChange: "transform",
              pointerEvents: "none",
            }}
          ></div>
        </div>
        <div ref={yearRef} className="card__doctorInfo">
          <div className="card__doctorName">{doctorData.name}</div>
          <div className="card__doctorTitle">{doctorData.title}</div>
          <div className="card__doctorDescription">{doctorData.description}</div>
        </div>
        <div ref={cometRef} className="card__cometOuter">
          <div className="card__comet"></div>
          <div className="card__comet card__comet--second"></div>
        </div>
        <div className="card__circularGlassmorphism"></div>
        <img 
          ref={doctorImageRef}
          src={doctorData.image} 
          alt={doctorData.name} 
          className="card__doctorImage" 
        />
        <div ref={orangeShineRef} className="card__orangeShine"></div>
        <div className="card__greenShine"></div>
      </div>
    </div>
  )
}

export default ThankYouCard