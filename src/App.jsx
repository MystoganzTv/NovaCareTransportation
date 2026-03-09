import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import RequestRide from './pages/RequestRide';
import { LanguageProvider } from './context/LanguageContext';

function NotFound() {
  return (
    <main className='min-h-screen bg-slate-100 flex items-center justify-center px-4'>
      <div className='bg-white border border-slate-200 rounded-2xl shadow-lg p-8 max-w-md text-center'>
        <h1 className='text-3xl font-bold text-[#1E3A8A] mb-3'>Page not found</h1>
        <p className='text-slate-600 mb-6'>
          The page you requested does not exist.
        </p>
        <Link
          to='/'
          className='inline-flex items-center justify-center rounded-lg bg-[#1E3A8A] px-5 py-2.5 text-white font-medium hover:bg-[#152f76] transition-colors'>
          Go to Home
        </Link>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/BookRide' element={<RequestRide />} />
          <Route path='/request-ride' element={<RequestRide />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
