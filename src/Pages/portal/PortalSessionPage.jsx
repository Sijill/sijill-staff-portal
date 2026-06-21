import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Pages/provider/ProviderSessionPage.css';
import '../../Pages/provider/ProviderSessionRecentSessions.css';
import ProviderSessionHeader from '../../Components/provider/ProviderSessionHeader';
import ProviderSessionTokenCard, { TOKEN_LENGTH } from '../../Components/provider/ProviderSessionTokenCard';
import RecentClinicalSessions from '../../Components/provider/RecentClinicalSessions';
import {
  buildPortalRouteState,
  getRecentPortalSessions,
  savePortalSession,
} from '../../utils/portalSession';
import { getTokenErrorMessage } from '../../utils/sessionErrorMessages';
import { normalizeTokenDigits } from '../../utils/tokenInput';

const emptyToken = () => Array(TOKEN_LENGTH).fill('');

export default function PortalSessionPage({ config }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(emptyToken);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [recentSessions, setRecentSessions] = useState([]);

  useEffect(() => {
    setRecentSessions(getRecentPortalSessions(config));
  }, [config]);

  const openPortalSession = (session) =>
    navigate(config.orderViewPath, { state: buildPortalRouteState(session) });

  const refreshRecentSessions = () => setRecentSessions(getRecentPortalSessions(config));
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

  const redeemToken = async () => {
    const code = getCode();
    if (code.length !== TOKEN_LENGTH) {
      return;
    }

    setIsSubmitting(true);
    clearError();

    try {
      const response = await config.startSession(code);
      savePortalSession(response, config);
      refreshRecentSessions();
      openPortalSession(response);
    } catch (error) {
      setErrorMessage(getTokenErrorMessage(error, 'Unable to redeem the token.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="provider-session-page">
      <ProviderSessionHeader />

      <main className="provider-session-content">
        <section className="provider-session-access-panel">
          <ProviderSessionTokenCard
            title={config.tokenTitle}
            description={config.tokenDescription}
            submitLabel={config.submitButtonLabel}
            submittingLabel={config.submittingLabel}
            token={token}
            errorMessage={errorMessage}
            isSubmitting={isSubmitting}
            onChange={handleTokenChange}
            onKeyDown={handleTokenKeyDown}
            onPaste={handleTokenPaste}
            onSubmit={redeemToken}
          />
        </section>

        <RecentClinicalSessions sessions={recentSessions} onOpen={openPortalSession} />
      </main>
    </div>
  );
}
