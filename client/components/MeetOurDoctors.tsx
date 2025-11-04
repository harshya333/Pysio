"use client"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"
import { MeshGradient } from "@paper-design/shaders-react"
import ThankYouCard from "./ui/ThankYouCard"
import ElegantShadowTitle from "./ui/ElegantShadowTitle1"

gsap.registerPlugin(ScrollTrigger)

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
    image: "/drimage1.png",
  },
  {
    id: 2,
    name: "Dr. Dhiraj Gupta",
    title: "SENIOR ORTHO SURGEON / CONSULTANT",
    description:
      "MBBS, MS -DNB - FRCS Ortho\nMRCS Edinburgh,\nEngland NHS\nVisiting Consultant UK, MCH",
    image: "/Gupta.png",
  },
  {
    id: 3,
    name: "Dr. Asimayan Nandi",
    title: "SENIOR PEDIATRIC NDT THERAPIST",
    description:
      "PHD Scholar\nNeuro Development Therapy (NDT)\nNDT Therapist ( BOBATH Method)\nNeuro - Disability, Fine Motor,\nGenetic & Syndromic, Toddler & Adults",
    image: "/Nandi1.png",
  },
]

export default function MeetOurDoctors() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      )

      // Subtitle animation
      gsap.fromTo(subtitleRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      )

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.doctor-card')
        gsap.fromTo(cards,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            }
          }
        )
      }

      // Reduced hover animations
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.doctor-card')
        cards.forEach(card => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.02, // Reduced from 1.03
              y: -3, // Reduced from -5
              duration: 0.3,
              ease: "power2.out"
            })
          })
          
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out"
            })
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-20 overflow-hidden"
    >
      {/* Static Background */}
      <div className="absolute inset-0 w-full h-full px-12.5 py-12.5">
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          {/* Plain Black Gradient Background */}
          <MeshGradient
            className="absolute inset-0 w-full h-full"
            colors={[
              "#000000",
              "#000000", 
              "#000000",
              "#000000",
              "#000000",
              "#000000",
              "#000000",
              "#000000",
              "#000000",
            ]}
            speed={0.1}
            backgroundColor="#000000"
          />

          {/* Simple overlay for subtle texture */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/95 to-black/90"></div>
          
          {/* Top gradient overlay */}
          <div 
            className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 to-transparent z-10"
          />

          {/* Bottom gradient overlay */}
          <div 
            className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent z-10"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div ref={titleRef} className="opacity-0">
            <ElegantShadowTitle className="mb-6 text-white">
              Interactive Experience
            </ElegantShadowTitle>
          </div>

          <div ref={subtitleRef} className="px-1 md:px-2 opacity-0">
       
              Say Goodbye to Pain, Hello to Flexrite World
          </div>
        </div>

        {/* Doctor Cards */}
        <div ref={cardsRef} className="w-full">
          <div className="flex flex-col items-center gap-8 md:gap-10 lg:gap-12">
            {/* Card 1 */}
            <div className="flex justify-center doctor-card w-full max-w-4xl">
              <div className="w-full transition-all duration-300 ">
                <ThankYouCard doctor={doctorsData[0]} />
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex justify-center doctor-card w-full max-w-4xl">
              <div className="w-full transition-all duration-300 ">
                <ThankYouCard doctor={doctorsData[1]} />
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex justify-center doctor-card w-full max-w-4xl">
              <div className="w-full transition-all duration-300 ">
                <ThankYouCard doctor={doctorsData[2]} />
              </div>
            </div>
          </div>
        </div>

        {/* Additional spacing */}
        <div className="mt-16 md:mt-20 lg:mt-24"></div>
      </div>
    </section>
  )
}