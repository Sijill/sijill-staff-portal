import React from 'react';
import './CTASection.css';
import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="cta-section" id="cta">
      <div className="cta-orb cta-orb-1" />
      <div className="cta-orb cta-orb-2" />

      <div className="cta-container">
        <div className="cta-inner">
          {/* Top badge */}
          <div className="cta-badge">
            <span>🚀</span>
            <span>Get Started</span>
          </div>

          <h2 className="cta-title">
            Are You Part of
            <br />
            <span className="cta-gradient">the Healthcare System?</span>
          </h2>

          <p className="cta-desc">
            Whether you're a doctor, a lab, or an imaging center — Sijill gives you powerful tools
            for accurate diagnosis and secure management of your patients' data.
          </p>

          {/* Audience Cards */}
          <div className="cta-cards">
            <div className="cta-card">
              <div className="cta-card-icon">🏥</div>
              <h4>Clinic Doctors</h4>
              <p>See the complete picture of your patient before making a diagnosis</p>
              <Link to="/register/doctor_registration" className="cta-card-btn primary">
                Register a Clinic
              </Link>
            </div>

            <div className="cta-card cta-card-featured">
              <div className="cta-card-icon">⚡</div>
              <div className="featured-tag">Most Requested</div>
              <h4>Medical Staff Login</h4>
              <p>Already have an account? Sign in now and start using the system</p>
              <Link to="/login" className="cta-card-btn featured-btn">
                Login
              </Link>
            </div>

            <div className="cta-card">
              <div className="cta-card-icon">🔬</div>
              <h4>Labs & Imaging Centers</h4>
              <p>Upload results and send them directly to the doctor in seconds</p>
              <Link to="/registerType" className="cta-card-btn primary">
                Register a Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
