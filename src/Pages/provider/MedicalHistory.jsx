import React, { useEffect, useState } from 'react';
import { AlertCircle, LoaderCircle, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProviderSessionLayout from '../../Components/provider/ProviderSessionLayout';
import ProviderStatusMessage from '../../Components/provider/ProviderStatusMessage';
import { EncounterDetailPanel, HistoryCard, MedicalHistoryEmptyState } from '../../Components/provider/MedicalHistoryPanels';
import { getEncounterDetail, getMedicalHistory } from '../../api/clinicalApi';
import { buildClinicalRouteState } from '../../utils/clinicalSession';
import useProviderClinicalSession from './useProviderClinicalSession';
import { canWriteClinicalSession } from './providerSessionUtils';

export default function MedicalHistory() {
  const navigate = useNavigate();
  const { clinicalSession, patient } = useProviderClinicalSession();
  const [historyEntries, setHistoryEntries] = useState([]);
  const [selectedEncounter, setSelectedEncounter] = useState(null);
  const [selectedEncounterDetail, setSelectedEncounterDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!clinicalSession?.sessionId || !clinicalSession?.clinicalSessionToken) {
      return;
    }

    if (clinicalSession.accessType === 'WRITE_ONLY') {
      setIsLoading(false);
      setErrorMessage('This clinical session has write-only access, so medical history is not available.');
      return;
    }

    const loadMedicalHistory = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const response = await getMedicalHistory(clinicalSession.sessionId, clinicalSession.clinicalSessionToken);
        setHistoryEntries(Array.isArray(response) ? response : []);
      } catch (error) {
        setErrorMessage(error.message || 'Unable to load medical history.');
      } finally {
        setIsLoading(false);
      }
    };

    loadMedicalHistory();
  }, [clinicalSession?.accessType, clinicalSession?.clinicalSessionToken, clinicalSession?.sessionId]);

  const handleOpenEncounter = async (entry) => {
    setSelectedEncounter(entry.encounterId);
    setSelectedEncounterDetail(null);
    setIsDetailLoading(true);

    try {
      const response = await getEncounterDetail(clinicalSession.sessionId, entry.encounterId, clinicalSession.clinicalSessionToken);
      setSelectedEncounterDetail(response);
    } catch (error) {
      setErrorMessage(error.message || 'Unable to load encounter detail.');
    } finally {
      setIsDetailLoading(false);
    }
  };

  return (
    <ProviderSessionLayout patient={patient}>
      <div className="pt-3">
        <ProviderStatusMessage icon={AlertCircle} message={errorMessage} tone="danger" />

        {isLoading ? (
          <ProviderStatusMessage icon={LoaderCircle} message="Loading medical history..." tone="info" className="py-5" />
        ) : historyEntries.length ? (
          <>
            <ProviderStatusMessage icon={LoaderCircle} message={isDetailLoading ? 'Loading encounter detail...' : ''} tone="info" className="mb-3" />
            <EncounterDetailPanel detail={selectedEncounterDetail} />
            {historyEntries.map((entry) => (
              <HistoryCard key={entry.encounterId} entry={entry} onOpen={handleOpenEncounter} isActive={selectedEncounter === entry.encounterId} />
            ))}
          </>
        ) : (
          <MedicalHistoryEmptyState />
        )}

        {canWriteClinicalSession(clinicalSession?.accessType) ? (
          <div className="d-flex justify-content-end pt-3">
            <button
              type="button"
              onClick={() =>
                navigate('/provider-session/patient-document-session', {
                  state: buildClinicalRouteState(clinicalSession),
                })
              }
              className="border-0 rounded-4 px-4 py-2 d-inline-flex align-items-center gap-2"
              style={{ background: '#16363b', color: '#ffffff', fontWeight: 700 }}
            >
              <Stethoscope size={16} />
              <span>Document New Encounter</span>
            </button>
          </div>
        ) : null}
      </div>
    </ProviderSessionLayout>
  );
}
