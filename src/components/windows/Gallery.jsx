const projects = [
  { src: '/images/gallery-01.jpg', title: 'Install 1' },
  { src: '/images/gallery-02.jpg', title: 'Install 2' },
  { src: '/images/gallery-03.jpg', title: 'Install 3' },
  { src: '/images/gallery-04.jpg', title: 'Install 4' },
  { src: '/images/gallery-05.jpg', title: 'Install 5' },
  { src: '/images/gallery-06.jpg', title: 'Install 6' },
]

const galleryImages = projects.map((project) => project.src)

function Gallery({ onImageClick }) {
  return (
    <section id="work" className="scroll-snap-section py-12 md:py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3">Work</h2>
        <p className="text-gray-500 text-sm mb-8">A few jobs from around the GTA.</p>

        <div className="grid grid-cols-2 gap-3">
          {projects.map((project) => (
            <button
              key={project.src}
              type="button"
              className="rounded-xl overflow-hidden border border-gray-800 text-left"
              onClick={() => onImageClick?.(project.src, galleryImages)}
              aria-label={`View ${project.title}`}
            >
              <img
                src={project.src}
                alt={project.title}
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
