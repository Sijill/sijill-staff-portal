import React from 'react';
import './SolutionSection.css';

export default function SolutionSection() {
  return (
    <section className="solution-section" id="solution">
      <div className="solution-container">
        {/* Header */}
        <div className="solution-header">
          <div className="section-badge success">
            <span className="badge-dot" />
            <span>Our Solution</span>
          </div>
          <h2 className="solution-title">
            <span className="solution-title-gradient">The Unified Medical Record</span>
            <br />
            — One Comprehensive Health File per Patient
          </h2>
          <p className="solution-subtitle">
            We consolidate every piece of patient data — from clinics, laboratories, and imaging
            centers — into a single digital medical record linked to age, chronic conditions, and
            medications, enabling fully accurate and safe clinical decision-making.
          </p>
        </div>

        {/* Central Visual */}
        <div className="solution-visual">
          <div className="solution-orbit-ring">
            <div className="orbit-item orbit-item-1">
              <div className="orbit-icon">🏥</div>
              <span>Clinic</span>
            </div>
            <div className="orbit-item orbit-item-2">
              <div className="orbit-icon">🔬</div>
              <span>Laboratory</span>
            </div>
            <div className="orbit-item orbit-item-3">
              <div className="orbit-icon">📡</div>
              <span>Imaging</span>
            </div>
            <div className="orbit-item orbit-item-4">
              <div className="orbit-icon">📱</div>
              <span>Patient App</span>
            </div>
          </div>

          {/* Center */}
          <div className="solution-center">
            <div className="solution-center-ring ring-outer" />
            <div className="solution-center-ring ring-middle" />
            <div className="solution-center-core">
              <div className="center-logo">
                <img src="/src/assets/logo_light-removebg.png" alt="Sijill" />
              </div>
              <span className="center-label">Sijill</span>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="solution-benefits">
          {[
            {
              icon: '📋',
              title: '360° Medical Profile',
              desc: 'Lab results + imaging + visits + chronic medications + medical history — everything in one place.',
            },
            {
              icon: '🧠',
              title: 'Clinical Decision Support',
              desc: 'The doctor sees the full picture of the patient and makes decisions based on comprehensive, accurate data.',
            },
            {
              icon: '🤖',
              title: 'Real AI Insights',
              desc: 'AI that works on actual, complete data — no random results or generic recommendations.',
            },
            {
              icon: '🔐',
              title: 'Patient Consent First',
              desc: 'The patient controls who accesses their data — privacy and security are at the core of the design.',
            },
            {
              icon: '⚡',
              title: 'Instant Data Access',
              desc: 'Any authorized provider can access the full medical record in seconds when needed.',
            },
            {
              icon: '💊',
              title: 'Prevent Drug Interactions',
              desc: 'Knowing current medications in advance prevents prescribing conflicting drugs and protects lives.',
            },
          ].map((b, i) => (
            <div className="solution-benefit-card" key={i}>
              <div className="benefit-icon">{b.icon}</div>
              <div>
                <h4 className="benefit-title">{b.title}</h4>
                <p className="benefit-desc">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
