// Portfolio render images - using images from your existing portfolio
const renders = [
  { id: 1, src: '/images/The-Beige-Living-Room-1.jpg', title: 'The Beige Living Room' },
  { id: 2, src: '/images/The-Art-Room-2.jpg', title: 'The Art Room' },
  { id: 3, src: '/images/The-Dark-Living-Room-3.jpg', title: 'The Dark Living Room' },
  { id: 4, src: '/images/The-Kitchen-Top-Down-View-4.jpg', title: 'The Kitchen Top Down View' },
  { id: 5, src: '/images/The-Beige-Room-with-Steps-5.jpg', title: 'The Beige Room with Steps' },
  { id: 6, src: '/images/The-Dark-Dining-Room-6.jpg', title: 'The Dark Dining Room' },
]

function Renders({ onImageClick }) {
  return (
    <section id="renders" className="min-h-screen w-full bg-[#0a0a0a] text-white scroll-snap-section py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-blue-400 font-['Oswald']">
          Portfolio Renders
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renders.map((render) => (
            <div
              key={render.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[4/3] bg-gray-900"
              onClick={() => onImageClick(render.src)}
            >
              <img
                src={render.src}
                alt={render.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-white font-semibold text-lg">{render.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Renders
