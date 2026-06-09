import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatPatientMeta } from '../../constants/medicalConstants';
import { getPortalSession, isValidPortalSession } from '../../utils/portalSession';

export default function usePortalSession(config) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const portalSession = state?.portalSession ?? getPortalSession(config);

  useEffect(() => {
    if (!isValidPortalSession(portalSession)) {
      navigate(config?.tokenEntryPath || '/');
    }
  }, [config?.tokenEntryPath, navigate, portalSession]);

  return {
    portalSession,
    patient: getPortalPatientSummary(portalSession),
  };
}

export function getPortalPatientSummary(session) {
  return {
    name: session?.patient?.fullName || 'Unknown Patient',
    meta: formatPatientMeta(session?.patient),
  };
}

export function getPortalSessionToken(session) {
  return (
    session?.sessionToken ||
    session?.clinicalSessionToken ||
    session?.labSessionToken ||
    session?.imagingSessionToken ||
    ''
  );
}
