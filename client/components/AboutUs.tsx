"use client"

import { useState, useEffect } from "react"
import WordByWordAnimation from "./ui/WordByWordAnimation"
import LineByLineAnimation from "./ui/LineByLineAnimation"
import ThankYouCard from "./ThankYouCards"

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // Change slogan every 200px of scroll
      const scrollIndex = Math.floor(scrollY / 200) % slogans.length
      setCurrentSloganIndex(scrollIndex)
      
      // Trigger visibility for animations
      if (scrollY > 100) {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [slogans.length])

  return (
    <section className="relative min-h-screen py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-20 z-[20] overflow-x-hidden" style={{ maxWidth: '100vw', width: '100%' }}>
      <div className="max-w-7xl mx-auto">
        {/* Content Container - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 mb-12 md:mb-16">
          {/* Left Column - Text Content */}
          <div className="flex flex-col">
            {/* Our Story Title with Outline Text */}
            <div className="mb-6 lg:mb-8 w-full">
              <h2 className="text-left w-full text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-snug text-transparent [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:white]">
                About US
              </h2>
            </div>

            {/* Main Heading with Word Animation */}
            <div className="mb-6 md:mb-8 w-full">
              <div className="text-left">
                <WordByWordAnimation
                  className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-4xl leading-tight text-white block tracking-wide"
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
            <div className="w-full mb-8">
              <WordByWordAnimation
                className=" text-2xl sm:text-3xl md:text-4xl lg:text-3xl leading-tight text-white block tracking-wide"
                delay={0.1}
                staggerDelay={0.03}
              >
                Stronger, Healthier, Happier
              </WordByWordAnimation>
            </div>

            {/* Additional Interactive Content - Fills the gap */}
            <div className={`mt-4 transition-all duration-1000 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
            </div>
          </div>

          {/* Right Column - Video Placeholder with Glass 3D */}
          <div className="flex items-center justify-center mt-8 lg:mt-0">
            <div className="w-full max-w-2xl px-4 sm:px-0">
              <ThankYouCard doctor={videoCards[0]} />
            </div>
          </div>
        </div>

        {/* Quotes and Description Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mt-8 md:mt-12">
          {/* Left Half - Animated Slogans/Quotes */}
          <div className="flex flex-col items-start justify-center">
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
          <div className="flex flex-col justify-center mt-4 lg:mt-0">
            <WordByWordAnimation
              className=" text-2xl sm:text-3xl md:text-4xl lg:text-3xl leading-tight text-white block tracking-wide"
              delay={0.1}
              staggerDelay={0.03}
            >
              We understand that good health is the foundation of an active and fulfilling life, 
              and our mission is to empower you in realizing your wellness aspirations. Our personalized 
              physiotherapy services are meticulously designed to cater to your unique needs.
            </WordByWordAnimation>
          </div>
        </div>

        {/* Expanded Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mt-16 md:mt-24">
          {/* Left Column - Core Belief */}
          <div className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 h-full">
              <h3 className="font-serif text-2xl sm:text-3xl text-white mb-6 font-medium">
                Our Core Belief
              </h3>

              <WordByWordAnimation
                className=" text-2xl sm:text-3xl md:text-4xl lg:text-3xl leading-tight text-white block tracking-wide"
                delay={0.1}
                staggerDelay={0.03}
              >
                At Flexrite World, we firmly believe that everyone deserves to live free from discomfort and pain. 
                Investing in your health is not just important; it's essential for enhancing your overall quality of life.
              </WordByWordAnimation>
            </div>
          </div>

          {/* Right Column - Call to Action */}
          <div className={`transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 h-full">
              <h3 className="font-serif text-2xl sm:text-3xl text-white mb-6 font-medium">
                Begin Your Journey
              </h3>
              <WordByWordAnimation
                className=" text-2xl sm:text-3xl md:text-4xl lg:text-3xl leading-tight text-white block tracking-wide"
                delay={0.1}
                staggerDelay={0.03}
              >
                Take the step towards optimal health and recovery by reaching out to us today through 
                our online portal or WhatsApp. Your journey to a healthier, more active lifestyle begins 
                right here and we are excited to support you on this path.
              </WordByWordAnimation>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}