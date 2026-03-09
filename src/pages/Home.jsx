import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import AboutSection from '../components/landing/AboutSection';
import ServicesSection from '../components/landing/ServicesSection';
import WhyChooseSection from '../components/landing/WhyChooseSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import ClinicsSection from '../components/landing/ClinicsSection';
import FaqSection from '../components/landing/FaqSection';
import ContactSection from '../components/landing/ContactSection';
import Footer from '../components/landing/Footer';

function SectionDivider() {
  return (
    <div
      aria-hidden='true'
      className='mx-auto w-[min(92%,72rem)] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent'
    />
  );
}

export default function Home() {
  return (
    <div className='min-h-screen bg-white'>
      <Navbar />
      <HeroSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <ServicesSection />
      <SectionDivider />
      <WhyChooseSection />
      <SectionDivider />
      <ClinicsSection />
      <SectionDivider />
      <TestimonialsSection />
      <SectionDivider />
      <FaqSection />
      <SectionDivider />
      <ContactSection />
      <Footer />
    </div>
  );
}
