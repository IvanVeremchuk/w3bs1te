import { useState } from 'react'

const EMAIL = 'contact@ivanveremchuk.com'
const SUBJECT = 'Window & Door Installation Request'

function BookingForm({ compact = false }) {
  const [copied, setCopied] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [details, setDetails] = useState('')

  const handleCopyEmail = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const buildMailtoBody = () => {
    const lines = []
    if (name.trim()) lines.push(`Name: ${name.trim()}`)
    if (phone.trim()) lines.push(`Phone: ${phone.trim()}`)
    if (address.trim()) lines.push(`Address: ${address.trim()}`)
    if (details.trim()) {
      lines.push('')
      lines.push('Project details:')
      lines.push(details.trim())
    }
    return lines.join('\n')
  }

  const handleMailtoClick = () => {
    const params = new URLSearchParams()
    params.set('subject', SUBJECT)
    const body = buildMailtoBody()
    if (body) params.set('body', body)
    window.location.href = `mailto:${EMAIL}?${params.toString()}`
  }

  const inputClass =
    'w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 transition-colors text-sm'

  return (
    <div className={compact ? '' : 'bg-white/5 border border-gray-800 rounded-2xl p-6 md:p-8'}>
      {!compact && (
        <h3 className="text-xl font-semibold mb-2 text-gray-100">Request Installation</h3>
      )}
      {!compact && (
        <p className="text-gray-400 text-sm mb-6">
          Fill in your details and we&apos;ll open your email client with everything ready to send.
        </p>
      )}

      <div className={`grid grid-cols-1 ${compact ? 'gap-3' : 'md:grid-cols-2 gap-4'} mb-4`}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Your name"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
          placeholder="Phone number"
        />
      </div>

      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className={`${inputClass} mb-4`}
        placeholder="Property address"
      />

      <textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        rows={compact ? 2 : 3}
        className={`${inputClass} mb-4 resize-none`}
        placeholder="Window/door type, quantity, preferred dates (optional)"
      />

      <div className="mb-4 flex items-center gap-2 flex-wrap">
        <span className="text-sm text-gray-400">Send to:</span>
        <span className="text-sm text-white font-mono">{EMAIL}</span>
        <button
          onClick={handleCopyEmail}
          className="p-1.5 text-gray-400 hover:text-blue-400 transition-colors"
          aria-label="Copy email address"
          title="Copy email address"
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
        {copied && <span className="text-xs text-green-400">Copied!</span>}
      </div>

      <button
        onClick={handleMailtoClick}
        type="button"
        className="w-full px-8 py-4 bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <span>Book Installation</span>
        <svg
          className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <p className="mt-3 text-xs text-gray-500 text-center">
        Opens your email client with subject: &ldquo;{SUBJECT}&rdquo;
      </p>
    </div>
  )
}

export default BookingForm
