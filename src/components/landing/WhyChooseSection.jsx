import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Users, Car, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function WhyChooseSection() {
  const { language } = useLanguage();
  const copy =
    language === 'es'
      ? {
          title: 'Por Que Elegirnos',
          subtitle: 'Excelencia en cada viaje, cuidado en cada detalle',
          reasons: [
            {
              icon: Clock,
              title: 'Garantia de Puntualidad',
              description:
                'Entendemos la importancia de las citas medicas y garantizamos puntualidad en cada servicio.',
            },
            {
              icon: Users,
              title: 'Conductores Profesionales y Corteses',
              description:
                'Nuestros conductores capacitados brindan asistencia compasiva durante todo el trayecto.',
            },
            {
              icon: Car,
              title: 'Vehiculos Limpios y Comodos',
              description:
                'Flota moderna con acceso para silla de ruedas y control de clima para mayor comodidad.',
            },
            {
              icon: CheckCircle2,
              title: 'Rutas Programadas para Clinicas',
              description:
                'Rutas estructuradas para reducir ausencias y mejorar la asistencia de pacientes.',
            },
            {
              icon: MapPin,
              title: 'Servicio en el Norte de Virginia',
              description:
                'Cobertura en Herndon, Reston, Fairfax, Ashburn y zonas cercanas.',
            },
          ],
        }
      : {
          title: 'Why Choose Us',
          subtitle: 'Excellence in every ride, care in every detail',
          reasons: [
            {
              icon: Clock,
              title: 'On-Time Guarantee',
              description:
                'We understand the importance of medical appointments and ensure punctual service every time.',
            },
            {
              icon: Users,
              title: 'Professional & Courteous Drivers',
              description:
                'Our trained and certified drivers provide compassionate care and assistance throughout your journey.',
            },
            {
              icon: Car,
              title: 'Clean & Comfortable Vehicles',
              description:
                'Modern, well-maintained fleet with wheelchair accessibility and climate control for your comfort.',
            },
            {
              icon: CheckCircle2,
              title: 'Scheduled Routes for Clinics',
              description:
                'Structured transportation routes designed to reduce no-shows and improve patient attendance.',
            },
            {
              icon: MapPin,
              title: 'Serving Northern Virginia',
              description:
                'Comprehensive coverage across Herndon, Reston, Fairfax, Ashburn, and surrounding areas.',
            },
          ],
        };

  const reasons = [
    ...copy.reasons,
  ];

  return (
    <section
      id='why'
      className='scroll-mt-24 py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-6'>
            {copy.title}
          </h2>
          <p className='text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto'>
            {copy.subtitle}
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className='flex gap-4 p-5 md:p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
                <div className='flex-shrink-0'>
                  <div className='w-12 h-12 bg-gradient-to-br from-[#2DD4BF] to-[#14B8A6] rounded-xl flex items-center justify-center'>
                    <Icon className='w-6 h-6 text-white' strokeWidth={2} />
                  </div>
                </div>
                <div>
                  <h3 className='text-lg font-bold text-[#1E3A8A] mb-2'>
                    {reason.title}
                  </h3>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
