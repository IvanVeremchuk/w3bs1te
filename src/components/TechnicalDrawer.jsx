import { useState, useEffect } from 'react'
import ImageModal from './ImageModal'

function TechnicalDrawer({ isOpen, onClose, activeSection = 'heraldic' }) {
  const [selectedImage, setSelectedImage] = useState(null)

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Get material maps based on active section
  const getMaterialMaps = () => {
    switch (activeSection) {
      case 'heraldic':
        return [
          { name: 'Diffuse', src: '/heraldic/2.webp', alt: 'Diffuse Map' },
          { name: 'Normal', src: '/heraldic/5.webp', alt: 'Normal Map' },
          { name: 'ORM', src: '/heraldic/1-4-3.webp', alt: 'Occlusion, Roughness, Metallic Map' },
        ]
      case 'product':
        return [
          { name: 'Wireframe', src: '/images/tesla_technical.jpg', alt: 'Technical Wireframe' },
        ]
      case 'game-art':
        return [
          { name: 'Albedo', src: '/images/Texture-Map-D.webp', alt: 'Albedo Map' },
          { name: 'Roughness', src: '/images/Texture-Map-R.webp', alt: 'Roughness Map' },
        ]
      default:
        return []
    }
  }

  const materialMaps = getMaterialMaps()

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed z-[100] bg-[rgba(20,20,20,0.98)] backdrop-blur-md border border-white/10 shadow-2xl transition-transform duration-300 ease-out ${
          isOpen
            ? 'translate-x-0 md:translate-y-0'
            : 'translate-x-full md:translate-x-0 md:translate-y-full'
        } ${
          // Desktop: right side, Mobile: bottom
          'md:w-96 md:h-full md:right-0 md:top-0 md:bottom-0 w-full h-[70vh] bottom-0 left-0 rounded-t-2xl md:rounded-t-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-blue-400 font-['Oswald']">Material Study</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
            aria-label="Close drawer"
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
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto h-[calc(100%-80px)] md:h-[calc(100vh-80px)]">
          {materialMaps.length > 0 ? (
            <div className="space-y-6">
              {materialMaps.map((map, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-lg font-semibold text-blue-300">{map.name}</h3>
                  <div
                    className="relative w-full rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-300 bg-[rgba(30,30,30,0.5)] hover:scale-105 hover:shadow-xl"
                    onClick={() => setSelectedImage(map.src)}
                  >
                    <img
                      src={map.src}
                      alt={map.alt}
                      className="w-full h-auto block"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              <p>No material maps available for this section.</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        imageSrc={selectedImage}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  )
}

export default TechnicalDrawer
