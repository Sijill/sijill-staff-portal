import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
  const navigate = useNavigate()

  return (
    <div style={styles.wrapper}>
      <div style={styles.inner}>

        {/* Icon bubble */}
        <div style={styles.iconBubble}>
          <span style={styles.sparks} aria-hidden="true"># ? !</span>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
            stroke="#5b9bf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 15s1.5-2 4-2 4 2 4 2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
          </svg>
        </div>

        {/* Big number */}
        <h1 style={styles.num}>404</h1>
        <div style={styles.divider} />

        <p style={styles.title}>Page not found</p>
        <p style={styles.sub}>
          The page you're looking for has been moved,
          deleted, or never existed.
        </p>

        <div style={styles.actions}>
          <button style={styles.btnPrimary} onClick={() => navigate('/')}>
            ← Go home
          </button>
          <button style={styles.btnGhost} onClick={() => navigate(-1)}>
            Go back
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    minWidth: '100vw',
    background: '#0a0a12',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Space Grotesk', sans-serif",
    padding: '2rem',
  },
  inner: {
    textAlign: 'center',
    maxWidth: 480,
  },
  iconBubble: {
    width: 96, height: 96,
    borderRadius: '50%',
    background: '#1a1a2e',
    border: '2px solid rgba(46,122,240,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
    position: 'relative',
    animation: 'float 3s ease-in-out infinite',
  },
  sparks: {
    position: 'absolute',
    top: -8, right: -10,
    fontSize: 13,
    color: '#5b9bf8',
    letterSpacing: 2,
  },
  num: {
    fontSize: 'clamp(72px, 18vw, 120px)',
    fontWeight: 700,
    color: '#2e7af0',
    letterSpacing: -4,
    lineHeight: 1,
    margin: 0,
  },
  divider: {
    width: 40, height: 2,
    background: 'rgba(46,122,240,0.25)',
    borderRadius: 2,
    margin: '1.25rem auto',
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    color: '#e0e8ff',
    margin: '0 0 0.5rem',
  },
  sub: {
    fontSize: 14,
    color: '#6b7a9e',
    lineHeight: 1.6,
    margin: '0 0 2rem',
  },
  actions: {
    display: 'flex',
    gap: 12,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  btnPrimary: {
    background: '#2e7af0',
    color: '#fff',
    border: 'none',
    padding: '10px 24px',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
  },
  btnGhost: {
    background: 'transparent',
    color: '#6b7a9e',
    border: '0.5px solid #2e3450',
    padding: '10px 24px',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
  },
}