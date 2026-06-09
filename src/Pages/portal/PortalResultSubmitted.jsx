import React from 'react';
import { Check } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProviderSessionLayout from '../../Components/provider/ProviderSessionLayout';
import { formatDateTime } from '../../constants/medicalConstants';
import { clearPortalSession } from '../../utils/portalSession';

const styles = {
  halo: {
    width: 'clamp(220px, 28vw, 280px)',
    height: 'clamp(220px, 28vw, 280px)',
    background:
      'radial-gradient(circle, rgba(218, 247, 229, 0.96) 0%, rgba(230, 252, 238, 0.72) 45%, rgba(255, 255, 255, 0) 74%)',
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
};

export default function PortalResultSubmitted({ config }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const patientName = state?.portalSession?.patient?.fullName || 'the patient';
  const recordedAt = state?.recordedAt || new Date().toISOString();

  const handleDashboard = () => {
    clearPortalSession(config);
    navigate(config.tokenEntryPath);
  };

  return (
    <ProviderSessionLayout>
      <div
        className="d-flex flex-column align-items-center justify-content-center text-center"
        style={{ minHeight: '68vh', padding: '24px 12px 56px' }}
      >
        <div className="d-flex align-items-center justify-content-center rounded-circle mb-4" style={styles.halo}>
          <div
            className="d-flex align-items-center justify-content-center rounded-circle position-relative"
            style={styles.circle}
          >
            <Check size={64} strokeWidth={2.5} />
          </div>
        </div>

        <h1
          className="mb-3"
          style={{
            color: '#171f24',
            fontSize: 'clamp(1.9rem, 2.8vw, 2.35rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
          }}
        >
          {config.successTitle}
        </h1>

        <p
          className="mb-0"
          style={{
            maxWidth: '760px',
            color: '#1f2529',
            fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
            fontWeight: 500,
            lineHeight: 1.55,
          }}
        >
          {config.successDescription(patientName, formatDateTime(recordedAt))}
        </p>

        <div className="w-100 d-flex justify-content-end pt-5 mt-4">
          <button type="button" onClick={handleDashboard} style={styles.button}>
            Dashboard
          </button>
        </div>
      </div>
    </ProviderSessionLayout>
  );
}
