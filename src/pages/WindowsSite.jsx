import { useEffect } from 'react'
import WindowsNavigation from '../components/WindowsNavigation'
import WindowsThumbNav from '../components/WindowsThumbNav'
import HeroBooking from '../components/windows/HeroBooking'
import Gallery from '../components/windows/Gallery'
import AboutBusiness from '../components/windows/AboutBusiness'
import ContactSection from '../components/windows/ContactSection'

function WindowsSite() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash || hash === '#home') window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-page pb-20 text-ink transition-colors md:pb-0">
      <WindowsNavigation />
      <WindowsThumbNav />
      <main>
        <HeroBooking />
        <Gallery />
        <AboutBusiness />
        <ContactSection />
      </main>
    </div>
  )
}

export default WindowsSite
