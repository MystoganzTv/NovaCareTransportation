import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarClock,
  CarTaxiFront,
  CheckCircle2,
  Clock3,
  MessageSquareText,
  TriangleAlert,
  Users,
} from 'lucide-react';

const DASHBOARD_METRICS = [
  {
    label: 'Ride Requests (24h)',
    value: '18',
    note: '+4 vs yesterday',
    icon: CarTaxiFront,
    color: 'text-[#1E3A8A]',
    bg: 'bg-[#1E3A8A]/10',
  },
  {
    label: 'Pending Confirmations',
    value: '6',
    note: 'Needs dispatch review',
    icon: Clock3,
    color: 'text-amber-700',
    bg: 'bg-amber-100',
  },
  {
    label: 'Completed Today',
    value: '27',
    note: 'On-time rate 99%',
    icon: CheckCircle2,
    color: 'text-emerald-700',
    bg: 'bg-emerald-100',
  },
  {
    label: 'Active Clients',
    value: '42',
    note: 'Weekly recurring riders',
    icon: Users,
    color: 'text-cyan-700',
    bg: 'bg-cyan-100',
  },
];

const RIDE_REQUESTS = [
  {
    id: 'RQ-2031',
    passenger: 'Maria Rodriguez',
    date: 'Mar 10, 2026',
    time: '9:30 AM',
    pickup: 'Reston, VA',
    destination: 'Inova Fairfax',
    status: 'Pending',
  },
  {
    id: 'RQ-2032',
    passenger: 'James Turner',
    date: 'Mar 10, 2026',
    time: '10:15 AM',
    pickup: 'Herndon, VA',
    destination: 'Stone Springs Hospital',
    status: 'Confirmed',
  },
  {
    id: 'RQ-2033',
    passenger: 'Patricia Smith',
    date: 'Mar 10, 2026',
    time: '11:00 AM',
    pickup: 'Ashburn, VA',
    destination: 'Dialysis Center',
    status: 'Pending',
  },
  {
    id: 'RQ-2034',
    passenger: 'Daniel Kim',
    date: 'Mar 11, 2026',
    time: '8:20 AM',
    pickup: 'Fairfax, VA',
    destination: 'PT Clinic - Vienna',
    status: 'Confirmed',
  },
  {
    id: 'RQ-2035',
    passenger: 'Elena Garcia',
    date: 'Mar 11, 2026',
    time: '1:00 PM',
    pickup: 'Reston, VA',
    destination: 'Primary Care - Herndon',
    status: 'Needs Follow-up',
  },
];

const RECENT_MESSAGES = [
  {
    name: 'Angela P.',
    channel: 'Website Form',
    summary: 'Requesting weekly transport for physical therapy sessions.',
  },
  {
    name: 'Northwood Clinic',
    channel: 'Email',
    summary: 'Asking about route-based transport options for new patients.',
  },
  {
    name: 'Robert L.',
    channel: 'Phone Callback',
    summary: 'Needs ride confirmation update for Thursday appointment.',
  },
];

const STATUS_FILTERS = ['All', 'Pending', 'Confirmed', 'Needs Follow-up'];

function getStatusStyles(status) {
  if (status === 'Confirmed') {
    return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  }

  if (status === 'Pending') {
    return 'bg-amber-100 text-amber-800 border-amber-200';
  }

  return 'bg-rose-100 text-rose-800 border-rose-200';
}

