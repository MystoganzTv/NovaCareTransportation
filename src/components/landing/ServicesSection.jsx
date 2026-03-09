import React from 'react';
import { motion } from 'framer-motion';
import { Ambulance, Users, Calendar } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ServicesSection() {
  const { language } = useLanguage();
  const copy =
    language === 'es'
      ? {
          title: 'Nuestros Servicios',
          subtitle:
            'Soluciones integrales de transporte adaptadas a necesidades de salud',
          services: [
            {
              icon: Ambulance,
              title: 'Transporte Medico No Emergente',
              description:
                'Servicio confiable puerta a puerta para citas medicas, dialisis, terapias y chequeos de rutina.',
              gradient: 'from-[#1E3A8A] to-[#1e3a8ad9]',
            },
            {
              icon: Users,
              title: 'Transporte para Adultos Mayores',
              description:
                'Transporte compasivo y seguro para pacientes mayores con asistencia especializada.',
              gradient: 'from-[#2DD4BF] to-[#14B8A6]',
            },
            {
              icon: Calendar,
              title: 'Rutas Programadas para Clinicas',
              description:
                'Rutas estructuradas para centros ambulatorios que aseguran un servicio consistente y predecible.',
              gradient: 'from-[#0f172a] to-[#1E3A8A]',
            },
          ],
        }
      : {
          title: 'Our Services',
          subtitle:
            'Comprehensive transportation solutions tailored to healthcare needs',
          services: [
            {
              icon: Ambulance,
              title: 'Non-Emergency Medical Transportation',
              description:
                'Reliable door-to-door service for medical appointments, dialysis, therapy sessions, and routine check-ups.',
              gradient: 'from-[#1E3A8A] to-[#1e3a8ad9]',
            },
            {
              icon: Users,
              title: 'Senior Transportation Services',
              description:
                'Compassionate and safe transportation for elderly patients with specialized care and assistance.',
              gradient: 'from-[#2DD4BF] to-[#14B8A6]',
            },
            {
              icon: Calendar,
              title: 'Scheduled Route-Based Clinic Transport',
              description:
                'Structured transportation routes for outpatient facilities to ensure consistent, predictable service.',
              gradient: 'from-[#0f172a] to-[#1E3A8A]',
            },
          ],
        };

  const services = [
    ...copy.services,
  ];

  return (
    <section id='services' className='scroll-mt-24 py-20 md:py-28 bg-white'>
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

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className='group relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden'>
                {/* Hover Effect Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <div className='relative z-10'>
                  {/* Icon */}
                  <div className='mb-6'>
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <Icon className='w-8 h-8 text-white' strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className='text-xl md:text-2xl font-bold mb-4 text-[#1E3A8A] group-hover:text-white transition-colors duration-500'>
                    {service.title}
                  </h3>
                  <p className='text-gray-600 leading-relaxed group-hover:text-white/90 transition-colors duration-500'>
                    {service.description}
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
