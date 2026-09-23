const examples = [
  { src: '/images/gallery-01.jpg', alt: 'Window installation' },
  { src: '/images/gallery-02.jpg', alt: 'Door installation' },
  { src: '/images/gallery-03.jpg', alt: 'Window fitting' },
  { src: '/images/gallery-04.jpg', alt: 'Entry door' },
  { src: '/images/gallery-05.jpg', alt: 'Patio door' },
  { src: '/images/gallery-06.jpg', alt: 'Commercial windows' },
]

function Gallery() {
  return (
    <div className="mt-8 pt-5 border-t border-gray-800">
      <p className="text-sm text-gray-500 mb-3">Window and door work</p>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {examples.map((example) => (
          <img
            key={example.src}
            src={example.src}
            alt={example.alt}
            className="h-20 w-28 shrink-0 rounded object-cover border border-gray-800 opacity-80"
            loading="lazy"
          />
        ))}
      </div>
      <p className="mt-6 text-center text-gray-600 text-xs">
        &copy; {new Date().getFullYear()} Ivan Veremchuk
      </p>
    </div>
  )
}

export default Gallery
