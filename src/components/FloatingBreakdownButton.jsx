import { useState, useEffect, useRef } from 'react'

function FloatingBreakdownButton({ onOpenDrawer, targetSectionId = 'heraldic' }) {
  const [isVisible, setIsVisible] = useState(false)
  const buttonRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Show button when target section is in view
          setIsVisible(entry.isIntersecting)
        })
      },
      {
        threshold: 0.3, // Show when 30% of section is visible
        rootMargin: '-20% 0px -20% 0px', // Only trigger when section is in center area
      }
    )

    const targetSection = document.getElementById(targetSectionId)
    if (targetSection) {
      observer.observe(targetSection)
    }

    return () => {
      if (targetSection) {
        observer.unobserve(targetSection)
      }
    }
  }, [targetSectionId])

  if (!isVisible) return null

  return (
    <button
      ref={buttonRef}
      onClick={onOpenDrawer}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 backdrop-blur-sm border border-blue-400/30"
      aria-label="Open Technical Breakdown"
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
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <span className="hidden sm:inline">Technical Breakdown</span>
      <span className="sm:hidden">Breakdown</span>
    </button>
  )
}

export default FloatingBreakdownButton
