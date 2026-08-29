import { useState } from 'react'
import { EMAIL, PHONE, PHONE_DISPLAY } from '../constants/contact'

function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e) => {
    e.preventDefault()
    e.stopPropagation()
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
      className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 relative"
      aria-label={label}
      title={label}
      type="button"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {copied ? (
          <path d="M5 13l4 4L19 7" />
        ) : (
          <>
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </>
        )}
      </svg>
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          Copied!
        </span>
      )}
    </button>
  )
}

function Footer() {
  const infoItems = [
    'Project type or role',
    'Timeline or deadline',
    'Brief description of what you need',
  ]

  return (
    <footer className="bg-dark border-t border-gray-800 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <div className="flex flex-col md:flex-row gap-8 items-start mb-6 md:mb-6">
              <img
                src="/images/6~2.jpg"
                alt="Ivan Veremchuk"
                className="w-48 h-48 rounded-lg object-cover border-2 border-gray-700"
              />
              <div>
                <h2 className="text-3xl font-bold mb-4">About</h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  I am a <strong>3D Environment & Architecture Artist</strong> with a background in{' '}
                  <strong>physical construction</strong>, working across <strong>games</strong> and{' '}
                  <strong>architectural visualization</strong>. I focus on creating structurally
                  grounded, technically accurate, and believable spaces.
                </p>
                <p className="text-gray-400 mb-6">
                  My workflow includes <strong>3ds Max, Corona, and V-Ray</strong>. Based in
                  Bucharest and available for studio or freelance collaborations.
                </p>
                <a
                  href="https://contra.com/ivan_veremchuk_1jcxkjzk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  View on Contra →
                </a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-8 text-gray-200">Get in Touch</h2>

            <div className="space-y-6 mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-xl md:text-2xl text-white font-mono tracking-wide hover:text-blue-400 transition-colors"
                  >
                    {EMAIL}
                  </a>
                  <CopyButton value={EMAIL} label="Copy email address" />
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Phone</p>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${PHONE}`}
                    className="text-xl text-white hover:text-blue-400 transition-colors"
                  >
                    {PHONE_DISPLAY}
                  </a>
                  <CopyButton value={PHONE} label="Copy phone number" />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Please include when you reach out:</p>
              <ul className="text-sm text-gray-400 space-y-1">
                {infoItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500/10 px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Open in Email Client
            </a>
            <p className="mt-3 text-sm text-gray-500">
              Opens your default email app (Gmail, Outlook, Apple Mail, etc.)
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Ivan Veremchuk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
