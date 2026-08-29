const services = [
  {
    title: 'Window Installation',
    description:
      'New window fitting for residential and commercial properties. Proper sealing, alignment, and insulation for long-lasting performance.',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z M8 9h8M8 13h5',
  },
  {
    title: 'Door Installation',
    description:
      'Entry doors, patio doors, and sliding systems installed level, secure, and weather-tight with attention to hardware and thresholds.',
    icon: 'M8 4h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z M12 12h.01',
  },
  {
    title: 'Replacement & Upgrade',
    description:
      'Remove old units and install modern, energy-efficient replacements. We handle measurements, fitting, and finishing details.',
    icon: 'M4 4v5h5M20 20v-5h-5M4 20l5-5M20 4l-5 5',
  },
  {
    title: 'Consultation & Measurement',
    description:
      'On-site visit to assess your project, recommend solutions, and provide accurate measurements before installation day.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  },
]

function Services() {
  return (
    <section id="services" className="scroll-snap-section py-20 md:py-28 px-4 md:px-8 lg:px-16 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Complete window and door solutions — from first measurement to final seal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-6 md:p-8 rounded-2xl border border-gray-800 bg-white/[0.03] hover:border-blue-500/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
