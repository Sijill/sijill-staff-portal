import { formatPatientMeta } from '../../constants/medicalConstants';

export function hasClinicalSession(session) {
  return Boolean(session?.sessionId && session?.clinicalSessionToken);
}

export function canWriteClinicalSession(accessType) {
  return accessType === 'WRITE_ONLY' || accessType === 'READ_WRITE';
}

export function getProviderPatientSummary(session) {
  return {
    name: session?.patient?.fullName || 'Unknown Patient',
    meta: formatPatientMeta(session?.patient),
  };
}
