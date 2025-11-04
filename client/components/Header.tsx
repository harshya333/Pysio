import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isContactMethodModalOpen, setIsContactMethodModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 10)

      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handleLinkClick = () => setIsMobileMenuOpen(false)

  const handleGetInTouch = () => {
    setIsContactMethodModalOpen(true)
  }

  const handleEmailOption = () => {
    // Open default email client
    window.location.href = "mailto:hello@flexriteworld.com?subject=Get%20in%20Touch&body=Hello%20FlexRite%20World,%0A%0AI%20would%20like%20to%20get%20in%20touch%20with%20you."
  }

  const handleCallOption = () => {
    // You can replace this with your actual phone number
    window.location.href = "tel:+1234567890"
  }

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Services", to: "/services" },
    { name: "Careers", to: "/careers" },
    { name: "Perks", to: "/perks" },
    { name: "Wave Gym", to: "/corporate" },
    { name: "Portfolio", to: "/portfolio" },
    { name: "FreeHealthCheckup", to: "/freehealthcheckup" },
  ]

  return (
    <>
      {/* Sleek, Slim, Glass Navbar */}
      <header
        className={`fixed left-0 w-full transition-all duration-500 z-[9999]
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
          ${isScrolled ? 'lg:top-3 top-0' : 'lg:top-4 top-0'}
        `}
      >
        <div className="max-w-[90rem] mx-auto px-3 sm:px-5 lg:px-8">
          <div
            className={`w-full transition-all duration-500 
              
            `}
            
          >
            <div className="flex items-center justify-center relative">
              
              {/* Left Logo - Moved to the right */}
              <Link 
                to="/" 
                onClick={handleLinkClick} 
                className="flex items-center space-x-2 absolute left-6 lg:left-8"
              >
                <img
                  src="/Logo.png"
                  alt="Logo"
                  className="h-9 w-auto object-contain select-none"
                />
              </Link>

              {/* Centered Navigation */}
              <nav className="hidden lg:flex items-center justify-center w-full max-w-5xl mx-auto">
                <div className="flex items-center space-x-7 xl:space-x-9">
                  {navItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="group relative font-medium text-white text-[16px] tracking-wide hover:text-white transition-colors duration-300 px-2 py-1"
                      onClick={handleLinkClick}
                    >
                      {item.name}
                      {location.pathname === item.to && (
                        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white rounded-full"></span>
                      )}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white/60 transition-all duration-300 group-hover:w-full rounded-full"></span>
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Desktop Buttons - Right side */}
              <div className="absolute right-6 lg:right-8 flex items-center space-x-3">
                {/* Get in Touch Button */}
                <button
                  onClick={handleGetInTouch}
                  className="hidden lg:block px-6 py-3 rounded-full font-bold text-white shadow-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
                >
                  Get in Touch
                </button>

                {/* Mobile Menu Toggle */}
                <button
                  className="lg:hidden flex flex-col space-y-1 z-[10000] p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle mobile menu"
                >
                  <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                  <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                  <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                </button>

                {/* Mobile Get in Touch Button */}
                {!isMobileMenuOpen && (
                  <button
                    onClick={handleGetInTouch}
                    className="lg:hidden px-4 py-2 rounded-full font-bold text-white shadow-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-sm"
                  >
                    Contact
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`lg:hidden fixed top-0 left-0 w-full h-screen transition-all duration-500 z-[9998] ${
            isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          <div
            className={`absolute top-4 left-4 right-4 rounded-2xl border border-white/20 transition-all duration-500 transform ${
              isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.08) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <span className="text-white font-semibold text-xl">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 text-white text-2xl"
                >
                  ✕
                </button>
              </div>

              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center justify-between py-2.5 px-4 rounded-xl transition-all duration-300 group text-[17px] ${
                      location.pathname === item.to
                        ? 'bg-white/20 text-white'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={handleLinkClick}
                  >
                    <span className="font-medium">{item.name}</span>
                    {location.pathname === item.to && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </Link>
                ))}

                {/* Mobile Get in Touch Button */}
                <button
                  onClick={() => {
                    handleGetInTouch()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full py-3 px-4 rounded-full font-bold text-white shadow-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-[17px]"
                >
                  Get in Touch
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Contact Method Selection Modal */}
      {isContactMethodModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[10000]">
          <div
            className="relative p-8 rounded-3xl w-full max-w-md mx-4"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.08) 100%)",
              border: "1px solid rgba(255,255,255,0.25)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
            }}
          >
            <button
              onClick={() => setIsContactMethodModalOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-white/80 transition-all duration-300 z-10"
            >
              ✕
            </button>
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">How would you like to get in touch?</h2>
              <p className="text-white/70">Choose your preferred contact method</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Email Option */}
              <button
                onClick={handleEmailOption}
                className="group p-6 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 text-left hover:scale-105 transform"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)",
                }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center group-hover:from-green-600 group-hover:to-green-800 transition-all duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Send us an Email</h3>
                    <p className="text-white/70 text-sm mt-1">We'll get back to you within 24 hours</p>
                  </div>
                </div>
              </button>

              {/* Call Option */}
              <button
                onClick={handleCallOption}
                className="group p-6 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 text-left hover:scale-105 transform"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)",
                }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center group-hover:from-blue-600 group-hover:to-blue-800 transition-all duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Call Us Now</h3>
                    <p className="text-white/70 text-sm mt-1">Speak directly with our team</p>
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-white/50 text-sm mb-4">
                Prefer another way? <br />
                <span className="text-white/70">Visit our office or connect on social media</span>
              </p>
              
              {/* Social Media Icons */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/flexriteworld"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-2 rounded-xl transition-all duration-300 hover:scale-110"
                  style={{
                    background: "rgba(255, 255, 255, 0.24)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(4.6px)",
                    WebkitBackdropFilter: "blur(4.6px)",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M7.75 2C4.4 2 2 4.4 2 7.75v8.5C2 19.6 4.4 22 7.75 22h8.5C19.6 22 22 19.6 22 16.25v-8.5C22 4.4 19.6 2 16.25 2h-8.5zm0 1.5h8.5c2.2 0 3.75 1.55 3.75 3.75v8.5c0 2.2-1.55 3.75-3.75 3.75h-8.5c-2.2 0-3.75-1.55-3.75-3.75v-8.5c0-2.2 1.55-3.75 3.75-3.75zm4.25 3.25a4.5 4.5 0 1 0 0 9 4.5 4.5 0 1 0 0-9zm0 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.25 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/flexriteworld"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-2 rounded-xl transition-all duration-300 hover:scale-110"
                  style={{
                    background: "rgba(255, 255, 255, 0.24)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(4.6px)",
                    WebkitBackdropFilter: "blur(4.6px)",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24h11.495v-9.294H9.692v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/flexriteworld"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-2 rounded-xl transition-all duration-300 hover:scale-110"
                  style={{
                    background: "rgba(255, 255, 255, 0.24)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(4.6px)",
                    WebkitBackdropFilter: "blur(4.6px)",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.370-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.920-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a
                  href="https://twitter.com/flexriteworld"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-2 rounded-xl transition-all duration-300 hover:scale-110"
                  style={{
                    background: "rgba(255, 255, 255, 0.24)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(4.6px)",
                    WebkitBackdropFilter: "blur(4.6px)",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Modal - Removed since we're using direct email now */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[10000]">
          <div
            className="relative p-8 rounded-3xl w-full max-w-2xl mx-4"
            style={{
              background: "rgba(90, 206, 128, 0.05)",
              border: "1px solid rgba(180, 255, 180, 0.25)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-white/80 transition-all duration-300"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}