import { Suspense } from 'react'
import Hero3D from './Hero3D'
import Footer from './Footer'
import SectionNavigation from './SectionNavigation'

function Home() {
  const sections = ['hero', 'contact']

  return (
    <div className="scroll-snap-container">
      {/* Section Navigation */}
      <SectionNavigation sections={sections} />

      {/* Hero Section - 75vh 3D */}
      <section id="hero" className="h-[75vh] w-full relative scroll-snap-section">
        <Suspense fallback={
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-xl">Loading 3D Model...</div>
          </div>
        }>
          <Hero3D />
        </Suspense>
      </section>

      {/* Footer/About Section */}
      <div id="contact" className="scroll-snap-section">
        <Footer />
      </div>
    </div>
  )
}

export default Home

