import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { PHONE, PHONE_DISPLAY } from '../constants/contact'

const PULSE_URL = 'https://www.pulsedispatchai.com/?utm_source=ivanveremchuk.com&utm_medium=referral'

const navLinks = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

function WindowsNavigation() {
  const [activeSection, setActiveSection] = useState('home')
  const activeSectionRef = useRef(activeSection)

  useEffect(() => {
    activeSectionRef.current = activeSection
  }, [activeSection])

  useEffect(() => {
    let rafId = null
    const sectionIds = ['home', ...navLinks.map((link) => link.id)]

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

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) element.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [])

  const scrollToSection = (event, sectionId) => {
    const section = document.getElementById(sectionId)
    if (!section) return
    event.preventDefault()
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.pushState(null, '', `#${sectionId}`)
    setActiveSection(sectionId)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 md:px-8">
        <a
          href="#home"
          onClick={(event) => scrollToSection(event, 'home')}
          className="whitespace-nowrap text-lg font-semibold tracking-tight text-ink"
        >
          Ivan Veremchuk
        </a>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(event) => scrollToSection(event, link.id)}
              aria-current={activeSection === link.id ? 'true' : undefined}
              className={`text-[15px] font-medium transition-colors hover:text-accent ${
                activeSection === link.id ? 'text-accent' : 'text-ink'
              }`}
            >
              {link.label}
            </a>
          ))}
          <Link to="/3d-work" className="text-[15px] text-muted transition-colors hover:text-ink">
            3D work
          </Link>
          <a
            href={PULSE_URL}
            target="_blank"
            rel="noopener"
            className="text-[15px] text-muted transition-colors hover:text-ink"
          >
            Pulse Dispatch ↗
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <ThemeToggle />
          <a
            href={`tel:${PHONE}`}
            className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full bg-accent px-4 text-[15px] font-semibold text-accent-ink transition-transform duration-150 active:scale-95"
            aria-label={`Call Ivan at ${PHONE_DISPLAY}`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinejoin="round" d="M6.5 3h-3v3c0 8.3 6.7 15 15 15h3v-3l-4.5-2-2.5 2.5A17 17 0 0 1 6 9.5L8.5 7 6.5 3Z" />
            </svg>
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </div>
    </header>
  )
}

export default WindowsNavigation
