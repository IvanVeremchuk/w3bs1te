const installers = [
  {
    src: '/images/6~2.jpg',
    name: 'Ivan',
    alt: 'Ivan',
  },
  {
    src: '/images/6~3.jpg',
    name: 'Artur',
    alt: 'Artur',
  },
]

function AboutBusiness() {
  return (
    <section id="about" className="scroll-snap-section py-12 md:py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Us</h2>
        <p className="text-gray-400 leading-relaxed mb-8">
          Two buddies on the tools every day. We show up, we work clean, and we&apos;re still
          building this from the ground up — no office, no sales team, just the two of us.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {installers.map((installer) => (
            <div key={installer.name}>
              <img
                src={installer.src}
                alt={installer.alt}
                className="w-full aspect-[3/4] rounded-xl object-cover border border-gray-800"
              />
              <p className="mt-3 text-sm text-gray-300">{installer.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutBusiness
