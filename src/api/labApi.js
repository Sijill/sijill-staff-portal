import api from './httpClient';

function buildSessionHeaders(sessionToken) {
  return {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  };
}

export function startLabSession(code) {
  return api.post('/diagnostic/lab/sessions', { code });
}

export function getLabOrderView(sessionId, sessionToken) {
  return api.get(
    `/diagnostic/lab/sessions/${sessionId}/order-view`,
    buildSessionHeaders(sessionToken)
  );
}

export function submitLabResult(sessionId, formData, sessionToken) {
  return api.post(
    `/diagnostic/lab/sessions/${sessionId}/results`,
    formData,
    buildSessionHeaders(sessionToken)
  );
}
