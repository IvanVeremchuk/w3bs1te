import { useEffect } from 'react'

function ImageModal({ imageSrc, isOpen, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEscape)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (e.target.id === 'imageModal') {
      onClose()
    }
  }

  return (
    <div
      id="imageModal"
      className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex items-center justify-center animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-10 text-white text-4xl font-bold cursor-pointer transition-all duration-300 w-12 h-12 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-md hover:bg-white/20 hover:rotate-90 z-10"
        aria-label="Close modal"
      >
        &times;
      </button>
      <img
        src={imageSrc}
        alt="Full size"
        className="max-w-[95%] max-h-[95vh] object-contain rounded-lg shadow-2xl animate-zoomIn"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

export default ImageModal

