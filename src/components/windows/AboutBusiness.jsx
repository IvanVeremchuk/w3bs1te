const installers = [
  {
    src: '/images/6~2.jpg',
    name: 'Ivan',
    alt: 'Ivan — window and door installer',
  },
  {
    src: '/images/6~3.jpg',
    name: 'Artur',
    alt: 'Artur — window and door installer',
  },
]

function AboutBusiness() {
  return (
    <section id="about" className="scroll-snap-section py-20 md:py-28 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Built on Real Construction Experience</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              With a background in physical construction and architectural visualization, every
              installation is approached with structural understanding — not just fitting a frame,
              but ensuring it sits right, seals properly, and performs for years.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Based in Mississauga and serving the Greater Toronto Area (GTA) — including Brampton,
              Oakville, Toronto, and nearby communities. We work cleanly, communicate clearly, and
              treat your home with respect from first visit to final cleanup.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-3xl font-bold text-cyan-400 mb-1">100%</p>
                <p className="text-sm text-gray-400">Precision-focused fitting</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-cyan-400 mb-1">Local</p>
                <p className="text-sm text-gray-400">GTA &amp; nearby</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {installers.map((installer) => (
              <div key={installer.name} className="relative">
                <img
                  src={installer.src}
                  alt={installer.alt}
                  className="w-full aspect-[3/4] rounded-2xl object-cover border border-gray-800 shadow-2xl"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#111]/90 backdrop-blur-sm border border-gray-800 rounded-xl px-4 py-3 shadow-xl">
                  <p className="text-sm text-gray-400">Installer</p>
                  <p className="font-semibold text-white">{installer.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutBusiness
