import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

function FaqItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onMouseLeave={() => setIsOpen(false)}
      className='border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300'>
      <button
        type='button'
        onClick={() => setIsOpen(prev => !prev)}
        className='w-full flex items-center justify-between px-6 py-5 text-left'>
        <span className='text-base font-semibold text-[#1E3A8A] pr-4'>
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className='flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#2DD4BF] to-[#14B8A6] rounded-full flex items-center justify-center'>
          <ChevronDown className='w-4 h-4 text-white' />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}>
            <div className='px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4'>
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  const { language } = useLanguage();

  const copy =
    language === 'es'
      ? {
          title: 'Preguntas Frecuentes',
          subtitle:
            'Todo lo que necesitas saber sobre nuestros servicios de transporte.',
          faqs: [
            {
              q: 'Que es el transporte medico no de emergencia (NEMT)?',
              a: 'Es transporte para personas que necesitan ir y volver de citas medicas sin requerir servicios de emergencia. Incluye consultas, dialisis, terapias y chequeos de rutina.',
            },
            {
              q: 'Que areas atienden?',
              a: 'Atendemos el Norte de Virginia, incluyendo Herndon, Reston, Fairfax, Ashburn, Sterling y comunidades cercanas.',
            },
            {
              q: 'Con cuanta anticipacion debo programar un viaje?',
              a: 'Recomendamos reservar con 24 a 48 horas de anticipacion. Igual intentamos acomodar solicitudes del mismo dia cuando hay disponibilidad.',
            },
            {
              q: 'Sus vehiculos son accesibles para sillas de ruedas?',
              a: 'Si. Contamos con vehiculos accesibles para silla de ruedas con rampa y sistemas de sujecion para mayor seguridad.',
            },
            {
              q: 'Como garantizan la seguridad y profesionalismo de los conductores?',
              a: 'Nuestros conductores pasan verificaciones de antecedentes, tienen licencias validas y capacitacion en asistencia a pacientes.',
            },
            {
              q: 'Trabajan con clinicas y centros medicos?',
              a: 'Si. Ofrecemos soluciones por rutas para clinicas y centros de salud, ayudando a reducir ausencias y mejorar asistencia.',
            },
            {
              q: 'Cuanto cuesta un viaje?',
              a: 'El precio depende de distancia, tipo de vehiculo y necesidades del servicio. Contactanos para una cotizacion personalizada.',
            },
            {
              q: 'Que metodos de pago aceptan?',
              a: 'Aceptamos principales tarjetas de credito y debito, y acuerdos de facturacion directa para organizaciones medicas.',
            },
          ],
        }
      : {
          title: 'Frequently Asked Questions',
          subtitle:
            'Everything you need to know about our transportation services.',
          faqs: [
            {
              q: 'What is non-emergency medical transportation (NEMT)?',
              a: 'NEMT is transportation for people who need to travel to and from medical appointments without requiring emergency services. This includes doctor visits, dialysis, therapy sessions, and routine check-ups.',
            },
            {
              q: 'What areas do you serve?',
              a: 'We serve Northern Virginia, including Herndon, Reston, Fairfax, Ashburn, Sterling, and surrounding communities.',
            },
            {
              q: 'How far in advance should I schedule a ride?',
              a: 'We recommend booking 24 to 48 hours in advance to ensure availability. We still do our best to accommodate same-day requests when possible.',
            },
            {
              q: 'Are your vehicles wheelchair accessible?',
              a: 'Yes. Our fleet includes wheelchair-accessible vehicles equipped with ramps and securement systems.',
            },
            {
              q: 'How do you ensure driver safety and professionalism?',
              a: 'Our drivers go through background checks, hold valid licenses, and receive training focused on safe patient assistance.',
            },
            {
              q: 'Do you work with healthcare facilities and clinics?',
              a: 'Yes. We provide structured route-based transportation for clinics and care centers to reduce no-shows and improve attendance.',
            },
            {
              q: 'How much does a ride cost?',
              a: 'Pricing depends on distance, vehicle type, and service requirements. Contact us for a personalized quote.',
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept major credit and debit cards, plus direct billing arrangements for healthcare organizations.',
            },
          ],
        };

  return (
    <section
      id='faq'
      className='scroll-mt-24 py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-14'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-5'>
            {copy.title}
          </h2>
          <p className='text-base sm:text-lg text-gray-600 max-w-2xl mx-auto'>
            {copy.subtitle}
          </p>
        </motion.div>

        <div className='space-y-4'>
          {copy.faqs.map((faq, index) => (
            <FaqItem key={`${language}-${index}`} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
