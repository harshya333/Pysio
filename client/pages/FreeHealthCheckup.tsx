import { useState, useEffect, useRef } from "react";
import ContactFooter from "@/components/ContactFooter";
import Header from "@/components/Header";
import ShaderBackground from "@/components/ui/ShaderBackground";
import { motion } from "framer-motion";

export default function FreeHealthCheckup() {
  const [isExpanded, setIsExpanded] = useState(false);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>([]);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleApplyNow = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCallNow = () => {
    window.open('tel:02244506234', '_self');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919757090909', '_blank');
  };

  // Initialize all elements as visible immediately
  useEffect(() => {
    const initialVisible = Array(10).fill(true);
    setVisible(initialVisible);
  }, []);

  // Remove all GSAP and intersection observer logic
  useEffect(() => {
    // No animation logic - all elements appear instantly
    return () => {
      // Cleanup not needed
    };
  }, []);

  // Text animation variants for headers
  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const staggerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
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
          opacity: 1;
          transform: translateY(0);
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

        /* Enhanced Glass Card Styles */
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
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 0 80px rgba(148, 188, 117, 0.1);
          border-color: rgba(148, 188, 117, 0.6);
          background: rgba(148, 188, 117, 0.12);
        }

        /* Enhanced hover effect for cards with images */
        .glass-card:hover .stable-image {
          transform: scale(1.05);
          transition: transform 0.4s ease-out;
        }

        /* Stable Image Styles */
        .stable-image {
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.4s ease-out;
        }

        /* Section spacing */
        .section-spacing {
          margin-bottom: 6rem;
        }

        @media (max-width: 768px) {
          .section-spacing {
            margin-bottom: 4rem;
          }
          
          .glass-card {
            border-radius: 20px;
            margin: 0.5rem 0;
          }
          
          .service-content {
            padding: 1.5rem !important;
          }
        }

        @media (max-width: 640px) {
          .section-spacing {
            margin-bottom: 3rem;
          }
          
          .glass-card {
            border-radius: 16px;
          }
          
          .service-content {
            padding: 1rem !important;
          }
        }
      `}</style>

      <div className="relative z-10">
        <Header />
        <div className="min-h-screen py-16 pt-32">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto px-4 text-center mb-16"
          >
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-grayish-blue mb-6 sm:mb-8 tracking-tight"
            >
              Free Physical Health Check Up
            </motion.h1>
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={textVariants}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-grayish-blue tracking-tight">
                FLEXRITE IS FASTER
              </span>
            </motion.div>
            
          </motion.div>

          {/* Main Content Grid */}
          <div className="container mx-auto px-4 space-y-20 md:space-y-24 mb-20">
            
            {/* Program Overview */}
            <div
              ref={(el) => {
                blockRefs.current[0] = el;
                sectionRefs.current[0] = el;
              }}
              className="service-animate section-spacing"
            >
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={textVariants}
                className="text-center mb-10"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-grayish-blue mb-4 tracking-tight">
                  Free Physiotherapy Health Check-Up Program
                </h2>
              </motion.div>
              <div className="content-wrapper flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="flex-1 text-left">
                  <p className="font-source text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-6">
                    At Flexrite World, we understand that pain doesn't discriminate, and everyone deserves access to care,
                    regardless of their circumstances. With humility and a sense of responsibility, we are proud to offer a
                    Free Physiotherapy Health Check-Up Program to serve those who dedicate themselves to others or struggle
                    to access essential care.
                  </p>
                  <p className="font-source text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed">
                    Led by a team of senior and experienced physiotherapists, this program is our way of giving back to the community that has given us so much.
                  </p>
                </div>
                <div className="flex-1">
                  <img
                    src="/images/placeholder3.jpg"
                    alt="Physiotherapy and healthcare services"
                    className="w-full h-auto stable-image"
                  />
                </div>
              </div>
            </div>

            {/* Who We Serve */}
            <div
              ref={(el) => {
                blockRefs.current[1] = el;
                sectionRefs.current[1] = el;
              }}
              className="service-animate section-spacing"
            >
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={textVariants}
                className="text-center mb-10"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-grayish-blue mb-4 tracking-tight">
                  Who We Serve
                </h2>
                <p className="font-source text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                  Our program is designed to serve the following groups with free check-ups and therapy:
                </p>
              </motion.div>
              
              <div className="content-wrapper space-y-8">
                {[
                  {
                    title: "Armed Forces Personnel",
                    description: "Soldiers, Police Officers, Firefighters etc, dedicate their lives to the nation, enduring immense physical strain. We aim to help them recover from injuries, manage chronic pain, and maintain their health.",
                    additional: "This program supports their recovery from work-related injuries, joint pain, and stress."
                  },
                  {
                    title: "Orphans and Shelter Residents",
                    description: "Children and adults in orphanages or shelters often lack access to basic health services. We help them overcome issues like poor posture, injuries, or developmental concerns.",
                    additional: "Along that, Individuals with Disabilities with physical or neurological challenges."
                  },
                  {
                    title: "Old Age Home Residents or Financially Challenged Individuals",
                    description: "Senior citizens deserve comfort in their golden years. Our therapy alleviates arthritis, frozen shoulder, and mobility issues to improve their quality of life.",
                    additional: "For those below the poverty line, healthcare often feels like a luxury."
                  },
                  {
                    title: "Daily Wage Workers",
                    description: "Labourers and delivery workers often suffer from repetitive strain injuries or joint pain. Our program helps them recover and return to work without discomfort.",
                    additional: "We offer free therapy to ease their burden and help them live pain-free."
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerVariants}
                    custom={index}
                    className="glass-card p-6 md:p-8 group cursor-pointer"
                  >
                    <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
                      <div className="flex-shrink-0 w-full lg:w-48 h-48 rounded-xl overflow-hidden">
                        <img
                          src="/images/placeholder3.jpg"
                          alt={item.title}
                          className="w-full h-full object-cover stable-image"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl sm:text-3xl font-bold text-grayish-blue mb-4 tracking-tight">
                          {index + 1}. {item.title}
                        </h3>
                        <p className="font-source text-white/80 text-lg md:text-xl mb-4">
                          {item.description}
                        </p>
                        <p className="font-source text-white/80 text-lg md:text-xl">
                          {item.additional}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Program Highlights */}
            <div
              ref={(el) => {
                blockRefs.current[2] = el;
                sectionRefs.current[2] = el;
              }}
              className="service-animate section-spacing"
            >
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={textVariants}
                className="text-center mb-10"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-grayish-blue mb-4 tracking-tight">
                  Program Highlights
                </h2>
              </motion.div>
              <div className="content-wrapper grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Tailored Care",
                    description: "Individualized therapy plans to meet unique needs, whether it's pain relief, post-injury recovery, or long-term wellness."
                  },
                  {
                    title: "Modern Techniques",
                    description: "Including manual therapy, strength training, posture correction, and ergonomic advice."
                  },
                  {
                    title: "Compassionate Approach",
                    description: "Every patient is treated with dignity and care, ensuring a respectful and healing experience."
                  },
                  {
                    title: "Prevention Focus",
                    description: "Educating patients about healthy habits to prevent chronic issues and maintain mobility."
                  }
                ].map((highlight, index) => (
                  <motion.div 
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerVariants}
                    custom={index}
                    className="glass-card p-6 md:p-8 group cursor-pointer"
                  >
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-grayish-blue mb-2 tracking-tight">
                        {highlight.title}
                      </h3>
                      <p className="font-source text-white/80 text-lg md:text-xl">
                        {highlight.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Real Stories of Impact */}
            <div
              ref={(el) => {
                blockRefs.current[3] = el;
                sectionRefs.current[3] = el;
              }}
              className="service-animate section-spacing"
            >
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={textVariants}
                className="text-center mb-10"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-grayish-blue mb-4 tracking-tight">
                  Real Stories of Impact
                </h2>
              </motion.div>
              <div className="content-wrapper grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  {
                    name: "Rajeev (43), Police Officer",
                    story: "Came to us with chronic knee pain from years of patrolling. After a series of targeted exercises and therapy, he's back on duty without discomfort."
                  },
                  {
                    name: "Lata (65), Grandmother",
                    story: "Struggled to sit or stand due to arthritis. Our gentle therapy sessions have helped her move independently again, bringing back her smile."
                  },
                  {
                    name: "Aman (14), Shelter Resident",
                    story: "Had difficulty walking after a leg injury. Regular therapy not only helped him recover but also gave him the confidence to participate in school sports."
                  },
                  {
                    name: "Reema (38), Homemaker",
                    story: "Suffered from severe neck and shoulder pain due to household chores. Simple posture corrections and exercises eased her pain, making her daily life much more comfortable."
                  },
                  {
                    name: "Suraj (29), Delivery Worker",
                    story: "Injured his back lifting heavy parcels. Therapy helped him heal and provided tips to avoid future injuries."
                  }
                ].map((story, index) => (
                  <motion.div 
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerVariants}
                    custom={index}
                    className="glass-card p-6 md:p-8 group cursor-pointer"
                  >
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-grayish-blue mb-4 tracking-tight">{story.name}</h3>
                      <p className="font-source text-white/80 text-lg md:text-xl">{story.story}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Why This Matters */}
            <div
              ref={(el) => {
                blockRefs.current[4] = el;
                sectionRefs.current[4] = el;
              }}
              className="service-animate section-spacing"
            >
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={textVariants}
                className="glass-card p-8 md:p-10 lg:p-12 group cursor-pointer"
              >
                <div className="text-center mb-10">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-grayish-blue mb-4 tracking-tight">
                    Why This Matters
                  </h2>
                </div>
                <div className="content-wrapper flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                  <div className="flex-1">
                    <img
                      src="/images/placeholder3.jpg"
                      alt="Community care and support"
                      className="w-full h-auto stable-image"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-source text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed">
                      "At Flexrite World, we believe in serving with kindness. Physiotherapy is not just about healing the body; 
                      it's about restoring hope and dignity. Whether it's a soldier who has defended our borders, an elderly woman 
                      longing to move freely, a worker struggling to provide for their family, or even a beggar on the streets who 
                      cannot afford to ease their pain, we are here to ensure that everyone can live a healthier, happier life."
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="container mx-auto px-4 mb-20 section-spacing">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={textVariants}
              className="text-center"
            >
              <div className="glass-card max-w-4xl mx-auto p-8 md:p-12 lg:p-16 group cursor-pointer">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-grayish-blue mb-6 tracking-tight">
                  Join Us in Making a Difference
                </h2>
                <p className="font-source text-lg md:text-xl text-white/90 mb-6 max-w-2xl mx-auto">
                  Pain-free living is not a luxury—it's a right.
                </p>
                <p className="font-source text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  If you or someone you know can benefit from our program, don't hesitate to reach out.
                </p>
                <p className="font-source text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Together, let's create a community where care knows no boundaries.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    className="desktop-button md:hidden mobile-button"
                    onClick={handleCallNow}
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    Call Now
                  </button>
                  <button
                    className="hidden md:block desktop-button"
                    onClick={handleCallNow}
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    Call Now
                  </button>
                </div>
                
                <p className="font-source text-lg md:text-xl text-white/90 mt-8 max-w-2xl mx-auto">
                  To know more about our Free Health Check-Up today.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Contact Footer */}
        <ContactFooter />
      </div>
    </div>
  );
}