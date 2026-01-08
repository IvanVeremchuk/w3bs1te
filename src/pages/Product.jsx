import { useState, useEffect, useRef } from 'react'
import ImageModal from '../components/ImageModal'
import SectionNavigation from '../components/SectionNavigation'
import Footer from '../components/Footer'

function Product() {
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

  const sections = ['turntable', 'overview', 'technical', 'wet-road', 'driving']

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white scroll-snap-container">
      {/* Section Navigation */}
      <SectionNavigation sections={sections} />

      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-16">
        {/* Block 1: 360 Turntable */}
        <section id="turntable" className="my-8 scroll-snap-section">
          <div className="relative rounded-xl overflow-hidden shadow-xl" style={{ paddingBottom: '100%' }}>
            <img
              ref={posterRef}
              src="/images/tesla_hero.jpg"
              alt="360° Turntable Preview"
              className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 pointer-events-none z-[1]"
              style={{ opacity: posterOpacity }}
            />
            <iframe
              src="https://player.vimeo.com/video/1147930210?title=0&byline=0&portrait=0&badge=0&autopause=0&autoplay=1&loop=1&muted=1&background=1&dnt=1"
              className="absolute top-0 left-0 w-full h-full z-[2]"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Turntable"
              loading="eager"
              allowFullScreen
            />
          </div>
        </section>

        {/* Block 2: Project Details */}
        <section id="overview" className="my-12 md:my-14 lg:my-16 scroll-snap-section">
          <div className="bg-[rgba(20,20,20,0.8)] backdrop-blur-sm rounded-2xl p-8 md:p-10 lg:p-12 shadow-xl border border-white/10 animate-fadeInUp">
            <h2 className="text-2xl md:text-3xl lg:text-[30px] text-blue-400 font-bold font-['Oswald'] mb-6 lg:mb-8 text-center drop-shadow-md">
              Project Overview
            </h2>
            <p className="text-blue-400 font-semibold text-base lg:text-lg mb-3 lg:mb-4">
              Role: Technical Artist (Rigging, Shading, Lighting, Animation)
            </p>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed mb-4 lg:mb-5">
              A study in technical modeling and lighting for automotive visualization. This project focuses on high-fidelity surface continuity, realistic material shaders, and studio lighting setups using 3ds Max and V-Ray.
            </p>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
              A technical study focused on automotive animation pipelines. I developed a custom rig for this asset to handle steering, suspension, and wheel rotation. The project involved creating complex multi-layered shaders for automotive paint and setting up a professional studio lighting environment in 3ds Max/V-Ray.
            </p>
          </div>
        </section>

        {/* Block 3: Technical Proof */}
        <section id="technical" className="my-12 md:my-14 lg:my-16 scroll-snap-section">
          <div className="bg-[rgba(20,20,20,0.8)] backdrop-blur-sm rounded-2xl p-8 md:p-10 lg:p-12 shadow-xl border border-white/10 animate-fadeInUp">
            <div className="text-center">
              <div
                className="relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 bg-[rgba(30,30,30,0.5)] hover:-translate-y-1 hover:shadow-2xl"
                onClick={() => setSelectedImage('/images/tesla_technical.jpg')}
              >
                <img
                  src="/images/tesla_technical.jpg"
                  alt="Clay/Wireframe Render - Technical Breakdown"
                  className="w-full h-auto block"
                />
              </div>
              <p className="mt-4 lg:mt-5 text-base lg:text-lg text-gray-400 font-medium leading-relaxed">
                Clay/Wireframe Render - Technical Breakdown
              </p>
            </div>
          </div>
        </section>

        {/* Block 4: Optional Render - Wet Road Environment */}
        <section id="wet-road" className="my-12 md:my-14 lg:my-16 scroll-snap-section">
          <div className="bg-[rgba(20,20,20,0.8)] backdrop-blur-sm rounded-2xl p-8 md:p-10 lg:p-12 shadow-xl border border-white/10 animate-fadeInUp">
            <div className="text-center">
              <div
                className="relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 bg-[rgba(30,30,30,0.5)] hover:-translate-y-1 hover:shadow-2xl"
                onClick={() => setSelectedImage('/images/tesla_hero_wet_road.jpg')}
              >
                <img
                  src="/images/tesla_hero_wet_road.jpg"
                  alt="Wet Road Environment - Optional Render"
                  className="w-full h-auto block"
                />
              </div>
              <p className="mt-4 lg:mt-5 text-base lg:text-lg text-gray-400 font-medium leading-relaxed">
                Wet Road Environment - Optional Render
              </p>
            </div>
          </div>
        </section>

        {/* Block 5: Vertical Driving Video */}
        <section id="driving" className="my-12 md:my-14 lg:my-16 scroll-snap-section">
          <div className="w-full max-w-[550px] lg:max-w-[600px] mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-xl" style={{ paddingBottom: '177.78%' }}>
              <iframe
                src="https://player.vimeo.com/video/1147960015?title=0&byline=0&portrait=0&badge=0&autopause=0&autoplay=1&loop=1&muted=1&dnt=1"
                className="absolute top-0 left-0 w-full h-full z-[1]"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Automotive Physics & Environment Study"
                loading="lazy"
                allowFullScreen
              />
            </div>
            <p className="text-center mt-4 lg:mt-5 text-sm lg:text-base text-gray-400 leading-relaxed max-w-[500px] lg:max-w-[550px] mx-auto">
              Automotive Physics & Environment Study: Testing suspension rigging, wheel-ground contact, and motion-blur integration in a dynamic environment.
            </p>
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

export default Product

