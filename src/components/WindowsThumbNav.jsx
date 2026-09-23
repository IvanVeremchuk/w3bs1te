import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const sections = [
  { id: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'about', label: 'Us', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 'work', label: 'Work', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'contact', label: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
]

function WindowsThumbNav() {
  const [activeSection, setActiveSection] = useState('home')
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
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.pushState(null, '', `#${sectionId}`)
      setActiveSection(sectionId)
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[rgba(10,10,10,0.95)] backdrop-blur-md border-t border-gray-800 md:hidden">
      <div className="flex items-center justify-around px-1 py-2">
        {sections.map((section) => {
          const isActive = activeSection === section.id
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-lg transition-all duration-200 min-w-[52px] ${
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
              <span className="text-[10px] font-medium">{section.label}</span>
            </button>
          )
        })}
        <Link
          to="/3d-work"
          className="flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-lg min-w-[52px] text-gray-600 hover:text-gray-400 transition-colors border-l border-gray-800 ml-1 pl-3"
          title="3D portfolio work"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <span className="text-[10px] font-normal">3D</span>
        </Link>
      </div>
    </nav>
  )
}

export default WindowsThumbNav
