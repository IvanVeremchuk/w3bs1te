import PulseDispatchCard from './PulseDispatchCard'

function AboutBusiness() {
  return (
    <section id="about" className="px-4 py-14 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-14">
        <img
          src="/images/6~2.jpg"
          alt="Ivan Veremchuk"
          width="484"
          height="605"
          loading="lazy"
          className="aspect-[4/5] w-44 rounded-2xl object-cover ring-1 ring-line md:w-full"
        />
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">About</h2>
          <div className="mt-5 max-w-2xl space-y-4 text-lg leading-relaxed text-ink">
            <p>
              I work full time in the trades. I show up on time, work clean, and I&apos;m easy to
              have on a crew: I take direction and get the job done.
            </p>
            <p className="text-muted">
              Window and door install, house framing, and other on-site work as needed.
            </p>
            <p>
              I also run <strong className="font-semibold">Pulse Dispatch</strong>, an AI
              receptionist for trades and small practices in the GTA. I built it because I know
              what a missed call costs when your hands are full: it answers every call 24/7, texts
              the owner the job, and books the customer.
            </p>
          </div>
          <div className="max-w-2xl">
            <PulseDispatchCard />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutBusiness
