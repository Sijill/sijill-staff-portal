import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="custom-footer text-white">
      <Container>
        <Row className="gy-4">
          {/* Brand/Logo Section with floating/pulse glow animation */}
          <Col lg={7} md={12} className="animate-fade-in-up">
            <div className="d-flex align-items-center mb-4">
              <div className="footer-logo-wrapper me-3">
                <i className="bi bi-shield-check text-info fs-4"></i>
              </div>
              <h2 className="mb-0 footer-brand-title">
                Sijill
              </h2>
            </div>
            <p className="text-white-50 mb-0" style={{ maxWidth: '440px', fontSize: '0.95rem', lineHeight: '1.7' }}>
              Unified National Health Record System - Connecting patients, providers, laboratories,
              and imaging centers for seamless healthcare delivery.
            </p>
          </Col>

          {/* Contact Details Section */}
          <Col lg={5} md={12} className="animate-fade-in-up delay-1">
            <h4 className="footer-section-title text-white">
              Contact Information
            </h4>
            <div className="d-flex flex-column gap-2 mt-2">
              <a href="mailto:support@sijill.health.gov" className="footer-contact-link">
                <i className="bi bi-envelope me-3"></i>
                <span>support@sijill.health.gov</span>
              </a>
              <a href="tel:+9668001234567" className="footer-contact-link">
                <i className="bi bi-telephone me-3"></i>
                <span>+966 (800) 123-4567</span>
              </a>
              <div className="footer-contact-link cursor-default">
                <i className="bi bi-geo-alt me-3"></i>
                <span>National Health Authority</span>
              </div>
            </div>
          </Col>
        </Row>

        {/* Divider and Copyright */}
        <div className="mt-5 pt-4 border-top border-white border-opacity-10 text-center animate-fade-in-up delay-2">
          <p className="text-white-50 mb-0" style={{ fontSize: '0.85rem' }}>
            © {currentYear} Sijill - Unified National Health Record System. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
