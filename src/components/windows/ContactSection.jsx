import BookingForm from './BookingForm'

const PULSE_URL = 'https://www.pulsedispatchai.com/?utm_source=ivanveremchuk.com&utm_medium=referral'

function ContactSection() {
  return (
    <>
      <section id="contact" className="bg-surface px-4 py-14 transition-colors md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:gap-14">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">Get in touch</h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-ink">
              Install work, crew hire or framing in Toronto and the GTA. Call, text or email.
            </p>
          </div>
          <BookingForm />
        </div>
      </section>

      <footer className="px-4 py-8 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Ivan Veremchuk · Mississauga, Ontario</p>
          <p>
            Also:{' '}
            <a href={PULSE_URL} target="_blank" rel="noopener" className="font-medium text-ink hover:text-accent">
              Pulse Dispatch ↗
            </a>
          </p>
        </div>
      </footer>
    </>
  )
}

export default ContactSection
