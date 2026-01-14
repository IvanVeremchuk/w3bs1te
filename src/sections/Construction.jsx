function Construction({ onImageClick }) {
  return (
    <section id="work" className="min-h-screen w-full bg-[#0a0a0a] text-white scroll-snap-section py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-16">
        {/* Construction Section */}
        <section id="construction" className="my-12 md:my-14 lg:my-16">
          <div className="bg-[rgba(20,20,20,0.8)] backdrop-blur-sm rounded-2xl p-8 md:p-10 lg:p-12 shadow-xl border border-white/10 animate-fadeInUp">
            <h2 className="text-2xl md:text-3xl lg:text-[30px] text-blue-400 font-bold font-['Oswald'] mb-6 lg:mb-8 text-center drop-shadow-md">
              Construction
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="text-center">
                <div
                  className="relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 bg-[rgba(30,30,30,0.5)] hover:-translate-y-1 hover:shadow-2xl"
                  style={{ paddingBottom: '75%' }}
                  onClick={() => onImageClick('/images/IMG_20250220_085702286_HDR.webp')}
                >
                  <img
                    src="/images/IMG_20250220_085702286_HDR.webp"
                    alt="Exposed steel beam supporting original timber joists"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <p className="mt-4 lg:mt-5 text-base lg:text-lg text-gray-400 font-medium leading-relaxed">
                  Exposed steel beam supporting original timber joists after partial floor removal.
                </p>
              </div>
              <div className="text-center">
                <div
                  className="relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 bg-[rgba(30,30,30,0.5)] hover:-translate-y-1 hover:shadow-2xl"
                  style={{ paddingBottom: '75%' }}
                  onClick={() => onImageClick('/images/IMG_20250219_103925097_HDR.webp')}
                >
                  <img
                    src="/images/IMG_20250219_103925097_HDR.webp"
                    alt="Traditional rafter roof system"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <p className="mt-4 lg:mt-5 text-base lg:text-lg text-gray-400 font-medium leading-relaxed">
                  Traditional rafter roof system with collar ties and metal gusset connections.
                </p>
              </div>
              <div className="text-center">
                <div
                  className="relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 bg-[rgba(30,30,30,0.5)] hover:-translate-y-1 hover:shadow-2xl"
                  style={{ paddingBottom: '75%' }}
                  onClick={() => onImageClick('/images/IMG_20250204_161447576_HDR.webp')}
                >
                  <img
                    src="/images/IMG_20250204_161447576_HDR.webp"
                    alt="Exposed masonry wall"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <p className="mt-4 lg:mt-5 text-base lg:text-lg text-gray-400 font-medium leading-relaxed">
                  Exposed masonry wall showing layered plaster failure and long-term material decay.
                </p>
              </div>
              <div className="text-center">
                <div
                  className="relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 bg-[rgba(30,30,30,0.5)] hover:-translate-y-1 hover:shadow-2xl"
                  style={{ paddingBottom: '75%' }}
                  onClick={() => onImageClick('/images/IMG_20250131_130444773_HDR.webp')}
                >
                  <img
                    src="/images/IMG_20250131_130444773_HDR.webp"
                    alt="Interior service corridor"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <p className="mt-4 lg:mt-5 text-base lg:text-lg text-gray-400 font-medium leading-relaxed">
                  Interior service corridor with raw stone, timber framing, and exposed electrical runs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default Construction
