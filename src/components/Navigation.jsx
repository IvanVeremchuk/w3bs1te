import { useEffect, useState } from 'react'

function Navigation() {
  const [activeSection, setActiveSection] = useState('heraldic')

  const navLinks = [
    { id: 'heraldic', label: 'Business Card' },
    { id: 'kitchen', label: 'Kitchen' },
    { id: 'product', label: 'Tesla' },
    { id: 'work', label: 'Construction' },
    { id: 'game-art', label: 'Character' },
    { id: 'renders', label: 'Renders' },
  ]

  // Handle active section detection on scroll
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observerOptions = {
      threshold: 0.4,
      rootMargin: '-10% 0px -40% 0px'
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    navLinks.forEach(link => {
      const element = document.getElementById(link.id)
      if (element) observer.observe(element)
    })

    // Also observe contact section
    const contactElement = document.getElementById('contact')
    if (contactElement) observer.observe(contactElement)

    return () => observer.disconnect()
  }, [])

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

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.pushState(null, '', `#${sectionId}`)
      setActiveSection(sectionId)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-[rgba(10,10,10,0.95)] backdrop-blur-md border-b-2 border-blue-500 shadow-lg hidden md:block">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Navigation - Always visible */}
        <ul className="flex justify-center items-center gap-10 py-4 px-4">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => scrollToSection(link.id)}
                className={`text-white hover:text-blue-400 transition-colors duration-300 font-medium text-base relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full ${
                  activeSection === link.id ? 'text-blue-400 after:w-full' : ''
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
