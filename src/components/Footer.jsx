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
      className="p-2 text-muted hover:text-accent transition-colors duration-200 relative"
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
  return (
    <footer className="bg-page border-t border-line px-4 md:px-8 lg:px-16 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <div className="flex flex-col md:flex-row gap-8 items-start mb-6 md:mb-6">
              <img
                src="/images/6~2.jpg"
                alt="Ivan Veremchuk"
                className="w-48 h-48 rounded-lg object-cover border-2 border-line"
              />
              <div>
                <h2 className="text-3xl font-bold mb-4 text-ink">About</h2>
                <p className="text-muted mb-6 leading-relaxed">
                  I work as a <strong>window installation subcontractor</strong> in{' '}
                  <strong>Mississauga</strong> and the Greater Toronto Area. I take on installation
                  jobs and keep developing my skills on site. The 3D work on this page is from a
                  personal hobby — I am not taking 3D commissions.
                </p>
                <p className="text-muted mb-6">
                  For installation, windows purchase, or hire, email me using the contact details
                  here or on the main site.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-8 text-ink">Get in Touch</h2>

            <div className="space-y-6 mb-6">
              <div>
                <p className="text-sm text-muted mb-1">Email</p>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-xl md:text-2xl text-ink font-mono tracking-wide hover:text-accent transition-colors"
                  >
                    {EMAIL}
                  </a>
                  <CopyButton value={EMAIL} label="Copy email address" />
                </div>
              </div>

              <div>
                <p className="text-sm text-muted mb-1">Phone</p>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${PHONE}`}
                    className="text-xl text-ink hover:text-accent transition-colors"
                  >
                    {PHONE_DISPLAY}
                  </a>
                  <CopyButton value={PHONE} label="Copy phone number" />
                </div>
              </div>
            </div>

            <p className="text-sm text-muted mb-6">
              For installation, windows purchase, or hire — email me.
            </p>

            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 text-sm text-accent border border-line hover:bg-surface px-4 py-2 rounded-lg transition-colors"
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
            <p className="mt-3 text-sm text-muted">
              Opens your default email app (Gmail, Outlook, Apple Mail, etc.)
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-line text-center text-muted">
          <p>© {new Date().getFullYear()} Ivan Veremchuk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
