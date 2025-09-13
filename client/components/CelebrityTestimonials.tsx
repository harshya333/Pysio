"use client"
import { useEffect, useState, useRef } from "react"
import ElegantShadowTitle from "./ui/ElegantShadowTitle"

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
    excerpt:
      "Flexrite World has been my top choice for years. Whether it's any time, they are my first call for physiotherapy needs.",
    ctaText: "Learn More",
    ctaLink: "#",
  },
  {
    id: "2",
    imageSrc: "/JB.avif",
    tagline: "Flexrite World",
    title: "Jaya Bhattacharya / Actor",
    excerpt:
      "Flexrite World offers the fastest pain relief, and I believe the doctors there have a magical touch. I can vouch for their expertise.",
    ctaText: "Learn More",
    ctaLink: "#",
  },
  {
    id: "3",
    imageSrc: "/CH.avif",
    tagline: "Flexrite World",
    title: "Chandrakant Handore / MP",
    excerpt:
      "After collaborating with many physiotherapy institutes, I can say Flexrite World offers the best pain relief and treatment.",
    ctaText: "Learn More",
    ctaLink: "#",
  },
  {
    id: "4",
    imageSrc: "/AM.avif",
    tagline: "Flexrite World",
    title: "Anupam Mittal / Investor",
    excerpt:
      "Priyanka excels at her work; bring your loved ones to Flexrite. Health is the biggest investment you can make.",
    ctaText: "Learn More",
    ctaLink: "#",
  },
  {
    id: "5",
    imageSrc: "/AB.avif",
    tagline: "Flexrite World",
    title: "Abhishek Bachchan / Actor",
    excerpt:
      "Experiencing healing at Flexrite World is essential on my agenda, right alongside refreshments and rest. Truly transformative.",
    ctaText: "Learn More",
    ctaLink: "#",
  },
]

