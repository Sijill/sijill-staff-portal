import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

export default function HeroSection() {
  const particlesRef = useRef(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'hero-particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        animation-delay: ${Math.random() * 8}s;
        animation-duration: ${Math.random() * 10 + 8}s;
        opacity: ${Math.random() * 0.5 + 0.2};
      `;
      container.appendChild(p);
    }
  }, []);

  return (
    <section className="hero-section" id="hero">
      {/* Background particles */}
      <div className="hero-particles" ref={particlesRef} />

      {/* Gradient Orbs */}
      <div className="hero-orb orb-1" />
      <div className="hero-orb orb-2" />
      <div className="hero-orb orb-3" />

      {/* Grid lines */}
      <div className="hero-grid" />

      <div className="hero-container">
        {/* Badge */}
        <div className="hero-badge animate-fade-in-up">
          <span className="badge-dot" />
          <span>National Enterprise Platform · Unified Medical Record System</span>
        </div>

        {/* Logo */}
        <div className="hero-logo-wrap animate-scale-in">
          <div className="hero-logo-bg">
            <img src="/src/assets/logo_light-removebg.png" alt="Sijill Logo" className="hero-logo-img" />
          </div>
          <div className="hero-logo-glow" />
        </div>

        {/* Main Headline */}
        <h1 className="hero-headline animate-fade-in-up delay-1">
          <span className="hero-headline-gradient">One Secure Record.</span>
          <br />
          <span className="hero-headline-gradient">One Trusted System.</span>
          <br />
          <span className="hero-headline-secondary">Lifetime Healthcare Continuity.</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle animate-fade-in-up delay-2">
          Sijill is a unified Electronic Health Record (EHR) platform that connects patients,
          clinic doctors, laboratories, and imaging centers in one integrated system —
          powered by real AI built on comprehensive, accurate medical data.
        </p>

        {/* Stats Row */}
        <div className="hero-stats animate-fade-in-up delay-3">
          <div className="hero-stat">
            <span className="stat-number">3</span>
            <span className="stat-label">Integrated Apps</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="stat-number">360°</span>
            <span className="stat-label">Complete Health Profile</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="stat-number">AI</span>
            <span className="stat-label">Smart Diagnosis</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="hero-cta animate-fade-in-up delay-4">
          <Link to="/login" className="hero-btn-primary">
            <span className="btn-shine" />
            <i className="bi bi-box-arrow-in-right me-2" />
            Medical Staff Login
          </Link>
          <a
            href="#solution"
            className="hero-btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore the Project
            <i className="bi bi-arrow-down ms-2" />
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll-hint animate-fade-in-up delay-5">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll Down</span>
        </div>
      </div>
    </section>
  );
}
