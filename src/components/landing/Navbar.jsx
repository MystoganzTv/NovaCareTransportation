import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';

const LOGO_URL =
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a85e7b300c60d4ed81dada/c78f8b0cf_ChatGPTImage4mar202611_12_59.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why' },
    { label: 'For Clinics', href: '#partner' },
    { label: 'Contact', href: '#contact' },
  ];
  const handleRequestRide = () => {
    setIsMobileOpen(false);

    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    window.setTimeout(() => {
      const firstField = document.getElementById('contact-name');
      firstField?.focus();
    }, 450);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg border-b border-gray-100'
          : 'bg-transparent backdrop-blur-[1px]'
      }`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='flex items-center justify-between h-16 sm:h-20'>
          {/* Logo */}
          <a href='#' className='flex-shrink-0'>
            <img
              src={LOGO_URL}
              alt='Nova Care Transportation Logo'
              className={`h-14 sm:h-20 w-auto object-contain transition-all duration-300 ${
                isScrolled ? '' : 'brightness-0 invert'
              }`}
            />
          </a>

          {/* Desktop Nav */}
          <div className='hidden md:flex items-center gap-10'>
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className={`text-lg font-medium transition-colors ${
                  isScrolled
                    ? 'text-gray-700 hover:text-[#1E3A8A]'
                    : 'text-white/90 hover:text-white'
                }`}>
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className='hidden md:flex items-center gap-3'>
            <a
              href='tel:3056102811'
              className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                isScrolled ? 'text-[#1E3A8A]' : 'text-white'
              }`}>
              <Phone className='w-4 h-4' />
              (305) 610-2811
            </a>
            <Button
              size='sm'
              onClick={handleRequestRide}
              className='bg-[#2DD4BF] hover:bg-[#14B8A6] text-[#1E3A8A] font-semibold rounded-lg px-5'>
              Request Ride
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            aria-label='Toggle navigation menu'
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}>
            {isMobileOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <Menu className='w-6 h-6' />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className='md:hidden bg-white border-t border-gray-100 py-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto'>
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className='block px-4 py-2 text-gray-700 hover:text-[#1E3A8A] font-medium'
                onClick={() => setIsMobileOpen(false)}>
                {link.label}
              </a>
            ))}
            <div className='px-4 pt-3 border-t border-gray-100'>
              <Button
                onClick={handleRequestRide}
                className='w-full bg-[#2DD4BF] hover:bg-[#14B8A6] text-[#1E3A8A] font-semibold rounded-lg'>
                Request Ride
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
