import React from 'react';
import { Link } from 'react-router-dom';
import './LandingFooter.css';
import sijillLogo from '../../assets/logo.svg';

export default function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="landing-footer" id="footer">
      <div className="footer-glow" />

      <div className="footer-container">
        {/* Top Row */}
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              <div className="footer-logo-box">
                <img src={sijillLogo} alt="Sijill" />
              </div>
              <div>
                <h3 className="footer-brand-name">Sijill</h3>
                <span className="footer-brand-sub">Sijill EHR System</span>
              </div>
            </div>
            <p className="footer-brand-desc">
              The unified Electronic Health Record system — securely connecting patients, doctors, laboratories, and imaging centers in an integrated platform for accurate medical decisions.
            </p>
            <div className="footer-tags">
              <span>🏥 Clinics</span>
              <span>🔬 Labs</span>
              <span>📡 Imaging</span>
              <span>📱 Mobile</span>
            </div>
          </div>

          {/* Project Links */}
          <div className="footer-links-group">
            <h4 className="footer-group-title">Platform</h4>
            <ul className="footer-links">
              <li><a href="#problem" onClick={(e) => { e.preventDefault(); document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' }); }}>The Problem</a></li>
              <li><a href="#solution" onClick={(e) => { e.preventDefault(); document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' }); }}>Our Solution</a></li>
              <li><a href="#how-it-works" onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}>How It Works</a></li>
              <li><a href="#ai" onClick={(e) => { e.preventDefault(); document.getElementById('ai')?.scrollIntoView({ behavior: 'smooth' }); }}>AI Insights</a></li>
              <li><a href="#security" onClick={(e) => { e.preventDefault(); document.getElementById('security')?.scrollIntoView({ behavior: 'smooth' }); }}>Security</a></li>
            </ul>
          </div>

          {/* Access */}
          <div className="footer-links-group">
            <h4 className="footer-group-title">Access</h4>
            <ul className="footer-links">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/registerType">Register</Link></li>
              <li><Link to="/register/doctor_registration">Clinic Registration</Link></li>
              <li><Link to="/register/lab_registration">Lab Registration</Link></li>
              <li><Link to="/register/imaging_registration">Imaging Registration</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-links-group">
            <h4 className="footer-group-title">Contact</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">📧</span>
                <a href="mailto:support@sijill.health">support@sijill.health</a>
              </li>
              <li>
                <span className="contact-icon">📍</span>
                <span>National Healthcare Headquarters</span>
              </li>
              <li>
                <span className="contact-icon">💻</span>
                <span>Integrated Enterprise Platform</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom Row */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} Sijill — Unified Health Record System. All rights reserved.
          </p>
          <div className="footer-tech-badges">
            <span>React</span>
            <span>Nest.js</span>
            <span>AI-Powered</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
