import React from 'react';
import './AISection.css';

const aiCapabilities = [
  {
    icon: '🔍',
    title: 'Smart Diagnosis Based on Full History',
    description:
      "The AI analyzes the patient's complete history — past lab results, imaging, medications, and chronic conditions — to deliver accurate and safe diagnostic recommendations.",
  },
  {
    icon: '💊',
    title: 'Safe Dosage Recommendations',
    description:
      "By knowing the patient's age, weight, and current medications, the AI calculates the appropriate dosage and flags any potential drug interactions before prescribing.",
  },
  {
    icon: '📈',
    title: 'Health Trend Analysis',
    description:
      'Monitors changes in lab indicators over time — gradual spikes in blood sugar or blood pressure — and alerts the doctor before a condition becomes chronic.',
  },
  {
    icon: '⚠️',
    title: 'Early Health Risk Alerts',
    description:
      'A smart alert system detects early risk patterns in the data and notifies both the doctor and patient to take preventive action in time.',
  },
];

export default function AISection() {
  return (
    <section className="ai-section" id="ai">
      {/* Background effects */}
      <div className="ai-orb ai-orb-1" />
      <div className="ai-orb ai-orb-2" />

      <div className="ai-container">
        {/* Left Column */}
        <div className="ai-left">
          <div className="section-badge purple">
            <span className="ai-badge-dot" />
            <span>Artificial Intelligence</span>
          </div>
          <h2 className="ai-title">
            AI That Runs on
            <br />
            <span className="ai-title-gradient">Real Data</span>
            <br />
            — Not Guesswork.
          </h2>
          <p className="ai-description">
            The difference between Sijill and any other system: we feed the AI a complete medical
            file — not partial data or assumptions. The result: medical recommendations you can
            actually rely on, not just generic answers with no real value.
          </p>

          {/* AI Feature Chips */}
          <div className="ai-chips">
            {[
              'Lab History',
              'Previous Imaging',
              'Chronic Medications',
              'Patient Age',
              'Past Conditions',
              'Clinical Sessions',
            ].map((chip, i) => (
              <div className="ai-chip" key={i}>
                <span className="chip-dot" />
                {chip}
              </div>
            ))}
          </div>

          <div className="ai-arrow-badge">
            <span>↓</span>
            <span>Accurate & Reliable Medical Recommendations</span>
            <span className="ai-result-badge">✓ Real AI</span>
          </div>
        </div>

        {/* Right Column — Capabilities */}
        <div className="ai-right">
          {aiCapabilities.map((cap, i) => (
            <div className="ai-capability-card" key={i}>
              <div className="ai-cap-icon">{cap.icon}</div>
              <div className="ai-cap-body">
                <h4 className="ai-cap-title">{cap.title}</h4>
                <p className="ai-cap-desc">{cap.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
