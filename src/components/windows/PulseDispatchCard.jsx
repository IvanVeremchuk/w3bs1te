const PULSE_URL = 'https://www.pulsedispatchai.com/?utm_source=ivanveremchuk.com&utm_medium=referral'

function PulseDispatchCard() {
  return (
    <a
      href={PULSE_URL}
      target="_blank"
      rel="noopener"
      className="group mt-6 flex items-center gap-3 rounded-2xl bg-surface p-3 ring-1 ring-line transition-colors hover:ring-muted sm:gap-5"
    >
      <img
        src="/images/pulse-dispatch.png"
        alt="Pulse Dispatch website: every call answered, every job texted to you"
        width="1200"
        height="630"
        loading="lazy"
        className="aspect-[1200/630] w-28 shrink-0 rounded-xl object-cover transition-transform duration-300 group-hover:scale-[1.02] sm:w-52"
      />
      <div className="flex min-w-0 flex-col justify-center">
        <p className="font-semibold text-ink">Pulse Dispatch</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          AI receptionist for GTA trades: every call answered, every job texted to you. From $129 a month.
        </p>
        <p className="mt-2 text-sm font-semibold text-accent">pulsedispatchai.com ↗</p>
      </div>
    </a>
  )
}

export default PulseDispatchCard
