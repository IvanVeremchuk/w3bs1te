import BookingForm from './BookingForm'

function ContactSection() {
  return (
    <section id="contact" className="scroll-snap-section py-20 md:py-28 px-4 md:px-8 lg:px-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-1">Service Area</p>
          <p className="text-lg text-white">Greater Toronto Area (GTA). Toronto and surrounding cities.</p>
        </div>

        <BookingForm compact showHeading={false} />

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Ivan Veremchuk. All rights reserved.</p>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
