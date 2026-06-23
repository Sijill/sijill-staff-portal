import React from 'react';
import Navbar from '../Components/landing/Navbar';
import HeroSection from '../Components/landing/HeroSection';
import ProblemSection from '../Components/landing/ProblemSection';
import SolutionSection from '../Components/landing/SolutionSection';
import EcosystemSection from '../Components/landing/EcosystemSection';
import AISection from '../Components/landing/AISection';
import SecuritySection from '../Components/landing/SecuritySection';
import CTASection from '../Components/landing/CTASection';
import LandingFooter from '../Components/landing/LandingFooter';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <EcosystemSection />
      <AISection />
      <SecuritySection />
      <CTASection />
      <LandingFooter />
    </>
  );
}
