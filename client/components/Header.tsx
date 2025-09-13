import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import ContactFormModal from "./ContactFormModal"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 10)

      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false) // Hide navbar on scroll down
      } else {
        setIsVisible(true) // Show navbar on scroll up
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  // Navigation items data
  const navItems = [
    { name: "Home", to: "/" },
    { name: "Services", to: "/services" },
    { name: "Careers", to: "/careers" },
    { name: "Perks", to: "/perks" },
    { name: "Corporate", to: "/corporate" },
    { name: "Portfolio", to: "/portfolio" },
    { name: "Feedback", to: "#", isButton: true },
  ]

  return (
    <>
      {/* Header Navbar */}
      <header
        className={`fixed left-0 w-full transition-all duration-500 z-[9999] 
          lg:top-5 top-0
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-center px-4">
          {/* Centered Navigation - Desktop */}
          <nav className="hidden lg:flex items-center justify-center">
            <div className="flex items-center space-x-8 xl:space-x-12">
              {navItems.map((item) => (
                item.isButton ? (
                  <button
                    key={item.name}
                    onClick={() => setIsModalOpen(true)}
                    className="group relative font-light text-white text-sm hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ) : (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="group relative font-light text-white text-sm hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )
              ))}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden flex flex-col space-y-1.5 z-50 ml-4 absolute right-4 top-4"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}
            ></div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-gray-900 transition-all duration-500 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} flex flex-col items-center justify-center z-40`}>
          <button 
            className="absolute top-6 right-6 text-white text-2xl z-50"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          
          <nav className="flex flex-col items-center space-y-8">
            {navItems.map((item) => (
              item.isButton ? (
                <button
                  key={item.name}
                  onClick={() => {
                    setIsModalOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="group relative font-light text-white text-xl hover:text-white transition-colors duration-300 py-2"
                >
                  {item.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </button>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group relative font-light text-white text-xl hover:text-white transition-colors duration-300 py-2"
                  onClick={handleLinkClick}
                >
                  {item.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )
            ))}
          </nav>
        </div>
      </header>

      {/* Feedback Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/4 backdrop-blur-md flex items-center justify-center z-[10000]">
          <div className="bg-gray-8 p-6 rounded-xl w-full max-w-md mx-4 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white text-lg hover:text-white transition-colors duration-300"
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