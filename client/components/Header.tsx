import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import ContactFormModal from "./ContactFormModal"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
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
            className={`w-full transition-all duration-500 rounded-2xl border
              ${isScrolled
                ? 'lg:py-2.5 py-2 bg-white/10 backdrop-blur-2xl border-white/20 shadow-xl'
                : 'lg:py-3 py-2 bg-white/5 backdrop-blur-xl border-white/15 shadow-md'
              }
            `}
            style={{
              background: isScrolled
                ? 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.08) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
              backdropFilter: isScrolled ? 'blur(18px) saturate(180%)' : 'blur(14px) saturate(160%)',
              WebkitBackdropFilter: isScrolled ? 'blur(18px) saturate(180%)' : 'blur(14px) saturate(160%)',
              border: isScrolled ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(255,255,255,0.18)',
            }}
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
                  onClick={() => setIsModalOpen(true)}
                  className="hidden lg:block px-6 py-3 rounded-full font-bold text-white shadow-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-black to-green-600 hover:from-green-700 hover:to-black animate-pulse"
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
                    onClick={() => setIsModalOpen(true)}
                    className="lg:hidden px-4 py-2 rounded-full font-bold text-white shadow-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-black to-green-600 hover:from-green-700 hover:to-black text-sm"
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
                    setIsModalOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full py-3 px-4 rounded-full font-bold text-white shadow-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-black to-green-600 hover:from-green-700 hover:to-black animate-pulse text-[17px]"
                >
                   Get in Touch
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Contact Modal */}
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
            <ContactFormModal />
          </div>
        </div>
      )}
    </>
  )
}