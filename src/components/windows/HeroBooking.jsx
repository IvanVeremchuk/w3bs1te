import BookingForm from './BookingForm'

function HeroBooking() {
  return (
    <section id="book" className="scroll-snap-section min-h-screen flex items-center py-24 md:py-32 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-blue-400 font-medium tracking-wide uppercase text-sm mb-4">
              Mississauga &amp; Greater Toronto Area
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Professional Window &amp; Door Installation
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
              Precision installation backed by real construction experience. From new builds to
              replacements, we fit every window and door with care, accuracy, and clean finishes.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                Free on-site consultation
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                PVC, aluminum &amp; wood systems
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                Clean, professional workmanship
              </li>
            </ul>
          </div>

          <BookingForm />
        </div>
      </div>
    </section>
  )
}

export default HeroBooking
