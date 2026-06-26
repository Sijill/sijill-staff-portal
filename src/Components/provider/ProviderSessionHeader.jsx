import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { MoveLeft, UserRound } from 'lucide-react';
import PatientSessionSteps from './PatientSessionSteps';
import sijillLogo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
const headerStyles = {
  wrapper: {
    borderBottom: '1px solid rgba(22, 52, 55, 0.1)',
    background: 'rgba(255, 255, 255, 0.94)',
    backdropFilter: 'blur(10px)',
  },
  lightPanel: {
    background: '#ebfbfd',
    color: '#1f5d63',
    boxShadow: '0 10px 20px rgba(37, 92, 99, 0.12)',
  },
  logo: {
    width: '106px',
    height: 'auto',
    objectFit: 'contain',
  },
};

const ProviderSessionHeader = ({ onBack, showSteps = false }) => {
  return (
    <header className="py-3" style={headerStyles.wrapper}>
      <Container fluid className="px-2 px-md-3">
        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap flex-md-nowrap">
          <div className="d-flex align-items-center gap-2 flex-shrink-0">
            {onBack ? (
              <Button
                type="button"
                variant="link"
                className="d-inline-flex align-items-center justify-content-center rounded-4 border-0 p-0 text-decoration-none"
                style={{ ...headerStyles.lightPanel, width: '42px', height: '42px' }}
                onClick={onBack}
                aria-label="Back to provider session"
              >
                <MoveLeft size={17} strokeWidth={2.25} />
              </Button>
            ) : null}

            <div
              className="d-inline-flex align-items-center justify-content-center rounded-4"
              style={{ ...headerStyles.lightPanel, width: '54px', height: '54px' }}
              aria-hidden="true"
            >
              <UserRound size={22} strokeWidth={2} />
            </div>
          </div>

          {showSteps ? <PatientSessionSteps /> : null}
          <Link to="/">
          <img
            src={sijillLogo}
            alt="Sijill"
            style={headerStyles.logo}
            className="flex-shrink-0 order-2 order-md-3"
          />
          </Link>
        </div>
      </Container>
    </header>
  );
};

export default ProviderSessionHeader;
