import { useState } from 'react'
import Navigation from './components/Navigation'
import ThumbZoneNav from './components/ThumbZoneNav'
import ImageModal from './components/ImageModal'
import Footer from './components/Footer'
import LevaControls from './components/LevaControls'
import AllSections from './sections/AllSections'

function App() {
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc)
  }

  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <LevaControls />
      <Navigation />
      <ThumbZoneNav />
      
      <div className="cinematic-scroll-container">
        <AllSections onImageClick={handleImageClick} />

        {/* Footer/Contact */}
        <section id="contact" className="min-h-screen w-full bg-[#0a0a0a] text-white scroll-snap-section">
          <Footer />
        </section>
      </div>

      {/* Global Image Modal */}
      <ImageModal
        imageSrc={selectedImage}
        isOpen={!!selectedImage}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default App
