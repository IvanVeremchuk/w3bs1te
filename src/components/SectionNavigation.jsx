import { useState, useEffect, useRef } from 'react'

function SectionNavigation({ sections = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isScrollingRef = useRef(false)

  useEffect(() => {
    if (sections.length === 0) return

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    }

    const observers = sections.map((sectionId, index) => {
      const element = document.getElementById(sectionId)
      if (!element) return null

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isScrollingRef.current) {
            setCurrentIndex(index)
          }
        })
      }, observerOptions)

      observer.observe(element)
      return observer
    })

    return () => {
      observers.forEach(observer => observer && observer.disconnect())
    }
  }, [sections])

  // Smooth scroll with custom easing
  const smoothScrollTo = (element, duration = 1000) => {
    const start = window.pageYOffset
    const target = element.getBoundingClientRect().top + window.pageYOffset - 80 // Account for sticky nav
    const distance = target - start
    let startTime = null

    // Easing function: ease-in-out-cubic
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)
      const ease = easeInOutCubic(progress)

      window.scrollTo(0, start + distance * ease)

      if (timeElapsed < duration) {
        requestAnimationFrame(animation)
      }
    }

    requestAnimationFrame(animation)
  }

  const scrollToSection = (index) => {
    if (index < 0 || index >= sections.length) return
    
    const sectionId = sections[index]
    const element = document.getElementById(sectionId)
    if (element) {
      isScrollingRef.current = true
      smoothScrollTo(element, 1000)
      setCurrentIndex(index)
      setTimeout(() => {
        isScrollingRef.current = false
      }, 1100)
    }
  }

  if (sections.length <= 1) return null

  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < sections.length - 1

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
      <button
        onClick={() => scrollToSection(currentIndex - 1)}
        disabled={!canGoPrev}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
          canGoPrev
            ? 'bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:scale-110 active:scale-95 cursor-pointer'
            : 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'
        }`}
        aria-label="Previous section"
      >
        <svg
          className={`w-6 h-6 transition-transform duration-300 ${canGoPrev ? 'group-hover:-translate-y-0.5' : ''}`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M5 15l7-7 7 7"></path>
        </svg>
      </button>
      
      <button
        onClick={() => scrollToSection(currentIndex + 1)}
        disabled={!canGoNext}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
          canGoNext
            ? 'bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:scale-110 active:scale-95 cursor-pointer'
            : 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'
        }`}
        aria-label="Next section"
      >
        <svg
          className={`w-6 h-6 transition-transform duration-300 ${canGoNext ? 'group-hover:translate-y-0.5' : ''}`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
    </div>
  )
}

export default SectionNavigation