export default function CelebrityTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const updateCarousel = (newIndex: number) => {
    if (isAnimating) return
    setIsAnimating(true)

    const nextIndex = (newIndex + cards.length) % cards.length
    setCurrentIndex(nextIndex)

    setTimeout(() => {
      setIsAnimating(false)
    }, 800) // Animation duration
  }

  const goToNext = () => {
    updateCarousel(currentIndex + 1)
  }

  const goToPrevious = () => {
    updateCarousel(currentIndex - 1)
  }

  // --- UPDATED LOGIC FOR SCROLL-BASED NAVIGATION ---
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Prevent scrolling if an animation is already in progress
      if (isAnimating) {
        e.preventDefault()
        return
      }

      const isScrollingDown = e.deltaY > 0
      const isScrollingUp = e.deltaY < 0

      if (isScrollingDown) {
        // If we are NOT on the last card, hijack the scroll to navigate the carousel
        if (currentIndex < cards.length - 1) {
          e.preventDefault()
          goToNext()
        }
        // If we ARE on the last card, this block is skipped, allowing default scroll
      } else if (isScrollingUp) {
        // If we are NOT on the first card, hijack the scroll to navigate the carousel
        if (currentIndex > 0) {
          e.preventDefault()
          goToPrevious()
        }
        // If we ARE on the first card, this block is skipped, allowing default scroll
      }
    }

    const section = sectionRef.current
    if (section) {
      section.addEventListener("wheel", handleWheel, { passive: false })
      return () => section.removeEventListener("wheel", handleWheel)
    }
  }, [isAnimating, currentIndex])

  // --- Keyboard navigation ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return

      if (e.key === "ArrowLeft") {
        e.preventDefault()
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        goToNext()
      }
    }

    const section = sectionRef.current
    if (section) {
      section.addEventListener("keydown", handleKeyDown)
      section.setAttribute("tabindex", "0") // Make the section focusable
      return () => section.removeEventListener("keydown", handleKeyDown)
    }
  }, [isAnimating, currentIndex])

  // --- Touch swipe navigation ---
  useEffect(() => {
    let touchStartX = 0
    let touchEndX = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX
      const swipeThreshold = 50
      const diff = touchStartX - touchEndX

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) { // Swiped left
          goToNext()
        } else { // Swiped right
          goToPrevious()
        }
      }
    }

    const section = sectionRef.current
    if (section) {
      section.addEventListener("touchstart", handleTouchStart)
      section.addEventListener("touchend", handleTouchEnd)
      return () => {
        section.removeEventListener("touchstart", handleTouchStart)
        section.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentIndex]) // Dependency on currentIndex to re-bind if needed, though not strictly necessary here

  const getCardPositionClass = (index: number) => {
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
        .carousel-container {
          width: 100%;
          max-width: 1400px;
          height: 420px;
          position: relative;
          perspective: 1200px;
          margin: 0 auto;
          overflow: hidden;
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

        .testimonial-card {
          position: absolute;
          width: 320px;
          height: 380px;
          background: rgba(255, 255, 255, 0.24);
          border-radius: 16px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(4.6px);
          -webkit-backdrop-filter: blur(4.6px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          overflow: hidden;
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }

        .testimonial-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        }

        .testimonial-card.center {
          z-index: 10;
          transform: scale(1.1) translateZ(0);
          background: rgba(255, 255, 255, 0.32);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }

        .testimonial-card.center .card-image {
          filter: none;
        }

        .testimonial-card.left-2 {
          z-index: 1;
          transform: translateX(-240px) scale(0.75) translateZ(-350px);
          opacity: 0.6;
        }

        .testimonial-card.left-2 .card-image {
          filter: grayscale(100%) brightness(0.7);
        }

        .testimonial-card.left-1 {
          z-index: 5;
          transform: translateX(-120px) scale(0.85) translateZ(-150px);
          opacity: 0.8;
        }

        .testimonial-card.left-1 .card-image {
          filter: grayscale(80%) brightness(0.8);
        }

        .testimonial-card.right-1 {
          z-index: 5;
          transform: translateX(120px) scale(0.85) translateZ(-150px);
          opacity: 0.8;
        }

        .testimonial-card.right-1 .card-image {
          filter: grayscale(80%) brightness(0.8);
        }

        .testimonial-card.right-2 {
          z-index: 1;
          transform: translateX(240px) scale(0.75) translateZ(-350px);
          opacity: 0.6;
        }

        .testimonial-card.right-2 .card-image {
          filter: grayscale(100%) brightness(0.7);
        }

        .testimonial-card.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .card-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
        }

        .card-image::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.1) 100%);
        }

        .card-content {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }

        .card-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 20px;
          right: 20px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        }

        .card-tagline {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.8);
          margin-bottom: 8px;
          letter-spacing: 0.5px;
        }

        .card-title {
          font-size: 18px;
          color: rgba(0, 0, 0, 0.9);
          margin-bottom: 12px;
          font-weight: 700;
          line-height: 1.3;
        }

        .card-excerpt {
          font-size: 14px;
          line-height: 1.5;
          color: rgba(0, 0, 0, 0.75);
          margin-bottom: 16px;
          flex: 1;
        }

        .card-cta {
          margin-top: auto;
        }

        .card-cta a {
          display: inline-block;
          padding: 8px 16px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4.6px);
          -webkit-backdrop-filter: blur(4.6px);
          border: 1px solid rgba(0, 0, 0, 0.3);
          color: rgba(255, 255, 255, 0.95);
          font-size: 12px;
          font-weight: 500;
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .card-cta a::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .card-cta a:hover {
          background: rgba(0, 0, 0, 0.7);
          border-color: rgba(0, 0, 0, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .member-info {
          text-align: center;
          margin-top: 60px;
          transition: all 0.5s ease-out;
        }

        .member-name {
          color: rgba(255, 255, 255, 0.95);
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 8px;
          position: relative;
          display: inline-block;
        }

        .member-name::before,
        .member-name::after {
          content: "";
          position: absolute;
          top: 100%;
          width: 80px;
          height: 2px;
          background: rgba(255, 255, 255, 0.6);
        }

        .member-name::before {
          left: -90px;
        }

        .member-name::after {
          right: -90px;
        }

        .member-role {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.2rem;
          font-weight: 500;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 8px 0;
          margin-top: -12px;
        }

        .dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 30px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: rgba(255, 255, 255, 0.8);
          transform: scale(1.2);
        }

        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.24);
          backdrop-filter: blur(4.6px);
          -webkit-backdrop-filter: blur(4.6px);
          color: rgba(0, 0, 0, 0.8);
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 20;
          transition: all 0.3s ease;
          font-size: 1.4rem;
          border: 1px solid rgba(255, 255, 255, 0.5);
          outline: none;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }

        .nav-arrow:hover {
          background: rgba(255, 255, 255, 0.32);
          border-color: rgba(255, 255, 255, 0.6);
          transform: translateY(-50%) scale(1.05);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
        }

        .nav-arrow.left {
          left: 15px;
        }

        .nav-arrow.right {
          right: 15px;
        }

        @media (max-width: 1024px) {
          .carousel-container {
            max-width: 1200px;
            height: 400px;
          }

          .testimonial-card {
            width: 300px;
            height: 360px;
          }

          .testimonial-card.left-2 {
            transform: translateX(-220px) scale(0.75) translateZ(-350px);
          }

          .testimonial-card.left-1 {
            transform: translateX(-110px) scale(0.85) translateZ(-150px);
          }

          .testimonial-card.right-1 {
            transform: translateX(110px) scale(0.85) translateZ(-150px);
          }

          .testimonial-card.right-2 {
            transform: translateX(220px) scale(0.75) translateZ(-350px);
          }
        }

        @media (max-width: 768px) {
          .carousel-container {
            height: 380px;
            max-width: 100%;
            padding: 0 20px;
          }

          .testimonial-card {
            width: 280px;
            height: 340px;
          }

          .testimonial-card.center {
            transform: scale(1.05) translateZ(0);
          }

          .testimonial-card.left-2 {
            transform: translateX(-180px) scale(0.7) translateZ(-300px);
          }

          .testimonial-card.left-1 {
            transform: translateX(-90px) scale(0.8) translateZ(-100px);
          }

          .testimonial-card.right-1 {
            transform: translateX(90px) scale(0.8) translateZ(-100px);
          }

          .testimonial-card.right-2 {
            transform: translateX(180px) scale(0.7) translateZ(-300px);
          }

          .card-image {
            height: 160px;
          }

          .card-content {
            padding: 18px;
          }

          .card-title {
            font-size: 16px;
          }

          .card-excerpt {
            font-size: 13px;
          }

          .nav-arrow {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
          }

          .nav-arrow.left {
            left: 8px;
          }

          .nav-arrow.right {
            right: 8px;
          }

          .member-info {
            margin-top: 50px;
          }

          .member-name {
            font-size: 1.8rem;
          }

          .member-role {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 640px) {
          .carousel-container {
            height: 350px;
            padding: 0 10px;
          }

          .testimonial-card {
            width: 250px;
            height: 320px;
          }

          .testimonial-card.left-2,
          .testimonial-card.right-2 {
            opacity: 0;
            pointer-events: none;
          }

          .testimonial-card.left-1 {
            transform: translateX(-80px) scale(0.75) translateZ(-100px);
          }

          .testimonial-card.right-1 {
            transform: translateX(80px) scale(0.75) translateZ(-100px);
          }

          .card-image {
            height: 140px;
          }

          .card-content {
            padding: 16px;
          }

          .card-title {
            font-size: 15px;
          }

          .card-excerpt {
            font-size: 12px;
          }

          .member-name {
            font-size: 1.6rem;
          }

          .member-role {
            font-size: 1rem;
          }

          .member-name::before,
          .member-name::after {
            display: none;
          }
          
          .nav-arrow {
            width: 35px;
            height: 35px;
            font-size: 1.1rem;
          }
        }
        
        @media (max-width: 480px) {
          .carousel-container {
            height: 320px;
          }
          
          .testimonial-card {
            width: 230px;
            height: 300px;
          }
          
          .testimonial-card.left-1 {
            transform: translateX(-70px) scale(0.7) translateZ(-100px);
          }

          .testimonial-card.right-1 {
            transform: translateX(70px) scale(0.7) translateZ(-100px);
          }
          
          .card-image {
            height: 130px;
          }
          
          .member-name {
            font-size: 1.4rem;
          }

          .member-role {
            font-size: 0.9rem;
          }

          .dots {
            margin-top: 25px;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="py-8 lg:py-12 px-4 lg:px-8 w-full overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-8 lg:mb-12">
            <div style={{ color: "#ffffff" }}>
              <ElegantShadowTitle>What Clients Are Saying ?</ElegantShadowTitle>
            </div>
          </div>

          <div className="carousel-container">
            <button className="nav-arrow left" onClick={goToPrevious} disabled={isAnimating}>
              ‹
            </button>
            <div className="carousel-track">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className={`testimonial-card ${getCardPositionClass(index)}`}
                  onClick={() => updateCarousel(index)}
                >
                  <img src={card.imageSrc || "/placeholder.svg"} alt={card.title} className="card-image" />
                  <div className="card-content">
                    <div>
                      <div className="card-tagline">{card.tagline}</div>
                      <h3 className="card-title">{card.title}</h3>
                      <p className="card-excerpt">{card.excerpt}</p>
                    </div>
                    <div className="card-cta">
                      <a href={card.ctaLink} target="_blank" rel="noopener noreferrer">
                        {card.ctaText}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="nav-arrow right" onClick={goToNext} disabled={isAnimating}>
              ›
            </button>
          </div>

          <div className="member-info">
            <h2 className="member-name" style={{ opacity: isAnimating ? 0 : 1 }}>
              {cards[currentIndex].title.split(" / ")[0]}
            </h2>
            <p className="member-role" style={{ opacity: isAnimating ? 0 : 1 }}>
              {cards[currentIndex].title.split(" / ")[1] || "Client"}
            </p>
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
      </section>
    </>
  )
}