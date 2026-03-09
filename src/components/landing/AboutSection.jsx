import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutSection() {
  const { language } = useLanguage();
  const copy =
    language === 'es'
      ? {
          title: 'Sobre Nova Care Transportation',
          paragraph:
            'Nova Care Transportation brinda servicios de transporte medico no emergente, estructurados y confiables para adultos mayores, pacientes de terapia y centros ambulatorios. Nuestra mision es reducir citas perdidas garantizando seguridad, comodidad y puntualidad.',
          stats: [
            { icon: Shield, label: 'Anios de Servicio', value: '1+' },
            { icon: Clock, label: 'Tasa de Puntualidad', value: '99%' },
            { icon: Heart, label: 'Pacientes Satisfechos', value: '5,000+' },
          ],
        }
      : {
          title: 'About Nova Care Transportation',
          paragraph:
            'Nova Care Transportation provides structured, dependable non-emergency medical transportation services for seniors, therapy patients, and outpatient facilities. Our mission is to reduce missed appointments while ensuring safety, comfort, and punctuality.',
          stats: [
            { icon: Shield, label: 'Years of Service', value: '1+' },
            { icon: Clock, label: 'On-Time Rate', value: '99%' },
            { icon: Heart, label: 'Happy Patients', value: '5,000+' },
          ],
        };

  const stats = [
    ...copy.stats,
  ];

  return (
    <section
      id='about'
      className='scroll-mt-24 py-20 md:py-28 bg-gradient-to-b from-white to-gray-50'>
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

          <div className='max-w-3xl mx-auto'>
            <p className='text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed'>
              {copy.paragraph}
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-14 md:mt-16'>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className='bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300'>
                <div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#2DD4BF] to-[#14B8A6] rounded-xl flex items-center justify-center'>
                  <Icon className='w-8 h-8 text-white' strokeWidth={1.5} />
                </div>
                <p className='text-4xl font-bold text-[#1E3A8A] mb-2'>
                  {stat.value}
                </p>
                <p className='text-gray-600 font-medium'>{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
