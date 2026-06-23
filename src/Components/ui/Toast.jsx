import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Icons ─────────────────────────────────────────────────── */
const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const AlertCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const XCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SpinnerIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'toast-spin 1s linear infinite' }}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

/* ── Config ─────────────────────────────────────────────────── */
const TOAST_STYLES = {
  success: {
    bg: '#ffffff',
    border: '1px solid #d1fae5',
    accentColor: '#10b981',
    iconBg: '#d1fae5',
    iconColor: '#059669',
    titleColor: '#064e3b',
    messageColor: '#065f46',
    progressColor: '#10b981',
    icon: <CheckCircleIcon />,
  },
  error: {
    bg: '#ffffff',
    border: '1px solid #fee2e2',
    accentColor: '#ef4444',
    iconBg: '#fee2e2',
    iconColor: '#dc2626',
    titleColor: '#7f1d1d',
    messageColor: '#991b1b',
    progressColor: '#ef4444',
    icon: <XCircleIcon />,
  },
  warning: {
    bg: '#ffffff',
    border: '1px solid #fef3c7',
    accentColor: '#f59e0b',
    iconBg: '#fef3c7',
    iconColor: '#d97706',
    titleColor: '#78350f',
    messageColor: '#92400e',
    progressColor: '#f59e0b',
    icon: <AlertCircleIcon />,
  },
  info: {
    bg: '#ffffff',
    border: '1px solid #dbeafe',
    accentColor: '#3b82f6',
    iconBg: '#dbeafe',
    iconColor: '#2563eb',
    titleColor: '#1e3a8a',
    messageColor: '#1d4ed8',
    progressColor: '#3b82f6',
    icon: <InfoIcon />,
  },
  loading: {
    bg: '#ffffff',
    border: '1px solid #e2e8f0',
    accentColor: '#6366f1',
    iconBg: '#ede9fe',
    iconColor: '#6366f1',
    titleColor: '#1e1b4b',
    messageColor: '#4338ca',
    progressColor: '#6366f1',
    icon: <SpinnerIcon />,
  },
};

/* ── Single Toast ───────────────────────────────────────────── */
function Toast({ id, type = 'info', title, message, showIcon = true, duration, onClose }) {
  const style = TOAST_STYLES[type] || TOAST_STYLES.info;
  const [progress, setProgress] = useState(100);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    if (!duration || type === 'loading') return;

    const step = 50;
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(pct);
      if (pct <= 0) {
        clearInterval(intervalRef.current);
        onClose(id);
      }
    }, step);

    return () => clearInterval(intervalRef.current);
  }, [id, duration, type, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 100, scale: 0.94 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
      style={{
        background: style.bg,
        border: style.border,
        borderLeft: `6px solid ${style.accentColor}`,
        borderRadius: 16,
        padding: '20px 22px 20px 20px',
        minWidth: 420,
        maxWidth: 540,
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08), 0 12px 32px -4px rgba(0,0,0,0.12)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Content row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>

        {/* Icon bubble */}
        {showIcon && (
          <div style={{
            flexShrink: 0,
            width: 50,
            height: 50,
            borderRadius: 12,
            background: style.iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: style.iconColor,
            marginTop: 1,
          }}>
            {style.icon}
          </div>
        )}

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0, paddingTop: showIcon ? 2 : 0 }}>
          <div style={{
            fontWeight: 700,
            fontSize: 17,
            color: style.titleColor,
            lineHeight: 1.35,
            marginBottom: message ? 6 : 0,
            fontFamily: 'Outfit, Inter, sans-serif',
          }}>
            {title}
          </div>
          {message && (
            <div style={{
              fontSize: 15,
              color: style.messageColor,
              lineHeight: 1.5,
              opacity: 0.85,
            }}>
              {message}
            </div>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={() => onClose(id)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#9ca3af',
            padding: '4px',
            flexShrink: 0,
            lineHeight: 1,
            borderRadius: 6,
            transition: 'color 0.2s, background 0.2s',
            marginTop: 1,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#374151';
            e.currentTarget.style.background = '#f3f4f6';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = '#9ca3af';
            e.currentTarget.style.background = 'none';
          }}
          aria-label="Close notification"
        >
          <XIcon />
        </button>
      </div>

      {/* Progress bar */}
      {duration && type !== 'loading' && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 4,
          width: `${progress}%`,
          background: style.progressColor,
          transition: 'width 50ms linear',
          opacity: 0.6,
          borderRadius: '0 2px 0 0',
        }} />
      )}

      <style>{`@keyframes toast-spin { to { transform: rotate(360deg); } }`}</style>
    </motion.div>
  );
}

/* ── Container ──────────────────────────────────────────────── */
export function ToastContainer({ toasts, onClose, position = 'bottom-right' }) {
  const positionStyles = {
    'top-left': { top: 20, left: 20 },
    'top-right': { top: 20, right: 20 },
    'top-center': { top: 20, left: '50%', transform: 'translateX(-50%)' },
    'bottom-left': { bottom: 20, left: 20 },
    'bottom-right': { bottom: 20, right: 20 },
    'bottom-center': { bottom: 20, left: '50%', transform: 'translateX(-50%)' },
  };

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        ...positionStyles[position],
      }}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map(t => (
          <Toast key={t.id} {...t} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default Toast;