import React from 'react';
import { Card, Col } from 'react-bootstrap';

export default function InfoCard({ icon, title, description, delayClass }) {
  return (
    <Col lg={6} md={12} className={`mb-4 animate-fade-in-up ${delayClass}`}>
      <Card className="border-0 info-security-card h-100 rounded-4 p-4 position-relative">
        {/* Soft edge line decoration */}
        <div className="card-edge-glow"></div>
        
        <Card.Body className="d-flex align-items-start p-0">
          {/* Dynamic floating icon container */}
          <div className="d-flex align-items-center justify-content-center flex-shrink-0 security-icon-wrapper rounded-3 me-4 animate-float">
            {icon}
          </div>

          {/* Text Content */}
          <div>
            <Card.Title className="fw-bold mb-2 h5 card-security-title">
              {title}
            </Card.Title>
            <Card.Text className="card-security-text">
              {description}
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
