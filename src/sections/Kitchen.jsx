import { Suspense } from 'react'
import Hero3D from '../components/Hero3D'

function Kitchen() {
  return (
    <section id="kitchen" className="min-h-screen w-full bg-[#0a0a0a] text-white scroll-snap-section">
      <div className="w-full relative flex items-center justify-center px-5 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="bg-[rgba(20,20,20,0.8)] backdrop-blur-sm rounded-2xl p-8 md:p-10 lg:p-12 shadow-xl border border-white/10 animate-fadeInUp mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-[36px] text-blue-400 font-bold font-['Oswald'] mb-6 lg:mb-8 text-center drop-shadow-md">
              Kitchen Window | Environment & Lighting Study
            </h2>
            <p className="text-gray-300 text-base lg:text-lg leading-relaxed text-center mb-8">
              A detailed study of natural lighting, material interaction, and environmental storytelling through architectural visualization.
            </p>
          </div>
          <div className="w-full h-[70vh] min-h-[500px] relative rounded-xl overflow-hidden shadow-xl bg-[rgba(10,10,10,0.8)]">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-xl text-gray-400">Loading 3D Model...</div>
              </div>
            }>
              <Hero3D />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Kitchen
