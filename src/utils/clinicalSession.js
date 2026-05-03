const ACTIVE_CLINICAL_SESSION_KEY = 'activeClinicalSession';
const RECENT_CLINICAL_SESSIONS_KEY = 'recentClinicalSessions';
const MAX_RECENT_SESSIONS = 5;
const MOCK_SESSION_PREFIX = 'mock-session-';
const MOCK_TOKEN_PREFIX = 'mock-token-';

export function saveClinicalSession(session) {
  if (!isValidClinicalSession(session)) {
    return;
  }

  localStorage.setItem(ACTIVE_CLINICAL_SESSION_KEY, JSON.stringify(session));
  rememberClinicalSession(session);
}

export function getClinicalSession() {
  const stored = localStorage.getItem(ACTIVE_CLINICAL_SESSION_KEY);

  if (!stored) {
    return null;
  }

  try {
    const session = JSON.parse(stored);

    if (!isValidClinicalSession(session)) {
      clearClinicalSession();
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function clearClinicalSession() {
  localStorage.removeItem(ACTIVE_CLINICAL_SESSION_KEY);
}

export function getRecentClinicalSessions() {
  const stored = localStorage.getItem(RECENT_CLINICAL_SESSIONS_KEY);

  if (!stored) {
    return [];
  }

  try {
    const sessions = JSON.parse(stored);
    const sanitizedSessions = Array.isArray(sessions) ? sessions.filter(isValidClinicalSession) : [];

    if (sanitizedSessions.length !== sessions.length) {
      localStorage.setItem(RECENT_CLINICAL_SESSIONS_KEY, JSON.stringify(sanitizedSessions));
    }

    return sanitizedSessions;
  } catch {
    return [];
  }
}

export function buildClinicalRouteState(session) {
  return { clinicalSession: session };
}

function rememberClinicalSession(session) {
  const recentSessions = getRecentClinicalSessions();
  const nextRecentSessions = [
    {
      sessionId: session.sessionId,
      clinicalSessionToken: session.clinicalSessionToken,
      accessType: session.accessType,
      expiresAt: session.expiresAt,
      patient: session.patient,
      startedAt: new Date().toISOString(),
    },
    ...recentSessions.filter((item) => item.sessionId !== session.sessionId),
  ].slice(0, MAX_RECENT_SESSIONS);

  localStorage.setItem(RECENT_CLINICAL_SESSIONS_KEY, JSON.stringify(nextRecentSessions));
}

function isValidClinicalSession(session) {
  return Boolean(
    session &&
      typeof session.sessionId === 'string' &&
      session.sessionId &&
      !session.sessionId.startsWith(MOCK_SESSION_PREFIX) &&
      typeof session.clinicalSessionToken === 'string' &&
      session.clinicalSessionToken &&
      !session.clinicalSessionToken.startsWith(MOCK_TOKEN_PREFIX)
  );
}
