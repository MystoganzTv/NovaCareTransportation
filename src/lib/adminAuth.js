const SESSION_KEY = 'novacare_admin_session_v1';
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours

const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || '').trim().toLowerCase();
const ADMIN_PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD || '').trim();

function isBrowser() {
  return typeof window !== 'undefined';
}

function readSession() {
  if (!isBrowser()) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (
      !parsed ||
      typeof parsed !== 'object' ||
      typeof parsed.email !== 'string' ||
      typeof parsed.expiresAt !== 'number'
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeSession(session) {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // Ignore localStorage failures in restricted environments.
  }
}

export function isAdminAuthConfigured() {
  return Boolean(ADMIN_EMAIL && ADMIN_PASSWORD);
}

export function loginAdmin({ email, password }) {
  if (!isAdminAuthConfigured()) {
    return {
      ok: false,
      error:
        'Admin login is not configured. Set VITE_ADMIN_EMAIL and VITE_ADMIN_PASSWORD.',
    };
  }

  const normalizedEmail = (email || '').trim().toLowerCase();
  if (normalizedEmail !== ADMIN_EMAIL || (password || '') !== ADMIN_PASSWORD) {
    return { ok: false, error: 'Invalid email or password.' };
  }

  const session = {
    email: normalizedEmail,
    issuedAt: Date.now(),
    expiresAt: Date.now() + SESSION_DURATION_MS,
  };
  writeSession(session);
  return { ok: true };
}

export function loginAdminDemo() {
  const session = {
    email: 'demo-admin@novacare.local',
    issuedAt: Date.now(),
    expiresAt: Date.now() + SESSION_DURATION_MS,
  };
  writeSession(session);
  return { ok: true };
}

export function isAdminAuthenticated() {
  const session = readSession();
  if (!session) {
    return false;
  }

  if (Date.now() > session.expiresAt) {
    logoutAdmin();
    return false;
  }

  return true;
}

export function getAdminSessionEmail() {
  const session = readSession();
  if (!session || Date.now() > session.expiresAt) {
    return null;
  }
  return session.email;
}

export function logoutAdmin() {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    // Ignore localStorage failures in restricted environments.
  }
}
