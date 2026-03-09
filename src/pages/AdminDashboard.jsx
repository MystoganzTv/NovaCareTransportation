import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CalendarClock,
  CarTaxiFront,
  CheckCircle2,
  Clock3,
  MessageSquareText,
  TriangleAlert,
  Trash2,
  UserPlus,
  Users,
} from 'lucide-react';
import { getAdminSessionEmail, logoutAdmin } from '@/lib/adminAuth';

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
const USER_ROLES = ['admin', 'dispatcher', 'viewer'];
const USER_STORAGE_KEY = 'novacare_admin_users_v1';
const DEFAULT_TEAM_USERS = [
  {
    id: 'USR-1001',
    name: 'Enrique Padron',
    email: 'enrique.padron853@gmail.com',
    role: 'admin',
    isActive: true,
    createdAt: Date.now() - 86400000 * 45,
  },
];

function loadStoredUsers() {
  if (typeof window === 'undefined') {
    return DEFAULT_TEAM_USERS;
  }

  try {
    const raw = window.localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) {
      return DEFAULT_TEAM_USERS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return DEFAULT_TEAM_USERS;
    }
    return parsed;
  } catch {
    return DEFAULT_TEAM_USERS;
  }
}

function saveStoredUsers(users) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
  } catch {
    // Ignore storage failures.
  }
}

function buildUserId() {
  return `USR-${Date.now().toString(36).toUpperCase()}`;
}

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
  const [teamUsers, setTeamUsers] = useState([]);
  const [usersReady, setUsersReady] = useState(false);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: 'dispatcher',
  });
  const [userError, setUserError] = useState('');
  const navigate = useNavigate();
  const adminEmail = getAdminSessionEmail();

  const filteredRequests = useMemo(() => {
    if (statusFilter === 'All') {
      return RIDE_REQUESTS;
    }
    return RIDE_REQUESTS.filter(item => item.status === statusFilter);
  }, [statusFilter]);

  const activeUsersCount = useMemo(
    () => teamUsers.filter(user => user.isActive).length,
    [teamUsers]
  );

  useEffect(() => {
    setTeamUsers(loadStoredUsers());
    setUsersReady(true);
  }, []);

  useEffect(() => {
    if (!usersReady) {
      return;
    }
    saveStoredUsers(teamUsers);
  }, [teamUsers, usersReady]);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login', { replace: true });
  };

  const handleCreateUser = event => {
    event.preventDefault();
    setUserError('');

    const normalizedEmail = userForm.email.trim().toLowerCase();
    const normalizedName = userForm.name.trim();
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!normalizedName || !isEmailValid) {
      setUserError('Please enter a valid name and email.');
      return;
    }

    const exists = teamUsers.some(user => user.email.toLowerCase() === normalizedEmail);
    if (exists) {
      setUserError('This email is already registered.');
      return;
    }

    setTeamUsers(prev => [
      {
        id: buildUserId(),
        name: normalizedName,
        email: normalizedEmail,
        role: userForm.role,
        isActive: true,
        createdAt: Date.now(),
      },
      ...prev,
    ]);

    setUserForm({ name: '', email: '', role: 'dispatcher' });
  };

  const handleRoleChange = (id, nextRole) => {
    setTeamUsers(prev =>
      prev.map(user => (user.id === id ? { ...user, role: nextRole } : user))
    );
  };

  const handleToggleActive = id => {
    setTeamUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  const handleDeleteUser = id => {
    setTeamUsers(prev => prev.filter(user => user.id !== id));
  };

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
              {adminEmail && (
                <p className='text-xs text-blue-200 mt-2'>
                  Signed in as: {adminEmail}
                </p>
              )}
            </div>
            <div className='flex flex-wrap gap-2'>
              <button
                type='button'
                onClick={handleLogout}
                className='inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20 transition-colors'>
                Sign Out
              </button>
              <Link
                to='/'
                className='inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20 transition-colors'>
                Back to Website
              </Link>
            </div>
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
          <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5'>
            <div>
              <h2 className='text-xl font-bold text-slate-900'>Team Users</h2>
              <p className='text-sm text-slate-500'>
                Add and manage dashboard users. Current mode: local storage.
              </p>
            </div>
            <span className='inline-flex w-fit rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-xs font-semibold'>
              Database recommended for production
            </span>
          </div>

          <form
            onSubmit={handleCreateUser}
            className='grid grid-cols-1 md:grid-cols-4 gap-3 mb-5'>
            <input
              type='text'
              value={userForm.name}
              onChange={event =>
                setUserForm(prev => ({ ...prev, name: event.target.value }))
              }
              placeholder='Full name'
              className='w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]'
              required
            />
            <input
              type='email'
              value={userForm.email}
              onChange={event =>
                setUserForm(prev => ({ ...prev, email: event.target.value }))
              }
              placeholder='user@novacaretransportation.com'
              className='w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]'
              required
            />
            <select
              value={userForm.role}
              onChange={event =>
                setUserForm(prev => ({ ...prev, role: event.target.value }))
              }
              className='w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]'>
              {USER_ROLES.map(role => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <button
              type='submit'
              className='inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E3A8A] px-4 py-2.5 text-white font-semibold hover:bg-[#152f76] transition-colors'>
              <UserPlus className='w-4 h-4' />
              Add User
            </button>
          </form>

          {userError && (
            <div className='mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700'>
              {userError}
            </div>
          )}

          <div className='mb-4 text-sm text-slate-600'>
            <span className='font-semibold text-slate-900'>{teamUsers.length}</span>{' '}
            users total,{' '}
            <span className='font-semibold text-emerald-700'>{activeUsersCount}</span>{' '}
            active.
          </div>

          <div className='space-y-3'>
            {teamUsers.map(user => (
              <article
                key={user.id}
                className='rounded-xl border border-slate-200 bg-slate-50 p-4'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3'>
                  <div>
                    <p className='font-semibold text-slate-900'>{user.name}</p>
                    <p className='text-sm text-slate-600'>{user.email}</p>
                    <p className='text-xs text-slate-500 mt-1'>ID: {user.id}</p>
                  </div>

                  <div className='flex flex-wrap gap-2 items-center'>
                    <select
                      value={user.role}
                      onChange={event => handleRoleChange(user.id, event.target.value)}
                      className='rounded-lg border border-slate-300 px-3 py-1.5 text-sm bg-white text-slate-700'>
                      {USER_ROLES.map(role => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>

                    <button
                      type='button'
                      onClick={() => handleToggleActive(user.id)}
                      className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                        user.isActive
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                          : 'border-slate-300 bg-white text-slate-600'
                      }`}>
                      {user.isActive ? 'Active' : 'Disabled'}
                    </button>

                    <button
                      type='button'
                      onClick={() => handleDeleteUser(user.id)}
                      className='inline-flex items-center gap-1 rounded-lg border border-rose-300 bg-rose-50 text-rose-700 px-3 py-1.5 text-sm font-medium hover:bg-rose-100 transition-colors'>
                      <Trash2 className='w-4 h-4' />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

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
