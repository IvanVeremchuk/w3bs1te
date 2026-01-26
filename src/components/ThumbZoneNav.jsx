import { useState, useEffect, useRef } from 'react'

const sections = [
  { id: 'renders', label: 'Renders', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'heraldic', label: 'Business Card', icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2' },
  { id: 'kitchen', label: 'Kitchen', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
  { id: 'product', label: 'Tesla', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
  { id: 'work', label: 'Construction', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { id: 'game-art', label: 'Character', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 'motion-assets', label: 'Motion', icon: 'M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z' },
  { id: 'contact', label: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
]

function ThumbZoneNav() {
  const [activeSection, setActiveSection] = useState('heraldic')
  const activeSectionRef = useRef(activeSection)

  useEffect(() => {
    activeSectionRef.current = activeSection
  }, [activeSection])

  useEffect(() => {
    let rafId = null
    const sectionIds = sections.map((section) => section.id)

    const getActiveSectionId = () => {
      const anchor = window.innerHeight * 0.4
      let closestId = null
      let closestDistance = Number.POSITIVE_INFINITY

      sectionIds.forEach((id) => {
        const element = document.getElementById(id)
        if (!element) return

        const rect = element.getBoundingClientRect()
        const isWithin = rect.top <= anchor && rect.bottom >= anchor
        const distance = isWithin
          ? 0
          : Math.min(Math.abs(rect.top - anchor), Math.abs(rect.bottom - anchor))

        if (distance < closestDistance) {
          closestDistance = distance
          closestId = id
        }
      })

      return closestId
    }

    const updateActiveSection = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(() => {
        const nextActive = getActiveSectionId()
        if (nextActive && nextActive !== activeSectionRef.current) {
          setActiveSection(nextActive)
        }
        rafId = null
      })
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // Update URL hash without triggering scroll
      window.history.pushState(null, '', `#${sectionId}`)
      setActiveSection(sectionId)
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[rgba(10,10,10,0.95)] backdrop-blur-md border-t-2 border-blue-500 shadow-lg md:hidden">
      <div className="flex items-center justify-around px-2 py-2 overflow-x-auto scrollbar-hide">
        {sections.map((section) => {
          const isActive = activeSection === section.id
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 min-w-[60px] ${
                isActive
                  ? 'text-blue-400 bg-blue-500/20'
                  : 'text-gray-400 hover:text-blue-300 hover:bg-white/5'
              }`}
              aria-label={`Go to ${section.label} section`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d={section.icon} />
              </svg>
              <span className="text-xs font-medium">{section.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default ThumbZoneNav
