import api from './httpClient';

function buildClinicalHeaders(clinicalSessionToken) {
  return {
    headers: {
      Authorization: `Bearer ${clinicalSessionToken}`,
    },
  };
}

export function normalizeClinicalDocumentUrl(url) {
  if (!url || typeof url !== 'string') {
    return '';
  }

  try {
    const parsedUrl = new URL(url, window.location.origin);
    const pathname = parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;

    if (pathname.startsWith('/api/v1/')) {
      return pathname.slice('/api/v1'.length);
    }

    return pathname;
  } catch {
    if (url.startsWith('/api/v1/')) {
      return url.slice('/api/v1'.length);
    }

    return url;
  }
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

// export function getMedicalHistory(sessionId, clinicalSessionToken, params = {}) {
//   return api.get(`/clinical/sessions/${sessionId}/medical-history`, {
//     ...buildClinicalHeaders(clinicalSessionToken),
//     params,
//   });
// }

export async function getMedicalHistory(sessionId, clinicalSessionToken, params = {}) {
  const response = await api.get(`/clinical/sessions/${sessionId}/medical-history`, {
    ...buildClinicalHeaders(clinicalSessionToken),
    params,
  });
  return response; // { data: [...], pagination: {...} }
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

export function getPatientImage(patientAccessToken) {
  return api.get('/patient/profile-picture', {
    headers: {
      Authorization: `Bearer ${patientAccessToken}`,
    },
    responseType: 'blob',
  });
}
