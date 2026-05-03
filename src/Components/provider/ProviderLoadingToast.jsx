import React from 'react';
import { LoaderCircle } from 'lucide-react';

export default function ProviderLoadingToast({ message, show }) {
  if (!show) {
    return null;
  }

  return (
    <div
      className="position-fixed bottom-0 end-0 m-4 rounded-4 px-3 py-2 d-flex align-items-center gap-2"
      style={{ background: '#17343a', color: '#ffffff', zIndex: 1050 }}
    >
      <LoaderCircle size={16} />
      <span>{message}</span>
    </div>
  );
}
