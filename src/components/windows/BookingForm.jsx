import { useState } from 'react'
import { EMAIL, PHONE, PHONE_DISPLAY, WINDOWS_SUBJECT } from '../../constants/contact'

function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-page hover:text-accent"
      aria-label={copied ? 'Copied' : label}
      title={label}
      type="button"
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        {copied ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        ) : (
          <>
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </>
        )}
      </svg>
    </button>
  )
}

function BookingForm() {
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(WINDOWS_SUBJECT)}`

  const infoItems = [
    'Property address',
    'Window or door type (optional)',
    'Quantity',
    'Measurements or size',
    'Preferred dates (optional)',
  ]

  return (
    <div className="rounded-2xl bg-page p-5 ring-1 ring-line transition-colors md:p-7">
      <dl className="grid gap-4">
        <div>
          <dt className="text-sm text-muted">Phone</dt>
          <dd className="mt-1 flex items-center gap-1">
            <a href={`tel:${PHONE}`} className="text-xl font-semibold text-ink hover:text-accent">
              {PHONE_DISPLAY}
            </a>
            <CopyButton value={PHONE} label="Copy phone number" />
          </dd>
        </div>
        <div>
          <dt className="text-sm text-muted">Email</dt>
          <dd className="mt-1 flex items-center gap-1">
            <a href={`mailto:${EMAIL}`} className="break-all text-xl font-semibold text-ink hover:text-accent">
              {EMAIL}
            </a>
            <CopyButton value={EMAIL} label="Copy email address" />
          </dd>
        </div>
      </dl>

      <div className="mt-6">
        <p className="text-sm text-muted">For an install quote, include at least the property address:</p>
        <ul className="mt-2 space-y-1.5 text-ink">
          {infoItems.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <svg className="mt-1 h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M2 8.5 6 12l8-8.5" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <a
        href={mailto}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-accent-ink transition-transform duration-150 active:scale-[0.97]"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        Email me about a job
      </a>
    </div>
  )
}

export default BookingForm
