import { useState } from 'react'

function Footer() {
  const [copied, setCopied] = useState(false)
  const [message, setMessage] = useState('')
  const email = 'contact@ivanveremchuk.com'

  const handleCopyEmail = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleMailtoClick = () => {
    let mailtoLink = `mailto:${email}`
    if (message.trim()) {
      const body = encodeURIComponent(message.trim())
      mailtoLink += `?body=${body}`
    }
    window.location.href = mailtoLink
  }

  return (
    <footer className="bg-dark border-t border-gray-800 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* About Section with Photo */}
          <div>
            <div className="flex flex-col md:flex-row gap-8 items-start mb-6 md:mb-6">
              <img
                src="/images/IMG_2025.12.05.jpg"
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

          {/* Contact Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-8 text-gray-200">Get in Touch</h2>
            
            {/* Email Address Display */}
            <div className="mb-8">
              <div 
                className="inline-block group cursor-text select-all"
                onClick={(e) => {
                  // Select all text when clicking anywhere in the email container
                  const range = document.createRange()
                  range.selectNodeContents(e.currentTarget)
                  const selection = window.getSelection()
                  selection.removeAllRanges()
                  selection.addRange(range)
                }}
              >
                <span className="text-xl md:text-2xl text-white font-mono tracking-wide hover:text-blue-400 transition-colors duration-200">
                  {email}
                </span>
              </div>
              
              {/* Copy Button */}
              <button
                onClick={handleCopyEmail}
                className="ml-4 p-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 relative group"
                aria-label="Copy email address"
                title="Copy email address"
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
                    <path d="M5 13l4 4L19 7"></path>
                  ) : (
                    <>
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
                    </>
                  )}
                </svg>
                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">
                    Copied!
                  </span>
                )}
              </button>
            </div>

            {/* Optional Message Field */}
            <div className="mb-6">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                className="w-full px-0 py-2 bg-transparent border-0 border-b border-gray-700 focus:outline-none focus:border-blue-500 text-white resize-none placeholder-gray-500 transition-colors text-sm"
                placeholder="Message (optional)"
              />
            </div>

            {/* Open Email Client Button */}
            <button
              onClick={handleMailtoClick}
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 group"
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
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span>Open in Email Client</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            
            <p className="mt-4 text-sm text-gray-500">
              Opens your default email client (Gmail, Outlook, ProtonMail, etc.)
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400">
          <p>© 2025 Ivan Veremchuk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

