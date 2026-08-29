const projects = [
  {
    src: '/images/gallery-01.jpg',
    title: 'Residential Window Replacement',
    caption: 'PVC double-glazed units — GTA',
  },
  {
    src: '/images/gallery-02.jpg',
    title: 'Balcony Door Installation',
    caption: 'Sliding system with thermal break',
  },
  {
    src: '/images/gallery-03.jpg',
    title: 'New Build Window Fitting',
    caption: 'Multi-unit residential project',
  },
  {
    src: '/images/gallery-04.jpg',
    title: 'Entry Door Upgrade',
    caption: 'Secure front door with new frame',
  },
  {
    src: '/images/gallery-05.jpg',
    title: 'Patio Door System',
    caption: 'Large opening, precision alignment',
  },
  {
    src: '/images/gallery-06.jpg',
    title: 'Commercial Window Install',
    caption: 'Office facade units',
  },
]

const galleryImages = projects.map((project) => project.src)

function Gallery({ onImageClick }) {
  return (
    <section id="gallery" className="scroll-snap-section py-20 md:py-28 px-4 md:px-8 lg:px-16 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A selection of window and door installations across the Greater Toronto Area.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.src}
              className="group rounded-2xl overflow-hidden border border-gray-800 bg-[#111] cursor-pointer"
              onClick={() => onImageClick?.(project.src, galleryImages)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onImageClick?.(project.src, galleryImages)
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View ${project.title}`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.src}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-white mb-1">{project.title}</h3>
                <p className="text-sm text-gray-500">{project.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
