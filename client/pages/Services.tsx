import Header from "@/components/Header";
import ContactFooter from "@/components/ContactFooter";
import ShaderBackground from "@/components/ui/ShaderBackground";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  layout: "left" | "right";
  image: string;
}

const services: Service[] = [
  {
    id: "1",
    title: "Injury Recovery",
    description:
      "Achieve recovery and growth with personalized care that offers vital support for lasting health. We are dedicated to empowering you on your journey to reach goals.",
    duration: "45 min",
    layout: "left",
    image: "/images/placeholder1.jpg",
  },
  {
    id: "2",
    title: "Therapeutic Massage",
    description:
      "Experience therapeutic massage to ease tension and enhance relaxation. Schedule your session today for a healthier and more balanced you.",
    duration: "45 min",
    layout: "right",
    image: "/images/placeholder2.jpg",
  },
  {
    id: "3",
    title: "Fitness Training",
    description:
      "Unlock your fitness potential with training designed for you. Our expert trainers will help you achieve your goals and transform your wellness journey. Start your path to a stronger you today!",
    duration: "1 hour",
    layout: "left",
    image: "/images/placeholder3.jpg",
  },
  {
    id: "4",
    title: "Deep Tissue Massage",
    description:
      "Deep tissue massage relieves pain and enhances flexibility. It targets deeper muscles, reducing stress and improving well-being. Experience its benefits.",
    duration: "45 min",
    layout: "right",
    image: "/images/placeholder4.jpg",
  },
  {
    id: "5",
    title: "Pain Relief Acupuncture",
    description:
      "Explore Pain Relief Acupuncture to ease discomfort and restore balance in your body. Discover its benefits and take a step toward a pain-free life.",
    duration: "45 min",
    layout: "left",
    image: "/images/placeholder5.jpg",
  },
  {
    id: "6",
    title: "Prenatal Care",
    description:
      "Prenatal care is crucial for a healthy pregnancy, supporting both mother and baby. Regular check-ups and guidance help monitor progress and address any concerns",
    duration: "1 hour",
    layout: "right",
    image: "/images/placeholder6.jpg",
  },
];

export default function Services() {
  const navigate = useNavigate();
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = React.useState<boolean[]>(
    Array(services.length).fill(false)
  );

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("4th July, Monday");
  const [selectedTime, setSelectedTime] = useState("6:30 PM");
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showKnowledgeOverlay, setShowKnowledgeOverlay] = useState(false);
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);

  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      image: "/das.jpg",
      linkedin: "#",
      instagram: "#",
      twitter: "#",
    },
    {
      name: "Dr. Michael Chen",
      image: "/doe.jpg",
      linkedin: "#",
      instagram: "#",
      twitter: "#",
    },
    {
      name: "Dr. Emily Rodriguez",
      image: "/reddy.jpg",
      linkedin: "#",
      instagram: "#",
      twitter: "#",
    },
  ];

  const nextDoctor = () => {
    setCurrentDoctorIndex((prev) => (prev + 1) % doctors.length);
  };

  // Scroll to top when component mounts
  useEffect(() => {
    // Scroll to top immediately when component mounts
    window.scrollTo(0, 0);
    
    // Additional safety scroll after a short delay
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  // Also scroll to top when route changes to this page
  useEffect(() => {
    // Listen for navigation changes and scroll to top
    const unlisten = navigate((location, action) => {
      if (action === "PUSH" || action === "POP") {
        window.scrollTo(0, 0);
      }
    });
    return () => {
      if (typeof unlisten === "function") unlisten();
    };
  }, [navigate]);

  useEffect(() => {
    if (showBookingModal) {
      const interval = setInterval(nextDoctor, 1500);
      return () => clearInterval(interval);
    }
  }, [showBookingModal, currentDoctorIndex]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    blockRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      const observer = new window.IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible((prev) => {
                if (prev[idx]) return prev;
                const updated = [...prev];
                updated[idx] = true;
                return updated;
              });
              observer.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    blockRefs.current.forEach((ref) => {
      if (!ref) return;
      const bg = ref.querySelector(".service-bg");
      const img = ref.querySelector(".service-img");
      if (bg) {
        gsap.to(bg, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: ref,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
      if (img) {
        gsap.to(img, {
          y: -20,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: ref,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });
    return () => {
      observers.forEach((observer) => observer.disconnect());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setShowServiceDropdown(false);
    setShowDatePicker(false);
    setShowTimePicker(false);
    setShowKnowledgeOverlay(false);
  };

  return (
    <div className="relative overflow-x-hidden" style={{ maxWidth: '100vw', width: '100%' }}>
      <div className="fixed inset-0 w-full h-full z-0">
        <ShaderBackground>
          <div></div>
        </ShaderBackground>
      </div>

      <style jsx global>{`
        .service-animate {
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 0.6s ease-in-out,
            transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .service-animate.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        .slide-from-up {
          transform: translateY(60px);
        }
        button.pressed {
          transform: scale(0.93);
        }
        * {
          transition: all 0.5s ease-out;
        }

        /* Unified Button Styles */
        .desktop-button {
          padding: 0.625rem 1.5rem;
          background: linear-gradient(to right, #10b981, #059669);
          color: white;
          font-weight: 600;
          border-radius: 0.75rem;
          transition: all 0.3s;
          transform: scale(1);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .desktop-button:hover {
          background: linear-gradient(to right, #059669, #047857);
          transform: scale(1.05);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .mobile-button {
          padding: 0.5rem 1rem;
          background: linear-gradient(to right, #10b981, #059669);
          color: white;
          font-weight: 600;
          border-radius: 0.75rem;
          transition: all 0.3s;
          font-size: 0.875rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .mobile-button:hover {
          background: linear-gradient(to right, #059669, #047857);
        }

        /* Glass Button Styles */
        .glass-button {
          font-family: "Amaranth", sans-serif;
          font-size: 16px;
          color: #ffffff;
          width: 100%;
          height: 50px;
          line-height: 1;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          position: relative;
          padding: 0.5em 1.5em;
          outline: none !important;
          border-radius: 12px;
          box-sizing: border-box;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .glass-button:hover {
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }
        
        .glass-dropdown {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        
        .glass-dropdown-item {
          padding: 12px 16px;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .glass-dropdown-item:last-child {
          border-bottom: none;
        }
        
        .glass-dropdown-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        /* Glass Card Styles */
        .glass-card {
          background: rgba(148, 188, 117, 0.08);
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(148, 188, 117, 0.3);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(148, 188, 117, 0.4), transparent);
        }

        .glass-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          border-color: rgba(148, 188, 117, 0.6);
          background: rgba(148, 188, 117, 0.12);
        }

        .service-image {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .glass-card:hover .service-image {
          transform: scale(1.05);
          border-color: rgba(148, 188, 117, 0.4);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .glass-card {
            border-radius: 20px;
            margin: 0.5rem 0;
          }
          
          .service-content {
            padding: 1.5rem !important;
          }
          
          .service-image {
            width: 120px !important;
            height: 120px !important;
          }
        }

        @media (max-width: 640px) {
          .glass-card {
            border-radius: 16px;
          }
          
          .service-content {
            padding: 1rem !important;
          }
          
          .service-image {
            width: 100px !important;
            height: 100px !important;
          }
        }
      `}</style>

      <div className="relative z-10">
        <Header />
        <div className="min-h-screen py-16 pt-32">
          <motion.div
            initial={{ opacity: 0, y: -32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="container mx-auto px-4 text-center mb-16"
          >
            <h1 className="font-playfair font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6">
              Our Services
            </h1>
            <p className="font-source text-lg md:text-xl lg:text-2xl text-white max-w-3xl mx-auto">
              Comprehensive care tailored to restore your strength, mobility,
              and wellness.
            </p>
          </motion.div>

          <div className="container mx-auto px-4 space-y-8 md:space-y-12 mb-20">
            {services.map((service, idx) => {
              const direction = "slide-from-up";
              return (
                <div
                  key={service.id}
                  ref={(el) => (blockRefs.current[idx] = el)}
                  className={`relative service-animate ${direction} ${
                    visible[idx] ? "in-view" : ""
                  }`}
                  style={{ willChange: "opacity, transform" }}
                >
                  <div className="glass-card">
                    <div className={`flex flex-col ${
                      service.layout === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
                    } items-center justify-between p-6 md:p-8 lg:p-10 gap-6 md:gap-8 lg:gap-12`}>
                      
                      {/* Service Image */}
                      <div className="flex-shrink-0">
                        <div className="service-image w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden bg-black/20 backdrop-blur-sm">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="object-cover w-full h-full transition-transform duration-500"
                          />
                        </div>
                      </div>

                      {/* Service Content */}
                      <div className="service-content flex-1 text-center md:text-left px-4 md:px-0">
                        <h2 className="font-playfair font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-4">
                          {service.title}
                        </h2>
                        <p className="font-source text-base md:text-lg lg:text-xl text-white/90 mb-6 leading-relaxed">
                          {service.description}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                          {/* Desktop Book Session Button */}
                          
                          
                          {/* Mobile Book Session Button */}
                          <button
                            className="sm:hidden mobile-button"
                            onClick={() => {
                              setSelectedService(service.title);
                              setShowBookingModal(true);
                            }}
                          >
                            Book Session
                          </button>
                          
                          <div className="text-center sm:text-right flex-shrink-0 min-w-0 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
                            <p className="font-source text-sm md:text-base text-white font-semibold">
                              {service.duration}
                            </p>
                            <p className="font-source text-xs md:text-sm text-white/70">
                              Expert Guided
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          
        </div>

        {/* Contact Footer */}
        <ContactFooter />

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-6 md:p-8 max-w-md w-full mx-4"
            >
              <button
                onClick={closeBookingModal}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-white/10 p-1 rounded-full backdrop-blur-sm z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Book Your Session</h2>
              
              <div className="space-y-4">
                <div className="relative">
                  <button
                    onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                    className="glass-button w-full text-left flex justify-between items-center"
                  >
                    <span>{selectedService || "Select Service"}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showServiceDropdown && (
                    <div className="glass-dropdown absolute top-full left-0 right-0 mt-1 z-10">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          className="glass-dropdown-item"
                          onClick={() => {
                            setSelectedService(service.title);
                            setShowServiceDropdown(false);
                          }}
                        >
                          {service.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="glass-button w-full text-left flex justify-between items-center"
                  >
                    <span>{selectedDate}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => setShowTimePicker(!showTimePicker)}
                    className="glass-button w-full text-left flex justify-between items-center"
                  >
                    <span>{selectedTime}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                
                <div className="pt-4">
                  <button
                    onClick={() => setShowKnowledgeOverlay(true)}
                    className="glass-button w-full bg-white/20 hover:bg-white/25 text-center justify-center"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20 flex items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                  <img
                    src={doctors[currentDoctorIndex].image}
                    alt={doctors[currentDoctorIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <p className="text-white font-medium">{doctors[currentDoctorIndex].name}</p>
                  <p className="text-gray-300 text-sm">Available for consultation</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        
        {/* Knowledge Overlay */}
        {showKnowledgeOverlay && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xl flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-6 md:p-8 max-w-md w-full mx-4"
            >
              <button
                onClick={closeBookingModal}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-white/10 p-1 rounded-full backdrop-blur-sm z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Booking Confirmed!</h2>
                <p className="text-gray-300 mt-2">Your session has been successfully booked</p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 mb-6 backdrop-blur-sm">
                <div className="flex justify-between py-2">
                  <span className="text-gray-300">Service:</span>
                  <span className="text-white font-medium">{selectedService}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-300">Date:</span>
                  <span className="text-white font-medium">{selectedDate}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-300">Time:</span>
                  <span className="text-white font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-300">Practitioner:</span>
                  <span className="text-white font-medium">{doctors[currentDoctorIndex].name}</span>
                </div>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={closeBookingModal}
                  className="glass-button w-32 justify-center"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}