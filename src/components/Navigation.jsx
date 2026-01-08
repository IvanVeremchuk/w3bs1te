import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Handle anchor links on mount (for links from HTML pages)
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [])

  const scrollToTop = () => {
    if (location.pathname !== '/') {
      navigate('/')
      setIsMobileMenuOpen(false)
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  const navLinks = [
    { to: '/', label: 'Home', onClick: scrollToTop },
    { to: '/game-art', label: 'Game Art' },
    { to: '/product', label: 'Product' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-[rgba(10,10,10,0.95)] backdrop-blur-md border-b-2 border-blue-500 shadow-lg">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Navigation */}
        <ul className="hidden md:flex justify-center items-center gap-10 py-4 px-4">
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                onClick={link.onClick}
                className={({ isActive }) =>
                  `text-white hover:text-blue-400 transition-colors duration-300 font-medium text-base relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full ${
                    isActive ? 'text-blue-400 after:w-full' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between px-4 py-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-blue-400 transition-colors p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-700 bg-[rgba(10,10,10,0.98)] backdrop-blur-md">
            <ul className="flex flex-col py-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    onClick={() => {
                      link.onClick?.()
                      setIsMobileMenuOpen(false)
                    }}
                    className={({ isActive }) =>
                      `block px-6 py-3 text-white hover:text-blue-400 hover:bg-gray-800 transition-colors duration-300 font-medium ${
                        isActive ? 'text-blue-400 bg-gray-800' : ''
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
