import BookingForm from './BookingForm'

const EMAIL = 'contact@ivanveremchuk.com'

function ContactSection() {
  return (
    <section id="contact" className="scroll-snap-section py-20 md:py-28 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Ready to schedule an installation or consultation? Send a booking request or reach
              out directly — we respond promptly.
            </p>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-lg text-white hover:text-blue-400 transition-colors font-mono"
                >
                  {EMAIL}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Service Area</p>
                <p className="text-lg text-white">Greater Toronto Area (GTA) — Mississauga and surrounding cities</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Services</p>
                <p className="text-gray-300">
                  Window installation, door installation, replacements, on-site consultation
                </p>
              </div>
            </div>
          </div>

          <BookingForm />
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Ivan Veremchuk. All rights reserved.</p>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
