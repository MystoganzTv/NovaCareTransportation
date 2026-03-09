import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const RESERVE_BANNER_IMAGE =
  '/banner/NovaCare-Banner.png';

const getTodayDateString = () => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().split('T')[0];
};

export default function ContactSection() {
  const { language } = useLanguage();
  const copy =
    language === 'es'
      ? {
          title: 'Contactanos',
          subtitle:
            'Listo para un transporte medico confiable? Contactanos hoy.',
          contactInformation: 'Informacion de Contacto',
          infoText:
            'Escribenos para agendar transporte, conversar sobre alianzas o resolver cualquier duda.',
          reserveBannerTitle: 'Reserve su viaje',
          reserveBannerSubtitle:
            'Seleccione fecha y detalles, nosotros nos encargamos del resto.',
          formTitle: 'Enviamos un mensaje',
          fullName: 'Nombre Completo',
          emailAddress: 'Correo Electronico',
          phoneNumber: 'Numero de Telefono',
          rideDate: 'Fecha del Viaje',
          message: 'Mensaje',
          messagePlaceholder: 'Cuentanos sobre tus necesidades de transporte...',
          sendMessage: 'Enviar Mensaje',
          sending: 'Enviando...',
          sentSuccess: 'Mensaje enviado. Te responderemos pronto.',
          sendError:
            'No pudimos enviar tu mensaje ahora. Llamanos al (305) 610-2811 o escribe a enrique.padron853@gmail.com.',
          dateError: 'Selecciona hoy o una fecha futura para tu viaje.',
          subjectPrefix: 'Nueva solicitud de',
          requestType: 'Solicitud de Viaje',
          notProvided: 'No proporcionado',
          phoneLabel: 'Telefono',
          emailLabel: 'Correo',
          serviceAreaLabel: 'Area de Servicio',
          serviceAreaValue: 'Norte de Virginia',
          serviceAreaSubtext: 'Herndon, Reston, Fairfax, Ashburn',
        }
      : {
          title: 'Get In Touch',
          subtitle:
            'Ready to experience reliable medical transportation? Contact us today.',
          contactInformation: 'Contact Information',
          infoText:
            'Reach out to schedule transportation, discuss partnership opportunities, or ask any questions about our services.',
          reserveBannerTitle: 'Reserve Your Ride',
          reserveBannerSubtitle:
            'Choose your date and details. We will take care of the rest.',
          formTitle: 'Send us a message',
          fullName: 'Full Name',
          emailAddress: 'Email Address',
          phoneNumber: 'Phone Number',
          rideDate: 'Ride Date',
          message: 'Message',
          messagePlaceholder: 'Tell us about your transportation needs...',
          sendMessage: 'Send Message',
          sending: 'Sending...',
          sentSuccess: "Message sent! We'll get back to you soon.",
          sendError:
            'We could not send your message right now. Please call us at (305) 610-2811 or email enrique.padron853@gmail.com.',
          dateError: 'Please select today or a future date for your ride.',
          subjectPrefix: 'New Inquiry from',
          requestType: 'Ride Request',
          notProvided: 'Not provided',
          phoneLabel: 'Phone',
          emailLabel: 'Email',
          serviceAreaLabel: 'Service Area',
          serviceAreaValue: 'Northern Virginia',
          serviceAreaSubtext: 'Herndon, Reston, Fairfax, Ashburn',
        };

  const FORMSUBMIT_ENDPOINT =
    'https://formsubmit.co/ajax/enrique.padron853@gmail.com';
  const minRideDate = getTodayDateString();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rideDate: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleRideDateChange = e => {
    const nextDate = e.target.value;
    if (nextDate && nextDate < minRideDate) {
      setSubmitError(copy.dateError);
      return;
    }

    setSubmitError('');
    setFormData(prev => ({ ...prev, rideDate: nextDate }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    if (formData.rideDate < minRideDate) {
      setSubmitError(copy.dateError);
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = new FormData();
      payload.append('_subject', `${copy.subjectPrefix} ${formData.name}`);
      payload.append('_template', 'table');
      payload.append('_captcha', 'false');
      payload.append('_replyto', formData.email);
      payload.append('Request Type', copy.requestType);
      payload.append('Full Name', formData.name);
      payload.append('Email', formData.email);
      payload.append('Phone', formData.phone || copy.notProvided);
      payload.append('Ride Date', formData.rideDate || copy.notProvided);
      payload.append('Service Area', copy.serviceAreaValue);
      payload.append('Message', formData.message);

      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: payload,
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        rideDate: '',
        message: '',
      });
    } catch {
      setSubmitError(copy.sendError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: copy.phoneLabel,
      value: '(305) 610-2811',
      link: 'tel:3056102811',
    },
    {
      icon: Mail,
      label: copy.emailLabel,
      value: 'enrique.padron853@gmail.com',
      link: 'mailto:enrique.padron853@gmail.com',
    },
    {
      icon: MapPin,
      label: copy.serviceAreaLabel,
      value: copy.serviceAreaValue,
      subtext: copy.serviceAreaSubtext,
    },
  ];

  return (
    <section
      id='contact'
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
          <p className='text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto'>
            {copy.subtitle}
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-8 md:gap-12'>
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className='space-y-8'>
            <div>
              <h3 className='text-2xl font-bold text-[#1E3A8A] mb-6'>
                {copy.contactInformation}
              </h3>
              <p className='text-gray-600 mb-8 leading-relaxed'>
                {copy.infoText}
              </p>
            </div>

            <div className='space-y-6'>
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className='flex items-start gap-4 p-4 bg-white rounded-xl shadow-md border border-gray-100'>
                    <div className='w-12 h-12 bg-gradient-to-br from-[#2DD4BF] to-[#14B8A6] rounded-xl flex items-center justify-center flex-shrink-0'>
                      <Icon className='w-6 h-6 text-white' strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className='text-sm font-semibold text-gray-500 mb-1'>
                        {info.label}
                      </p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className='text-lg font-bold text-[#1E3A8A] hover:text-[#2DD4BF] transition-colors'>
                          {info.value}
                        </a>
                      ) : (
                        <>
                          <p className='text-lg font-bold text-[#1E3A8A]'>
                            {info.value}
                          </p>
                          {info.subtext && (
                            <p className='text-sm text-gray-600 mt-1'>
                              {info.subtext}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className='bg-white rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-8'>
            <div className='relative mb-6 overflow-hidden rounded-2xl min-h-[140px] sm:min-h-[165px]'>
              <img
                src={RESERVE_BANNER_IMAGE}
                alt='Reserve your ride banner'
                className='absolute inset-0 h-full w-full object-cover'
                loading='lazy'
              />
              <div className='absolute inset-0 bg-gradient-to-r from-[#0f172a]/80 via-[#1E3A8A]/65 to-[#1E3A8A]/35' />
              <div className='relative z-10 px-5 py-6 sm:px-6 sm:py-7'>
                <p className='text-white text-2xl sm:text-3xl font-bold leading-tight'>
                  {copy.reserveBannerTitle}
                </p>
                <p className='text-white/90 text-sm sm:text-base mt-2 max-w-md'>
                  {copy.reserveBannerSubtitle}
                </p>
              </div>
            </div>

            <h3 className='text-2xl font-bold text-[#1E3A8A] mb-6'>
              {copy.formTitle}
            </h3>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  {copy.fullName}
                </label>
                <Input
                  id='contact-name'
                  type='text'
                  placeholder='John Doe'
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className='w-full px-4 py-3 rounded-xl border-gray-300 focus:border-[#2DD4BF] focus:ring-[#2DD4BF]'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  {copy.emailAddress}
                </label>
                <Input
                  type='email'
                  placeholder='john@example.com'
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className='w-full px-4 py-3 rounded-xl border-gray-300 focus:border-[#2DD4BF] focus:ring-[#2DD4BF]'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  {copy.phoneNumber}
                </label>
                <Input
                  type='tel'
                  placeholder='(571) 555-0123'
                  value={formData.phone}
                  onChange={e =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className='w-full px-4 py-3 rounded-xl border-gray-300 focus:border-[#2DD4BF] focus:ring-[#2DD4BF]'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  {copy.rideDate}
                </label>
                <Input
                  type='date'
                  value={formData.rideDate}
                  min={minRideDate}
                  onChange={handleRideDateChange}
                  className='w-full px-4 py-3 rounded-xl border-gray-300 focus:border-[#2DD4BF] focus:ring-[#2DD4BF]'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  {copy.message}
                </label>
                <Textarea
                  placeholder={copy.messagePlaceholder}
                  value={formData.message}
                  onChange={e =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className='w-full px-4 py-3 rounded-xl border-gray-300 focus:border-[#2DD4BF] focus:ring-[#2DD4BF] min-h-32'
                  required
                />
              </div>

              <Button
                type='submit'
                disabled={isSubmitting}
                size='lg'
                className='w-full bg-gradient-to-r from-[#1E3A8A] to-[#0f172a] hover:from-[#0f172a] hover:to-[#1E3A8A] text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'>
                {isSubmitting ? copy.sending : copy.sendMessage}
              </Button>
            </form>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='mt-4 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4'>
                <CheckCircle2 className='w-5 h-5 text-green-600 flex-shrink-0' />
                <p className='text-green-700 font-medium text-sm'>
                  {copy.sentSuccess}
                </p>
              </motion.div>
            )}

            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='mt-4 bg-red-50 border border-red-200 rounded-xl p-4'>
                <p className='text-red-700 font-medium text-sm'>
                  {submitError}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
