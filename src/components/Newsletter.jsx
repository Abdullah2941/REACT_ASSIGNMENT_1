import React, { useState } from 'react'
import Reveal from './Reveal.jsx'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null) // null | 'success' | 'error'

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!isValid) {
      setStatus('error')
      return
    }
    setStatus('success')
    setEmail('')
  }

  return (
    <Reveal as="section" className="newsletter">
      <h2>
        STAY UPTO DATE ABOUT
        <br />
        OUR LATEST OFFERS
      </h2>

      <form className="newsletter__form" onSubmit={handleSubmit}>
        <div className="newsletter__input-wrap">
          <MailIcon />
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status) setStatus(null)
            }}
          />
        </div>
        <button type="submit" className="btn btn--inverse">
          Subscribe to Newsletter
        </button>
      </form>
      {status === 'success' && <p className="newsletter__feedback newsletter__feedback--ok">You're subscribed 🎉</p>}
      {status === 'error' && <p className="newsletter__feedback newsletter__feedback--err">Enter a valid email address</p>}
    </Reveal>
  )
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 6l10 7 10-7" />
    </svg>
  )
}
