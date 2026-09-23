function AboutBusiness() {
  return (
    <section
      id="about"
      className="min-h-[calc(100svh-3.5rem)] md:min-h-[calc(100svh-4rem)] flex items-center px-4 md:px-8 lg:px-16 py-12"
    >
      <div className="max-w-2xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">About</h2>
        <div className="flex flex-col sm:flex-row gap-8 sm:items-start">
          <img
            src="/images/6~2.jpg"
            alt="Ivan Veremchuk"
            className="w-36 h-36 sm:w-44 sm:h-44 rounded-xl object-cover border border-gray-800 shrink-0"
          />
          <div>
            <p className="text-gray-400 leading-relaxed mb-4">
              I work full time in the trades. I show up on time, work clean, and I&apos;m easy to
              have on a crew — I take direction and get the job done.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Window and door install, house framing, and other on-site work as needed.
            </p>
            <p className="mt-4 text-sm text-gray-300">Ivan Veremchuk</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutBusiness
