import React from 'react';
import { Link } from 'react-router-dom';
import './SectionOne.css';

export default function SectionOne() {
  return (
    <section className="section-one d-flex justify-content-center align-items-center text-center">
      {/* Floating Animated Gradient Orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className="container text-white d-flex flex-column align-items-center position-relative" style={{ zIndex: 2 }}>
        {/* Logo Container with Scale-In Animation */}
        <div className="logo-box bg-white rounded-4 p-3 mb-5 animate-scale-in">
          <img src="/src/assets/logo.svg" alt="Sijill Logo" className="img-fluid" />
        </div>

        {/* Headline: Gradient Text & Merriweather/Outfit Hybrid */}
        <h1 className="main-headline mb-4 animate-fade-in-up delay-1">
          <span className="text-gradient">One Secure Record.</span>
          <br />
          <span className="text-gradient">One Trusted System.</span>
          <br />
          <span className="text-gradient-secondary">Lifetime Healthcare Continuity.</span>
        </h1>

        {/* Lead Description with Fade In Up */}
        <p className="description mb-4 animate-fade-in-up delay-2">
          Sijill is a unified national electronic health record (EHR) system that securely connects
          patients, healthcare providers, laboratories, and imaging centers on a single platform.
        </p>

        {/* Enhanced Glassmorphism Info Box */}
        <div className="info-box rounded-4 p-4 mb-5 animate-fade-in-up delay-3">
          <p className="mb-0 fw-semibold">
            The system enables authorized entities to access, upload, and review medical records
            (laboratory results, imaging studies, and clinical notes) with full patient consent,
            ensuring data privacy, security, and continuity of care.
          </p>
        </div>

        {/* Action Buttons with Advanced Shine & Glow */}
        <div className="d-flex justify-content-center gap-3 mb-4 w-100 animate-fade-in-up delay-4">
          <Link to="/login" className="btn btn-login fw-bold btn-shine-effect">
            Login
          </Link>

          <Link to="/registerType" className="btn btn-register fw-bold btn-shine-effect">
            Register
          </Link>
        </div>

        {/* Footer Note */}
        <p className="footer-note text-white animate-fade-in-up delay-5">
          For healthcare providers, laboratories, and imaging centers
        </p>
      </div>
    </section>
  );
}
