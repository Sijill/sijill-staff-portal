import React from 'react';

const tones = {
  danger: '#b23b3b',
  success: '#276749',
  info: '#295c62',
};

export default function ProviderStatusMessage({ icon: Icon, message, tone = 'info', className = 'mb-4' }) {
  if (!message) {
    return null;
  }

  return (
    <div className={`d-flex align-items-center gap-2 ${className}`.trim()} style={{ color: tones[tone], fontWeight: 600 }}>
      <Icon size={18} />
      <span>{message}</span>
    </div>
  );
}
