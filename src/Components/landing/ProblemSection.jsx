import React from 'react';
import './ProblemSection.css';

const problems = [
  {
    icon: '🏥',
    title: 'The Clinic',
    description: "The doctor writes notes and prescriptions in the clinic's own system — invisible to anyone else.",
    color: '#ef4444',
  },
  {
    icon: '🔬',
    title: 'The Laboratory',
    description: 'Lab results are stored only in the lab system — the doctor never receives them automatically.',
    color: '#f97316',
  },
  {
    icon: '📡',
    title: 'The Imaging Center',
    description: 'Radiology and scan reports are isolated in the imaging center and never reach other parties.',
    color: '#eab308',
  },
  {
    icon: '💊',
    title: 'Chronic Medications',
    description: "A new doctor is unaware of the patient's ongoing medications, risking dangerous drug interactions.",
    color: '#8b5cf6',
  },
  {
    icon: '🎂',
    title: 'Age & Medical History',
    description: "A patient's age and medical background directly affect diagnosis and dosage — yet they're often unknown.",
    color: '#ec4899',
  },
  {
    icon: '🤖',
    title: 'AI Works Blindly',
    description: 'Any AI without real, comprehensive data produces generic, inaccurate recommendations that endanger patients.',
    color: '#06b6d4',
  },
];

export default function ProblemSection() {
  return (
    <section className="problem-section" id="problem">
      <div className="problem-container">
        {/* Header */}
        <div className="problem-header">
          <div className="section-badge danger">
            <span className="badge-dot-red" />
            <span>The Current Problem</span>
          </div>
          <h2 className="problem-title">
            One Patient's Data
            <br />
            <span className="problem-title-highlight">Scattered Across Multiple Places</span>
          </h2>
          <p className="problem-subtitle">
            In the current system, a patient's medical file is fragmented — each provider holds
            only a small piece of the full picture. The result: incomplete diagnoses, drug conflicts,
            and medical decisions built on missing information.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="problem-grid">
          {problems.map((p, i) => (
            <div className="problem-card" key={i} style={{ '--card-accent': p.color }}>
              <div
                className="problem-card-icon"
                style={{ background: `${p.color}15`, border: `1.5px solid ${p.color}40` }}
              >
                <span>{p.icon}</span>
              </div>
              <div className="problem-card-body">
                <h3 className="problem-card-title" style={{ color: p.color }}>
                  {p.title}
                </h3>
                <p className="problem-card-desc">{p.description}</p>
              </div>
              <div
                className="problem-card-glow"
                style={{
                  background: `radial-gradient(circle, ${p.color}15 0%, transparent 70%)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Impact Box */}
        <div className="problem-impact">
          <div className="impact-icon">⚠️</div>
          <div className="impact-text">
            <h4>The Result: Inaccurate Medical Decisions</h4>
            <p>
              Without a complete view of the patient's medical history — tests, imaging, chronic
              medications, and past conditions — even the most skilled physicians may make decisions
              that lack precision and safety.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
