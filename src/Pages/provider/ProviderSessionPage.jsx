import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProviderSessionPage.css';
import './ProviderSessionRecentSessions.css';
import ProviderSessionHeader from '../../Components/provider/ProviderSessionHeader';
import ProviderSessionTokenCard, { TOKEN_LENGTH } from '../../Components/provider/ProviderSessionTokenCard';
import RecentClinicalSessions from '../../Components/provider/RecentClinicalSessions';
import { startClinicalSession } from '../../api/clinicalApi';
import { buildClinicalRouteState, getRecentClinicalSessions, saveClinicalSession } from '../../utils/clinicalSession';

const emptyToken = () => Array(TOKEN_LENGTH).fill('');

export default function ProviderSessionPage() {
  const navigate = useNavigate();
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

  const fillToken = (value) => {
    const nextToken = emptyToken().map((_, index) => value.replace(/\D/g, '').slice(0, TOKEN_LENGTH)[index] || '');
    setToken(nextToken);
    clearError();
  };

  const handleTokenChange = (index, value) => {
    if (!/^\d?$/.test(value)) {
      return;
    }

    setToken((current) => current.map((digit, currentIndex) => (currentIndex === index ? value : digit)));
    clearError();

    if (value && index < TOKEN_LENGTH - 1) {
      document.getElementById(`permission-token-${index + 1}`)?.focus();
    }
  };

  const handleTokenKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !token[index] && index > 0) {
      document.getElementById(`permission-token-${index - 1}`)?.focus();
    }
  };

  const handleTokenPaste = (event) => {
    event.preventDefault();
    fillToken(event.clipboardData.getData('text'));
  };

  const startSession = async (request, loadingSetter, fallbackMessage) => {
    const code = getCode();
    if (code.length !== TOKEN_LENGTH) {
      return;
    }

    loadingSetter(true);
    clearError();

    try {
      const response = await request(code);
      saveClinicalSession(response);
      refreshRecentSessions();
      openClinicalSession(response);
    } catch (error) {
      setErrorMessage(error.message || fallbackMessage);
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
