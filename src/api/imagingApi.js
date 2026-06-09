import api from './httpClient';

function buildSessionHeaders(sessionToken) {
  return {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  };
}

export function startImagingSession(code) {
  return api.post('/diagnostic/imaging/sessions', { code });
}

export function getImagingOrderView(sessionId, sessionToken) {
  return api.get(
    `/diagnostic/imaging/sessions/${sessionId}/order-view`,
    buildSessionHeaders(sessionToken)
  );
}

export function submitImagingResult(sessionId, formData, sessionToken) {
  return api.post(
    `/diagnostic/imaging/sessions/${sessionId}/results`,
    formData,
    buildSessionHeaders(sessionToken)
  );
}
