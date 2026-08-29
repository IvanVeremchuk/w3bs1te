import { useState } from 'react'
import WindowsNavigation from '../components/WindowsNavigation'
import WindowsThumbNav from '../components/WindowsThumbNav'
import ImageModal from '../components/ImageModal'
import HeroBooking from '../components/windows/HeroBooking'
import Services from '../components/windows/Services'
import AboutBusiness from '../components/windows/AboutBusiness'
import Gallery from '../components/windows/Gallery'
import ContactSection from '../components/windows/ContactSection'

function WindowsSite() {
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
      <WindowsNavigation />
      <WindowsThumbNav />

      <div className="cinematic-scroll-container pb-20 md:pb-0">
        <HeroBooking />
        <Services />
        <AboutBusiness />
        <Gallery onImageClick={handleImageClick} />
        <ContactSection />
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

export default WindowsSite
