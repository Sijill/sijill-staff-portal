import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProviderSessionPage.css';
import './ProviderSessionRecentSessions.css';
import ProviderSessionHeader from '../../Components/provider/ProviderSessionHeader';
import ProviderSessionTokenCard, { TOKEN_LENGTH } from '../../Components/provider/ProviderSessionTokenCard';
import RecentClinicalSessions from '../../Components/provider/RecentClinicalSessions';
import { startClinicalSession } from '../../api/clinicalApi';
import { buildClinicalRouteState, getRecentClinicalSessions, saveClinicalSession } from '../../utils/clinicalSession';
import { getTokenErrorMessage } from '../../utils/sessionErrorMessages';
import { normalizeTokenDigits } from '../../utils/tokenInput';
import { useToast } from '../../context/ToastContext';

const emptyToken = () => Array(TOKEN_LENGTH).fill('');

export default function ProviderSessionPage() {
  const navigate = useNavigate();
  const { addToast, updateToast } = useToast();
  const [token, setToken] = useState(emptyToken);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [recentSessions, setRecentSessions] = useState([]);

  useEffect(() => {
    setRecentSessions(getRecentClinicalSessions());
  }, []);

  const openClinicalSession = (session) =>
    navigate('/provider-session/patient-medical-identity', { state: buildClinicalRouteState(session) });

  const refreshRecentSessions = () => setRecentSessions(getRecentClinicalSessions());
  const clearError = () => setErrorMessage('');
  const getCode = () => token.join('');

  const focusTokenInput = (index) => {
    document.getElementById(`permission-token-${index}`)?.focus();
  };

  const fillToken = (value, startIndex = 0) => {
    const digits = normalizeTokenDigits(value, TOKEN_LENGTH - startIndex);

    setToken((current) => {
      const nextValues = [...current];
      digits.forEach((digit, offset) => {
        nextValues[startIndex + offset] = digit;
      });
      return nextValues;
    });
    clearError();

    if (digits.length > 0 && startIndex + digits.length < TOKEN_LENGTH) {
      queueMicrotask(() => focusTokenInput(startIndex + digits.length));
    }
  };

  const handleTokenChange = (index, value) => {
    const digits = normalizeTokenDigits(value, TOKEN_LENGTH);

    if (!digits.length) {
      setToken((current) => current.map((digit, currentIndex) => (currentIndex === index ? '' : digit)));
      clearError();
      return;
    }

    if (digits.length > 1) {
      fillToken(digits.join(''), index);
      return;
    }

    setToken((current) => current.map((digit, currentIndex) => (currentIndex === index ? digits[0] : digit)));
    clearError();

    if (index < TOKEN_LENGTH - 1) {
      focusTokenInput(index + 1);
    }
  };

  const handleTokenKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !token[index] && index > 0) {
      focusTokenInput(index - 1);
    }
  };

  const handleTokenPaste = (index, event) => {
    event.preventDefault();
    fillToken(event.clipboardData.getData('text'), index);
  };

  const startSession = async (request, loadingSetter, fallbackMessage) => {
    const code = getCode();
    if (code.length !== TOKEN_LENGTH) {
      return;
    }

    loadingSetter(true);
    clearError();

    const loadingId = addToast('loading', 'Starting Session…', { message: 'Verifying patient token.' });

    try {
      const response = await request(code);
      saveClinicalSession(response);
      refreshRecentSessions();

      updateToast(loadingId, {
        type: 'success',
        title: 'Session Started',
        message: 'Patient verified. Loading medical identity…',
        duration: 3000,
      });

      openClinicalSession(response);
    } catch (error) {
      const msg = getTokenErrorMessage(error, fallbackMessage);
      setErrorMessage(msg);
      updateToast(loadingId, {
        type: 'error',
        title: 'Session Failed',
        message: msg,
        duration: 7000,
      });
    } finally {
      loadingSetter(false);
    }
  };

  return (
    <div className="provider-session-page">
      <ProviderSessionHeader />

      <main className="provider-session-content">
        <section className="provider-session-access-panel">
          <ProviderSessionTokenCard
            token={token}
            errorMessage={errorMessage}
            isSubmitting={isSubmitting}
            onChange={handleTokenChange}
            onKeyDown={handleTokenKeyDown}
            onPaste={handleTokenPaste}
            onSubmit={() => startSession(startClinicalSession, setIsSubmitting, 'Unable to start the clinical session.')}
          />
        </section>

        <RecentClinicalSessions sessions={recentSessions} onOpen={openClinicalSession} />
      </main>
    </div>
  );
}
