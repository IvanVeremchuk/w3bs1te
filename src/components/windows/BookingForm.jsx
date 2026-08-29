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
      className="p-1.5 text-gray-400 hover:text-blue-400 transition-colors"
      aria-label={label}
      title={label}
      type="button"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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

function BookingForm({ compact = false }) {
  const handleMailtoClick = () => {
    const params = new URLSearchParams()
    params.set('subject', WINDOWS_SUBJECT)
    window.location.href = `mailto:${EMAIL}?${params.toString()}`
  }

  const infoItems = [
    'Property address',
    'Window or door type',
    'Quantity',
    'Measurements / size',
    'Preferred dates (optional)',
  ]

  return (
    <div className={compact ? '' : 'bg-white/5 border border-gray-800 rounded-2xl p-6 md:p-8'}>
      {!compact && (
        <h3 className="text-xl font-semibold mb-2 text-gray-100">Request Installation</h3>
      )}
      {!compact && (
        <p className="text-gray-400 text-sm mb-6">
          Email or call us with the details below. We respond promptly.
        </p>
      )}

      <div className="space-y-4 mb-6">
        <div>
          <p className="text-sm text-gray-500 mb-1">Email</p>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${EMAIL}`}
              className="text-white font-mono hover:text-blue-400 transition-colors"
            >
              {EMAIL}
            </a>
            <CopyButton value={EMAIL} label="Copy email address" />
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Phone</p>
          <div className="flex items-center gap-2">
            <a href={`tel:${PHONE}`} className="text-white hover:text-blue-400 transition-colors">
              {PHONE_DISPLAY}
            </a>
            <CopyButton value={PHONE} label="Copy phone number" />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2">Please include when you contact us:</p>
        <ul className="text-sm text-gray-400 space-y-1">
          {infoItems.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleMailtoClick}
        type="button"
        className="w-full px-8 py-4 bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <span>Open in Email Client</span>
      </button>

      <p className="mt-3 text-xs text-gray-500 text-center">
        Opens your default email app (Gmail, Outlook, Apple Mail, etc.)
      </p>
    </div>
  )
}

export default BookingForm
