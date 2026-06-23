import React from 'react';
import './SecuritySection.css';

const securityFeatures = [
  {
    icon: '🔐',
    title: 'AES-256 Encryption',
    description: 'All data is encrypted both in transit and at rest using military-grade encryption standards.',
    color: '#00f2fe',
  },
  {
    icon: '🛡️',
    title: 'Multi-Factor Authentication',
    description: 'OTP + password on every login — no room for account breaches or unauthorized access.',
    color: '#4facfe',
  },
  {
    icon: '👤',
    title: 'Role-Based Access Control',
    description: 'Each entity accesses only what is relevant — doctors see patients, labs upload results only.',
    color: '#1e63f3',
  },
  {
    icon: '✅',
    title: 'Explicit Patient Consent',
    description: "No one accesses the patient's data without their explicit approval — every single time.",
    color: '#10b981',
  },
  {
    icon: '📜',
    title: 'Full Audit Trails',
    description: 'Every access and modification is logged with timestamp and user — 100% transparency.',
    color: '#f59e0b',
  },
  {
    icon: '🔍',
    title: 'Real-Time Activity Monitoring',
    description: 'A monitoring system detects any suspicious activity and immediately alerts the admin.',
    color: '#8b5cf6',
  },
];

export default function SecuritySection() {
  return (
    <section className="security-section" id="security">
      <div className="security-bg-grid" />

      <div className="security-container">
        {/* Header */}
        <div className="security-header">
          <div className="section-badge cyan">
            <span className="badge-dot" />
            <span>Security & Privacy</span>
          </div>
          <h2 className="security-title">
            Your Data Is Protected at
            <br />
            <span className="security-title-gradient">the Highest Technical Standard</span>
          </h2>
          <p className="security-subtitle">
            Security and privacy in Sijill are not add-ons — they are built into the core design
            from day one. We protect the most sensitive information there is: your medical records.
          </p>
        </div>

        {/* Security Grid */}
        <div className="security-grid">
          {securityFeatures.map((feature, i) => (
            <div className="security-card" key={i} style={{ '--card-color': feature.color }}>
              <div
                className="security-card-icon"
                style={{
                  background: `${feature.color}12`,
                  border: `1.5px solid ${feature.color}30`,
                }}
              >
                {feature.icon}
              </div>
              <h3 className="security-card-title">{feature.title}</h3>
              <p className="security-card-desc">{feature.description}</p>
              <div
                className="security-card-line"
                style={{
                  background: `linear-gradient(90deg, ${feature.color}, transparent)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom Highlight */}
        <div className="security-highlight">
          <div className="highlight-icon">🏆</div>
          <div className="highlight-body">
            <h3 className="highlight-title">Full Compliance with Health Data Protection Standards</h3>
            <p className="highlight-desc">
              Sijill is built following the best international healthcare data security standards —
              patient privacy is the top priority, and every design decision puts security first.
            </p>
          </div>
          <div className="highlight-badges">
            <span className="h-badge">🔒 Encrypted</span>
            <span className="h-badge">✓ Secure</span>
            <span className="h-badge">🛡️ Private</span>
          </div>
        </div>
      </div>
    </section>
  );
}
