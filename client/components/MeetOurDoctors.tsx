"use client"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ElegantShadowTitle from "./ui/ElegantShadowTitle"
import ThankYouCard from "./ui/ThankYouCard"
import { useEffect, useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

// Mock components for demo
const ElegantShadowTitle = ({ children, className = "" }) => (
  <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg ${className}`}>
    {children}
  </h2>
)

const SubtextWithStrip = ({ children, className, delay }) => (
  <div className={className}>
    <span className="inline-block border-l-4 border-white pl-3">{children}</span>
  </div>
)

interface Doctor {
  id: number
  name: string
  title: string
  description: string
  image: string
}

const doctorsData: Doctor[] = [
  {
    id: 1,
    name: "Dr. Priyanka Das",
    title: "DIRECTOR (PHYSIOLOGY)",
    description:
      "Paramedic Doc & Professional Therapist\nNational player's Fitness Coach\n(Martial arts & Body Building)",
    image: "/das.jpg",
  },
  {
    id: 2,
    name: "Dr. Dhiraj Gupta",
    title: "SENIOR ORTHO SURGEON / CONSULTANT",
    description:
      "MBBS, MS -DNB - FRCS Ortho\nMRCS Edinburgh,\nEngland NHS\nVisiting Consultant UK, MCH",
    image: "/Gupta.jpg",
  },
  {
    id: 3,
    name: "Dr. Asimayan Nandi",
    title: "SENIOR PEDIATRIC NDT THERAPIST",
    description:
      "PHD Scholar\nNeuro Development Therapy (NDT)\nNDT Therapist ( BOBATH Method)\nNeuro - Disability, Fine Motor,\nGenetic & Syndromic, Toddler & Adults",
    image: "/Nandi.jpg",
  },
]

export default function MeetOurDoctors() {
  const subtitleRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { opacity: 1, y: 0 })
    }

    // Animation for cards
    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('.doctor-card')
      
      gsap.fromTo(cards, 
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-20 bg-gradient-to-b overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Compact single line */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <ElegantShadowTitle>
              Interactive Experience
            </ElegantShadowTitle>
          </div>

          <div ref={subtitleRef} className="px-1 md:px-2">
            <SubtextWithStrip
              className="font-light text-white text-sm md:text-base lg:text-lg"
              delay={0.3}
            >
              Say Goodbye to Pain, Hello to Flexrite World
            </SubtextWithStrip>
          </div>
        </div>

        {/* Doctor Cards Grid - Fully Responsive */}
        <div className="w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
            {/* Card 1 - Top Left */}
            <div className="flex justify-center lg:justify-start doctor-card">
              <div className="w-full max-w-xl transform transition-transform duration-300 hover:scale-105">
                <ThankYouCard doctor={doctorsData[0]} />
              </div>
            </div>

            {/* Card 2 - Bottom Right */}
            <div className="flex justify-center lg:justify-end doctor-card lg:mt-32">
              <div className="w-full max-w-xl transform transition-transform duration-300 hover:scale-105">
                <ThankYouCard doctor={doctorsData[1]} />
              </div>
            </div>

            {/* Card 3 - Top Right (moved up by 80px) */}
            <div className="flex justify-center lg:justify-end doctor-card lg:-mt-20">
              <div className="w-full max-w-xl transform transition-transform duration-300 hover:scale-105">
                <ThankYouCard doctor={doctorsData[2]} />
              </div>
            </div>
          </div>
        </div>

        {/* Additional spacing for better visual balance */}
        <div className="mt-12 md:mt-16 lg:mt-20"></div>
      </div>
    </section>
  )
}