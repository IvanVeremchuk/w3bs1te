const examples = [
  { src: '/images/gallery-02.jpg', alt: 'Door installation', caption: 'Door install' },
  { src: '/images/gallery-03.jpg', alt: 'Two-panel window fitted into a stucco wall', caption: 'Window fitting, stucco wall' },
  { src: '/images/gallery-04.jpg', alt: 'Entry door installation', caption: 'Entry door' },
  { src: '/images/gallery-05.jpg', alt: 'Patio door installation', caption: 'Patio door' },
  { src: '/images/gallery-06.jpg', alt: 'Commercial window installation', caption: 'Commercial windows' },
  { src: '/images/IMG_20250219_103925097_HDR.webp', alt: 'Timber frame for a rear house addition', caption: 'Framing, rear addition' },
  { src: '/images/IMG_20250220_085702286_HDR.webp', alt: 'Interior floor and wall framing during a renovation', caption: 'Framing, interior' },
  { src: '/images/IMG_20250204_161447576_HDR.webp', alt: 'House framing in progress', caption: 'House framing' },
  { src: '/images/IMG_20250131_130444773_HDR.webp', alt: 'House framing in progress', caption: 'House framing' },
]

function Gallery() {
  return (
    <section id="work" className="bg-surface px-4 py-14 transition-colors md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">Recent work</h2>
        <p className="mt-3 max-w-xl text-muted">Windows, doors and framing, residential and commercial, around the GTA.</p>
        <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {examples.map((example) => (
            <li key={example.src}>
              <figure>
                <img
                  src={example.src}
                  alt={example.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-xl object-cover ring-1 ring-line"
                />
                <figcaption className="mt-2 text-sm text-muted">{example.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Gallery
