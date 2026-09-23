import BookingForm from './BookingForm'
import Gallery from './Gallery'

function ContactSection() {
  return (
    <section id="contact" className="px-4 md:px-8 lg:px-16 pt-8 pb-12">
      <div className="max-w-2xl mx-auto w-full">
        <h2 className="text-2xl font-semibold mb-2">Get in touch</h2>
        <p className="text-gray-500 text-sm mb-4">GTA — Toronto and nearby.</p>
        <BookingForm compact showHeading={false} />
        <Gallery />
      </div>
    </section>
  )
}

export default ContactSection
