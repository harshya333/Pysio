"use client"
import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface Review {
  id: string
  name: string
  review: string
  service: string
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Varun Khanna, Co Founder Fast & Up",
    review: "Priyanka is the first person I reach out to whenever I need a real doctor to figure out what's wrong with me. I hope you understand what that means!",
    service: "Medical Consultation"
  },
  {
    id: "2", 
    name: "Rajan Amba, Managing Director of Jaguar Land Rover India",
    review: "I highly recommend Priyanka Das for her outstanding work. Her commitment to excellence and innovative approach consistently elevate every project she undertakes. She is a true asset to any team.",
    service: "Professional Collaboration"
  },
  {
    id: "3",
    name: "Kangana Ranawat, Actor, India", 
    review: "Flexrite World greatly improved my health. Priyanka Das effectively treated my right wrist pain after a fight sequence Jhansi ki Rani filming. The therapy's quality was remarkable. For those seeking care that exceeds a comforting meal on a tough day, this clinic is exceptional.",
    service: "Wrist Pain Treatment"
  },
  {
    id: "4",
    name: "Mihika, International Pickle Ball, INDIA",
    review: "Flexrite World transformed my career! Priyanka jee healed my injuries with precision, while the staff's magical care felt like family. Their tailored therapy boosted my performance, helping me win the match.",
    service: "Sports Injury Recovery"
  },
  {
    id: "5",
    name: "Sohail Khan, Indian Actor",
    review: "You need to give it a try at least once to truly understand it.",
    service: "Therapy Experience"
  },
  {
    id: "6",
    name: "Dr. J. Richard Steadman, Retired Surgeon, Germany",
    review: "As a doctor, I recognize excellence, and Flexrite World exceeded all standards! Their senior specialists healed my knee pain with precision, while the staff's genuine care made every visit delightful. A perfect mix of advanced therapy and a magical personal touch.",
    service: "Knee Pain Treatment"
  },
  {
    id: "7",
    name: "Sakshi Malik, Indian Actor",
    review: "Priyanka Das is my go-to person during emergencies to ensure my shoots and work continue without interruption.",
    service: "Emergency Care"
  },
  {
    id: "8",
    name: "Sharan Hegde, Indian Actor",
    review: "Flexrite World serves as my reliable emergency partner, consistently prepared to step in and maintain the smooth execution of shoots and projects, because there's no need for complications when her support is readily available.",
    service: "Emergency Support"
  },
  {
    id: "9",
    name: "Amrita Thakur, Fashion & Design Style Curator",
    review: "Having already embarked on my fitness journey, Priyanka stepped in and helped me unlock my true potential, greatly enhancing my life. I strongly urge everyone to consider her if you want to elevate your health.",
    service: "Fitness Enhancement"
  }
]

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 transition-all duration-300 hover:bg-white/15 hover:border-white/30 h-full flex flex-col">
      {/* Review Text */}
      <p className="text-white/90 text-sm leading-relaxed mb-4 italic flex-grow">
        "{review.review}"
      </p>
      
      {/* Client Info */}
      <div className="border-t border-white/20 pt-4 mt-auto">
        <h4 className="text-white font-semibold text-base mb-1">
          {review.name}
        </h4>
        <p className="text-white/70 text-sm">
          {review.service}
        </p>
      </div>
    </div>
  )
}

export default function ClientReviews() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const headerRef = useRef<HTMLHeadingElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state for all cards and header
      gsap.set([headerRef.current, ...cardsRef.current], {
        opacity: 0,
        y: 50
      })

      // Create animation for header
      const headerAnimation = gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        paused: true,
        immediateRender: false
      })

      // Create the animation for cards
      animationRef.current = gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0, // No stagger - all animate simultaneously
        ease: "power2.out",
        paused: true,
        immediateRender: false
      })

      // Set up ScrollTrigger
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          headerAnimation.play()
          animationRef.current?.play()
        },
        onEnterBack: () => {
          headerAnimation.play()
          animationRef.current?.play()
        },
        onLeave: () => {
          headerAnimation.reverse()
          animationRef.current?.reverse()
        },
        onLeaveBack: () => {
          headerAnimation.reverse()
          animationRef.current?.reverse()
        },
        toggleActions: "play reverse play reverse"
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Add cards to ref array
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  return (
    <section ref={sectionRef} className="py-8 lg:py-12 px-4 lg:px-16 relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 
            ref={headerRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-400"
          >
            Reviews
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review) => (
            <div key={review.id} ref={addToRefs} className="h-full">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}