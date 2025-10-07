"use client"
import { useState, useEffect } from "react"
import ElegantShadowTitle from './ui/ElegantShadowTitle'

interface CardData {
  id: string
  imageSrc: string
  tagline: string
  title: string
  excerpt: string
  ctaText: string
  ctaLink: string
}

const cards: CardData[] = [
  {
    id: "1",
    imageSrc: "/BT.avif",
    tagline: "Flexrite World",
    title: "Bhavna Talwar / Producer",
    excerpt: "Flexrite World has been my top choice for years. Whether it's any time, they are my first call for physiotherapy needs.",
    ctaText: "Learn More",
    ctaLink: "#",
  },
  {
    id: "2",
    imageSrc: "/JB.avif",
    tagline: "Flexrite World",
    title: "Jaya Bhattacharya / Actor",
    excerpt: "Flexrite World offers the fastest pain relief, and I believe the doctors there have a magical touch. I can vouch for their expertise.",
    ctaText: "Learn More",
    ctaLink: "#",
  },
  {
    id: "3",
    imageSrc: "/CH.avif",
    tagline: "Flexrite World",
    title: "Chandrakant Handore / MP",
    excerpt: "After collaborating with many physiotherapy institutes, I can say Flexrite World offers the best pain relief and treatment.",
    ctaText: "Learn More",
    ctaLink: "#",
  },
  {
    id: "4",
    imageSrc: "/AM.avif",
    tagline: "Flexrite World",
    title: "Anupam Mittal / Investor",
    excerpt: "Priyanka excels at her work; bring your loved ones to Flexrite. Health is the biggest investment you can make.",
    ctaText: "Learn More",
    ctaLink: "#",
  },
  {
    id: "5",
    imageSrc: "/AB.avif",
    tagline: "Flexrite World",
    title: "Abhishek Bachchan / Actor",
    excerpt: "Experiencing healing at Flexrite World is essential on my agenda, right alongside refreshments and rest. Truly transformative.",
    ctaText: "Learn More",
    ctaLink: "#",
  },
]

