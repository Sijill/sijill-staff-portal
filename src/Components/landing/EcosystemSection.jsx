import React, { useState } from 'react';
import './EcosystemSection.css';

const projects = [
  {
    id: 'mobile',
    icon: '📱',
    tag: 'Patient Application',
    title: 'Mobile App',
    subtitle: "In the patient's hand — their complete medical file",
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
    features: [
      'View all lab results and imaging reports',
      'Full medical history and chronic medications',
      'Manage access permissions for each provider',
      'Receive AI-powered health recommendations',
      'Book appointments and track sessions',
      'Instant notifications for every record update',
    ],
    audience: 'For Patients',
  },
  {
    id: 'web',
    icon: '🖥️',
    tag: 'Medical Staff Portal',
    title: 'Web System',
    subtitle: 'For Clinics · Laboratories · Imaging Centers',
    color: '#00f2fe',
    gradient: 'linear-gradient(135deg, #00f2fe, #1e63f3)',
    features: [
      'Patient sessions with full medical record access',
      'Upload lab results and imaging directly',
      'Review visit history and prescriptions',
      'Manage lab and imaging orders',
      'Session reports and treatment follow-up',
      'Registration and activation portal for providers',
    ],
    audience: 'For Medical Staff',
  },
  {
    id: 'admin',
    icon: '⚙️',
    tag: 'Admin Dashboard',
    title: 'Admin System',
    subtitle: 'Full management and oversight of the entire platform',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    features: [
      'Approve registrations of medical entities',
      'Manage permissions for all users',
      'Monitor access logs and system activity',
      'Comprehensive statistics and system reports',
      'Configure security and privacy policies',
      'Central control for the entire platform',
    ],
    audience: 'For Admins',
  },
];

export default function EcosystemSection() {
  const [active, setActive] = useState('web');

  const activeProject = projects.find((p) => p.id === active);

  return (
    <section className="ecosystem-section" id="how-it-works">
      <div className="ecosystem-container">
        {/* Header */}
        <div className="ecosystem-header">
          <div className="section-badge teal">
            <span className="badge-dot" />
            <span>Project Components</span>
          </div>
          <h2 className="ecosystem-title">
            Three Systems.
            <br />
            <span className="ecosystem-title-gradient">One Integrated Platform.</span>
          </h2>
          <p className="ecosystem-subtitle">
            The project is divided into three interconnected applications — each designed for a
            specific user type, yet they all exchange data securely through the unified record.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="ecosystem-tabs">
          {projects.map((p) => (
            <button
              key={p.id}
              className={`ecosystem-tab ${active === p.id ? 'active' : ''}`}
              style={active === p.id ? { '--tab-color': p.color } : {}}
              onClick={() => setActive(p.id)}
            >
              <span className="tab-icon">{p.icon}</span>
              <div className="tab-text">
                <span className="tab-tag">{p.audience}</span>
                <span className="tab-title">{p.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Active Project Detail */}
        {activeProject && (
          <div
            className="ecosystem-detail"
            key={activeProject.id}
            style={{ '--project-color': activeProject.color }}
          >
            {/* Left: Info */}
            <div className="ecosystem-detail-info">
              <div
                className="detail-icon-wrap"
                style={{
                  background: `${activeProject.color}15`,
                  border: `1.5px solid ${activeProject.color}30`,
                }}
              >
                <span>{activeProject.icon}</span>
              </div>
              <div className="detail-tags">
                <span
                  className="detail-tag"
                  style={{
                    background: `${activeProject.color}15`,
                    color: activeProject.color,
                    border: `1px solid ${activeProject.color}30`,
                  }}
                >
                  {activeProject.tag}
                </span>
              </div>
              <h3 className="detail-title">{activeProject.title}</h3>
              <p className="detail-subtitle">{activeProject.subtitle}</p>
            </div>

            {/* Right: Features */}
            <div className="ecosystem-detail-features">
              <h4 className="features-heading">Key Features</h4>
              <ul className="features-list">
                {activeProject.features.map((f, i) => (
                  <li key={i} className="feature-item">
                    <div
                      className="feature-check"
                      style={{
                        background: `${activeProject.color}20`,
                        color: activeProject.color,
                      }}
                    >
                      ✓
                    </div>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Glow */}
            <div
              className="detail-glow"
              style={{
                background: `radial-gradient(circle at 80% 50%, ${activeProject.color}10 0%, transparent 60%)`,
              }}
            />
          </div>
        )}

        {/* Flow diagram */}
        <div className="ecosystem-flow">
          <div className="flow-step">
            <div className="flow-icon">👤</div>
            <div className="flow-label">Patient</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">
            <div className="flow-icon">📱</div>
            <div className="flow-label">Mobile App</div>
          </div>
          <div className="flow-arrow">⇄</div>
          <div className="flow-step flow-center-step">
            <div className="flow-icon glow">🗄️</div>
            <div className="flow-label">Unified Record</div>
          </div>
          <div className="flow-arrow">⇄</div>
          <div className="flow-step">
            <div className="flow-icon">🖥️</div>
            <div className="flow-label">Medical Staff</div>
          </div>
          <div className="flow-arrow">←</div>
          <div className="flow-step">
            <div className="flow-icon">⚙️</div>
            <div className="flow-label">Admin</div>
          </div>
        </div>
      </div>
    </section>
  );
}
