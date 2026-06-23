import React from 'react';

export default function FeatureCard({ icon, title, description, delayClass }) {
  return (
    <div className={`col-lg-4 col-md-6 animate-fade-in-up ${delayClass}`}>
      <div className="feature-card h-100 position-relative">
        {/* Accent bar that appears on hover */}
        <div className="hover-accent-bar"></div>
        
        {/* Icon wrapper with scale & rotate effects */}
        <div className="feature-icon">{icon}</div>
        
        <h5 className="fw-bold mt-4 mb-2">{title}</h5>
        <p className="description-text">{description}</p>
      </div>
    </div>
  );
}
