import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { buildProviderSessionSteps } from './providerSessionFlow';

const StepItem = ({ label, active, showConnector, path, state }) => {
  const navigate = useNavigate();
  const isInteractive = Boolean(path) && !active;

  return (
    <div className="d-inline-flex align-items-center" style={{ gap: '0.85rem' }}>
      <button
        type="button"
        onClick={isInteractive ? () => navigate(path, { state }) : undefined}
        disabled={!isInteractive}
        style={{
          border: 'none',
          padding: 0,
          background: 'transparent',
          color: active ? '#245f65' : 'rgba(28, 28, 28, 0.86)',
          fontSize: 'clamp(1.1rem, 1.9vw, 1.3rem)',
          fontWeight: 800,
          letterSpacing: '-0.045em',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          cursor: isInteractive ? 'pointer' : 'default',
        }}
        aria-current={active ? 'step' : undefined}
      >
        {label}
      </button>
      {showConnector ? (
        <div
          className="d-inline-flex align-items-center"
          aria-hidden="true"
          style={{ gap: '0.5rem' }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '999px',
              background: '#2d2d2d',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              width: '112px',
              height: '1.5px',
              background: '#2d2d2d',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '999px',
              background: '#2d2d2d',
              display: 'inline-block',
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

const PatientSessionSteps = () => {
  const { pathname, state } = useLocation();
  const resolvedSteps = buildProviderSessionSteps(pathname, state?.clinicalSession);

  if (!resolvedSteps.length) {
    return null;
  }

  return (
    <div
      className="d-flex justify-content-center flex-grow-1 order-3 order-md-2 w-100"
      aria-label="Encounter progress"
    >
      <div
        className="d-flex flex-wrap align-items-center justify-content-center"
        style={{ columnGap: '0.9rem', rowGap: '0.8rem' }}
      >
        {resolvedSteps.map((step, index) => (
          <StepItem
            key={step.label}
            label={step.label}
            active={step.active}
            path={step.path}
            state={step.state}
            showConnector={index < resolvedSteps.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default PatientSessionSteps;
