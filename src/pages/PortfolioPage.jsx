import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import ThumbZoneNav from '../components/ThumbZoneNav'
import ImageModal from '../components/ImageModal'
import Footer from '../components/Footer'
import LevaControls from '../components/LevaControls'
import AllSections from '../sections/AllSections'
import ThemeToggle from '../components/ThemeToggle'

function PortfolioPage() {
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
    <div className="min-h-screen bg-page text-ink transition-colors">
      <LevaControls />
      <div className="bg-surface border-b border-line px-4 py-2 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <p className="text-sm text-muted">Viewing 3D Portfolio</p>
          <Link
            to="/"
            className="ml-auto text-sm font-semibold text-accent transition-colors whitespace-nowrap"
          >
            &larr; Back to Window Installation
          </Link>
          <ThemeToggle />
        </div>
      </div>
      <Navigation />
      <ThumbZoneNav />

      <div className="cinematic-scroll-container">
        <AllSections onImageClick={handleImageClick} />

        <section
          id="contact"
          className="min-h-screen md:min-h-0 w-full bg-page text-ink scroll-snap-section py-8 md:py-12"
        >
          <Footer />
        </section>
      </div>

      <ImageModal
        images={modalImages}
        startIndex={modalIndex}
        isOpen={modalImages.length > 0}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default PortfolioPage
