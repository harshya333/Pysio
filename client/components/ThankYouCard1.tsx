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
  const greenShineRef = useRef<HTMLDivElement>(null)
  const cometRef = useRef<HTMLDivElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const generateTranslate = (el: HTMLElement | null, e: MouseEvent, value: number) => {
      if (el) {
        el.style.transform = `translate(${e.clientX * value}px, ${e.clientY * value}px)`
      }
    }

    // http://stackoverflow.com/a/1480137
    const cumulativeOffset = (element: HTMLElement) => {
      let top = 0,
        left = 0
      let el: HTMLElement | null = element
      do {
        top += el.offsetTop || 0
        left += el.offsetLeft || 0
        el = el.offsetParent as HTMLElement
      } while (el)

      return {
        top: top,
        left: left,
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      const e = event
      if (!cardRef.current) return

      const cardOffset = cumulativeOffset(cardRef.current)
      const cardTop = cardOffset.top
      const cardBottom = cardOffset.top + 650 // Updated to new card height
      const cardLeft = cardOffset.left
      const cardRight = cardOffset.left + 1100 // Updated to new card width

      // Check if cursor is within restricted boundaries (60px vertical, 80px horizontal)
      const reactZoneTop = cardTop - 60
      const reactZoneBottom = cardBottom + 60
      const reactZoneLeft = cardLeft - 80
      const reactZoneRight = cardRight + 80

      if (e.pageY < reactZoneTop || e.pageY > reactZoneBottom || e.pageX < reactZoneLeft || e.pageX > reactZoneRight) {
        // Reset transform when outside reaction zone with smooth transition
        if (cardRef.current) {
          cardRef.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
          cardRef.current.style.transform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)"
        }
        // Reset all element positions with smooth transitions
        if (orangeShineRef.current) {
          orangeShineRef.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
          orangeShineRef.current.style.transform = "translate(0px, 0px)"
        }
        if (greenShineRef.current) {
          greenShineRef.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
          greenShineRef.current.style.transform = "translate(0px, 0px)"
        }
        if (yearRef.current) {
          yearRef.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
          yearRef.current.style.transform = "translate(0px, 0px)"
        }
        if (cometRef.current) {
          cometRef.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
          cometRef.current.style.transform = "translate(0px, 0px)"
        }
        if (shineRef.current) {
          shineRef.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
          shineRef.current.style.transform = "translateX(-50%) translateY(-50%) rotate(45deg)"
        }
        return
      }

      // Clear transitions when mouse is within reaction zone for smooth real-time movement
      if (cardRef.current) cardRef.current.style.transition = ""
      if (orangeShineRef.current) orangeShineRef.current.style.transition = ""
      if (greenShineRef.current) greenShineRef.current.style.transition = ""
      if (yearRef.current) yearRef.current.style.transition = ""
      if (cometRef.current) cometRef.current.style.transition = ""
      if (shineRef.current) shineRef.current.style.transition = ""

      const x = ((e.pageX - cardOffset.left - 1100 / 2) * -1) / 100 // Updated to new card width
      const y = ((e.pageY - cardOffset.top - 650 / 2) * -1) / 100 // Updated to new card height

      const matrix = [
        [1, 0, 0, -x * 0.00003],
        [0, 1, 0, -y * 0.00003],
        [0, 0, 1, 1],
        [0, 0, 0, 1],
      ]

      generateTranslate(orangeShineRef.current, e, 0.054)
      generateTranslate(greenShineRef.current, e, 0.054)
      generateTranslate(yearRef.current, e, 0.018)
      generateTranslate(cometRef.current, e, 0.03)

      // Realistic Pokemon shine reflection based on mouse position
      if (shineRef.current) {
        const shineX = (e.clientX - cardOffset.left - 550) * 0.18 // Updated to half of new width
        const shineY = (e.clientY - cardOffset.top - 325) * 0.18 // Updated to half of new height
        shineRef.current.style.transform = `translateX(${shineX}px) translateY(${shineY}px) rotate(45deg)`
      }

      if (cardRef.current) {
        cardRef.current.style.transform = `matrix3d(${matrix.toString()})`
      }
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
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
          width: 1100px;
          height: 650px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .thank-you-card {
          width: 1100px;
          height: 650px;
          border-radius: 24px;
          position: absolute;
          box-shadow: -10px 15px 60px 0 rgba(255, 255, 255, 0.08);
          overflow: hidden;
          z-index: 4;
          transition: box-shadow 0.4s ease;
        }

        .thank-you-card:hover {
          box-shadow: 
            -10px 10px 40px 0 rgba(255, 255, 255, 0.08),
            0 0 20px rgba(255, 255, 255, 0.1);
        }

        .card__backgroundGlassmorphism {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          z-index: 0;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }

        .card__backgroundGlassmorphism::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 20%,
            rgba(255, 255, 255, 0.02) 35%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0.15) 52%,
            rgba(255, 255, 255, 0.05) 65%,
            transparent 80%
          );
          transform: translateX(-50%) translateY(-50%) rotate(45deg);
          transition: transform 0.1s ease-out;
          opacity: 0;
          will-change: transform;
        }

        .thank-you-card:hover .card__backgroundGlassmorphism::before {
          opacity: 0.7;
        }

        .thank-you-card:hover .card__backgroundGlassmorphism {
          backdrop-filter: blur(12px) saturate(1.3);
          -webkit-backdrop-filter: blur(12px) saturate(1.3);
          border-color: rgba(255, 255, 255, 0.12);
        }

        .card__orangeShine,
        .card__greenShine {
          position: absolute;
          background-repeat: no-repeat;
          background-size: cover;
          transition: transform 0.2s ease-out;
        }

        .card__orangeShine {
          background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.015) 40%, transparent 70%);
          right: -180px;
          top: -108px;
          bottom: 60px;
          z-index: 2;
          width: 684px;
          height: 600px;
        }

        .card__greenShine {
          background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.015) 40%, transparent 70%);
          left: -180px;
          top: -108px;
          bottom: 60px;
          z-index: 2;
          width: 684px;
          height: 600px;
        }

        .card__videoContainer {
          position: absolute;
          top: 20px;
          left: 20px;
          width: calc(100% - 40px);
          height: calc(100% - 40px);
          z-index: 10;
          border-radius: 20px;
          overflow: hidden;
        }

        .card__video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
          min-height: 10%;
          min-width: 10%;
        }

        .card__comet {
          position: relative;
          width: 6px;
          height: 6px;
          background-color: rgba(255, 255, 255, 0.7);
          border-radius: 100%;
          transition: all 0.3s ease;
        }

        .thank-you-card:hover .card__comet {
          background-color: rgba(255, 255, 255, 0.9);
          box-shadow: 
            0 0 8px rgba(255, 255, 255, 0.6),
            0 0 16px rgba(255, 255, 255, 0.4),
            0 0 24px rgba(255, 255, 255, 0.2);
        }

        .card__cometOuter {
          position: absolute;
          top: 30%;
          left: 25%;
        }

        .card__comet--second {
          right: -30px;
          top: -15px;
          transform: scale(0.6);
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
          height: 56px;
          transform-origin: -2px 10px;
        }

        .card__comet:after {
          width: 10px;
          height: 64px;
          transform-origin: 0px 6px;
        }
      `}</style>

      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@100;300;400&family=Orbitron:wght@400;700;900&display=swap"
        rel="stylesheet"
      />

      <div ref={cardRef} className="thank-you-card">
        <div className="card__backgroundGlassmorphism">
          <div
            ref={shineRef}
            className="card__backgroundGlassmorphism::before"
            style={{
              content: '""',
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background:
                "linear-gradient(45deg, transparent 20%, rgba(255, 255, 255, 0.02) 35%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.15) 52%, rgba(255, 255, 255, 0.05) 65%, transparent 80%)",
              transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
              transition: "transform 0.1s ease-out",
              opacity: 0,
              willChange: "transform",
              pointerEvents: "none",
            }}
          ></div>
        </div>
        <div ref={yearRef} className="card__videoContainer">
          <video className="card__video" controls muted loop poster={doctor.image}>
            <source src={getVideoSource()} type="video/mp4" />
            <source src="/Flexrite.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div ref={cometRef} className="card__cometOuter">
          <div className="card__comet"></div>
          <div className="card__comet card__comet--second"></div>
        </div>
        <div ref={orangeShineRef} className="card__orangeShine"></div>
        <div ref={greenShineRef} className="card__greenShine"></div>
      </div>
    </div>
  )
}

export default ThankYouCard