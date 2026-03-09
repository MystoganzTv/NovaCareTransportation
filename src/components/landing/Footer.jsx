import React from 'react';
import { Mail, Phone } from 'lucide-react';

const LOGO_URL =
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a85e7b300c60d4ed81dada/c78f8b0cf_ChatGPTImage4mar202611_12_59.png';
const SUPPORT_EMAIL = 'enrique.padron853@gmail.com';
const SUPPORT_PHONE_DISPLAY = '(305) 610-2811';
const SUPPORT_PHONE_LINK = 'tel:3056102811';

export default function Footer() {
  const quickLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Partner With Us', href: '#partner' },
    { label: 'Contact', href: '#contact' },
  ];

  const legal = [
    { label: 'Privacy Policy', href: '/privacy-policy.html' },
    { label: 'Terms of Service', href: '/terms-of-service.html' },
    { label: 'Accessibility', href: '/accessibility.html' },
  ];

  const socialLinks = [
    { icon: Mail, href: `mailto:${SUPPORT_EMAIL}`, label: 'Email' },
    { icon: Phone, href: SUPPORT_PHONE_LINK, label: 'Phone' },
  ];

  return (
    <footer className='bg-gradient-to-br from-[#1E3A8A] to-[#0f172a] text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12'>
          {/* Brand */}
          <div>
            <div className='flex items-center gap-2 mb-4'>
              <img
                src={LOGO_URL}
                alt='Nova Care Transportation Logo'
                className='h-16 sm:h-24 w-auto object-contain brightness-200'
              />
            </div>
            <p className='text-blue-100 text-sm leading-relaxed'>
              Safe, reliable, and professional non-emergency medical
              transportation serving Northern Virginia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-bold mb-4'>Quick Links</h4>
            <ul className='space-y-3'>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className='text-blue-100 hover:text-[#2DD4BF] transition-colors text-sm'>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className='text-lg font-bold mb-4'>Legal</h4>
            <ul className='space-y-3'>
              {legal.map((item, index) => (
                <li key={index}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className='text-blue-100 hover:text-[#2DD4BF] transition-colors text-sm'>
                      {item.label}
                    </a>
                  ) : (
                    <span className='text-blue-100/80 text-sm'>
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className='text-lg font-bold mb-4'>Connect With Us</h4>
            <div className='space-y-3 mb-6'>
              <p className='text-blue-100 text-sm'>
                <span className='font-semibold'>Phone:</span>
                <br />
                {SUPPORT_PHONE_DISPLAY}
              </p>
              <p className='text-blue-100 text-sm'>
                <span className='font-semibold'>Email:</span>
                <br />
                {SUPPORT_EMAIL}
              </p>
            </div>
            <div className='flex gap-3'>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className='w-10 h-10 bg-white/10 hover:bg-[#2DD4BF] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110'>
                    <Icon className='w-5 h-5' strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='pt-8 border-t border-white/10'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-blue-200 text-sm text-center md:text-left'>
              © {new Date().getFullYear()} Nova Care Transportation. All rights
              reserved.
            </p>
            <p className='text-blue-200 text-sm text-center md:text-right'>
              Serving Northern Virginia with care and reliability
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
