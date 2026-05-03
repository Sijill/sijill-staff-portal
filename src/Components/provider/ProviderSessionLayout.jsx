import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { SquarePen, UserRound } from 'lucide-react';
import ProviderSessionHeader from './ProviderSessionHeader';
import { getProviderSessionBackPath, isProviderSessionStepPath } from './providerSessionFlow';

const surfaceStyles = {
  page: {
    minHeight: '100vh',
    minWidth: '100vw',
    background:
      'radial-gradient(circle at top, rgba(220, 245, 247, 0.55), transparent 22%), linear-gradient(180deg, #ffffff 0%, #fcfefe 100%)',
  },
  divider: {
    borderBottom: '1px solid rgba(22, 52, 55, 0.12)',
  },
  statCard: {
    background: '#ffffff',
    color: '#235e64',
    border: '1px solid rgba(41, 92, 98, 0.08)',
    boxShadow: '0 10px 24px rgba(38, 92, 99, 0.08)',
  },
};

const ProviderSessionLayout = ({ patient, stats = [], onBack, children }) => {
  
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const hasPatient = Boolean(patient?.name || patient?.meta);
  const hasStats = stats.length > 0;
  const hasSummarySection = hasPatient || hasStats;
  const shouldShowSteps = isProviderSessionStepPath(pathname);
  const defaultBackPath = getProviderSessionBackPath(pathname);

  const handleBack =
    onBack ??
    (defaultBackPath
      ? () => navigate(defaultBackPath, { state: { clinicalSession: state?.clinicalSession } })
      : undefined);

  return (
    <div style={surfaceStyles.page}>
      <ProviderSessionHeader onBack={handleBack} showSteps={shouldShowSteps} />

      <Container className="py-4 py-md-5 px-2 px-md-3" style={{ maxWidth: '1140px' }}>
        {hasSummarySection ? (
          <section className="pb-4" style={surfaceStyles.divider}>
            {hasPatient ? (
              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-4"
                  style={{
                    width: '56px',
                    height: '56px',
                    background: '#e9fbfd',
                    color: '#1f5d63',
                    boxShadow: '0 12px 22px rgba(38, 92, 99, 0.09)',
                  }}
                  aria-hidden="true"
                >
                  <UserRound size={30} strokeWidth={1.9} />
                </div>

                <div>
                  <h1
                    className="mb-1"
                    style={{
                      color: '#2d3338',
                      fontSize: 'clamp(1.45rem, 2vw, 1.8rem)',
                      fontWeight: 700,
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                    }}
                  >
                    {patient.name}
                  </h1>
                  <p
                    className="mb-0"
                    style={{
                      color: '#7a8086',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                    }}
                  >
                    {patient.meta}
                  </p>
                </div>
              </div>
            ) : null}

            {hasStats ? (
              <Row className="g-3">
                {stats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <Col key={stat.label} xs={12} md={4}>
                      <div
                        className="rounded-3 h-100 px-3 py-2 d-flex align-items-center gap-3"
                        style={surfaceStyles.statCard}
                      >
                        <div
                          className="d-inline-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                          style={{
                            width: '28px',
                            height: '28px',
                            background: stat.iconBg ?? '#eef8f9',
                            color: stat.iconColor ?? '#2a676e',
                          }}
                        >
                          <Icon size={16} strokeWidth={2.15} />
                        </div>
                        <span
                          style={{
                            color: '#687177',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            lineHeight: 1,
                          }}
                        >
                          {stat.label}
                        </span>
                        <strong
                          className="ms-auto"
                          style={{
                            color: '#1f2d34',
                            fontSize: '0.92rem',
                            fontWeight: 700,
                            lineHeight: 1,
                          }}
                        >
                          {stat.value}
                        </strong>
                        {stat.editable ? (
                          <Button
                            type="button"
                            variant="link"
                            className="p-0 ms-2 text-decoration-none"
                            onClick={stat.onEdit}
                            aria-label={`Edit ${stat.label}`}
                            style={{ color: '#667b80' }}
                          >
                            <SquarePen size={13} strokeWidth={2.15} />
                          </Button>
                        ) : null}
                      </div>
                    </Col>
                  );
                })}
              </Row>
            ) : null}
          </section>
        ) : null}

        <div className={hasSummarySection ? 'pt-2' : undefined}>{children}</div>
      </Container>
    </div>
  );
};

export default ProviderSessionLayout;
