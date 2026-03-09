import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  User,
  Users,
  Accessibility,
} from 'lucide-react';
import Footer from '../components/landing/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../context/LanguageContext';

const FORMSUBMIT_ENDPOINT =
  'https://formsubmit.co/ajax/enrique.padron853@gmail.com';

const getTodayDateString = () => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().split('T')[0];
};

const buildTimeOptions = () => {
  const options = [];
  for (let hour = 5; hour <= 22; hour += 1) {
    for (let min = 0; min < 60; min += 30) {
      const ampm = hour < 12 ? 'AM' : 'PM';
      const normalized = hour % 12 || 12;
      const minute = min === 0 ? '00' : '30';
      options.push(`${normalized}:${minute} ${ampm}`);
    }
  }
  return options;
};

const TIME_OPTIONS = buildTimeOptions();

const initialForm = {
  full_name: '',
  email: '',
  phone: '',
  pickup_date: '',
  pickup_time: '',
  pickup_address: '',
  destination_address: '',
  wheelchair: false,
  passengers: 1,
  notes: '',
};

function SummaryRow({ label, value }) {
  return (
    <div className='flex items-start justify-between gap-3'>
      <p className='text-gray-500'>{label}</p>
      <p className='font-semibold text-gray-900 text-right break-words'>{value}</p>
    </div>
  );
}

