const MAX_RECENT_SESSIONS = 5;

function getSessionToken(session) {
  return (
    session?.sessionToken ||
    session?.clinicalSessionToken ||
    session?.labSessionToken ||
    session?.imagingSessionToken ||
    ''
  );
}

export function isValidPortalSession(session) {
  return Boolean(session?.sessionId && getSessionToken(session));
}

export function savePortalSession(session, config) {
  if (!isValidPortalSession(session) || !config?.activeSessionKey) {
    return;
  }

  const normalizedSession = normalizePortalSession(session);
  localStorage.setItem(config.activeSessionKey, JSON.stringify(normalizedSession));
  rememberPortalSession(normalizedSession, config);
}

export function getPortalSession(config) {
  if (!config?.activeSessionKey) {
    return null;
  }

  const stored = localStorage.getItem(config.activeSessionKey);
  if (!stored) {
    return null;
  }

  try {
    const session = JSON.parse(stored);
    if (!isValidPortalSession(session)) {
      clearPortalSession(config);
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function clearPortalSession(config) {
  if (config?.activeSessionKey) {
    localStorage.removeItem(config.activeSessionKey);
  }
}

export function getRecentPortalSessions(config) {
  if (!config?.recentSessionsKey) {
    return [];
  }

  const stored = localStorage.getItem(config.recentSessionsKey);
  if (!stored) {
    return [];
  }

  try {
    const sessions = JSON.parse(stored);
    const sanitizedSessions = Array.isArray(sessions) ? sessions.filter(isValidPortalSession) : [];

    if (sanitizedSessions.length !== sessions.length) {
      localStorage.setItem(config.recentSessionsKey, JSON.stringify(sanitizedSessions));
    }

    return sanitizedSessions;
  } catch {
    return [];
  }
}

export function buildPortalRouteState(session) {
  return { portalSession: session };
}

function normalizePortalSession(session) {
  return {
    ...session,
    sessionToken: getSessionToken(session),
  };
}

function rememberPortalSession(session, config) {
  const recentSessions = getRecentPortalSessions(config);
  const nextRecentSessions = [
    {
      sessionId: session.sessionId,
      sessionToken: getSessionToken(session),
      expiresAt: session.expiresAt,
      patient: session.patient,
      startedAt: new Date().toISOString(),
    },
    ...recentSessions.filter((item) => item.sessionId !== session.sessionId),
  ].slice(0, MAX_RECENT_SESSIONS);

  localStorage.setItem(config.recentSessionsKey, JSON.stringify(nextRecentSessions));
}
