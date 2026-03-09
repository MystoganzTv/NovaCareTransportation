import React from 'react';
import { Mail, Phone, Instagram } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const LOGO_URL =
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a85e7b300c60d4ed81dada/c78f8b0cf_ChatGPTImage4mar202611_12_59.png';
const SUPPORT_EMAIL = 'enrique.padron853@gmail.com';
const SUPPORT_PHONE_DISPLAY = '(305) 610-2811';
const SUPPORT_PHONE_LINK = 'tel:3056102811';

export default function Footer() {
  const { language } = useLanguage();
  const copy =
    language === 'es'
      ? {
          quickLinksTitle: 'Enlaces Rapidos',
          legalTitle: 'Legal',
          connectTitle: 'Conecta con Nosotros',
          aboutUs: 'Nosotros',
          services: 'Servicios',
          partner: 'Para Clinicas',
          contact: 'Contacto',
          faq: 'FAQ',
          admin: 'Panel Admin',
          privacy: 'Politica de Privacidad',
          terms: 'Terminos de Servicio',
          accessibility: 'Accesibilidad',
          phoneLabel: 'Telefono:',
          emailLabel: 'Correo:',
          brandText:
            'Transporte medico no emergente, seguro, confiable y profesional en el Norte de Virginia.',
          rights: 'Todos los derechos reservados.',
          serving: 'Sirviendo al Norte de Virginia con cuidado y confiabilidad',
          emailSocial: 'Correo',
          phoneSocial: 'Telefono',
          instagramSocial: 'Instagram (Pronto)',
        }
      : {
          quickLinksTitle: 'Quick Links',
          legalTitle: 'Legal',
          connectTitle: 'Connect With Us',
          aboutUs: 'About Us',
          services: 'Services',
          partner: 'Partner With Us',
          contact: 'Contact',
          faq: 'FAQ',
          admin: 'Admin Dashboard',
          privacy: 'Privacy Policy',
          terms: 'Terms of Service',
          accessibility: 'Accessibility',
          phoneLabel: 'Phone:',
          emailLabel: 'Email:',
          brandText:
            'Safe, reliable, and professional non-emergency medical transportation serving Northern Virginia.',
          rights: 'All rights reserved.',
          serving: 'Serving Northern Virginia with care and reliability',
          emailSocial: 'Email',
          phoneSocial: 'Phone',
          instagramSocial: 'Instagram (Coming Soon)',
        };

  const quickLinks = [
    { label: copy.aboutUs, href: '#about' },
    { label: copy.services, href: '#services' },
    { label: copy.partner, href: '#partner' },
    { label: copy.faq, href: '#faq' },
    { label: copy.contact, href: '#contact' },
    { label: copy.admin, href: '/admin' },
  ];

  const legal = [
    { label: copy.privacy, href: '/privacy-policy.html' },
    { label: copy.terms, href: '/terms-of-service.html' },
    { label: copy.accessibility, href: '/accessibility.html' },
  ];

  const socialLinks = [
    { icon: Mail, href: `mailto:${SUPPORT_EMAIL}`, label: copy.emailSocial },
    { icon: Phone, href: SUPPORT_PHONE_LINK, label: copy.phoneSocial },
    { icon: Instagram, href: null, label: copy.instagramSocial },
  ];

  return (
    <footer className='bg-gradient-to-br from-[#1E3A8A] to-[#0f172a] text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12'>
          {/* Brand */}
          <div>
            <img
              src={LOGO_URL}
              alt='Nova Care Transportation Logo'
              className='h-24 w-auto object-contain brightness-200 mb-4'
            />
            <p className='text-blue-100 text-sm leading-relaxed max-w-xs'>
              {copy.brandText}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-bold mb-4'>{copy.quickLinksTitle}</h4>
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
            <h4 className='text-lg font-bold mb-4'>{copy.legalTitle}</h4>
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
            <h4 className='text-lg font-bold mb-4'>{copy.connectTitle}</h4>
            <div className='space-y-3 mb-6'>
              <p className='text-blue-100 text-sm'>
                <span className='font-semibold'>{copy.phoneLabel}</span>
                <br />
                {SUPPORT_PHONE_DISPLAY}
              </p>
              <p className='text-blue-100 text-sm'>
                <span className='font-semibold'>{copy.emailLabel}</span>
                <br />
                {SUPPORT_EMAIL}
              </p>
            </div>
            <div className='flex gap-3'>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                if (!social.href) {
                  return (
                    <span
                      key={index}
                      aria-label={social.label}
                      title={social.label}
                      className='w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center opacity-70 cursor-default'>
                      <Icon className='w-5 h-5' strokeWidth={1.5} />
                    </span>
                  );
                }

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
              © {new Date().getFullYear()} Nova Care Transportation. {copy.rights}
            </p>
            <p className='text-blue-200 text-sm text-center md:text-right'>
              {copy.serving}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
