import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import InfoCard from './InfoCard';

export default function SectionThree() {
  const cards = [
    {
      icon: '🔒',
      title: 'End-to-End Data Encryption',
      description:
        'All data is encrypted both in transit and at rest using industry-standard AES-256 encryption protocols.',
    },
    {
      icon: '🛡️',
      title: 'Multi-Factor Identity Verification',
      description:
        'Advanced authentication mechanisms including OTP verification ensure only authorized entities can access the system.',
    },
    {
      icon: '📄',
      title: 'Regulatory Compliance',
      description:
        'Fully compliant with national health data protection regulations and international healthcare standards.',
    },
    {
      icon: '🔔',
      title: 'Complete Access Logs & Accountability',
      description:
        'Immutable audit trails record every system interaction, ensuring transparency and forensic capability.',
    },
  ];

  return (
    <section className="section-three position-relative overflow-hidden py-5">
      {/* Background Animated Nodes */}
      <div className="security-bg-node node-1"></div>
      <div className="security-bg-node node-2"></div>

      <Container className="position-relative" style={{ zIndex: 2 }}>
        {/* Header Section */}
        <div className="text-center mb-5 animate-fade-in-up">
          <h2 className="fw-bold section-three-title">Trust & Security</h2>
          <p className="section-three-subtitle mx-auto">
            Your security and privacy are our highest priorities
          </p>
        </div>

        {/* Info Cards Grid */}
        <Row>
          {cards.map((card, index) => (
            <InfoCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              delayClass={`delay-${(index % 2) + 1}`}
            />
          ))}
        </Row>

        {/* Bottom Highlight Card with Shimmer Effect */}
        <Row className="justify-content-center mt-5 animate-fade-in-up delay-3">
          <Col lg={10}>
            <Card className="border-0 shadow security-highlight-card p-5 text-center rounded-4 overflow-hidden position-relative">
              {/* Shimmer Effect overlay */}
              <div className="shimmer-overlay"></div>
              
              <div className="display-3 mb-3 float-icon">🛡️</div>
              <Card.Title className="fw-bold h3 text-white mb-3">Certified & Secure</Card.Title>
              <Card.Text className="highlight-text px-md-5">
                Sijill adheres to the highest standards of healthcare data security and privacy
                protection, ensuring your information is safe.
              </Card.Text>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
