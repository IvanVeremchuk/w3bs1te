import { useEffect, useRef, useState } from 'react'

function ImageModal({ images, startIndex = 0, isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex)
  const touchStartX = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(startIndex)
    }
  }, [isOpen, startIndex])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    const handleArrowKeys = (e) => {
      if (!isOpen || images.length < 2) return
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('keydown', handleArrowKeys)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleArrowKeys)
    }
  }, [isOpen, onClose, images.length])

  if (!isOpen) return null

  const canNavigate = images.length > 1
  const activeSrc = images[currentIndex]

  const handleBackdropClick = (e) => {
    if (e.target.id === 'imageModal') {
      onClose()
    }
  }

  const handlePrev = (e) => {
    e.stopPropagation()
    if (!canNavigate) return
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNext = (e) => {
    e.stopPropagation()
    if (!canNavigate) return
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (!canNavigate || touchStartX.current == null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      } else {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
      }
    }
    touchStartX.current = null
  }

  return (
    <div
      id="imageModal"
      className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex items-center justify-center animate-fadeIn"
      onClick={handleBackdropClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-10 text-white text-4xl font-bold cursor-pointer transition-all duration-300 w-12 h-12 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-md hover:bg-white/20 hover:rotate-90 z-10"
        aria-label="Close modal"
      >
        &times;
      </button>
      {canNavigate && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-6 md:left-10 text-white text-3xl font-bold cursor-pointer transition-all duration-300 w-12 h-12 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-md hover:bg-white/20 z-10"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            className="absolute right-6 md:right-10 text-white text-3xl font-bold cursor-pointer transition-all duration-300 w-12 h-12 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-md hover:bg-white/20 z-10"
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}
      <img
        src={activeSrc}
        alt="Full size"
        className="max-w-[95%] max-h-[95vh] object-contain rounded-lg shadow-2xl animate-zoomIn"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

export default ImageModal

