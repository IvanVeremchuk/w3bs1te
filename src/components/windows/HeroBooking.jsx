import { EMAIL, PHONE, PHONE_DISPLAY, WINDOWS_SUBJECT } from '../../constants/contact'

function HeroBooking() {
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(WINDOWS_SUBJECT)}`

  return (
    <section id="home" className="px-4 pb-14 pt-8 md:px-8 md:pb-24 md:pt-16">
      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[1.05fr_1fr] md:gap-14">
        <div>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
            Window and door install in the GTA.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink md:text-xl">
            I&apos;m Ivan. I install vinyl and aluminium windows and doors, and I frame houses.
            Based in Mississauga, working across the GTA.
          </p>
          <p className="mt-3 max-w-xl leading-relaxed text-muted">
            Open to subcontract work, crew hire, and jobs that need an extra pair of hands.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${PHONE}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-accent-ink transition-transform duration-150 active:scale-[0.97]"
            >
              Call {PHONE_DISPLAY}
            </a>
            <a
              href={mailto}
              className="inline-flex h-12 items-center justify-center rounded-full bg-surface px-6 font-semibold text-ink ring-1 ring-line transition-transform duration-150 hover:ring-muted active:scale-[0.97]"
            >
              Email me
            </a>
          </div>
        </div>

        <figure className="overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
          <img
            src="/images/gallery-01.jpg"
            alt="Three-panel vinyl window installed with new trim on a house in the GTA"
            width="1124"
            height="843"
            className="aspect-[4/3] w-full object-cover"
            fetchpriority="high"
          />
          <figcaption className="px-4 py-3 text-sm text-muted">Triple casement window, new exterior trim.</figcaption>
        </figure>
      </div>
    </section>
  )
}

export default HeroBooking
