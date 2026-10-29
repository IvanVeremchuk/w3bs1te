const PULSE_URL = 'https://www.pulsedispatchai.com/?utm_source=ivanveremchuk.com&utm_medium=referral'

function PulseDispatchCard() {
  return (
    <a
      href={PULSE_URL}
      target="_blank"
      rel="noopener"
      className="group mt-6 flex items-center gap-3 sm:gap-4 rounded-xl border border-gray-800 bg-[#111] p-3 hover:border-gray-600 transition-colors"
    >
      <img
        src="/images/pulse-dispatch.png"
        alt="Pulse Dispatch website: Say hello to your AI receptionist"
        width="1200"
        height="630"
        loading="lazy"
        className="w-28 sm:w-48 aspect-[1200/630] shrink-0 rounded-lg object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <div className="flex min-w-0 flex-col justify-center">
        <p className="text-sm text-gray-500">My business</p>
        <p className="mt-1 font-semibold text-white">Pulse Dispatch</p>
        <p className="mt-1 text-sm text-gray-400 leading-relaxed">
          An affordable AI receptionist for GTA trades. It answers every call 24/7 and texts
          the owner the job, so no work goes to voicemail.
        </p>
        <p className="mt-2 text-sm font-medium text-blue-400 group-hover:text-blue-300">
          pulsedispatchai.com ↗
        </p>
      </div>
    </a>
  )
}

export default PulseDispatchCard
