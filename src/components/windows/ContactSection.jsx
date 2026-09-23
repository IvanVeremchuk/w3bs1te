import BookingForm from './BookingForm'

function ContactSection() {
  return (
    <section id="contact" className="scroll-snap-section py-12 md:py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2">Get in touch</h2>
        <p className="text-gray-500 text-sm mb-8">GTA — Toronto and nearby.</p>
        <BookingForm compact showHeading={false} />
        <p className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Ivan Veremchuk
        </p>
      </div>
    </section>
  )
}

export default ContactSection
