"use client"

import Header from "@/components/Header";
import ShaderBackground from "@/components/ui/ShaderBackground";
import LiquidHoverOverlay from "@/components/ui/LiquidHoverOverlay";
import ContactFooter from "@/components/ContactFooter";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export default function WaveGym() {
  const videoRef = useRef(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Optional: Handle hash-based navigation if needed
    const handleHashChange = () => {
      if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 100);
      }
    };

    // Handle initial hash
    if (window.location.hash) {
      setTimeout(() => {
        scrollToSection(window.location.hash.substring(1));
      }, 300);
    }

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.getBoundingClientRect().top + window.pageYOffset;
      const headerOffset = 80; // Adjust based on your header height
      const targetPosition = offsetTop - headerOffset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleFreePass = () => {
    // Add your free pass logic here
    console.log("Free pass claimed!");
    // You can add navigation or modal opening logic here
  };

  return (
    <div className="relative overflow-x-hidden" style={{ maxWidth: '100vw', width: '100%' }}>
      {/* Orange Color Plane Overlay - Added back with 20% opacity */}
      <div className="fixed inset-0 w-full h-full z-[5] pointer-events-none">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'rgba(251, 146, 60, 0.4)', // Orange with 20% opacity
            mixBlendMode: 'multiply'
          }}
        />
      </div>

      {/* Shader Background with orange gradient */}
      <div className="fixed inset-0 w-full h-full z-0">
        <ShaderBackground>
          {/* Orange gradient overlay for shader */}
          <div className="absolute inset-0 bg-gradient-to-br from-white-500/10 via-white-400/5 to-transparent" />
        </ShaderBackground>
      </div>

      {/* Animated Background Elements -  Theme */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-white-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-white-300/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-white-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Global CSS */}
      <style jsx global>{`
        /* Smooth transitions */
        * {
          transition: all 0.3s ease-out;
        }

        /* Responsive font sizes */
        @media (max-width: 640px) {
          html {
            font-size: 14px;
          }
        }

        /* Custom scrollbar - Updated with white accent */
        ::-webkit-scrollbar {
          width: 12px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.8);
          border-radius: 6px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #fb923c, #f97316);
          border-radius: 6px;
          border: 2px solid rgba(15, 23, 42, 0.8);
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #f97316, #ea580c);
        }

        ::-webkit-scrollbar-corner {
          background: rgba(15, 23, 42, 0.8);
        }

        /* Firefox scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: #fb923c rgba(15, 23, 42, 0.8);
        }

        /* Ensure no white backgrounds */
        body {
          background: transparent;
          overflow-x: hidden;
        }

        /* Smooth scrolling for the whole page */
        html {
          scroll-behavior: smooth;
        }

        /* Line clamp utility */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <div className="relative z-10">
        <Header />
        
        {/* Enhanced Hero Section */}
        <main className="container mx-auto px-4 sm:px-6 pt-20 md:pt-28 pb-12 md:pb-16">
          <motion.section
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="mb-16 md:mb-24"
          >
            <div className="relative h-[70vh] md:h-[80vh] rounded-[40px] md:rounded-[60px] overflow-hidden mb-12 border border-white/20 shadow-2xl">
              <LiquidHoverOverlay intensity={0.3} className="w-full h-full">
                <div className="absolute inset-0">
                  {/* Video Background */}
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/Flexrite.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 right-10 w-24 h-24 bg-white-400/10 rounded-full backdrop-blur-sm border border-white-300/20"
                />
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-20 left-10 w-16 h-16 bg-white-400/10 rounded-full backdrop-blur-sm border border-white-300/20"
                />

                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="font-playfair font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-4 md:mb-6 leading-tight"
                  >
                    Wave Gym
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="font-source text-xl md:text-2xl lg:text-3xl text-white/90 max-w-3xl mb-8 leading-relaxed"
                  >
                    Where Fitness Meets Legacy
                  </motion.p>
                </div>
              </LiquidHoverOverlay>
            </div>
          </motion.section>

          {/* Special Offer Section */}
          <section className="mb-16 md:mb-24 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-[40px] border border-white/20 shadow-2xl"
            >
              <LiquidHoverOverlay intensity={0.2} className="w-full h-full">
                <div className="relative z-10 p-12 md:p-16 lg:p-20">
                  <div className="text-center mb-8">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-8"
                    >
                      Special Offer for Flexrite World Clients
                    </motion.h2>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="flex justify-center items-center gap-8 my-8"
                    >
                      <div className="w-32 h-32 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center p-4">
                        <img
                          src="/wavegymlogo.png"
                          alt="WaveGym Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-4xl text-white">×</div>
                      <div className="w-32 h-32 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center p-4">
                        <img
                          src="/Logo.png"
                          alt="Flexrite Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="space-y-6"
                    >
                      <p className="font-source text-lg md:text-xl text-white/90 leading-relaxed">
                        At Flexrite World, your health is our priority. And now, we are giving you the chance to take it a step further!
                      </p>
                      <p className="font-source text-lg md:text-xl text-white/90 leading-relaxed">
                        Every Flexrite World client gets a <span className="text-white-400 font-bold">One-Day Free Pass</span> to WaveGym - experience what it feels like to train in a world-class fitness environment, guided by experts who understand your body.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="relative rounded-2xl overflow-hidden border border-white/20"
                    >
                      <img
                        src="/wavegymlegacy.jpeg"
                        alt="WaveGym and Flexrite Partnership"
                        className="w-full h-64 object-cover"
                      />
                    </motion.div>
                  </div>

                  {/* Centered Button - Updated */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex justify-center"
                  >
                    <motion.button
                      onClick={handleFreePass}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 rounded-full font-bold text-white shadow-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-black to-Orange-600 hover:from-Orange-700 hover:to-black animate-pulse"
                    >
                     Claim your free pass today
                    </motion.button>
                  </motion.div>
                </div>
              </LiquidHoverOverlay>
            </motion.div>
          </section>

          {/* Why Wave Gym Section */}
          <section className="mb-16 md:mb-24">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                  Why Wave Gym? The Legacy of Gyms
                </h2>
                <p className="font-source text-lg md:text-xl text-white/70 max-w-4xl mx-auto">
                  WaveGym isn't just a gym - it's a movement, a community, a legacy. Here, fitness is built on science, performance, and passion.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    title: "World-Class Setup",
                    description: "Train with cutting-edge equipment designed for results."
                  },
                  {
                    title: "Physio-Integrated Training",
                    description: "Every workout has the backing of medical expertise."
                  },
                  {
                    title: "Trusted by Professionals & Athletes",
                    description: "Many achievers and fitness icons are part of the WaveGym family."
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white-300/30 transition-all duration-300"
                  >
                    <h3 className="font-playfair text-xl md:text-2xl text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="font-source text-white/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="text-center italic max-w-3xl mx-auto p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <p className="font-source text-xl text-white/90 leading-relaxed mb-4">
                  "WaveGym isn't just about machines. It's about the energy, the vibe, and the people. Training here makes you feel part of something special."
                </p>
                <p className="font-source text-white/70">- A WaveGym Member</p>
              </motion.div>
            </div>
          </section>

          {/* Programs Section */}
          <section className="mb-16 md:mb-24">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                  Programs Designed for You
                </h2>
                <p className="font-source text-lg md:text-xl text-white/70 max-w-4xl mx-auto">
                  Whether you're a beginner, recovering from an injury, or an athlete aiming for peak performance - WaveGym has the perfect program for you.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "Strength & Conditioning - Build lean muscle & raw power.",
                  "Functional Training - Stay fit for everyday life.",
                  "Sports Performance Training - Level up your game with athlete-style workouts.",
                  "Rehab-to-Gym Transition - Safely move from physiotherapy to active fitness.",
                  "Personal Training with Experts - Tailored sessions for your body, goals, and health."
                ].map((program, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border--300/30 transition-all duration-300"
                  >
                    <p className="font-source text-white/90 leading-relaxed">
                      {program}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Partnership Details Section */}
          <section className="mb-16 md:mb-24">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                {/* Partnership Logos */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex justify-center items-center gap-8 mb-8"
                >
                  <div className="w-40 h-40 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center p-6">
                    <img
                      src="/wavegymlogo.png"
                      alt="WaveGym Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-4xl text-white font-bold">×</div>
                  <div className="w-40 h-40 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center p-6">
                    <img
                      src="/Logo.png"
                      alt="Flexrite Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </motion.div>
                
                <p className="font-source text-2xl md:text-3xl text-white-400 mb-4">
                  Recovery and Fitness That Work Together
                </p>
                <p className="font-source text-lg md:text-xl text-white/70 max-w-4xl mx-auto">
                  Flexrite has partnered with Waves Gym to give you the best of both worlds, right here in Andheri West.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <h3 className="font-playfair text-3xl text-white mb-6">Why This Partnership Works</h3>
                  
                  <div className="space-y-4">
                    {[
                      "Complementary Strengths – training at Waves, recovery with Flexrite",
                      "Shared Expertise – coaches and specialists aligned on your goals",
                      "Balanced Approach – fitness and mobility working hand in hand",
                      "Convenience – both located in central Andheri West, just minutes apart"
                    ].map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 bg-white-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="font-source text-white/90 leading-relaxed">
                          {benefit}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <h3 className="font-playfair text-3xl text-white mb-6">What You'll Find</h3>
                  
                  <div className="space-y-4">
                    {[
                      "Smarter training that keeps injuries away",
                      "Recovery plans to help you bounce back faster",
                      "Mobility work that supports your workouts",
                      "Posture improvements you notice every day",
                      "Strength & conditioning made sustainable"
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 bg-white-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="font-source text-white/90 leading-relaxed">
                          {feature}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Location Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="text-center mt-12 p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <h3 className="font-playfair text-3xl text-white mb-6">Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/90">
                  <div>
                    <p className="font-source text-xl mb-2">Waves Gym – Andheri West</p>
                  </div>
                  <div>
                    <p className="font-source text-xl mb-2">Flexrite Physiotherapy – Andheri West</p>
                  </div>
                </div>
                <p className="font-source text-white-400 text-xl mt-6">
                  Your fitness and recovery circuit, right here in Andheri West.
                </p>
                <p className="font-source text-white text-2xl mt-4 font-bold">
                  Train at Waves. Recover with Flexrite.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-[40px] border border-white/20 shadow-2xl"
            >
              <LiquidHoverOverlay intensity={0.25} className="w-full h-full">
                <div className="absolute inset-0 bg-white/5"></div>
                
                <div className="relative z-10 text-center p-12 md:p-16 lg:p-20">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-6"
                  >
                    Ready to Experience It?
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="font-source text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed"
                  >
                    Your journey to strength, confidence, and legacy starts here.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="font-source text-xl md:text-2xl text-white-400 mb-8 font-bold"
                  >
                    Flexrite Clients: Claim your FREE one-day pass and feel the WaveGym difference.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="font-source text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed italic"
                  >
                    Because once you step in, you'll never look at fitness the same way again.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex justify-center"
                  >
                    <motion.button
                      onClick={handleFreePass}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 rounded-full font-bold text-white shadow-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-black to-Orange-100 hover:from-Orange-100 hover:to-orange animate-pulse"
                    >
                      Claim Your Free Day Pass Now
                    </motion.button>
                  </motion.div>
                </div>
              </LiquidHoverOverlay>
            </motion.div>
          </section>
        </main>

        {/* Contact Footer */}
        <ContactFooter />
      </div>
    </div>
  );
}