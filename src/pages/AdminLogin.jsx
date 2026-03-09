import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LockKeyhole, Mail } from 'lucide-react';
import { isAdminAuthConfigured, loginAdmin, loginAdminDemo } from '@/lib/adminAuth';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminLogin() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const nextPath = location.state?.from?.pathname || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copy =
    language === 'es'
      ? {
          title: 'Acceso Admin',
          subtitle: 'Inicia sesion para ver el panel de administracion.',
          email: 'Correo Admin',
          password: 'Contrasena',
          login: 'Entrar',
          loggingIn: 'Entrando...',
          backHome: 'Volver al inicio',
          notConfigured:
            'El acceso admin no esta configurado. Define VITE_ADMIN_EMAIL y VITE_ADMIN_PASSWORD.',
          continueDemo: 'Entrar en modo demo',
        }
      : {
          title: 'Admin Access',
          subtitle: 'Sign in to open the operations dashboard.',
          email: 'Admin Email',
          password: 'Password',
          login: 'Sign In',
          loggingIn: 'Signing in...',
          backHome: 'Back Home',
          notConfigured:
            'Admin login is not configured. Set VITE_ADMIN_EMAIL and VITE_ADMIN_PASSWORD.',
          continueDemo: 'Continue in demo mode',
        };

  const authConfigured = isAdminAuthConfigured();

  const onSubmit = event => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = loginAdmin({ email, password });
    if (!result.ok) {
      setError(result.error);
      setIsSubmitting(false);
      return;
    }

    navigate(nextPath, { replace: true });
  };

  const onDemoAccess = () => {
    loginAdminDemo();
    navigate(nextPath, { replace: true });
  };

  return (
    <main className='min-h-screen bg-slate-100 flex items-center justify-center px-4'>
      <section className='w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-lg p-7 sm:p-8'>
        <h1 className='text-3xl font-bold text-[#1E3A8A] mb-2'>{copy.title}</h1>
        <p className='text-slate-600 mb-7'>{copy.subtitle}</p>

        {!authConfigured && (
          <div className='mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800'>
            {copy.notConfigured}
            <button
              type='button'
              onClick={onDemoAccess}
              className='mt-3 w-full rounded-lg bg-amber-600 text-white px-3 py-2 font-semibold hover:bg-amber-700 transition-colors'>
              {copy.continueDemo}
            </button>
          </div>
        )}

        <form onSubmit={onSubmit} className='space-y-4'>
          <label className='block'>
            <span className='mb-1.5 block text-sm font-semibold text-slate-700'>
              {copy.email}
            </span>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
              <input
                type='email'
                required
                value={email}
                onChange={event => setEmail(event.target.value)}
                className='w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]'
                placeholder='admin@novacaretransport.com'
                autoComplete='username'
              />
            </div>
          </label>

          <label className='block'>
            <span className='mb-1.5 block text-sm font-semibold text-slate-700'>
              {copy.password}
            </span>
            <div className='relative'>
              <LockKeyhole className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
              <input
                type='password'
                required
                value={password}
                onChange={event => setPassword(event.target.value)}
                className='w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]'
                placeholder='••••••••'
                autoComplete='current-password'
              />
            </div>
          </label>

          {error && (
            <div className='rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700'>
              {error}
            </div>
          )}

          <button
            type='submit'
            disabled={isSubmitting || !authConfigured}
            className='w-full rounded-xl bg-[#1E3A8A] px-4 py-2.5 text-white font-semibold hover:bg-[#152f76] transition-colors disabled:opacity-60 disabled:cursor-not-allowed'>
            {isSubmitting ? copy.loggingIn : copy.login}
          </button>
        </form>

        <div className='mt-5'>
          <Link
            to='/'
            className='text-sm text-slate-500 hover:text-[#1E3A8A] transition-colors'>
            {copy.backHome}
          </Link>
        </div>
      </section>
    </main>
  );
}
