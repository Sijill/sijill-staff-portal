import React, { useEffect, useState } from 'react';
import { AlertCircle, Check } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProviderStatusMessage from '../../Components/provider/ProviderStatusMessage';
import ProviderSessionLayout from '../../Components/provider/ProviderSessionLayout';
import { getEncounterDetail } from '../../api/clinicalApi';
import { formatDateTime } from '../../constants/medicalConstants';
import { clearClinicalSession } from '../../utils/clinicalSession';
import { downloadEncounterSummaryPdf } from '../../utils/encounterSummaryPdf';

const styles = {
  halo: {
    width: 'clamp(220px, 28vw, 280px)',
    height: 'clamp(220px, 28vw, 280px)',
    background: 'radial-gradient(circle, rgba(218, 247, 229, 0.96) 0%, rgba(230, 252, 238, 0.72) 45%, rgba(255, 255, 255, 0) 74%)',
  },
  circle: {
    width: 'clamp(108px, 14vw, 126px)',
    height: 'clamp(108px, 14vw, 126px)',
    border: '4px solid #30b862',
    color: '#30b862',
    background: 'transparent',
  },
  button: {
    minWidth: '118px',
    padding: '10px 24px',
    border: 'none',
    borderRadius: '12px',
    background: '#b9f8fc',
    color: '#1d343b',
    fontSize: '0.95rem',
    fontWeight: 800,
    boxShadow: '0 8px 18px rgba(38, 92, 99, 0.15)',
  },
  secondaryButton: {
    minWidth: '180px',
    padding: '10px 24px',
    border: '1px solid rgba(22, 52, 55, 0.16)',
    borderRadius: '12px',
    background: '#ffffff',
    color: '#1d343b',
    fontSize: '0.95rem',
    fontWeight: 800,
    boxShadow: '0 8px 18px rgba(38, 92, 99, 0.08)',
  },
};

export default function EncounterRecorded() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [encounterDetail, setEncounterDetail] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const patientName = state?.clinicalSession?.patient?.fullName || 'the patient';
  const doctorName = state?.clinicalSession?.patient?.hcpFullName || state?.clinicalSession?.hcpFullName || state?.clinicalSession?.patient?.fullName || 'Physician';
  const encounterId = state?.encounterId;
  const recordedAt = state?.recordedAt || new Date().toISOString();

  useEffect(() => {
    if (!state?.clinicalSession?.sessionId || !state?.clinicalSession?.clinicalSessionToken || !encounterId) {
      return;
    }

    const loadEncounterDetail = async () => {
      setIsLoadingDetail(true);
      setErrorMessage('');

      try {
        const response = await getEncounterDetail(
          state.clinicalSession.sessionId,
          encounterId,
          state.clinicalSession.clinicalSessionToken
        );
        setEncounterDetail(response);
      } catch (error) {
        setErrorMessage(error.message || 'Unable to load the encounter summary for PDF export.');
      } finally {
        setIsLoadingDetail(false);
      }
    };

    loadEncounterDetail();
  }, [encounterId, state?.clinicalSession?.clinicalSessionToken, state?.clinicalSession?.sessionId]);

  const handleDownloadPdf = async () => {
    if (!encounterDetail) {
      setErrorMessage('The encounter summary is not ready yet.');
      return;
    }

    setIsDownloading(true);

    try {
      downloadEncounterSummaryPdf({
        encounter: encounterDetail,
        patientName,
        doctorName: encounterDetail.hcpFullName || doctorName,
        recordedAt,
        encounterId,
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDashboard = () => {
    clearClinicalSession();
    navigate('/provider-session');
  };

  return (
    <ProviderSessionLayout>
      <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: '68vh', padding: '24px 12px 56px' }}>
        <ProviderStatusMessage icon={AlertCircle} message={errorMessage} tone="danger" className="mb-3" />
        <div className="d-flex align-items-center justify-content-center rounded-circle mb-4" style={styles.halo}>
          <div className="d-flex align-items-center justify-content-center rounded-circle position-relative" style={styles.circle}>
            <Check size={64} strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="mb-3" style={{ color: '#171f24', fontSize: 'clamp(1.9rem, 2.8vw, 2.35rem)', fontWeight: 800, letterSpacing: '-0.04em' }}>
          Encounter Recorded Successfully!
        </h1>

        <p className="mb-0" style={{ maxWidth: '760px', color: '#1f2529', fontSize: 'clamp(1rem, 1.25vw, 1.15rem)', fontWeight: 500, lineHeight: 1.55 }}>
          The clinical encounter for {patientName} has been submitted and saved to their medical history. Session ended at {formatDateTime(recordedAt)}.
        </p>

        <div className="w-100 d-flex justify-content-end gap-3 flex-wrap pt-5 mt-4">
          <button type="button" onClick={handleDownloadPdf} disabled={isLoadingDetail || isDownloading || !encounterDetail} style={{ ...styles.secondaryButton, opacity: isLoadingDetail || isDownloading || !encounterDetail ? 0.65 : 1, cursor: isLoadingDetail || isDownloading || !encounterDetail ? 'not-allowed' : 'pointer' }}>
            {isLoadingDetail ? 'Preparing PDF...' : isDownloading ? 'Downloading...' : 'Download PDF'}
          </button>
          <button type="button" onClick={handleDashboard} style={styles.button}>
            Dashboard
          </button>
        </div>
      </div>
    </ProviderSessionLayout>
  );
}