export default function CelebrityTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const updateCarousel = (newIndex: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    
    const nextIndex = (newIndex + cards.length) % cards.length
    setCurrentIndex(nextIndex)
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 800)
  }

  const goToNext = () => updateCarousel(currentIndex + 1)
  const goToPrevious = () => updateCarousel(currentIndex - 1)

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(goToNext, 5000)
    return () => clearInterval(interval)
  }, [currentIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])

  // Touch swipe support
  const [touchStartX, setTouchStartX] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX - touchEndX
    const swipeThreshold = 50

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        goToNext()
      } else {
        goToPrevious()
      }
    }
  }

  const getCardClass = (index: number) => {
    const offset = (index - currentIndex + cards.length) % cards.length
    
    if (offset === 0) return "center"
    if (offset === 1) return "right-1"
    if (offset === 2) return "right-2"
    if (offset === cards.length - 1) return "left-1"
    if (offset === cards.length - 2) return "left-2"
    return "hidden"
  }

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .testimonials-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
        }

        .header-container {
          text-align: center;
          margin-bottom: 2rem;
          z-index: 10;
        }

        @media (min-width: 1024px) {
          .header-container {
            margin-bottom: 3rem;
          }
        }

        .carousel-container {
          width: 100%;
          max-width: 1100px; /* Increased to accommodate wider cards */
          height: 520px; /* Increased height to maintain aspect ratio */
          position: relative;
          perspective: 1000px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .carousel-track {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          transform-style: preserve-3d;
        }

        .card {
          position: absolute;
          width: 350px; /* Increased from 280px to 350px (+70px) */
          height: 470px; /* Increased from 380px to 470px to maintain aspect ratio */
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
        }

        .card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          padding: 20px;
          color: white;
          text-align: center;
          transition: all 0.8s ease;
        }

        .card-name {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 5px;
          color: white;
        }

        .card-role {
          font-size: 1rem;
          opacity: 0.9;
          color: white;
        }

        /* 3D Carousel Positioning - ADJUSTED GAPS for wider cards */
        .card.center {
          z-index: 10;
          transform: scale(1.1) translateZ(0);
        }

        .card.center img {
          filter: none;
        }

        .card.left-2 {
          z-index: 1;
          transform: translateX(-340px) scale(0.8) translateZ(-300px); /* Increased from 270px to 340px */
          opacity: 0.7;
        }

        .card.left-2 img {
          filter: grayscale(100%);
        }

        .card.left-1 {
          z-index: 5;
          transform: translateX(-170px) scale(0.9) translateZ(-100px); /* Increased from 135px to 170px */
          opacity: 0.9;
        }

        .card.left-1 img {
          filter: grayscale(100%);
        }

        .card.right-1 {
          z-index: 5;
          transform: translateX(170px) scale(0.9) translateZ(-100px); /* Increased from 135px to 170px */
          opacity: 0.9;
        }

        .card.right-1 img {
          filter: grayscale(100%);
        }

        .card.right-2 {
          z-index: 1;
          transform: translateX(340px) scale(0.8) translateZ(-300px); /* Increased from 270px to 340px */
          opacity: 0.7;
        }

        .card.right-2 img {
          filter: grayscale(100%);
        }

        .card.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .testimonial-excerpt {
          color: white;
          font-size: 1.3rem;
          line-height: 1.6;
          max-width: 800px;
          text-align: center;
          margin: 40px auto 0;
          padding: 0 20px;
          font-weight: 300;
          transition: all 0.5s ease-out;
          min-height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .member-info {
          text-align: center;
          margin-top: 20px;
          transition: all 0.5s ease-out;
        }

        .member-name {
          color: white;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 10px;
          position: relative;
          display: inline-block;
        }

        .member-name::before,
        .member-name::after {
          content: "";
          position: absolute;
          top: 100%;
          width: 100px;
          height: 2px;
          background: white;
        }

        .member-name::before {
          left: -120px;
        }

        .member-name::after {
          right: -120px;
        }

        .member-role {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.5rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 10px 0;
          margin-top: -15px;
          position: relative;
        }

        .dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 60px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: white;
          transform: scale(1.2);
        }

        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 20;
          transition: all 0.3s ease;
          font-size: 1.5rem;
          border: none;
          outline: none;
          padding-bottom: 4px;
        }

        .nav-arrow:hover {
          background: rgba(255, 255, 255, 0.4);
          transform: translateY(-50%) scale(1.1);
        }

        .nav-arrow.left {
          left: 20px;
          padding-right: 3px;
        }

        .nav-arrow.right {
          right: 20px;
          padding-left: 3px;
        }

        @media (max-width: 768px) {
          .header-container {
            margin-bottom: 1.5rem;
          }

          .carousel-container {
            height: 420px; /* Increased from 350px */
            max-width: 900px; /* Adjusted for tablet */
          }

          .card {
            width: 270px; /* Increased from 200px to 270px (+70px) */
            height: 350px; /* Increased from 280px to 350px */
          }

          /* Adjusted gaps for wider tablet cards */
          .card.left-2 {
            transform: translateX(-260px) scale(0.8) translateZ(-300px); /* Increased from 190px to 260px */
          }

          .card.left-1 {
            transform: translateX(-130px) scale(0.9) translateZ(-100px); /* Increased from 95px to 130px */
          }

          .card.right-1 {
            transform: translateX(130px) scale(0.9) translateZ(-100px); /* Increased from 95px to 130px */
          }

          .card.right-2 {
            transform: translateX(260px) scale(0.8) translateZ(-300px); /* Increased from 190px to 260px */
          }

          .card-overlay {
            padding: 15px;
          }

          .card-name {
            font-size: 1.2rem;
          }

          .card-role {
            font-size: 0.9rem;
          }

          .testimonial-excerpt {
            font-size: 1.1rem;
            margin-top: 30px;
          }

          .member-name {
            font-size: 2rem;
          }

          .member-role {
            font-size: 1.2rem;
          }

          .member-name::before,
          .member-name::after {
            width: 50px;
          }

          .member-name::before {
            left: -70px;
          }

          .member-name::after {
            right: -70px;
          }

          .nav-arrow {
            width: 35px;
            height: 35px;
            font-size: 1.3rem;
          }
        }

        @media (max-width: 480px) {
          .header-container {
            margin-bottom: 1rem;
          }

          .carousel-container {
            height: 370px; /* Increased from 300px */
            max-width: 700px; /* Adjusted for mobile */
          }

          .card {
            width: 250px; /* Increased from 180px to 250px (+70px) */
            height: 330px; /* Increased from 260px to 330px */
          }

          /* Adjusted gaps for wider mobile cards */
          .card.left-2 {
            transform: translateX(-240px) scale(0.8) translateZ(-300px); /* Increased from 170px to 240px */
          }

          .card.left-1 {
            transform: translateX(-120px) scale(0.9) translateZ(-100px); /* Increased from 85px to 120px */
          }

          .card.right-1 {
            transform: translateX(120px) scale(0.9) translateZ(-100px); /* Increased from 85px to 120px */
          }

          .card.right-2 {
            transform: translateX(240px) scale(0.8) translateZ(-300px); /* Increased from 170px to 240px */
          }

          .card-overlay {
            padding: 12px;
          }

          .card-name {
            font-size: 1rem;
          }

          .card-role {
            font-size: 0.8rem;
          }

          .testimonial-excerpt {
            font-size: 1rem;
            margin-top: 25px;
          }

          .member-name {
            font-size: 1.8rem;
          }

          .member-role {
            font-size: 1rem;
          }

          .nav-arrow {
            width: 30px;
            height: 30px;
            font-size: 1.2rem;
          }

          .nav-arrow.left {
            left: 10px;
          }

          .nav-arrow.right {
            right: 10px;
          }
        }
      `}</style>

      <div className="testimonials-section">
        <div className="header-container">
          <div style={{ color: "#ffffff" }}>
            <ElegantShadowTitle>What Clients 
              <br />
              Are Saying ?</ElegantShadowTitle>
          </div>
        </div>

        <div className="carousel-container">
          <button 
            className="nav-arrow left" 
            onClick={goToPrevious}
            aria-label="Previous testimonial"
          >
            ‹
          </button>
          
          <div 
            className="carousel-track"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`card ${getCardClass(index)}`}
                onClick={() => updateCarousel(index)}
              >
                <img src={card.imageSrc} alt={card.title.split('/')[0].trim()} />
                <div className="card-overlay">
                  <div className="card-name">{card.title.split('/')[0].trim()}</div>
                  <div className="card-role">{card.title.split('/')[1].trim()}</div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="nav-arrow right" 
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>

       

        <div className="testimonial-excerpt" style={{ opacity: 1 }}>
          "{cards[currentIndex].excerpt}"
        </div>

        <div className="dots">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => updateCarousel(index)}
            />
          ))}
        </div>
      </div>
    </>
  )
}