import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { label: 'The Problem', href: '#problem' },
  { label: 'Our Solution', href: '#solution' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'AI Insights', href: '#ai' },
  { label: 'Security', href: '#security' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`sijill-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-brand-link">
          <div className="navbar-logo-box">
            <img src="/src/assets/logo_light-removebg.png" alt="Sijill" className="navbar-logo-img" />
          </div>
          <span className="navbar-brand-name">Sijill</span>
        </Link>

        {/* Desktop Links */}
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div className="navbar-cta">
          <Link to="/login" className="navbar-btn-login">Login</Link>
          <Link to="/registerType" className="navbar-btn-register">Join Now</Link>
        </div>

        {/* Hamburger */}
        <button
          className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="navbar-mobile-link"
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <div className="navbar-mobile-cta">
          <Link to="/login" className="navbar-btn-login w-100 text-center">Login</Link>
          <Link to="/registerType" className="navbar-btn-register w-100 text-center">Join Now</Link>
        </div>
      </div>
    </nav>
  );
}
