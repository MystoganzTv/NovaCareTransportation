import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const CONTACT_HEADER_BANNER_IMAGE = '/banner/NovaCare-Banner.jpg';

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
            'Listo para colaborar con NovaCare? Coordinemos una reunion.',
          contactInformation: 'Informacion de Contacto',
          infoText:
            'Escribenos para conversar sobre alianzas con clinicas, centros medicos y organizaciones de salud.',
          formTitle: 'Solicitar reunion de alianza',
          fullName: 'Nombre Completo',
          organizationName: 'Nombre de Clinica u Organizacion',
          emailAddress: 'Correo Electronico',
          phoneNumber: 'Numero de Telefono',
          meetingDate: 'Fecha Preferida de Reunion',
          message: 'Mensaje',
          messagePlaceholder:
            'Cuentanos sobre tu centro, volumen de pacientes y necesidades de transporte.',
          sendMessage: 'Enviar Solicitud',
          sending: 'Enviando...',
          sentSuccess: 'Solicitud enviada. Te responderemos pronto.',
          sendError:
            'No pudimos enviar tu mensaje ahora. Llamanos al (305) 610-2811 o escribe a enrique.padron853@gmail.com.',
          dateError: 'Selecciona hoy o una fecha futura para la reunion.',
          subjectPrefix: 'Nueva solicitud de reunion de alianza de',
          requestType: 'Solicitud de Reunion de Alianza',
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
            'Ready to partner with NovaCare? Let us schedule a meeting.',
          contactInformation: 'Contact Information',
          infoText:
            'Reach out to discuss partnership opportunities with clinics, healthcare facilities, and care coordinators.',
          formTitle: 'Request a Partnership Meeting',
          fullName: 'Full Name',
          organizationName: 'Clinic or Organization Name',
          emailAddress: 'Email Address',
          phoneNumber: 'Phone Number',
          meetingDate: 'Preferred Meeting Date',
          message: 'Message',
          messagePlaceholder:
            'Tell us about your facility, patient volume, and transportation needs.',
          sendMessage: 'Send Request',
          sending: 'Sending...',
          sentSuccess: "Request sent! We'll get back to you soon.",
          sendError:
            'We could not send your message right now. Please call us at (305) 610-2811 or email enrique.padron853@gmail.com.',
          dateError: 'Please select today or a future date for your meeting.',
          subjectPrefix: 'New Partner Meeting Request from',
          requestType: 'Partner Meeting Request',
          notProvided: 'Not provided',
          phoneLabel: 'Phone',
          emailLabel: 'Email',
          serviceAreaLabel: 'Service Area',
          serviceAreaValue: 'Northern Virginia',
          serviceAreaSubtext: 'Herndon, Reston, Fairfax, Ashburn',
        };

  const FORMSUBMIT_ENDPOINT =
    'https://formsubmit.co/ajax/enrique.padron853@gmail.com';
  const minMeetingDate = getTodayDateString();
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    meetingDate: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleMeetingDateChange = e => {
    const nextDate = e.target.value;
    if (nextDate && nextDate < minMeetingDate) {
      setSubmitError(copy.dateError);
      return;
    }

    setSubmitError('');
    setFormData(prev => ({ ...prev, meetingDate: nextDate }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    if (formData.meetingDate < minMeetingDate) {
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
      payload.append(
        'Clinic or Organization',
        formData.organization || copy.notProvided
      );
      payload.append('Email', formData.email);
      payload.append('Phone', formData.phone || copy.notProvided);
      payload.append(
        'Preferred Meeting Date',
        formData.meetingDate || copy.notProvided
      );
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
        organization: '',
        email: '',
        phone: '',
        meetingDate: '',
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
          className='relative mb-16 overflow-hidden rounded-3xl shadow-xl min-h-[220px] sm:min-h-[260px]'>
          <img
            src={CONTACT_HEADER_BANNER_IMAGE}
            alt='NovaCare transportation van banner'
            className='absolute inset-0 h-full w-full object-cover object-center'
            loading='lazy'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-[#0f172a]/70 via-[#1E3A8A]/55 to-[#1E3A8A]/28' />

          <div className='relative z-10 text-left px-6 py-10 sm:px-10 sm:py-14 md:px-12 md:py-16'>
            <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]'>
              Get In Touch
            </h2>
            <p className='text-base sm:text-xl md:text-2xl text-white/95 max-w-3xl leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]'>
              Ready to experience reliable medical transportation? Contact us
              today.
            </p>
          </div>
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
                  {copy.organizationName}
                </label>
                <Input
                  type='text'
                  placeholder='Nova Health Clinic'
                  value={formData.organization}
                  onChange={e =>
                    setFormData({ ...formData, organization: e.target.value })
                  }
                  className='w-full px-4 py-3 rounded-xl border-gray-300 focus:border-[#2DD4BF] focus:ring-[#2DD4BF]'
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
                  {copy.meetingDate}
                </label>
                <Input
                  type='date'
                  value={formData.meetingDate}
                  min={minMeetingDate}
                  onChange={handleMeetingDateChange}
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
