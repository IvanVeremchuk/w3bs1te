import { useEffect } from 'react'
import WindowsNavigation from '../components/WindowsNavigation'
import WindowsThumbNav from '../components/WindowsThumbNav'
import HeroBooking from '../components/windows/HeroBooking'
import AboutBusiness from '../components/windows/AboutBusiness'
import ContactSection from '../components/windows/ContactSection'

function WindowsSite() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash || hash === '#home' || hash === '#work') {
      window.scrollTo(0, 0)
      if (hash === '#work') {
        window.history.replaceState(null, '', window.location.pathname)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20 md:pb-0">
      <WindowsNavigation />
      <WindowsThumbNav />
      <HeroBooking />
      <AboutBusiness />
      <ContactSection />
    </div>
  )
}

export default WindowsSite
