import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Maria R.',
      role: 'Daughter of Patient',
      quote:
        'Nova Care has been a blessing for my mom. They are always on time, patient, and very respectful.',
    },
    {
      name: 'James T.',
      role: 'Outpatient Client',
      quote:
        'I use their rides for therapy appointments every week. Reliable service and excellent communication.',
    },
    {
      name: 'Valley Family Clinic',
      role: 'Partner Clinic',
      quote:
        'Their route-based transportation helped reduce missed appointments and improved patient attendance.',
    },
    {
      name: 'Carlos M.',
      role: 'Patient Family Member',
      quote:
        'Their team is kind and dependable. Every ride has been safe, smooth, and on schedule.',
    },
    {
      name: 'Angela P.',
      role: 'Regular Rider',
      quote:
        'Booking is easy and communication is clear. I always know my ride details ahead of time.',
    },
    {
      name: 'Northwood Medical Office',
      role: 'Clinic Coordinator',
      quote:
        'Nova Care improved attendance for our patients and made transportation coordination much easier.',
    },
    {
      name: 'Elena G.',
      role: 'Family Caregiver',
      quote:
        'Their drivers are very patient with my father and always help him get in and out safely.',
    },
    {
      name: 'Robert L.',
      role: 'Dialysis Client',
      quote:
        'Consistent service every week. They arrive on time and keep me informed if traffic causes any delay.',
    },
    {
      name: 'Oak Ridge Clinic',
      role: 'Front Desk Team',
      quote:
        'Since partnering with Nova Care, our no-show rate has dropped and scheduling is much smoother.',
    },
    {
      name: 'Patricia S.',
      role: 'Senior Client',
      quote:
        'I feel respected and comfortable on every trip. The drivers are friendly and professional.',
    },
    {
      name: 'Daniel K.',
      role: 'Patient Family Member',
      quote:
        'Excellent communication and dependable pickup times. We trust them for all appointment rides.',
    },
    {
      name: 'Lakeview Rehab Center',
      role: 'Care Coordinator',
      quote:
        'Great partner for route-based transportation. Their team is organized and easy to work with.',
    },
  ];
  const pageSize = 3;
  const testimonialPages = useMemo(() => {
    const pages = [];
    for (let i = 0; i < testimonials.length; i += pageSize) {
      pages.push(testimonials.slice(i, i + pageSize));
    }
    return pages;
  }, [testimonials]);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActivePage(prev => (prev + 1) % testimonialPages.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [testimonialPages.length]);

  return (
    <section
      id='testimonials'
      className='scroll-mt-24 py-20 md:py-28 bg-gradient-to-b from-white to-slate-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-14 md:mb-16'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-6'>
            Testimonials
          </h2>
          <p className='text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto'>
            What families and partners say about working with Nova Care
          </p>
        </motion.div>

        <div className='relative min-h-[26rem] md:min-h-[22rem]'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={activePage}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.45 }}
              className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
              {testimonialPages[activePage].map(item => (
                <article
                  key={item.name}
                  className='relative bg-white border border-gray-100 rounded-3xl p-6 md:p-7 shadow-lg hover:shadow-xl transition-shadow'>
                  <div className='flex items-center justify-between mb-5'>
                    <Quote className='w-7 h-7 text-[#2DD4BF]' strokeWidth={1.7} />
                    <div className='flex gap-1 text-[#f59e0b]'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className='w-4 h-4 fill-current'
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                  </div>

                  <p className='text-gray-700 leading-relaxed mb-6'>
                    "{item.quote}"
                  </p>

                  <div className='pt-4 border-t border-gray-100'>
                    <p className='font-bold text-[#1E3A8A]'>{item.name}</p>
                    <p className='text-sm text-gray-500'>{item.role}</p>
                  </div>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className='mt-8 flex justify-center gap-2'>
          {testimonialPages.map((_, index) => (
            <button
              key={index}
              type='button'
              aria-label={`Go to testimonial group ${index + 1}`}
              onClick={() => setActivePage(index)}
              className={`h-2.5 rounded-full transition-all ${
                activePage === index
                  ? 'w-7 bg-[#1E3A8A]'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