export default function RequestRide() {
  const { language } = useLanguage();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState(initialForm);
  const minRideDate = useMemo(() => getTodayDateString(), []);

  const copy =
    language === 'es'
      ? {
          title: 'Reserva Tu Viaje',
          subtitle:
            'Solicita tu transporte no emergente en 3 pasos rapidos y claros.',
          steps: ['Datos personales', 'Detalles del viaje', 'Confirmacion'],
          personalTitle: 'Datos personales',
          tripTitle: 'Detalles del viaje',
          confirmTitle: 'Confirmar solicitud',
          nameLabel: 'Nombre Completo',
          namePlaceholder: 'Tu nombre completo',
          phoneLabel: 'Telefono',
          phonePlaceholder: '(571) 555-0123',
          emailLabel: 'Correo Electronico',
          emailOptional: '(opcional)',
          emailPlaceholder: 'tuemail@ejemplo.com',
          dateLabel: 'Fecha',
          timeLabel: 'Hora',
          selectTime: 'Selecciona una hora',
          pickupLabel: 'Direccion de recogida',
          pickupPlaceholder: '123 Main St, Herndon, VA',
          destinationLabel: 'Direccion de destino',
          destinationPlaceholder: 'Inova Fairfax Hospital',
          passengersLabel: 'Pasajeros',
          wheelchairLabel: 'Vehiculo con silla de ruedas',
          notesLabel: 'Notas',
          notesOptional: '(opcional)',
          notesPlaceholder: 'Clinica, puerta, apto, instrucciones...',
          continueButton: 'Continuar',
          backButton: 'Atras',
          confirmButton: 'Enviar solicitud',
          sendingButton: 'Enviando...',
          backHome: 'Volver al inicio',
          helpText: 'Necesitas ayuda para reservar?',
          requiredError: 'Completa todos los campos requeridos.',
          dateError: 'Selecciona hoy o una fecha futura.',
          successTitle: 'Solicitud Recibida',
          successText:
            'Tu solicitud fue enviada correctamente. Te contactaremos pronto para confirmar.',
          summaryNote:
            'Revisa los datos antes de enviar. Esta solicitud no confirma automaticamente el viaje.',
          yes: 'Si',
          no: 'No',
          requestType: 'Solicitud de Viaje',
          subjectPrefix: 'Nueva Solicitud de Viaje',
          rowName: 'Nombre',
          rowPhone: 'Telefono',
          rowEmail: 'Correo',
          rowDate: 'Fecha',
          rowTime: 'Hora',
          rowPickup: 'Recogida',
          rowDestination: 'Destino',
          rowPassengers: 'Pasajeros',
          rowWheelchair: 'Silla de ruedas',
          rowNotes: 'Notas',
        }
      : {
          title: 'Book Your Ride',
          subtitle:
            'Request your non-emergency transportation in 3 clear steps.',
          steps: ['Personal Information', 'Trip Details', 'Confirmation'],
          personalTitle: 'Personal Information',
          tripTitle: 'Trip Details',
          confirmTitle: 'Confirm Request',
          nameLabel: 'Full Name',
          namePlaceholder: 'Your full name',
          phoneLabel: 'Phone Number',
          phonePlaceholder: '(571) 555-0123',
          emailLabel: 'Email Address',
          emailOptional: '(optional)',
          emailPlaceholder: 'you@example.com',
          dateLabel: 'Date',
          timeLabel: 'Time',
          selectTime: 'Select a time',
          pickupLabel: 'Pickup Address',
          pickupPlaceholder: '123 Main St, Herndon, VA',
          destinationLabel: 'Destination Address',
          destinationPlaceholder: 'Inova Fairfax Hospital',
          passengersLabel: 'Passengers',
          wheelchairLabel: 'Wheelchair Accessible Vehicle',
          notesLabel: 'Notes',
          notesOptional: '(optional)',
          notesPlaceholder: 'Clinic, gate code, suite, instructions...',
          continueButton: 'Continue',
          backButton: 'Back',
          confirmButton: 'Submit request',
          sendingButton: 'Submitting...',
          backHome: 'Back Home',
          helpText: 'Need help with booking?',
          requiredError: 'Please complete all required fields.',
          dateError: 'Please choose today or a future date.',
          successTitle: 'Request Received',
          successText:
            'Your ride request was sent successfully. We will contact you soon to confirm.',
          summaryNote:
            'Please review all details before sending. This request does not auto-confirm the ride.',
          yes: 'Yes',
          no: 'No',
          requestType: 'Ride Request',
          subjectPrefix: 'New Ride Request',
          rowName: 'Name',
          rowPhone: 'Phone',
          rowEmail: 'Email',
          rowDate: 'Date',
          rowTime: 'Time',
          rowPickup: 'Pickup',
          rowDestination: 'Destination',
          rowPassengers: 'Passengers',
          rowWheelchair: 'Wheelchair',
          rowNotes: 'Notes',
        };

  const updateField = (field, value) => {
    setError('');
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const canContinuePersonal = Boolean(form.full_name && form.phone);
  const canContinueTrip = Boolean(
    form.pickup_date &&
      form.pickup_time &&
      form.pickup_address &&
      form.destination_address
  );

  const goNext = () => {
    if (step === 0 && !canContinuePersonal) {
      setError(copy.requiredError);
      return;
    }

    if (step === 1) {
      if (!canContinueTrip) {
        setError(copy.requiredError);
        return;
      }
      if (form.pickup_date < minRideDate) {
        setError(copy.dateError);
        return;
      }
    }

    setStep(prev => Math.min(prev + 1, 2));
  };

  const goBack = () => {
    setError('');
    setStep(prev => Math.max(prev - 1, 0));
  };

  const submitRequest = async () => {
    if (!canContinuePersonal || !canContinueTrip) {
      setError(copy.requiredError);
      return;
    }
    if (form.pickup_date < minRideDate) {
      setError(copy.dateError);
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      const payload = new FormData();
      payload.append('_subject', `${copy.subjectPrefix} - ${form.full_name}`);
      payload.append('_template', 'table');
      payload.append('_captcha', 'false');
      if (form.email) {
        payload.append('_replyto', form.email);
      }
      payload.append('Request Type', copy.requestType);
      payload.append('Full Name', form.full_name);
      payload.append('Phone', form.phone);
      payload.append('Email', form.email || 'N/A');
      payload.append('Pickup Date', form.pickup_date);
      payload.append('Pickup Time', form.pickup_time);
      payload.append('Pickup Address', form.pickup_address);
      payload.append('Destination Address', form.destination_address);
      payload.append('Passengers', String(form.passengers));
      payload.append('Wheelchair', form.wheelchair ? copy.yes : copy.no);
      payload.append('Notes', form.notes || 'N/A');

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
      setForm(initialForm);
      setStep(0);
    } catch {
      setError(
        language === 'es'
          ? 'No se pudo enviar ahora. Intenta nuevamente o llama al (305) 610-2811.'
          : 'Could not send right now. Please try again or call (305) 610-2811.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-[#1E3A8A] to-[#0f172a] flex items-center justify-center px-4'>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className='bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-2xl'>
          <div className='w-20 h-20 bg-gradient-to-br from-[#2DD4BF] to-[#14B8A6] rounded-full flex items-center justify-center mx-auto mb-6'>
            <CheckCircle2 className='w-10 h-10 text-white' />
          </div>
          <h2 className='text-2xl font-bold text-[#1E3A8A] mb-3'>
            {copy.successTitle}
          </h2>
          <p className='text-gray-600 mb-7'>{copy.successText}</p>
          <a
            href='/'
            className='inline-block bg-[#1E3A8A] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2563EB] transition-colors'>
            {copy.backHome}
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <main>
        <div className='relative overflow-hidden text-white py-4 sm:py-5'>
          <img
            src='https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1800&q=80&auto=format&fit=crop'
            alt='Medical transportation'
            className='absolute inset-0 w-full h-full object-cover scale-105 blur-[2px]'
          />
          <div className='absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/93 via-[#1E3A8A]/86 to-[#0f172a]/94' />
          <div className='absolute -top-24 -right-24 w-72 h-72 rounded-full bg-cyan-300/20 blur-3xl' />

          <div className='relative max-w-2xl mx-auto px-4 sm:px-6'>
            <div className='mb-4 flex items-start justify-end gap-3'>
              <a
                href='/'
                className='inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors'>
                <ArrowLeft className='w-4 h-4' />
                {copy.backHome}
              </a>
            </div>
            <h1 className='text-2xl sm:text-3xl font-bold mb-2'>{copy.title}</h1>
            <p className='text-blue-200'>{copy.subtitle}</p>
          </div>
        </div>

        <div id='contact' className='max-w-2xl mx-auto px-4 sm:px-6 pt-8 pb-14'>
          <div className='flex items-center justify-between mb-10'>
            {copy.steps.map((label, idx) => (
              <React.Fragment key={label}>
                <div className='flex flex-col items-center gap-1'>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      idx <= step
                        ? 'bg-[#1E3A8A] text-white shadow-lg'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                    {idx < step ? <CheckCircle2 className='w-5 h-5' /> : idx + 1}
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:block ${
                      idx <= step ? 'text-[#1E3A8A]' : 'text-gray-400'
                    }`}>
                    {label}
                  </span>
                </div>
                {idx < copy.steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                      idx < step ? 'bg-[#2DD4BF]' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className='bg-white rounded-2xl shadow-lg p-6 sm:p-8'>
            {step === 0 && (
              <div className='space-y-5'>
                <h2 className='text-xl font-bold text-[#1E3A8A] flex items-center gap-2'>
                  <User className='w-5 h-5' />
                  {copy.personalTitle}
                </h2>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-1'>
                    {copy.nameLabel} *
                  </label>
                  <input
                    id='contact-name'
                    className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] text-gray-800'
                    placeholder={copy.namePlaceholder}
                    value={form.full_name}
                    onChange={e => updateField('full_name', e.target.value)}
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-1'>
                    {copy.phoneLabel} *
                  </label>
                  <div className='relative'>
                    <Phone className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                    <input
                      className='w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] text-gray-800'
                      placeholder={copy.phonePlaceholder}
                      value={form.phone}
                      onChange={e => updateField('phone', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-1'>
                    {copy.emailLabel}{' '}
                    <span className='text-gray-400 font-normal'>
                      {copy.emailOptional}
                    </span>
                  </label>
                  <div className='relative'>
                    <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                    <input
                      className='w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] text-gray-800'
                      placeholder={copy.emailPlaceholder}
                      value={form.email}
                      onChange={e => updateField('email', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className='space-y-5'>
                <h2 className='text-xl font-bold text-[#1E3A8A] flex items-center gap-2'>
                  <MapPin className='w-5 h-5' />
                  {copy.tripTitle}
                </h2>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-1'>
                      {copy.dateLabel} *
                    </label>
                    <div className='relative'>
                      <Calendar className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                      <input
                        type='date'
                        min={minRideDate}
                        className='w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] text-gray-800'
                        value={form.pickup_date}
                        onChange={e => updateField('pickup_date', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-1'>
                      {copy.timeLabel} *
                    </label>
                    <div className='relative'>
                      <Clock3 className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                      <select
                        className='w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] text-gray-800 bg-white appearance-none'
                        value={form.pickup_time}
                        onChange={e => updateField('pickup_time', e.target.value)}>
                        <option value=''>{copy.selectTime}</option>
                        {TIME_OPTIONS.map(time => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-1'>
                    {copy.pickupLabel} *
                  </label>
                  <div className='relative'>
                    <MapPin className='absolute left-3 top-3.5 w-4 h-4 text-[#2DD4BF]' />
                    <input
                      className='w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] text-gray-800'
                      placeholder={copy.pickupPlaceholder}
                      value={form.pickup_address}
                      onChange={e => updateField('pickup_address', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-1'>
                    {copy.destinationLabel} *
                  </label>
                  <div className='relative'>
                    <MapPin className='absolute left-3 top-3.5 w-4 h-4 text-red-400' />
                    <input
                      className='w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] text-gray-800'
                      placeholder={copy.destinationPlaceholder}
                      value={form.destination_address}
                      onChange={e =>
                        updateField('destination_address', e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-1'>
                      {copy.passengersLabel}
                    </label>
                    <div className='relative'>
                      <Users className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                      <select
                        className='w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] text-gray-800 bg-white'
                        value={form.passengers}
                        onChange={e => updateField('passengers', Number(e.target.value))}>
                        {[1, 2, 3, 4].map(count => (
                          <option key={count} value={count}>
                            {count}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className='flex flex-col justify-end'>
                    <label className='flex items-center gap-3 cursor-pointer border border-gray-300 rounded-xl px-4 py-3 hover:border-[#2DD4BF] transition-colors'>
                      <input
                        type='checkbox'
                        className='w-4 h-4 accent-[#1E3A8A]'
                        checked={form.wheelchair}
                        onChange={e => updateField('wheelchair', e.target.checked)}
                      />
                      <span className='text-sm font-semibold text-gray-700 flex items-center gap-1'>
                        <Accessibility className='w-4 h-4 text-[#2DD4BF]' />
                        {copy.wheelchairLabel}
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-1'>
                    {copy.notesLabel}{' '}
                    <span className='text-gray-400 font-normal'>
                      {copy.notesOptional}
                    </span>
                  </label>
                  <textarea
                    rows={3}
                    className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] text-gray-800 resize-none'
                    placeholder={copy.notesPlaceholder}
                    value={form.notes}
                    onChange={e => updateField('notes', e.target.value)}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className='space-y-6'>
                <h2 className='text-xl font-bold text-[#1E3A8A] flex items-center gap-2'>
                  <CheckCircle2 className='w-5 h-5' />
                  {copy.confirmTitle}
                </h2>

                <div className='bg-gray-50 rounded-2xl p-5 space-y-3 text-sm'>
                  <SummaryRow label={copy.rowName} value={form.full_name} />
                  <SummaryRow label={copy.rowPhone} value={form.phone} />
                  {form.email && <SummaryRow label={copy.rowEmail} value={form.email} />}
                  <hr className='border-gray-200' />
                  <SummaryRow label={copy.rowDate} value={form.pickup_date} />
                  <SummaryRow label={copy.rowTime} value={form.pickup_time} />
                  <SummaryRow
                    label={copy.rowPickup}
                    value={form.pickup_address}
                  />
                  <SummaryRow
                    label={copy.rowDestination}
                    value={form.destination_address}
                  />
                  <SummaryRow
                    label={copy.rowPassengers}
                    value={String(form.passengers)}
                  />
                  <SummaryRow
                    label={copy.rowWheelchair}
                    value={form.wheelchair ? copy.yes : copy.no}
                  />
                  {form.notes && <SummaryRow label={copy.rowNotes} value={form.notes} />}
                </div>

                <div className='bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 rounded-xl p-4 text-sm text-[#0f766e]'>
                  <strong>Note:</strong> {copy.summaryNote}
                </div>
              </div>
            )}

            {error && (
              <div className='mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700'>
                {error}
              </div>
            )}

            <div className='flex justify-between mt-8'>
              {step > 0 ? (
                <Button
                  type='button'
                  variant='outline'
                  onClick={goBack}
                  className='flex items-center gap-2'>
                  <ArrowLeft className='w-4 h-4' />
                  {copy.backButton}
                </Button>
              ) : (
                <a
                  href='/'
                  className='text-sm text-gray-500 hover:text-[#1E3A8A] transition-colors self-center'>
                  {copy.backHome}
                </a>
              )}

              {step < 2 ? (
                <Button
                  type='button'
                  onClick={goNext}
                  disabled={step === 0 ? !canContinuePersonal : !canContinueTrip}
                  className='bg-[#1E3A8A] hover:bg-[#2563EB] text-white flex items-center gap-2 px-6'>
                  {copy.continueButton}
                  <ArrowRight className='w-4 h-4' />
                </Button>
              ) : (
                <Button
                  type='button'
                  onClick={submitRequest}
                  disabled={isSubmitting}
                  className='bg-[#2DD4BF] hover:bg-[#14B8A6] text-[#1E3A8A] font-bold flex items-center gap-2 px-8'>
                  {isSubmitting ? copy.sendingButton : copy.confirmButton}
                  {!isSubmitting && <CheckCircle2 className='w-4 h-4' />}
                </Button>
              )}
            </div>
          </motion.div>

          <p className='text-center text-gray-400 text-xs mt-8 mb-10'>
            {copy.helpText}{' '}
            <a href='tel:3056102811' className='text-[#1E3A8A] font-semibold'>
              (305) 610-2811
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
