"use client"

import { useState, useEffect, useRef } from "react"
import WordByWordAnimation from "./ui/WordByWordAnimation"
import ThankYouCard from "./ThankYouCards"
import ElegantShadowTitle from "./ui/ElegantShadowTitle1"
import { MeshGradient } from "@paper-design/shaders-react"

export default function AboutUs() {
  const slogans = [
    "Driven by Excellence, Fueled by Passion",
    "Navigating Wellness",
    "Connecting Care and Knowledge",
  ]

  const videoCards = [
    {
      id: 101,
      name: "Our Story – Intro",
      title: "WATCH INTRO",
      description: "Learn about our mission, approach, and the care we provide.",
      image: "/images/video2.png",
    },
    {
      id: 102,
      name: "Patient Journey",
      title: "WATCH VIDEO 1",
      description: "Recovery path, guidance, and milestones.",
      image: "/images/video1.png",
    },
    {
      id: 103,
      name: "Move Better Daily",
      title: "WATCH VIDEO 2",
      description: "Daily mobility, posture, and tips.",
      image: "/images/video3.png",
    },
  ]

  const [currentSloganIndex, setCurrentSloganIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [backgroundAnimation, setBackgroundAnimation] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const coreBeliefRef = useRef<HTMLDivElement>(null)
  const journeyRef = useRef<HTMLDivElement>(null)
  const [coreBeliefVisible, setCoreBeliefVisible] = useState(false)
  const [journeyVisible, setJourneyVisible] = useState(false)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // Change slogan every 200px of scroll
      const scrollIndex = Math.floor(scrollY / 200) % slogans.length
      setCurrentSloganIndex(scrollIndex)
      
      // Trigger visibility for main section
      if (scrollY > 100) {
        setIsVisible(true)
        // Start background animation when section becomes visible
        setBackgroundAnimation(true)
      }

      // Check visibility for core belief section
      if (coreBeliefRef.current) {
        const coreBeliefPosition = coreBeliefRef.current.getBoundingClientRect()
        if (coreBeliefPosition.top < window.innerHeight * 0.8) {
          setCoreBeliefVisible(true)
        }
      }

      // Check visibility for journey section
      if (journeyRef.current) {
        const journeyPosition = journeyRef.current.getBoundingClientRect()
        if (journeyPosition.top < window.innerHeight * 0.8) {
          setJourneyVisible(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    
    // Initial check on mount
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [slogans.length])

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-20 z-[20] overflow-x-hidden" 
      style={{ maxWidth: '100vw', width: '100%' }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full px-12.5 py-12.5">
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          {/* Animated Gradient Background */}
          <div className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-out ${
            backgroundAnimation ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-70'
          }`}>
            <MeshGradient
              className="absolute inset-0 w-full h-full"
              colors={[
                "#000000",
                "#0a0a0a",
                "#111111", 
                "#1a1a1a",
                "#222222",
                "#1a1a1a",
                "#111111",
                "#0a0a0a",
                "#000000",
              ]}
              speed={0.05}
              backgroundColor="#000000"
            />
          </div>

          {/* Animated Wave Effect */}
          <div 
            className={`absolute inset-0 opacity-20 transition-all duration-1200 ease-out delay-300 ${
              backgroundAnimation ? 'translate-x-0 opacity-25' : '-translate-x-full opacity-10'
            }`}
            style={{
              background: `linear-gradient(
                90deg,
                transparent 0%,
                rgba(10, 10, 10, 0.4) 20%,
                rgba(26, 26, 26, 0.6) 50%,
                rgba(10, 10, 10, 0.4) 80%,
                transparent 100%
              )`,
              maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%23000'/%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%23000'/%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23000'/%3E%3C/svg%3E")`,
              WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%23000'/%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%23000'/%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23000'/%3E%3C/svg%3E")`,
              maskSize: 'cover',
              WebkitMaskSize: 'cover',
            }}
          />

          {/* Animated Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br from-black/15 via-gray-900/10 to-black/20 mix-blend-overlay transition-all duration-1000 ease-out delay-500 ${
            backgroundAnimation ? 'opacity-100' : 'opacity-0'
          }`}></div>
          
          {/* Top gradient overlay */}
          <div 
            className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/40 to-transparent z-10 transition-all duration-800 ease-out delay-400 ${
              backgroundAnimation ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Bottom gradient overlay */}
          <div 
            className={`absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/30 to-transparent z-10 transition-all duration-800 ease-out delay-400 ${
              backgroundAnimation ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes textSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
        
        .animate-text-slide-up {
          animation: textSlideUp 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInFromLeft 1s ease-out forwards;
        }
        
        .animate-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animate-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animate-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animate-delay-800 {
          animation-delay: 0.8s;
        }
        
        .animate-delay-1000 {
          animation-delay: 1s;
        }
        
        .glass-card {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s ease-out;
        }
        
        .glass-card.animate-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .card-text {
          opacity: 0;
          transform: translateY(20px);
        }
        
        .card-text.animate-visible {
          animation: textSlideUp 0.8s ease-out forwards;
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Content Container - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 mb-12 md:mb-16">
          {/* Left Column - Text Content */}
          <div className="flex flex-col">
            {/* Our Story Title with Outline Text */}
            <ElegantShadowTitle className="mb-6 text-white">
              About Us
            </ElegantShadowTitle>

            {/* Main Heading with Word Animation */}
            <div className={`mb-6 md:mb-8 w-full transition-all duration-1000 delay-200 ${
              isVisible ? 'animate-slide-up opacity-100' : 'opacity-0'
            }`}>
              <div className="text-left">

                <WordByWordAnimation
                  className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-3xl leading-tight text-white block tracking-wide"
                  delay={0.1}
                  staggerDelay={0.03}
                >
                  Your health is our mission.
                </WordByWordAnimation>

                <WordByWordAnimation
                  className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-3xl leading-tight text-white block tracking-wide"
                  delay={0.1}
                  staggerDelay={0.03}
                >
                  Helping you move better, recover faster,and enjoy a vibrant lifestyle.
                </WordByWordAnimation>

              

               
              </div>
            </div>

            {/* Subheading */}
            <div className={`w-full mb-8 transition-all duration-1000 delay-400 ${
              isVisible ? 'animate-slide-up opacity-100' : 'opacity-0'
            }`}>
              <WordByWordAnimation
                className=" text-2xl sm:text-3xl md:text-4xl lg:text-3xl leading-tight text-white block tracking-wide"
                delay={0.1}
                staggerDelay={0.03}
              >
                Stronger, Healthier, Happier
              </WordByWordAnimation>
            </div>

            {/* Additional Interactive Content - Fills the gap */}
            <div className={`mt-4 transition-all duration-1000 ease-out transform delay-600 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
            </div>
          </div>

          {/* Right Column - Video Placeholder with Glass 3D */}
          <div className={`flex items-center justify-center mt-8 lg:mt-0 transition-all duration-1000 delay-600 ${
            isVisible ? 'animate-slide-up opacity-100' : 'opacity-0'
          }`}>
            <div className="w-full max-w-2xl px-4 sm:px-0">
              <ThankYouCard doctor={videoCards[0]} />
            </div>
          </div>
        </div>

        {/* Quotes and Description Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mt-8 md:mt-12">
          {/* Left Half - Animated Slogans/Quotes */}
          <div className={`flex flex-col items-start justify-center transition-all duration-1000 delay-700 ${
            isVisible ? 'animate-slide-up opacity-100' : 'opacity-0'
          }`}>
            <div className="relative h-20 sm:h-24 md:h-28 overflow-hidden flex items-center w-full mb-6">
              {slogans.map((slogan, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center transition-all duration-700 ease-in-out transform ${
                    index === currentSloganIndex
                      ? "translate-y-0 opacity-100"
                      : index < currentSloganIndex
                        ? "-translate-y-full opacity-0"
                        : "translate-y-full opacity-0"
                  }`}
                >
                  <p
                    className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-tight text-left px-2 sm:px-0 font-serif italic"
                    style={{
                      letterSpacing: "0.5px",
                    }}
                  >
                    "{slogan}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Half - Description Text */}
          <div className={`flex flex-col justify-center mt-4 lg:mt-0 transition-all duration-1000 delay-800 ${
            isVisible ? 'animate-slide-up opacity-100' : 'opacity-0'
          }`}>
            <p className={`card-text text-lg sm:text-xl md:text-2xl lg:text-2xl text-white/90 leading-relaxed font-light ${
              isVisible ? 'animate-text-slide-up animate-delay-1000' : ''
            }`}>
              We understand that good health is the foundation of an active and fulfilling life, 
              and our mission is to empower you in realizing your wellness aspirations. Our personalized 
              physiotherapy services are meticulously designed to cater to your unique needs.
            </p>
          </div>
        </div>

        {/* Expanded Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mt-16 md:mt-24">
          {/* Left Column - Core Belief */}
          <div 
            ref={coreBeliefRef}
            className={`glass-card ${coreBeliefVisible ? 'animate-visible' : ''}`}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 h-full">
              <h3 className="font-serif text-3xl sm:text-4xl text-white mb-6 font-medium">
                Our Core Belief
              </h3>
              <p className={`card-text text-xl sm:text-2xl md:text-2xl text-white/90 leading-relaxed font-light ${
                coreBeliefVisible ? 'animate-text-slide-up animate-delay-200' : ''
              }`}>
                At Flexrite World, we firmly believe that everyone deserves to live free from discomfort and pain. 
                Investing in your health is not just important; it's essential for enhancing your overall quality of life.
              </p>
            </div>
          </div>

          {/* Right Column - Call to Action */}
          <div 
            ref={journeyRef}
            className={`glass-card ${journeyVisible ? 'animate-visible' : ''}`}
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 h-full">
              <h3 className="font-serif text-3xl sm:text-4xl text-white mb-6 font-medium">
                Begin Your Journey
              </h3>
              <p className={`card-text text-xl sm:text-2xl md:text-2xl text-white/90 leading-relaxed font-light ${
                journeyVisible ? 'animate-text-slide-up animate-delay-400' : ''
              }`}>
                Take the step towards optimal health and recovery by reaching out to us today through 
                our online portal or WhatsApp. Your journey to a healthier, more active lifestyle begins 
                right here and we are excited to support you on this path.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}