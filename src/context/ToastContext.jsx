import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { ToastContainer } from '../Components/ui/Toast';

/* ── Context ─────────────────────────────────────────────────── */
const ToastContext = createContext(null);

export function ToastProvider({ children, position = 'bottom-right' }) {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(1);

  /** Remove a toast by id */
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  /**
   * Add a toast.
   * @param {'success'|'error'|'warning'|'info'|'loading'} type
   * @param {string} title
   * @param {object} [options]
   * @param {string}  [options.message]
   * @param {boolean} [options.showIcon=true]
   * @param {number}  [options.duration]  - ms before auto-dismiss (omit for sticky)
   * @returns {number} id – can be used to dismiss programmatically
   */
  const addToast = useCallback((type, title, options = {}) => {
    const { message, showIcon = true, duration } = options;
    const id = nextId.current++;
    setToasts(prev => [...prev, { id, type, title, message, showIcon, duration }]);
    return id;
  }, []);

  /**
   * Update an existing toast (e.g. loading → success).
   */
  const updateToast = useCallback((id, updates) => {
    setToasts(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  /**
   * Convenience: show a loading toast that auto-transitions to success.
   */
  const loadingToSuccess = useCallback(
    (loadingTitle, successTitle, options = {}) => {
      const { loadingMessage, successMessage, delay = 3000 } = options;
      const id = addToast('loading', loadingTitle, { message: loadingMessage, showIcon: true });
      setTimeout(() => {
        updateToast(id, {
          type: 'success',
          title: successTitle,
          message: successMessage,
          duration: options.successDuration ?? 4000,
        });
      }, delay);
      return id;
    },
    [addToast, updateToast]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast, updateToast, loadingToSuccess }}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} position={position} />
    </ToastContext.Provider>
  );
}

/** Hook – use this in any component */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}
