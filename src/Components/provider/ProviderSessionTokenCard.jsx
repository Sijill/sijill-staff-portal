import React from 'react';
import { AlertCircle, ClipboardPenLine, LoaderCircle } from 'lucide-react';
import ProviderStatusMessage from './ProviderStatusMessage';

export const TOKEN_LENGTH = 6;

export default function ProviderSessionTokenCard({
  token,
  errorMessage,
  isSubmitting,
  onChange,
  onKeyDown,
  onPaste,
  onSubmit,
}) {
  const isTokenComplete = token.every(Boolean);

  return (
    <div className="provider-session-token-card">
      <h1>Enter Patient&apos;s Permission Token</h1>

      <div className="provider-session-token-inputs">
        {token.map((digit, index) => (
          <input
            key={index}
            id={`permission-token-${index}`}
            className="provider-session-token-input"
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(event) => onChange(index, event.target.value)}
            onKeyDown={(event) => onKeyDown(index, event)}
            onPaste={onPaste}
            aria-label={`Permission token digit ${index + 1}`}
          />
        ))}
      </div>

      <ProviderStatusMessage icon={AlertCircle} message={errorMessage} tone="danger" className="mt-3" />

      <button className="provider-session-start-button" type="button" onClick={onSubmit} disabled={!isTokenComplete || isSubmitting}>
        {isSubmitting ? <LoaderCircle size={18} /> : <ClipboardPenLine size={18} />}
        <span>{isSubmitting ? 'Starting Session...' : 'Start Session'}</span>
      </button>

      <p className="mt-3 mb-0" style={{ color: '#587177', fontSize: '0.92rem', lineHeight: 1.5 }}>
        Enter the 6-digit patient permission token to open the connected provider session flow.
      </p>
    </div>
  );
}
