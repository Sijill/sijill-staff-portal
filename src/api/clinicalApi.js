import api from './httpClient';

function buildClinicalHeaders(clinicalSessionToken) {
  return {
    headers: {
      Authorization: `Bearer ${clinicalSessionToken}`,
    },
  };
}

export function startClinicalSession(code) {
  return api.post('/clinical/sessions', { code });
}

export function getMedicalIdentity(sessionId, clinicalSessionToken) {
  return api.get(
    `/clinical/sessions/${sessionId}/medical-identity`,
    buildClinicalHeaders(clinicalSessionToken)
  );
}

export function updatePatientVitals(sessionId, payload, clinicalSessionToken) {
  return api.patch(
    `/clinical/sessions/${sessionId}/medical-identity`,
    payload,
    buildClinicalHeaders(clinicalSessionToken)
  );
}

export function getMedicalHistory(sessionId, clinicalSessionToken, params = {}) {
  return api.get(`/clinical/sessions/${sessionId}/medical-history`, {
    ...buildClinicalHeaders(clinicalSessionToken),
    params,
  });
}

export function getEncounterDetail(sessionId, encounterId, clinicalSessionToken) {
  return api.get(
    `/clinical/sessions/${sessionId}/medical-history/${encounterId}`,
    buildClinicalHeaders(clinicalSessionToken)
  );
}

export function createEncounter(sessionId, payload, clinicalSessionToken) {
  return api.post(
    `/clinical/sessions/${sessionId}/encounters`,
    payload,
    buildClinicalHeaders(clinicalSessionToken)
  );
}
