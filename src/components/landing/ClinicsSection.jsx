import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Building2, TrendingDown, CalendarCheck, Users } from 'lucide-react';

export default function ClinicsSection() {
  const handleScheduleMeeting = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    window.setTimeout(() => {
      const firstField = document.getElementById('contact-name');
      firstField?.focus();
    }, 450);
  };

  const benefits = [
    { icon: TrendingDown, text: 'Reduce Patient No-Shows' },
    { icon: CalendarCheck, text: 'Improve Appointment Attendance' },
    { icon: Users, text: 'Enhance Patient Satisfaction' },
    { icon: Building2, text: 'Streamline Operations' },
  ];

  return (
    <section
      id='partner'
      className='scroll-mt-24 py-20 md:py-28 bg-gradient-to-br from-[#1E3A8A] to-[#0f172a] text-white relative overflow-hidden'>
      {/* Background Decoration */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-10 left-10 w-96 h-96 bg-[#2DD4BF] rounded-full blur-3xl'></div>
        <div className='absolute bottom-10 right-10 w-80 h-80 bg-[#2DD4BF] rounded-full blur-3xl'></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 relative z-10'>
        <div className='grid lg:grid-cols-2 gap-10 md:gap-12 items-center'>
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}>
            <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-6'>
              Partner With Us
            </h2>

            <p className='text-base sm:text-lg md:text-xl text-blue-100 mb-8 leading-relaxed'>
              Help your patients get to their appointments on time with our
              structured, reliable transportation solutions. We work directly
              with healthcare facilities to create scheduled routes that reduce
              no-shows, improve patient outcomes, and streamline clinic
              operations.
            </p>

            <p className='text-base sm:text-lg text-blue-100 mb-8 leading-relaxed'>
              Our route-based approach ensures consistent service, predictable
              scheduling, and better coordination between your facility and
              patient transportation needs.
            </p>

            <Button
              size='lg'
              onClick={handleScheduleMeeting}
              className='w-full sm:w-auto bg-white hover:bg-gray-100 text-[#1E3A8A] font-bold px-8 py-5 sm:py-6 text-base sm:text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105'>
              <CalendarCheck className='w-5 h-5 mr-2' />
              Schedule a Meeting
            </Button>
          </motion.div>

          {/* Right Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className='bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300'>
                  <div className='w-12 h-12 bg-[#2DD4BF] rounded-xl flex items-center justify-center mb-4'>
                    <Icon className='w-6 h-6 text-[#1E3A8A]' strokeWidth={2} />
                  </div>
                  <p className='font-semibold text-white'>{benefit.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
