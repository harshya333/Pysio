"use client";

import { useState, useEffect } from 'react';
import { Carousel } from "@/components/ui/carousel";

export default function SimpleCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Updated slides without "Portfolio 1,2" text
  const slides = [
    {
      title: "Creative Design",
      button: "View Project",
      src: "/Port1.avif",
      alt: "Creative Design Project"
    },
    {
      title: "Modern Solution",
      button: "View Project",
      src: "/Port2.avif",
      alt: "Modern Solution Project"
    },
    {
      title: "Innovative Approach",
      button: "View Project",
      src: "/Port3.avif",
      alt: "Innovative Approach Project"
    },
    {
      title: "Brand Identity",
      button: "View Project",
      src: "/Port4.avif",
      alt: "Brand Identity Project"
    },
    {
      title: "Digital Experience",
      button: "View Project",
      src: "/Port5.avif",
      alt: "Digital Experience Project"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Carousel Section using the imported Carousel component */}
      <div className="mb-8 sm:mb-12 lg:mb-16">
        <div className="relative overflow-hidden w-full h-full">
          <Carousel slides={slides} />
        </div>
      </div>

      {/* Enhanced Simple Carousel Section with black background strip */}
      <div className="w-full max-w-6xl mx-auto relative">
        

        {/* Carousel Container */}
        <div className="relative bg-transparent rounded-lg sm:rounded-xl overflow-hidden">
          {/* Slides with transparent background and proper image fitting */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[450px] xl:h-[500px]">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Image container without the semi-transparent overlay */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <img 
                    src={slide.src} 
                    alt={slide.alt}
                    className="w-auto h-full max-w-full max-h-full object-contain rounded-lg sm:rounded-xl shadow-2xl"
                    loading="lazy"
                    style={{
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}
                  />
                </div>
                {/* Removed the black gradient overlay with title */}
              </div>
            ))}
          </div>

          {/* Navigation Buttons - enhanced for better visibility */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 hover:scale-105 border border-white/20 z-20"
            aria-label="Previous slide"
          >
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 hover:scale-105 border border-white/20 z-20"
            aria-label="Next slide"
          >
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicators - positioned at the center of the black strip */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 ${
                  index === currentSlide 
                    ? 'bg-white/80 shadow-lg' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                style={{
                  width: index === currentSlide ? '2rem' : '0.625rem',
                  height: '0.625rem'
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Additional Controls for Mobile - enhanced for better visibility */}
        <div className="flex justify-center items-center gap-4 mt-4 sm:mt-6">
          <button
            onClick={prevSlide}
            className="sm:hidden bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-3 shadow-lg transition-all border border-white/20 z-20"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="sm:hidden bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-3 shadow-lg transition-all border border-white/20 z-20"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}