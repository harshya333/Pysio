"use client"

import { useEffect } from "react"
import Header from "@/components/Header"
import ShaderBackground from "@/components/ui/ShaderBackground"
import ThankYouCard from "@/components/ThankYouCard1"
import Carousel3D from "@/components/Carousel3D"
import ContactFooter from "@/components/ContactFooter"

export default function Portfolio() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)

    // Check if there's a hash in the URL for career section
    const handleHashChange = () => {
      if (window.location.hash === '#career') {
        scrollToCareerSection();
      }
    };

    // Handle initial hash
    if (window.location.hash === '#career') {
      // Small timeout to ensure the DOM is fully loaded
      setTimeout(scrollToCareerSection, 100);
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [])

  const scrollToCareerSection = () => {
    const careerSection = document.getElementById('career-section');
    if (careerSection) {
      const offsetTop = careerSection.getBoundingClientRect().top + window.pageYOffset;
      const headerOffset = 80; // Adjust based on your header height
      const targetPosition = offsetTop - headerOffset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative overflow-x-hidden" style={{ maxWidth: '100vw', width: '100%' }}>
      {/* Shader Background Animation */}
      <div className="fixed inset-0 w-full h-full z-0">
        <ShaderBackground>
          <div></div>
        </ShaderBackground>
      </div>

      {/* Yellow Overlay Shader - 20% opacity */}
      <div 
        className="fixed inset-0 w-full h-full z-[5] pointer-events-none"
        style={{
          backgroundColor: 'rgba(255, 235, 59, 0.6)', // Yellow with 20% opacity
          mixBlendMode: 'normal', // You can change to 'multiply', 'overlay', 'soft-light' for different effects
        }}
      />

      {/* Global CSS */}
      <style jsx global>{`
        /* Transition for viewport size changes */
        * {
          transition: all 0.5s ease-out;
        }
        
        /* Responsive font sizes */
        @media (max-width: 640px) {
          html {
            font-size: 14px;
          }
        }

        /* Ensure no white backgrounds */
        body {
          background: transparent;
        }

        /* Smooth scrolling for the whole page */
        html {
          scroll-behavior: smooth;
        }

        /* Additional yellow tint for images if needed */
        .yellow-tinted img {
          filter: sepia(20%) saturate(1.2) hue-rotate(40deg);
        }
      `}</style>

      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 pt-20 md:pt-28 pb-12 md:pb-16">
          {/* Profile Section */}
          <section className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 mb-16 md:mb-20">
            {/* Profile Image - Responsive sizing */}
            <div className="w-full max-w-md sm:w-4/5 md:w-3/5 lg:w-[40%] xl:w-[550px] h-auto aspect-video md:aspect-[4/3] lg:aspect-[11/8] rounded-2xl md:rounded-3xl lg:rounded-[52px] flex-shrink-0 overflow-hidden mx-auto lg:mx-0 lg:ml-4 xl:ml-20 border border-gray-700/50">
              <img 
                src="/Port1.avif" 
                alt="Mrs. Kavita Nim" 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Profile Content - Responsive alignment */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left px-4 sm:px-0 lg:ml-6 xl:ml-10 mt-6 lg:mt-0">
              <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[4rem] 2xl:text-[70px] text-white leading-tight md:leading-none mb-3 md:mb-4">
                Mrs. Kavita Nim
              </h2>
              <p className="font-itim text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[22px] text-white/90 mb-4 md:mb-6 lg:mb-8">
                Sports Massage Therapist at Flexrite World (Through Oxid Wellness)
              </p>
              <p className="font-montserrat text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed max-w-full lg:max-w-[90%] xl:max-w-[635px]">
                With over 20 years of hands-on experience, Mrs. Kavita Nim is a seasoned sports massage therapist known
                for her specialized expertise in enhancing athletic recovery and performance. She has provided therapy
                support at numerous high-profile tournaments and sporting events, working closely with professional
                athletes to aid muscle recovery, prevent injuries, and improve overall physical resilience. Her practice
                is grounded in deep anatomical knowledge and a personalized approach to therapy, making her a trusted
                name in the physiotherapy and wellness community.
              </p>
            </div>
          </section>

          {/* Gallery Section - Removed extra spacing */}
          <section className="mb-16 md:mb-24 flex flex-col items-center ">
            {/* Gallery Heading */}
            <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[4rem] 2xl:text-[70px] text-white leading-tight md:leading-none mb-2 md:mb-3 text-center">
              Gallery
            </h3>
            {/* Carousel with no extra margin */}
            <div className="w-full max-w-full overflow-hidden px-0 py">
              <Carousel3D />
            </div>
          </section>

          {/* Professional Journey Text */}
          <section className="mb-12 md:mb-16 px-4 sm:px-0">
            <p className="font-montserrat text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/80 leading-relaxed">
              Mrs. Kavita's professional journey gained momentum in 2015 at the HEAL Institute, Khar West, where she
              trained under Dr. Priyanka Das and served as Center Head. During her tenure, she honed her techniques
              while treating elite athletes and fitness enthusiasts. Now a senior therapist at Flexrite World, she
              continues to expand her reach across Mumbai, supported by an expert team dedicated to delivering top-tier
              sports massage therapy. Her contribution to the field has solidified her reputation as one of the most
              respected and experienced therapists in the golden hands domain of physiotherapy.
            </p>
          </section>

          {/* Career Section with ID for scrolling */}
          <section id="career-section" className="mb-20 flex justify-center">
            <ThankYouCard
              doctor={{
                name: "Mrs. Kavita Nim",
                title: "Sports Massage Therapist",
                description: "Expert in athletic recovery and performance enhancement",
                image: "/Port1.avif",
              }}
            />
          </section>
        </main>

        {/* Contact Footer */}
        <ContactFooter />
      </div>
    </div>
  )
}