import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getClinicalSession } from '../../utils/clinicalSession';
import { getProviderPatientSummary, hasClinicalSession } from './providerSessionUtils';

export default function useProviderClinicalSession(redirectPath = '/provider-session') {
  const navigate = useNavigate();
  const { state } = useLocation();
  const clinicalSession = state?.clinicalSession ?? getClinicalSession();

  useEffect(() => {
    if (!hasClinicalSession(clinicalSession)) {
      navigate(redirectPath);
    }
  }, [clinicalSession, navigate, redirectPath]);

  return {
    clinicalSession,
    patient: getProviderPatientSummary(clinicalSession),
  };
}
