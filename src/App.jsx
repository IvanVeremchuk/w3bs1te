import { useState } from 'react'
import Navigation from './components/Navigation'
import ThumbZoneNav from './components/ThumbZoneNav'
import ImageModal from './components/ImageModal'
import Footer from './components/Footer'
import LevaControls from './components/LevaControls'
import AllSections from './sections/AllSections'

function App() {
  const [modalImages, setModalImages] = useState([])
  const [modalIndex, setModalIndex] = useState(0)

  const handleImageClick = (imageSrc, images = [imageSrc]) => {
    const nextIndex = images.indexOf(imageSrc)
    setModalImages(images)
    setModalIndex(nextIndex >= 0 ? nextIndex : 0)
  }

  const handleCloseModal = () => {
    setModalImages([])
    setModalIndex(0)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <LevaControls />
      <Navigation />
      <ThumbZoneNav />
      
      <div className="cinematic-scroll-container">
        <AllSections onImageClick={handleImageClick} />

        {/* Footer/Contact */}
        <section id="contact" className="min-h-screen md:min-h-0 w-full bg-[#0a0a0a] text-white scroll-snap-section py-8 md:py-12">
          <Footer />
        </section>
      </div>

      {/* Global Image Modal */}
      <ImageModal
        images={modalImages}
        startIndex={modalIndex}
        isOpen={modalImages.length > 0}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default App