export default function AdminDashboard() {
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredRequests = useMemo(() => {
    if (statusFilter === 'All') {
      return RIDE_REQUESTS;
    }
    return RIDE_REQUESTS.filter(item => item.status === statusFilter);
  }, [statusFilter]);

  return (
    <main className='min-h-screen bg-slate-100'>
      <header className='bg-gradient-to-r from-[#1E3A8A] to-[#0f172a] text-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div>
              <p className='text-xs sm:text-sm font-semibold tracking-wide text-cyan-200 uppercase mb-2'>
                NovaCare Transportation
              </p>
              <h1 className='text-3xl sm:text-4xl font-bold'>Admin Dashboard</h1>
              <p className='text-blue-100 mt-2'>
                Monitor ride requests, schedule activity, and inbound messages.
              </p>
            </div>
            <Link
              to='/'
              className='inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20 transition-colors'>
              Back to Website
            </Link>
          </div>
        </div>
      </header>

      <section className='max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10 space-y-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5'>
          {DASHBOARD_METRICS.map(metric => {
            const Icon = metric.icon;
            return (
              <article
                key={metric.label}
                className='bg-white rounded-2xl border border-slate-200 shadow-sm p-5'>
                <div className='flex items-start justify-between gap-3'>
                  <div>
                    <p className='text-sm text-slate-500 mb-1'>{metric.label}</p>
                    <p className='text-3xl font-bold text-slate-900'>{metric.value}</p>
                    <p className='text-xs text-slate-500 mt-2'>{metric.note}</p>
                  </div>
                  <div className={`${metric.bg} rounded-xl p-2.5`}>
                    <Icon className={`w-5 h-5 ${metric.color}`} strokeWidth={2} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <section className='bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5'>
            <div>
              <h2 className='text-xl font-bold text-slate-900'>Ride Requests</h2>
              <p className='text-sm text-slate-500'>
                Review and prioritize upcoming transportation requests.
              </p>
            </div>
            <div className='flex flex-wrap gap-2'>
              {STATUS_FILTERS.map(filter => (
                <button
                  key={filter}
                  type='button'
                  onClick={() => setStatusFilter(filter)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    statusFilter === filter
                      ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-[#1E3A8A] hover:text-[#1E3A8A]'
                  }`}>
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className='hidden md:block overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='text-left text-slate-500 border-b border-slate-200'>
                  <th className='py-3 pr-3 font-semibold'>Request ID</th>
                  <th className='py-3 pr-3 font-semibold'>Passenger</th>
                  <th className='py-3 pr-3 font-semibold'>Date & Time</th>
                  <th className='py-3 pr-3 font-semibold'>Route</th>
                  <th className='py-3 font-semibold'>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map(item => (
                  <tr key={item.id} className='border-b border-slate-100'>
                    <td className='py-3 pr-3 font-medium text-slate-700'>{item.id}</td>
                    <td className='py-3 pr-3 text-slate-700'>{item.passenger}</td>
                    <td className='py-3 pr-3 text-slate-600'>
                      {item.date} - {item.time}
                    </td>
                    <td className='py-3 pr-3 text-slate-600'>
                      {item.pickup} {'->'} {item.destination}
                    </td>
                    <td className='py-3'>
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusStyles(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='md:hidden space-y-3'>
            {filteredRequests.map(item => (
              <article
                key={item.id}
                className='border border-slate-200 rounded-xl p-4 bg-slate-50'>
                <div className='flex items-center justify-between gap-3 mb-2'>
                  <p className='font-semibold text-slate-800'>{item.id}</p>
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusStyles(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <p className='text-sm font-medium text-slate-700'>{item.passenger}</p>
                <p className='text-sm text-slate-600 mt-1'>
                  {item.date} - {item.time}
                </p>
                <p className='text-sm text-slate-600 mt-1'>
                  {item.pickup} {'->'} {item.destination}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
          <section className='bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6'>
            <div className='flex items-center gap-2 mb-4'>
              <CalendarClock className='w-5 h-5 text-[#1E3A8A]' />
              <h3 className='text-lg font-bold text-slate-900'>Upcoming Dispatch</h3>
            </div>
            <ul className='space-y-3'>
              <li className='bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-4'>
                <div>
                  <p className='font-medium text-slate-800'>7:45 AM - Herndon</p>
                  <p className='text-sm text-slate-500'>Driver: Unit 04</p>
                </div>
                <CheckCircle2 className='w-5 h-5 text-emerald-600' />
              </li>
              <li className='bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-4'>
                <div>
                  <p className='font-medium text-slate-800'>9:10 AM - Reston</p>
                  <p className='text-sm text-slate-500'>Driver: Unit 02</p>
                </div>
                <Clock3 className='w-5 h-5 text-amber-600' />
              </li>
              <li className='bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-4'>
                <div>
                  <p className='font-medium text-slate-800'>11:30 AM - Ashburn</p>
                  <p className='text-sm text-slate-500'>Driver: Pending assignment</p>
                </div>
                <TriangleAlert className='w-5 h-5 text-rose-600' />
              </li>
            </ul>
          </section>

          <section className='bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6'>
            <div className='flex items-center gap-2 mb-4'>
              <MessageSquareText className='w-5 h-5 text-[#1E3A8A]' />
              <h3 className='text-lg font-bold text-slate-900'>Recent Messages</h3>
            </div>
            <ul className='space-y-3'>
              {RECENT_MESSAGES.map(item => (
                <li
                  key={item.name}
                  className='bg-slate-50 border border-slate-200 rounded-xl p-3'>
                  <div className='flex items-center justify-between gap-3 mb-1'>
                    <p className='font-medium text-slate-800'>{item.name}</p>
                    <span className='text-xs px-2 py-1 rounded-full bg-slate-200 text-slate-700'>
                      {item.channel}
                    </span>
                  </div>
                  <p className='text-sm text-slate-600'>{item.summary}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
