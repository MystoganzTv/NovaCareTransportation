import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe, Menu, X, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const LOGO_URL =
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a85e7b300c60d4ed81dada/c78f8b0cf_ChatGPTImage4mar202611_12_59.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isRequestRidePage =
    location.pathname === '/request-ride' || location.pathname === '/BookRide';

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

  const copy =
    language === 'es'
      ? {
          navLinks: [
            { label: 'Nosotros', href: '#about' },
            { label: 'Servicios', href: '#services' },
            { label: 'Por Que Elegirnos', href: '#why' },
            { label: 'Para Clinicas', href: '#partner' },
            { label: 'Contacto', href: '#contact' },
          ],
          requestRide: 'Solicitar Viaje',
          toggleMenu: 'Abrir menu',
        }
      : {
          navLinks: [
            { label: 'About', href: '#about' },
            { label: 'Services', href: '#services' },
            { label: 'Why Us', href: '#why' },
            { label: 'For Clinics', href: '#partner' },
            { label: 'Contact', href: '#contact' },
          ],
          requestRide: 'Request Ride',
          toggleMenu: 'Toggle navigation menu',
        };
  const navLinks = copy.navLinks;
  const languageLabel = language === 'es' ? 'ES' : 'US';
  const handleLanguageToggle = () =>
    setLanguage(prev => (prev === 'es' ? 'en' : 'es'));
  const handleRequestRide = () => {
    setIsMobileOpen(false);

    if (isRequestRidePage) {
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });

      window.setTimeout(() => {
        const firstField = document.getElementById('contact-name');
        firstField?.focus();
      }, 450);
      return;
    }

    navigate('/BookRide');
  };

  const resolveSectionHref = sectionHref =>
    location.pathname === '/' ? sectionHref : `/${sectionHref}`;

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
          <Link
            to='/'
            className='flex-shrink-0'
            onClick={() => setIsMobileOpen(false)}>
            <img
              src={LOGO_URL}
              alt='Nova Care Transportation Logo'
              className={`h-14 sm:h-20 w-auto object-contain transition-all duration-300 ${
                isScrolled ? '' : 'brightness-0 invert'
              }`}
            />
          </Link>

          {/* Desktop Nav */}
          <div className='hidden md:flex items-center gap-10'>
            {navLinks.map(link => (
              <a
                key={link.label}
                href={resolveSectionHref(link.href)}
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

            <button
              type='button'
              onClick={handleLanguageToggle}
              aria-label='Switch language'
              className={`inline-flex items-center justify-center min-w-12 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                isScrolled
                  ? 'border-slate-300 text-[#1E3A8A] hover:bg-slate-100'
                  : 'border-white/35 text-white bg-white/10 hover:bg-white/20'
              }`}>
              <Globe className='w-3.5 h-3.5 mr-1.5' />
              {languageLabel}
            </button>

            <Button
              size='sm'
              onClick={handleRequestRide}
              className='bg-[#2DD4BF] hover:bg-[#14B8A6] text-[#1E3A8A] font-semibold rounded-lg px-5'>
              {copy.requestRide}
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            aria-label={copy.toggleMenu}
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
            <div className='px-4 pb-2'>
              <button
                type='button'
                onClick={handleLanguageToggle}
                aria-label='Switch language'
                className='inline-flex items-center justify-center min-w-12 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-[#1E3A8A] hover:bg-slate-100 transition-colors'>
                <Globe className='w-3.5 h-3.5 mr-1.5' />
                {languageLabel}
              </button>
            </div>
            {navLinks.map(link => (
              <a
                key={link.label}
                href={resolveSectionHref(link.href)}
                className='block px-4 py-2 text-gray-700 hover:text-[#1E3A8A] font-medium'
                onClick={() => setIsMobileOpen(false)}>
                {link.label}
              </a>
            ))}
            <div className='px-4 pt-3 border-t border-gray-100'>
              <Button
                onClick={handleRequestRide}
                className='w-full bg-[#2DD4BF] hover:bg-[#14B8A6] text-[#1E3A8A] font-semibold rounded-lg'>
                {copy.requestRide}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
