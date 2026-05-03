import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProviderLoadingToast from '../../Components/provider/ProviderLoadingToast';
import ProviderSessionLayout from '../../Components/provider/ProviderSessionLayout';
import ProviderStatusMessage from '../../Components/provider/ProviderStatusMessage';
import { createEncounter } from '../../api/clinicalApi';
import { buildClinicalRouteState } from '../../utils/clinicalSession';
import AppointmentSection from './document-session/AppointmentSection';
import DiagnosisSection from './document-session/DiagnosisSection';
import ImagingOrdersSection from './document-session/ImagingOrdersSection';
import LabOrdersSection from './document-session/LabOrdersSection';
import MedicationsSection from './document-session/MedicationsSection';
import SymptomsSection from './document-session/SymptomsSection';
import { TEAL_FILL, TEXT_DARK } from './document-session/constants';
import { buildEncounterPayload, validateEncounterDraft } from './document-session/helpers';
import useEncounterForm from './document-session/useEncounterForm';
import useProviderClinicalSession from './useProviderClinicalSession';
import { canWriteClinicalSession } from './providerSessionUtils';

export default function DocumentSession() {
  const navigate = useNavigate();
  const { clinicalSession, patient } = useProviderClinicalSession();
  const form = useEncounterForm();
  const [showAllergyModal, setShowAllergyModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canDocumentEncounter = canWriteClinicalSession(clinicalSession?.accessType);

  const handleSubmit = async () => {
    if (!clinicalSession?.sessionId || !clinicalSession?.clinicalSessionToken) return setErrorMessage('Clinical session is missing. Start a new session and try again.');
    if (!canDocumentEncounter) return setErrorMessage('This clinical session does not allow encounter documentation.');

    const validationMessage = validateEncounterDraft(form);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = buildEncounterPayload(form);
      const response = await createEncounter(clinicalSession.sessionId, payload, clinicalSession.clinicalSessionToken);
      navigate('/provider-session/encounter-recorded', {
        state: {
          ...buildClinicalRouteState(clinicalSession),
          recordedAt: response.recordedAt || response.submittedAt || response.createdAt || new Date().toISOString(),
        },
      });
    } catch (error) {
      setErrorMessage(error.message || 'Unable to submit encounter.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ProviderSessionLayout patient={patient}>
        <div style={{ maxWidth: '760px', padding: '4px 0 40px' }}>
          <ProviderStatusMessage icon={AlertCircle} message={!canDocumentEncounter ? 'This clinical session is read-only, so a new encounter cannot be documented.' : ''} tone="danger" />
          <ProviderStatusMessage icon={AlertCircle} message={errorMessage} tone="danger" />

          <SymptomsSection {...form} />
          <DiagnosisSection {...form} canDocumentEncounter={canDocumentEncounter} showAllergyModal={showAllergyModal} setShowAllergyModal={setShowAllergyModal} />
          <MedicationsSection {...form} />
          <ImagingOrdersSection {...form} />
          <LabOrdersSection {...form} />
          <AppointmentSection appointment={form.appointment} setAppointment={form.setAppointment} />

          <div style={{ textAlign: 'center', marginTop: '8px' }}>
            <button type="button" onClick={handleSubmit} disabled={!canDocumentEncounter || isSubmitting} style={{ padding: '11px 52px', borderRadius: '9px', background: TEAL_FILL, border: 'none', color: TEXT_DARK, fontSize: '0.95rem', fontWeight: 700, cursor: !canDocumentEncounter || isSubmitting ? 'not-allowed' : 'pointer', opacity: !canDocumentEncounter || isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? 'Submitting...' : 'Submit Encounter'}
            </button>
          </div>
        </div>
      </ProviderSessionLayout>

      <ProviderLoadingToast message="Submitting encounter..." show={isSubmitting} />
    </>
  );
}
