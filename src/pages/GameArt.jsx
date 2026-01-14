import { useState, useEffect, useRef } from 'react'
import ImageModal from '../components/ImageModal'
import SectionNavigation from '../components/SectionNavigation'
import Footer from '../components/Footer'

function GameArt() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [posterOpacity, setPosterOpacity] = useState(1)
  const posterRef = useRef(null)

  useEffect(() => {
    // Hide poster when Vimeo iframe loads
    const timer = setTimeout(() => {
      setPosterOpacity(0)
      setTimeout(() => {
        if (posterRef.current) {
          posterRef.current.style.display = 'none'
        }
      }, 500)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const sections = ['turntable', 'technical', 'details']

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white scroll-snap-container">
      {/* Section Navigation */}
      <SectionNavigation sections={sections} />

      {/* Block 1: 360 Turntable - Wider container */}
      <section id="turntable" className="my-8 scroll-snap-section">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16">
          <div className="relative rounded-xl overflow-hidden shadow-xl" style={{ paddingBottom: '100%' }}>
            <img
              ref={posterRef}
              src="/images/The-Details.jpg"
              alt="360° Turntable Preview"
              className="absolute top-0 left-0 w-full h-full object-cover object-center transition-opacity duration-500 pointer-events-none z-[1]"
              style={{ opacity: posterOpacity }}
            />
            <div className="absolute top-0 left-0 w-full h-full z-[2] overflow-hidden">
              <iframe
                src="https://player.vimeo.com/video/1153730375?title=0&byline=0&portrait=0&badge=0&autopause=0&autoplay=1&loop=1&muted=1&background=1&dnt=1"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Turntable"
                loading="eager"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-16">
        {/* Block 2: Wireframe */}
        <section id="technical" className="my-12 md:my-14 lg:my-16 scroll-snap-section">
          <div className="bg-[rgba(20,20,20,0.8)] backdrop-blur-sm rounded-2xl p-8 md:p-10 lg:p-12 shadow-xl border border-white/10 animate-fadeInUp">
            <h2 className="text-2xl md:text-3xl lg:text-[30px] text-blue-400 font-bold font-['Oswald'] mb-6 lg:mb-8 text-center drop-shadow-md">
              Wireframe
            </h2>
            <div className="space-y-8 md:space-y-10">
              {/* Wireframe - Full Width */}
              <div className="text-center">
                <div
                  className="relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 bg-[rgba(30,30,30,0.5)] hover:-translate-y-1 hover:shadow-2xl"
                  onClick={() => setSelectedImage('/images/Wireframe.png')}
                >
                  <img
                    src="/images/Wireframe.png"
                    alt="Wireframe Topology"
                    className="w-full h-auto block"
                  />
                </div>
                <p className="mt-4 lg:mt-5 text-base lg:text-lg text-gray-400 font-medium leading-relaxed">
                  Clean Quad Topology for Deformation.
                </p>
              </div>
              
              {/* Albedo & Roughness - Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="text-center">
                  <div
                    className="relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 bg-[rgba(30,30,30,0.5)] hover:-translate-y-1 hover:shadow-2xl"
                    onClick={() => setSelectedImage('/images/Texture-Map-D.png')}
                  >
                    <img
                      src="/images/Texture-Map-D.png"
                      alt="Albedo Map & UV Layout"
                      className="w-full h-auto block"
                    />
                  </div>
                  <p className="mt-4 lg:mt-5 text-base lg:text-lg text-gray-400 font-medium leading-relaxed">
                    Albedo Map & UV Layout
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className="relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 bg-[rgba(30,30,30,0.5)] hover:-translate-y-1 hover:shadow-2xl"
                    onClick={() => setSelectedImage('/images/Texture-Map-R.png')}
                  >
                    <img
                      src="/images/Texture-Map-R.png"
                      alt="Roughness Map"
                      className="w-full h-auto block"
                    />
                  </div>
                  <p className="mt-4 lg:mt-5 text-base lg:text-lg text-gray-400 font-medium leading-relaxed">
                    Roughness Map
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Block 3: The Details */}
        <section id="details" className="my-12 md:my-14 lg:my-16 scroll-snap-section">
          <div className="bg-[rgba(20,20,20,0.8)] backdrop-blur-sm rounded-2xl p-8 md:p-10 lg:p-12 shadow-xl border border-white/10 animate-fadeInUp">
            <div className="text-center">
              <div
                className="relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 bg-[rgba(30,30,30,0.5)] hover:-translate-y-1 hover:shadow-2xl"
                onClick={() => setSelectedImage('/images/The-Details.jpg')}
              >
                {/* Mobile: Vertical image */}
                <img
                  src="/images/The-Details-vertical.jpg"
                  alt="Detail Close-ups - Texture Quality"
                  className="w-full h-auto block md:hidden"
                />
                {/* Desktop: Horizontal image */}
                <img
                  src="/images/The-Details.jpg"
                  alt="Detail Close-ups - Texture Quality"
                  className="w-full h-auto hidden md:block"
                />
              </div>
              <p className="mt-4 lg:mt-5 text-base lg:text-lg text-gray-400 font-medium leading-relaxed text-center">
                Detail Close-ups - Texture Quality
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <Footer />

      {/* Image Modal */}
      <ImageModal
        imageSrc={selectedImage}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  )
}

export default GameArt

