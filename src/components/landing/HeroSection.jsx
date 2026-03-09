import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Calendar } from 'lucide-react';

const HERO_BG_IMAGE =
  'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1800&q=80&auto=format&fit=crop';
const HERO_BG_FALLBACK = '/banner/NovaCare-Banner.png';

const driverPhotos = [
  {
    url: '/team/worker-01.png',
    fallback: '',
    caption: 'Friendly NovaCare Staff',
    badge: '✓ Warm and Welcoming Team',
  },
  {
    url: '/team/worker-02.png',
    fallback: '',
    caption: 'Professional Daily Service',
    badge: '✓ Trusted by Local Families',
  },
  {
    url: '/team/worker-03.png',
    fallback: '',
    caption: 'Experienced Transportation Team',
    badge: '✓ Safe and Dependable',
  },
  {
    url: '/team/worker-04.png',
    fallback: '',
    caption: 'Kind Support on Every Ride',
    badge: '✓ Patient-First Care',
  },
  {
    url: '/team/worker-05.png',
    fallback: '',
    caption: 'Comfort-Focused Transportation',
    badge: '✓ On-Time Arrivals',
  },
  {
    url: '/team/worker-06.png',
    fallback: '',
    caption: 'Everyday Friendly Professionals',
    badge: '✓ Caring and Respectful',
  },
  {
    url: '/team/worker-07.png',
    fallback: '',
    caption: 'Compassionate Team Presence',
    badge: '✓ Reliable Daily Support',
  },
  {
    url: '/team/worker-08.png',
    fallback: '',
    caption: 'Trusted Transportation Specialist',
    badge: '✓ Professional and Courteous',
  },
];

function DriverPhotoCarousel({ compact = false }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % driverPhotos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const photo = driverPhotos[current];

  return (
    <div
      className={`relative ${compact ? 'w-64 h-96' : 'w-80 h-[30rem]'}`}>
      <div className='absolute inset-0 bg-gradient-to-br from-[#2DD4BF]/20 to-[#2DD4BF]/5 rounded-3xl rotate-3 border border-white/10'></div>
      <div className='absolute inset-0 bg-white/5 rounded-3xl -rotate-3 border border-white/10'></div>

      <div className='relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20'>
        <AnimatePresence mode='wait'>
          <motion.img
            key={current}
            src={photo.url}
            alt={photo.caption}
            className='w-full h-full object-cover object-center'
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            onError={e => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = photo.fallback;
            }}
          />
        </AnimatePresence>
        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4'>
          <p className='text-white font-semibold text-sm'>{photo.caption}</p>
          <p className='text-[#2DD4BF] text-xs font-medium'>{photo.badge}</p>
        </div>
      </div>

      {/* Floating Card Top */}
      {!compact && (
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className='absolute -top-5 -left-6 z-20 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-gray-100'>
          <p className='text-sm font-semibold text-[#1E3A8A]'>
            ✓ On-Time Guarantee
          </p>
        </motion.div>
      )}

      {/* Floating Card Bottom */}
      {!compact && (
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          className='absolute -bottom-5 -right-6 z-20 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-gray-100'>
          <p className='text-sm font-semibold text-[#1E3A8A]'>
            ✓ Professional Drivers
          </p>
        </motion.div>
      )}

      {/* Dots */}
      <div className='absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2'>
        {driverPhotos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-[#2DD4BF] w-4' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const handleRequestTransportation = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    window.setTimeout(() => {
      const firstField = document.getElementById('contact-name');
      firstField?.focus();
    }, 450);
  };
  const handlePartnerWithUs = () => {
    const partnerSection = document.getElementById('partner');
    partnerSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className='relative text-white overflow-hidden min-h-[100svh] flex items-center'>
      {/* Background Photo */}
      <div className='absolute inset-0'>
        <img
          src={HERO_BG_IMAGE}
          alt='Medical transportation van fleet'
          className='w-full h-full object-cover object-center blur-[3px] scale-105'
          onError={e => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = HERO_BG_FALLBACK;
          }}
        />
        <div className='absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/88 via-[#1E3A8A]/75 to-[#0f172a]/88'></div>
      </div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32 lg:py-40'>
        <div className='grid lg:grid-cols-2 gap-10 lg:gap-12 items-center'>
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20'>
              <Heart className='w-4 h-4 text-[#2DD4BF]' />
              <span className='text-sm font-medium'>
                Northern Virginia's Trusted NEMT Provider
              </span>
            </motion.div>

            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6'>
              Reliable Medical Transportation You Can Trust
            </h1>

            <p className='text-base sm:text-lg md:text-xl text-blue-100 mb-8 leading-relaxed'>
              Safe, punctual, and professional non-emergency transportation
              serving Northern Virginia.
            </p>

            <div className='flex flex-col sm:flex-row gap-4'>
              <Button
                size='lg'
                onClick={handleRequestTransportation}
                className='w-full sm:w-auto bg-[#2DD4BF] hover:bg-[#14B8A6] text-[#1E3A8A] font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105'>
                <Calendar className='w-5 h-5 mr-2' />
                Request Transportation
              </Button>

              <Button
                size='lg'
                variant='outline'
                onClick={handlePartnerWithUs}
                className='w-full sm:w-auto border-2 border-white bg-white/15 hover:bg-white hover:text-[#1E3A8A] text-white font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-xl backdrop-blur-sm transition-all duration-300'>
                Partner With Us
              </Button>
            </div>

            <div className='lg:hidden mt-10 flex justify-center'>
              <DriverPhotoCarousel compact />
            </div>
          </motion.div>

          {/* Right Visual - Driver Photos Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className='hidden lg:flex items-center justify-center'>
            <DriverPhotoCarousel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
